/* ==========================================
     MOCK DATABASE & DYNAMIC PRICE MAP
     ========================================== */
// const mockServicesDB2 = [
//   { service_code: "HC", category: "Haircuts", cluster: "Service", service_name: "Signature Haircut", is_promo: false, is_popular: true },
//   { service_code: "BT", category: "Beard", cluster: "Service", service_name: "Beard Trim & Sculpt", is_promo: false, is_popular: true },
//   { service_code: "HS", category: "Grooming", cluster: "Service", service_name: "Hot Towel Shave", is_promo: false, is_popular: false },
//   { service_code: "PM", category: "Haircare", cluster: "Retail", service_name: "Matte Clay Pomade", is_promo: false, is_popular: true },
//   { service_code: "BO", category: "Beardcare", cluster: "Retail", service_name: "Cedarwood Beard Oil", is_promo: false, is_popular: false },
//   { service_code: "COMBO1", category: "Packages", cluster: "Service-promo", service_name: "Executive Cut + Beard", is_promo: true, is_popular: true }
// ];

const ServicesDB = mockUpServiceList

const externalPriceDB = {
};


ServicesDB.forEach(service_data => {
  // console.log(`Mapping service code ${service_data.service_code} to price ${service_data.service_price}`);
  externalPriceDB[service_data.service_code] = service_data.service_price || 0.00;
});

/* ==========================================
   APP STATE MANAGEMENT
   ========================================== */
let activeTicket = {
  ticketId: "1024",
  customerName: "John Doe",
  customerPhone: "0917-123-4567",
  barber: "Marcus",
  serviceType: "Walk-In",
  items: [
    { service_code: "HC", service_name: "Signature Haircut", price: 350.00 }
  ]
};

let isEditingCustomer = false;
let currentCluster = "Popular";
let searchQuery = "";

/* ==========================================
   MODAL INITIALIZATION
   ========================================== */
function openIntegratedModal() {

  console.group("Opening Integrated POS Modal");
  try {

    renderCustomerDetails();
    renderTicketPanel();
    initClusterTabs(); // <-- Dynamically generates tabs before rendering grid
    renderQuickTapBar();
    renderServicesGrid();
    document.getElementById('integratedModal').classList.remove('hidden');

    setTimeout(() => {
      document.getElementById('searchInput').focus();
    }, 100);
  } catch (error) {
    console.error("Error occurred while opening integrated modal:", error);
  } finally {
    gE()
  }
}

function closeIntegratedModal() {
  document.getElementById('integratedModal').classList.add('hidden');
}

/* ==========================================
   INLINE CUSTOMER EDITING CONTROLS
   ========================================== */
function toggleCustomerEdit() {
  isEditingCustomer = !isEditingCustomer;

  const displayView = document.getElementById('customerDisplayView');
  const editForm = document.getElementById('customerEditForm');
  const icon = document.getElementById('editBtnIcon');
  const text = document.getElementById('editBtnText');

  if (isEditingCustomer) {
    displayView.classList.add('hidden');
    editForm.classList.remove('hidden');
    icon.textContent = "💾";
    text.textContent = "Save Details";
  } else {
    // Save field values back to active ticket state
    activeTicket.customerName = document.getElementById('inputName').value.trim() || "Guest";
    activeTicket.customerPhone = document.getElementById('inputPhone').value.trim() || "N/A";
    activeTicket.barber = document.getElementById('selectBarber').value;
    activeTicket.serviceType = document.getElementById('selectType').value;

    renderCustomerDetails();

    displayView.classList.remove('hidden');
    editForm.classList.add('hidden');
    icon.textContent = "✏️";
    text.textContent = "Edit Details";
  }
}

function renderCustomerDetails() {
  document.getElementById('displayName').textContent = activeTicket.customerName;
  document.getElementById('displayPhone').textContent = activeTicket.customerPhone;
  document.getElementById('displayBarber').textContent = activeTicket.barber;
  document.getElementById('displayType').textContent = activeTicket.serviceType;

  document.getElementById('inputName').value = activeTicket.customerName;
  document.getElementById('inputPhone').value = activeTicket.customerPhone;
  document.getElementById('selectBarber').value = activeTicket.barber;
  document.getElementById('selectType').value = activeTicket.serviceType;
}

