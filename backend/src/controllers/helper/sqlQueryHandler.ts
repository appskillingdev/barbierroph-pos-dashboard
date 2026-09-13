import type { PoolClient } from "pg";
import type { ParsedQs } from "qs";

type Query = ParsedQs;
type QueryValue = string | string[] | ParsedQs | ParsedQs[] | undefined;
type FilterOperator = "eq" | "contains" | "startsWith" | "gte" | "lte" | "in";

export interface ListQueryDefinition {
  table: string;
  columns: Record<string, string>;
  defaultSort: string;
  defaultOrder?: "asc" | "desc";
}

export interface ListCondition {
  column?: string;
  value?: string | number | boolean | Date;
  raw?: string;
  operator?: "eq" | "contains" | "gte" | "lte";
}

const controlKeys = new Set([
  "sort",
  "sortBy",
  "order",
  "sortOrder",
  "page",
  "limit",
  "startDate",
  "endDate",
]);

function scalar(value: QueryValue): string | undefined {
  if (Array.isArray(value)) return scalar(value[0]);
  return typeof value === "string" ? value : undefined;
}

function normalize(value: string): string {
  return value.replace(/[_-]/g, "").toLowerCase();
}

function parseFilterKey(key: string): {
  field: string;
  operator: FilterOperator;
} {
  const match = key.match(/^(.+)\.(contains|startsWith|gte|lte|in)$/i);
  return {
    field: match?.[1] ?? key,
    operator: (match?.[2]?.toLowerCase() as FilterOperator | undefined) ?? "eq",
  };
}

function resolveColumn(
  definition: ListQueryDefinition,
  requested: string,
): string {
  const entry = Object.entries(definition.columns).find(
    ([alias]) => normalize(alias) === normalize(requested),
  );
  if (!entry) {
    throw new Error(`Unsupported query field: ${requested}`);
  }
  return entry[1];
}

function addCondition(
  conditions: string[],
  values: Array<string | number | boolean | Date>,
  column: string,
  operator: FilterOperator,
  rawValue: string,
): void {
  if (operator === "contains") {
    values.push(`%${rawValue}%`);
    conditions.push(`${column} ILIKE $${values.length}`);
    return;
  }
  if (operator === "startsWith") {
    values.push(`${rawValue}%`);
    conditions.push(`${column} ILIKE $${values.length}`);
    return;
  }
  if (operator === "in") {
    const items = rawValue
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    if (items.length === 0) {
      conditions.push("FALSE");
      return;
    }
    const placeholders = items.map((item) => {
      values.push(item);
      return `$${values.length}`;
    });
    conditions.push(`${column} IN (${placeholders.join(", ")})`);
    return;
  }

  values.push(rawValue);
  const comparison =
    operator === "gte" ? ">=" : operator === "lte" ? "<=" : "=";
  conditions.push(`${column} ${comparison} $${values.length}`);
}

export async function runListQuery<T extends object>(
  client: PoolClient,
  definition: ListQueryDefinition,
  query: Query,
  baseConditions: ListCondition[] = [],
): Promise<T[]> {
  const conditions: string[] = [];
  const values: Array<string | number | boolean | Date> = [];

  for (const condition of baseConditions) {
    if (condition.raw) {
      conditions.push(condition.raw);
      continue;
    }
    if (!condition.column || condition.value === undefined) continue;
    if (condition.operator === "contains") {
      values.push(`%${condition.value}%`);
      conditions.push(`${condition.column} ILIKE $${values.length}`);
      continue;
    }
    values.push(condition.value);
    const operator =
      condition.operator === "gte"
        ? ">="
        : condition.operator === "lte"
          ? "<="
          : "=";
    conditions.push(`${condition.column} ${operator} $${values.length}`);
  }

  for (const [key, value] of Object.entries(query)) {
    if (controlKeys.has(key)) continue;
    const rawValue = scalar(value as QueryValue);
    if (rawValue === undefined) continue;
    const { field, operator } = parseFilterKey(key);
    addCondition(
      conditions,
      values,
      resolveColumn(definition, field),
      operator,
      rawValue,
    );
  }

  const sortRequested =
    scalar(query.sortBy as QueryValue) ??
    scalar(query.sort as QueryValue) ??
    definition.defaultSort;
  const sortColumn = resolveColumn(definition, sortRequested);
  const direction = (
    scalar(query.sortOrder as QueryValue) ??
    scalar(query.order as QueryValue) ??
    definition.defaultOrder ??
    "asc"
  ).toLowerCase();
  if (direction !== "asc" && direction !== "desc") {
    throw new Error("sortOrder must be either asc or desc");
  }

  const page = Math.max(
    Number.parseInt(scalar(query.page as QueryValue) ?? "1", 10) || 1,
    1,
  );
  const limit = Math.min(
    Math.max(
      Number.parseInt(scalar(query.limit as QueryValue) ?? "50", 10) || 50,
      1,
    ),
    100,
  );
  values.push(limit, (page - 1) * limit);

  const where =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const result = await client.query<T>(
    `SELECT * FROM ${definition.table} ${where} ORDER BY ${sortColumn} ${direction} LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values,
  );

  return result.rows;
}
