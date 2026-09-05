
function get_available_barbers() {

  // Mock fallback barber list if appState.barbers isn't populated

  return appState.barbers || [
    { id: "barber-01", name: "Joshua" },
    { id: "barber-02", name: "Kyric" },
    { id: "barber-03", name: "Roldan" }
  ];
}