/* ==========================================
   LEFT PANEL: TICKET SYNCHRONIZATION
   ========================================== */
function renderTicketPanel() {

  try {
    console.group('renderTicketPanel: Rendering Active Ticket Items');
    const container = document.getElementById('ticketItemsContainer');
    const subtotalEl = document.getElementById('subtotalVal');
    const totalEl = document.getElementById('totalVal');

    if (activeTicket.items.length === 0) {
      container.innerHTML = `
          <div style="text-align: center; color: var(--text-muted); padding: 40px 10px; font-size: 13px;">
            No items added yet.<br>Tap services from the right menu to add.
          </div>
        `;
      subtotalEl.textContent = "₱0.00";
      totalEl.textContent = "₱0.00";
      return;
    }

    let subtotal = 0;
    container.innerHTML = activeTicket.items.map((item, index) => {


      // try {
      // console.groupCollapsed('.....')
      console.log('item:', item)

      subtotal += item.price;
      x = `
          <div class="ticket-item-card">
            <div class="item-left">
              <div class="item-code-badge">${item.service_code}</div>
              <div>
                <div class="item-name">${item.service_name}</div>
                <div class="item-subtext">1x &bull; Staff: ${activeTicket.barber}</div>
              </div>
            </div>
            <div class="item-right">
              <span class="item-price">₱${item.price.toFixed(2)}</span>
              <button class="item-remove-btn" onclick="removeTicketItem(${index})">&times;</button>
            </div>
          </div>`
      return `


          <div class="ticket-item-card">
            <div class="item-left">
              <div class="item-code-badge">${item.service_code}</div>
              <div>
                <div class="item-name">${item.service_name}</div>
                <div class="item-subtext">1x &bull; Staff: ${activeTicket.barber}</div>
              </div>
            </div>
            <div class="item-right">
              <span class="item-price">₱</span>

              <div class="price-input-wrapper">
                <input 
                  type="number" 
                  class="item-price-input" 
                  value="${item.price.toFixed(2)}"
                  step="0.01" 
                  min="0"
                  onfocus="this.select()"
                  onblur="updateItemPrice(0, this.value)" 
                  onkeydown="if(event.key==='Enter') this.blur();"
                />
              </div>
              <button class="item-remove-btn" onclick="removeTicketItem(${index})">&times;</button>
            </div>
          </div>
        `;
      // } catch (error) {
      //   console.error("Error occurred:", error)
      // } finally {
      //   console.groupEnd()
      // }
    }).join('');
    console.log('Calculated subtotal:', subtotal);

    subtotalEl.textContent = `₱${subtotal.toFixed(2)}`;
    totalEl.textContent = `₱${subtotal.toFixed(2)}`;


  } catch (error) {
    console.error("Error occurred:", error)
  } finally {
    console.groupEnd()
  }
}

/* ==========================================
   MOCK APP STATE & BARBER FETCH FUNCTION
   ========================================== */
/* ==========================================
   UPDATE ITEM PRICE IN ACTIVE TICKET
   ========================================== */
function updateItemPrice(index, newPrice) {
  console.groupCollapsed(`[POS Ticket Action] Update Item Price at Index: ${index}`);

  const parsedPrice = parseFloat(newPrice);

  // Validate input
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    console.warn('⚠️ Invalid price entered. Reverting to original price.');
    renderTicketPanel(); // Re-render to restore clean value
    console.groupEnd();
    return;
  }

  const item = activeTicket.items[index];
  if (item) {
    const oldPrice = item.price;
    item.price = parsedPrice;

    // Optional: Sync override price back to external database state
    if (typeof externalPriceDB !== 'undefined') {
      externalPriceDB[item.service_code] = parsedPrice;
    }

    console.log(`💰 %cPRICE UPDATED%c for "${item.service_name}": ₱${oldPrice} ➔ ₱${parsedPrice.toFixed(2)}`, 'color: #22c55e; font-weight: bold;', 'color: inherit;');
  }

  console.log('🔄 Re-rendering Ticket Panel & Totals...');
  renderTicketPanel();
  console.groupEnd();
}

/* ==========================================
   SAVE TICKET DRAFT LOGIC
   ========================================== */
function saveTicketDraft() {
  console.groupCollapsed('[POS Action] Save Ticket Draft');

  // Prevent saving empty tickets
  if (!activeTicket.items || activeTicket.items.length === 0) {
    console.warn('⚠️ Save aborted: Ticket has no items.');
    alert('Cannot save an empty ticket. Please add at least one service or item.');
    console.groupEnd();
    return;
  }

  // Ensure appState has savedTickets storage initialized
  if (!appState.savedTickets) {
    appState.savedTickets = [];
  }

  // Build ticket document payload
  const ticketPayload = {
    id: activeTicket.id || `TKT-${Date.now()}`,
    status: 'draft',
    barber: activeTicket.barber || 'Unassigned',
    customer: activeTicket.customer || 'Walk-in',
    items: [...activeTicket.items],
    subtotal: activeTicket.items.reduce((acc, item) => acc + (item.price || 0), 0),
    updatedAt: new Date().toISOString()
  };

  // Update existing draft if already present, or append new entry
  const existingIndex = appState.savedTickets.findIndex(t => t.id === ticketPayload.id);
  if (existingIndex > -1) {
    appState.savedTickets[existingIndex] = ticketPayload;
    console.log(`💾 %cUPDATED DRAFT%c ID: ${ticketPayload.id}`, 'color: #3b82f6; font-weight: bold;', 'color: inherit;', ticketPayload);
  } else {
    appState.savedTickets.push(ticketPayload);
    console.log(`💾 %cCREATED NEW DRAFT%c ID: ${ticketPayload.id}`, 'color: #22c55e; font-weight: bold;', 'color: inherit;', ticketPayload);
  }

  // Optional: Persist locally to survive page refreshes
  try {
    localStorage.setItem('pos_saved_tickets', JSON.stringify(appState.savedTickets));
  } catch (err) {
    console.error('Failed to write draft to LocalStorage:', err);
  }

  // Show UI visual feedback on save button
  const saveBtn = document.querySelector('.btn-save-ticket');
  if (saveBtn) {
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = `✓ Saved!`;
    saveBtn.style.background = '#15803d';
    saveBtn.style.borderColor = '#22c55e';
    
    setTimeout(() => {
      saveBtn.innerHTML = originalText;
      saveBtn.style.background = '';
      saveBtn.style.borderColor = '';
    }, 1500);
  }

  console.groupEnd();
}

/* ==========================================
   BARBER DROPDOWN INITIALIZATION
   ========================================== */
function initBarberSelect() {

  try {
    console.group('initBarberSelect: Populating Barber Dropdown');
    const selectEl = document.getElementById('selectBarber');
    const availableBarbers = get_available_barbers();

    console.log('Available Barbers:', availableBarbers);
    let optionsHTML = '<option value="Unassigned">Unassigned</option>';

    availableBarbers.forEach(barber => {
      optionsHTML += `<option value="${barber.name}">${barber.name}</option>`;
    });

    selectEl.innerHTML = optionsHTML;

    // Set default selection matching current ticket state
    if (activeTicket.barber) {
      selectEl.value = activeTicket.barber;
    }


  } catch (error) {
    console.error("Error occurred:", error)
  } finally {
    console.groupEnd()
  }
}

// Handler for when the barber dropdown selection changes
function handleBarberChange(newBarber) {
  activeTicket.barber = newBarber;
  renderCustomerDetails();
  renderTicketPanel(); // Re-render ticket so item-level barber tags update
}

/* ==========================================
   UPDATED MODAL OPEN / INIT TRIGGER
   ========================================== */
function openIntegratedModal() {
  initBarberSelect();   // <-- Populate barber dropdown dynamically
  initClusterTabs();    // <-- Dynamic tabs from dataset
  renderCustomerDetails();
  renderTicketPanel();
  renderQuickTapBar();
  renderServicesGrid();

  document.getElementById('integratedModal').classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('searchInput').focus();
  }, 100);
}
/* ==========================================
   DYNAMIC CLUSTER TAB GENERATION
   ========================================== */
function initClusterTabs() {
  const container = document.getElementById('clusterTabs');

  // 1. Extract unique clusters dynamically from the database
  const extractedClusters = [...new Set(ServicesDB.map(item => item.cluster))]
    .filter(cluster => cluster && cluster !== 'SERVICES - PROMO' && cluster != 'RETAIL - PROMO'); // Exclude hardcoded promo cluster if listed in dataset


  console.log('extractedClusters:', extractedClusters)
  // 2. Build the tabs HTML array (Popular & All Items fixed at start)
  let tabsHTML = `
        <button class="cluster-tab ${currentCluster === 'Popular' ? 'active' : ''}" data-cluster="Popular" onclick="filterCluster('Popular')">
          ★ Popular
        </button>
        <button class="cluster-tab ${currentCluster === 'All' ? 'active' : ''}" data-cluster="All" onclick="filterCluster('All')">
          All Items
        </button>
      `;

  // 3. Loop through extracted clusters and generate tabs
  extractedClusters.forEach(cluster => {
    tabsHTML += `
      <button class="cluster-tab ${currentCluster === cluster ? 'active' : ''}" data-cluster="${cluster}" onclick="filterCluster('${cluster}')">
        ${cluster}
      </button>
    `;
  });

  // 4. Append Promos fixed at the end
  tabsHTML += `
    <button class="cluster-tab ${currentCluster === 'Service-promo' ? 'active' : ''}" data-cluster="Service-promo" onclick="filterCluster('Service-promo')">
      Promos
    </button>
  `;

  container.innerHTML = tabsHTML;
}

/* ==========================================
   UPDATED MODAL OPEN / INITIALIZATION TRIGGER
   ========================================== */
// function openIntegratedModal() {
//   renderCustomerDetails();
//   renderTicketPanel();
//   initClusterTabs(); // <-- Dynamically generates tabs before rendering grid
//   renderQuickTapBar();
//   renderServicesGrid();

//   document.getElementById('integratedModal').classList.remove('hidden');

//   setTimeout(() => {
//     document.getElementById('searchInput').focus();
//   }, 100);
// }

function removeTicketItem(index) {
  console.groupCollapsed('Removing item from active ticket:', activeTicket.items[index]);
  activeTicket.items.splice(index, 1);
  renderTicketPanel();
  renderServicesGrid();
  gE()
}

/* ==========================================
   RIGHT PANEL: SERVICE DRAWER LOGIC
   ========================================== */
function renderQuickTapBar() {
  console.group("Rendering Quick-Tap Top Bar");
  const container = document.getElementById('quickTapRow');
  const popular = ServicesDB.filter(s => s.is_popular);
  console.log("Popular Services:", popular);
  container.innerHTML = popular.map(item => `
        <button class="quick-tap-btn" onclick="toggleServiceItem('${item.service_code}')">
          <div class="quick-tap-badge">${item.service_code}</div>
          <div style="text-align: left;">
            <div style="font-size: 12px; font-weight: 700;">${item.service_name}</div>
            <div style="font-size: 11px; color: var(--accent-gold); font-weight: 800;">₱${externalPriceDB[item.service_code || 'No Service Name']}</div>
          </div>
        </button>
      `).join('');
  console.groupEnd();
}

function filterCluster(clusterName) {
  currentCluster = clusterName;
  document.querySelectorAll('.cluster-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.cluster === clusterName);
  });
  renderServicesGrid();
}

function handleSearch() {

  searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
  renderServicesGrid();
}

function renderServicesGrid() {
  try {
    console.group("Rendering Services Grid");
    const grid = document.getElementById('servicesGrid');
    const activeCodes = new Set(activeTicket.items.map(i => i.service_code));

    const filtered = ServicesDB.filter(item => {
      let matchesCluster = false;
      if (currentCluster === "Popular") matchesCluster = item.is_popular;
      else if (currentCluster === "All") matchesCluster = true;
      else matchesCluster = item.cluster === currentCluster;

      const matchesSearch = item.service_name.toLowerCase().includes(searchQuery) ||
        item.service_code.toLowerCase().includes(searchQuery);

      return matchesCluster && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No services found matching search query.</div>`;
      return;
    }

    console.log("Filtered Services:", filtered);
    console.log('externalPriceDB:', externalPriceDB)
    grid.innerHTML = filtered.map(item => {
      return renderServicesGridCard(item);
    }).join('');


    function renderServicesGridCard(item) {

      const isSelected = activeCodes.has(item.service_code);
      const price = externalPriceDB[item.service_code] || 0.00;

      return `
          <div class="service-card ${isSelected ? 'selected' : ''}" onclick="toggleServiceItem('${item.service_code}')">
            <div class="selected-check">✓</div>
            <div class="card-top">
              <div class="service-code-badge">${item.service_code}</div>
              <div>
                <div class="card-title">${item.service_name}</div>
                <div style="font-size: 10px; color: var(--text-muted); font-weight: 600;">${item.category}</div>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="card-price">₱${price.toFixed(2)}</span>
              ${item.is_promo ? `<span class="promo-badge">PROMO</span>` : ''}
            </div>
          </div>
        `;
    }

  } catch (error) {
    console.error("Error occurred:", error)
  } finally {
    console.groupEnd()
  }
}



function toggleServiceItem(code) {
  // Collapsed group keeps the console clean during rapid clicks
  console.group(`[POS Ticket Action] Toggle Service: "%c${code}%c"`, 'color: #e8a228; font-weight: bold;', 'color: inherit;');

  const existingIndex = activeTicket.items.findIndex(i => i.service_code === code);

  if (existingIndex > -1) {
    console.log('existingIndex:', existingIndex)
    const removedItem = activeTicket.items[existingIndex];
    activeTicket.items.splice(existingIndex, 1);

    console.log(`❌ %cREMOVED%c item at index ${existingIndex}:`, 'color: #ef4444; font-weight: bold;', 'color: inherit;', removedItem);
  } else {
    // Search ServicesDB (or mockServicesDB depending on your variable name)
    const service = ServicesDB.find(s => s.service_code === code);
    console.log('service found:', service)
    if (service) {
      const price = (typeof externalPriceDB !== 'undefined' ? externalPriceDB[service.service_code] : service.price) || 0.00;

      const newItem = {
        service_code: service.service_code,
        service_name: service.service_name,
        price: price
      };

      activeTicket.items.push(newItem);
      console.log(`➕ %cADDED%c service:`, 'color: #22c55e; font-weight: bold;', 'color: inherit;', newItem);
    } else {
      console.warn(`⚠️ %cNOT FOUND%c: Could not locate service code "${code}" in database.`, 'color: #f59e0b; font-weight: bold;', 'color: inherit;');
    }
  }

  // Display updated state as a clean table
  console.group('Updated Active Ticket Items');
  console.table(activeTicket.items);
  console.groupEnd();

  // Log UI re-render triggers
  console.log('🔄 Triggering UI Re-renders: renderTicketPanel() & renderServicesGrid()');
  renderTicketPanel();
  renderServicesGrid();

  console.groupEnd(); // Close main group
}

function processCheckout() {
  if (activeTicket.items.length === 0) {
    alert("Cannot process checkout with 0 items.");
    return;
  }
  alert(`Proceeding to POS Payment Gateway for Ticket #${activeTicket.ticketId}\nClient: ${activeTicket.customerName}\nBarber: ${activeTicket.barber}`);
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeIntegratedModal();
  }
});