

// ==================== PRICE HELPER FUNCTIONS ====================
function computeFinalTotal(ticket) {
  // Step 1: Sum item prices (accounting for item-level overrides)
  const calculatedSubtotal = ticket.items.reduce((sum, item) => {
    const price = (item.overridePrice !== null && item.overridePrice !== undefined)
      ? item.overridePrice
      : item.originalPrice;
    return sum + (price * item.quantity);
  }, 0);

  // Step 2: Apply ticket-level override if present
  if (ticket.pricing.ticketOverride.isOverridden && ticket.pricing.ticketOverride.overrideTotal !== null) {
    return ticket.pricing.ticketOverride.overrideTotal;
  }

  return calculatedSubtotal;
}

// ==================== RENDERING FUNCTIONS ====================
function renderDashboard() {
  console.group("Rendering Dashboard");

  try {

    renderBookneticQueue();
    renderWaitingArea();
    renderActiveChairs();
    renderCheckout();
    setupDragAndDrop();
  } catch (error) {
    console.error("Error rendering dashboard:", error);
  } finally {
    gE()
  }
}

function renderBookneticQueue() {

  try {
    console.group("Rendering Booknetic Queue");
    console.log("Current Booknetic Queue State:", appState.bookneticQueue);
    const container = document.getElementById('bookneticQueueList');
    container.innerHTML = appState.bookneticQueue.map(item => `
    <div class="queue-card" data-bookneticId="${item.ticketId}">
      <div class="queue-card-header">
        <span>${item.time}</span>
        <span class="${item.paymentPreference === 'Online Paid' ? 'tag-online-paid' : 'tag-pay-shop'}">
          ${item.paymentPreference}
        </span>
      </div>
      <div class="customer-name">${item.customerName}</div>
      <div class="service-name">Service: ${item.service}</div>
      <div class="card-meta">Pref: ${item.preferredBarber}</div>
      <button class="btn-card-action" onclick="checkInBooknetic('${item.ticketId}')">
        Check-in ➔
      </button>
    </div>
  `).join('');

  } catch (error) {
    console.error("Error occurred:", error)
  } finally {
    console.groupEnd()
  }
}

function renderPosCard(ticket) {
  console.group(`Rendering POS Card for Ticket: ${ticket.ticketId}`);
  try {

    const status = ticket.status; // Waiting, In Progress, Checkout, Paid

    const statusClassName = status === 'Waiting' ? 'waiting-card'
      : status === 'In Progress' ? 'in-progress-card'
        : status === 'Checkout' ? 'checkout-card'
          : status === 'Paid' ? 'paid-card' : '';


    const total = computeFinalTotal(ticket);
    const isPaid = ticket.status === 'Paid';
    const chairNum = ticket.assignedChairId ? appState.chairs.findIndex(c => c.id === ticket.assignedChairId) + 1 : null;

    // const active_ticketv1 = `
    //     <div class="pos-card" draggable="true" data-id="${ticket.ticketId}">
    //       <div class="chair-label">Chair #${chairNum} | ${ticket.assignedBarber}</div>
    //       <span class="badge badge-in-progress">In Progress</span>
    //       <div class="customer-name">${ticket.customer.name}</div>
    //       <div class="service-name">${ticket.items.map(i => i.name).join(', ')}</div>
    //       <button class="btn-card-action" onclick="moveTicketStatus('${ticket.ticketId}', 'Checkout')">
    //         Check Out ➔
    //       </button>
    //     </div>
    //     `


    // Inside renderPosCard for 'In Progress' status:
    const active_ticket = `
        <div class="pos-card in-progress-card" draggable="true" data-id="${ticket.ticketId}">
          <div class="card-title-row">
            <span class="customer-name">${ticket.customer.name}</span>
            <span class="badge ${ticket.ticketType === 'Walk-in' ? 'badge-walkin' : 'badge-appointment'}">
              ${ticket.ticketType}
            </span>
          </div>
          <div class="service-name">${ticket.items.map(i => i.name).join(', ')}</div>
          <div class="card-meta">Started: ${ticket.timestamps?.seated ? new Date(ticket.timestamps.seated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}</div>
          
          <button class="btn-card-action" onclick="moveTicketStatus('${ticket.ticketId}', 'Checkout')">
            Check Out ➔
          </button>
        </div>
      `;

    const waiting_ticket = `
      <div class="pos-card" draggable="true" data-id="${ticket.ticketId}">
        <div class="card-title-row">
          <span class="customer-name">${ticket.customer.name}</span>
          <span class="badge ${ticket.ticketType === 'Walk-in' ? 'badge-walkin' : 'badge-appointment'}">${ticket.ticketType}</span>
        </div>
        <div class="card-meta">Barber: ${ticket.preferredBarber}</div>
        <div class="service-name">Service: ${ticket.items.map(i => i.name).join(', ')}</div>
        <div class="card-meta">Waiting: ${ticket.waitingMins || 0} mins</div>
        <button class="btn-card-action" onclick="assignToChairFunc('${ticket.ticketId}')">
          Assign to Chair ➔
        </button>
      </div>
    `

    const checkout_ticket = `
        <div class="pos-card" draggable="true" data-id="${ticket.ticketId}">
          <div class="card-title-row">
            <span class="customer-name">${ticket.customer.name}</span>
            <span class="badge ${isPaid ? 'badge-paid' : 'badge-in-progress'}">${isPaid ? 'Paid' : 'In Progress'}</span>
          </div>
          <div class="service-name">${ticket.items.map(i => i.name).join(', ')}</div>

          <div class="card-meta" style="margin-top: 4px; font-weight: bold; color: #0f172a;">
            Total: ₱${total.toFixed(2)}
            ${!isPaid ? `<button style="background:none; border:none; color:#64748b; cursor:pointer; font-size:11px;" onclick="overridePricePrompt('${ticket.ticketId}')">[✎ Adjust]</button>` : ''}
          </div>

          ${isPaid
        ? `<button class="btn-card-action" onclick="viewTransaction('${ticket.ticketId}')">See Transaction</button>`
        : `<button class="btn-card-action" onclick="moveTicketStatus('${ticket.ticketId}', 'Paid')">Process Payment</button>`
      }
        </div>`



    const universal_ticket = `
      <div class="pos-card ${statusClassName}" draggable="true" data-id="${ticket.ticketId}">

        <div class="card-title-row">
          <span class="customer-name">${ticket.customer.name}</span>
          ${renderBadge(ticket)}
        </div>

        <!-------------- For Waiting Tickets ------------------>
        <div class="card-meta show_on_waiting">Barber: ${ticket.assignedBarber}</div>
        <div class="service-name show_on_waiting">Service: ${ticket.items.map(i => i.name).join(', ')}</div>
        <div class="card-meta show_on_waiting">Waiting: ${ticket.waitingMins || 0} mins</div>
        <button class="btn-card-action show_on_waiting" onclick="assignToChairFunc('${ticket.ticketId}')">
          Assign to Chair ➔
        </button>
        <!---------------- For Waiting Tickets -------------------->

        <!---------------- For In Progress Tickets -------------------->
          <div class="chair-label show_on_in_progress">Chair #${chairNum} | ${ticket.assignedBarber}</div>
          <div class="service-name show_on_in_progress">${ticket.items.map(i => i.name).join(', ')}</div>
          <button class="btn-card-action show_on_in_progress" onclick="moveTicketStatus('${ticket.ticketId}', 'Checkout')">
            Check Out ➔
          </button>
        <!---------------- For In Progress Tickets ------------------->

        <!---------------- For Checkout Tickets -------------------->
          <div class="service-name show_on_checkout">${ticket.items.map(i => i.name).join(', ')}</div>
          
          <div class="card-meta show_on_checkout" style="margin-top: 4px; font-weight: bold; color: #0f172a;">
            Total: ₱${total.toFixed(2)}
            ${!isPaid ? `<button style="background:none; border:none; color:#64748b; cursor:pointer; font-size:11px;" onclick="overridePricePrompt('${ticket.ticketId}')">[✎ Adjust]</button>` : ''}
          </div>

          ${isPaid
        ? `<button class="btn-card-action show_on_checkout" onclick="viewTransaction('${ticket.ticketId}')">See Transaction</button>`
        : `<button class="btn-card-action show_on_checkout" onclick="moveTicketStatus('${ticket.ticketId}', 'Paid')">Process Payment</button>`}
        <!---------------- For Checkout Tickets --------------------> 

      </div>`



    function renderBadge(ticket) {
      const isPaid = ticket.status === 'Paid';
      return `
          <span class="badge ${isPaid ? 'badge-paid' : 'badge-in-progress'}">${isPaid ? 'Paid' : 'In Progress'}</span>
          `
    }
    const use_universal_card = false; // Set to true to use the universal card layout
    if (use_universal_card) {
      return universal_ticket;
    } else {
      return { 'Waiting': waiting_ticket, 'In Progress': active_ticket, 'Checkout': checkout_ticket }[status] || universal_ticket;
    }
  } catch (error) {
    console.error(`Error rendering POS card for ticket ${ticket.ticketId}:`, error);
  } finally {
    gE()
  }
}

function renderWaitingArea() {
  console.groupCollapsed("Rendering Waiting Area");
  const container = document.getElementById('waitingCards');
  const waitingTickets = appState.tickets.filter(t => t.status === 'Waiting');

  container.innerHTML = waitingTickets.map(t => renderPosCard(t)).join('');
  gE()

}


function allowDrop(e) {
  e.preventDefault(); // Required to allow dropping!

  // Highlight the hovered chair slot
  const slot = e.currentTarget.closest('.chair-slot');
  if (slot && !slot.classList.contains('chair-unavailable')) {
    slot.classList.add('drag-hover');
  }
}

function handleDragLeave(e) {
  const slot = e.currentTarget.closest('.chair-slot');
  if (slot) {
    slot.classList.remove('drag-hover');
  }
}

async function handleDropToChair(e, chairId) {
  try {
    console.group(`Handling drop to chair ${chairId}`);

    e.preventDefault();

    // 1. Remove highlight CSS
    const slot = e.currentTarget.closest('.chair-slot');
    if (slot) slot.classList.remove('drag-hover');

    // 2. Prevent dropping into unavailable chairs
    const chair = appState.chairs.find(c => c.id === chairId);
    if (chair && chair.notAvailable) return;

    // 3. Get dropped ticket ID from dataTransfer
    const ticketId = e.dataTransfer.getData("text/plain");
    if (!ticketId) return;

    // 4. Update status via API & move card to this specific chair
    await moveTicketStatus(ticketId, 'In Progress', chairId, true, false, false);
  } catch (error) {
    console.error(`Error handling drop to chair ${chairId}:`, error);
  } finally {
    console.groupEnd();
    showToast('Chair Assignment Successful', 'Ticket has been assigned to a chair.', 'success');
  }
}

function renderActiveChairs() {
  console.group("Rendering Active Chairs");

  try {

    const container = document.getElementById('chairsGrid');
    if (!container) return;


    container.innerHTML = appState.chairs.map((chair, index) => {
      const occupiedTicket = appState.tickets.find(
        t => t.assignedChairId === chair.id && t.status === 'In Progress'
      );

      // Case A: Unavailable Chair
      if (chair.notAvailable) {
        return `
        <div class="chair-slot chair-unavailable" data-chair-id="${chair.id}">
          <div class="chair-header">
            <span class="chair-title">Chair #${index + 1}</span>
            <span class="chair-barber">${chair.barberName}</span>
          </div>
          <div class="chair-slot-body">
            <div class="empty-state-text">⛔ Out of Service</div>
          </div>
        </div>
      `;
      }

      // Case B: Vacant Chair
      if (!occupiedTicket) {
        return `
        <div class="chair-slot chair-vacant" 
             data-chair-id="${chair.id}"
             ondragover="allowDrop(event)"
             ondragleave="handleDragLeave(event)"
             ondrop="handleDropToChair(event, '${chair.id}')">
          <div class="chair-header">
            <span class="chair-title">Chair #${index + 1}</span>
            <span class="chair-barber">${chair.barberName}</span>
          </div>
          <div class="chair-slot-body">
            <div class="vacant-drop-zone" onclick="openWalkInForChair('${chair.id}')">
              <span class="plus-icon">+</span>
              <span>Seat Walk-In</span>
            </div>
          </div>
        </div>
      `;
      }

      // Case C: Occupied Chair
      return `
      <div class="chair-slot chair-occupied" 
           data-chair-id="${chair.id}"
           ondragover="allowDrop(event)"
           ondragleave="handleDragLeave(event)"
           ondrop="handleDropToChair(event, '${chair.id}')">
        <div class="chair-header">
          <span class="chair-title">Chair #${index + 1}</span>
          <span class="chair-barber">${chair.barberName}</span>
          <span class="badge badge-in-progress">Busy</span>
        </div>
        <div class="chair-slot-body">
          ${renderPosCard(occupiedTicket)}
        </div>
      </div>
    `;
    }).join('');
  } catch (error) {
    console.error("Error rendering active chairs:", error);
  } finally {
    gE()
  }
}

// function renderActiveChairsv3() {
//   const container = document.getElementById('chairsGrid');
//   if (!container) return;

//   container.innerHTML = appState.chairs.map((chair, index) => {
//     // 1. Find if a ticket is currently assigned to this chair
//     const occupiedTicket = appState.tickets.find(
//       t => t.assignedChairId === chair.id && t.status === 'In Progress'
//     );

//     // Case A: Chair is Marked Off/Unavailable
//     if (chair.notAvailable) {
//       return `
//         <div class="chair-slot chair-unavailable" data-chair-id="${chair.id}">
//           <div class="chair-header">
//             <span class="chair-title">Chair #${index + 1}</span>
//             <span class="chair-barber">${chair.barberName}</span>
//           </div>
//           <div class="chair-slot-body">
//             <div class="empty-state-text">⛔ Out of Service</div>
//           </div>
//         </div>
//       `;
//     }

//     // Case B: Chair is Vacant (Empty Drop Zone)
//     if (!occupiedTicket) {
//       return `
//         <div class="chair-slot chair-vacant" 
//              data-chair-id="${chair.id}"
//              ondragover="allowDrop(event)"
//              ondrop="handleDropToChair(event, '${chair.id}')">
//           <div class="chair-header">
//             <span class="chair-title">Chair #${index + 1}</span>
//             <span class="chair-barber">${chair.barberName}</span>
//           </div>
//           <div class="chair-slot-body">
//             <div class="vacant-drop-zone" onclick="openWalkInForChair('${chair.id}')">
//               <span class="plus-icon">+</span>
//               <span>Seat Walk-In</span>
//             </div>
//           </div>
//         </div>
//       `;
//     }

//     // Case C: Chair is Occupied (Inject your renderPosCard HTML inside the slot!)
//     return `
//       <div class="chair-slot chair-occupied" 
//            data-chair-id="${chair.id}"
//            ondragover="allowDrop(event)"
//            ondrop="handleDropToChair(event, '${chair.id}')">
//         <div class="chair-header">
//           <span class="chair-title">Chair #${index + 1}</span>
//           <span class="chair-barber">${chair.barberName}</span>
//           <span class="badge badge-in-progress">Busy</span>
//         </div>
//         <div class="chair-slot-body">
//           ${renderPosCard(occupiedTicket)}
//         </div>
//       </div>
//     `;
//   }).join('');


// }

// function renderActiveChairsv2() {
//   console.log("Rendering Active Chairs");
//   const container = document.getElementById('chairsGrid');

//   container.innerHTML = appState.chairs.map((chair, index) => {
//     const chairNum = index + 1;
//     const activeTicket = appState.tickets.find(t => t.status === 'In Progress' && t.assignedChairId === chair.id);

//     // 1. Not Available Chair
//     if (chair.notAvailable) {
//       return `
//         <div class="pos-card" style="opacity: 0.4; background-color: rgba(0,0,0,0.2); border: 1px dashed #64748b;">
//           <div class="chair-label" style="color:#94a3b8;">Chair #${chairNum} | ${chair.barberName}</div>
//           <div class="card-meta">Unavailable</div>
//         </div>`;
//     }

//     // 2. Vacant Chair Slot (Dashed Border)
//     if (!activeTicket) {
//       return `
//         <div class="pos-card vacant-slot" onclick="openWalkInForChair('${chair.id}')" data-chair-id="${chair.id}">
//           <div class="chair-label" style="color:#e8a228;">Chair #${chairNum} | ${chair.barberName}</div>
//           <div class="vacant-text">✨ Vacant - Click or Drag Here</div>
//         </div>`;
//     }

//     // 3. Occupied Chair Card (Solid White Card)



//     return renderPosCard(activeTicket);

//   }).join('');
//   gE()

// }

// function renderActiveChairsv1() {
//   const container = document.getElementById('chairsGrid');

//   container.innerHTML = appState.chairs.map((chair, index) => {
//     const chairNum = index + 1;
//     const activeTicket = appState.tickets.find(t => t.status === 'In Progress' && t.assignedChairId === chair.id);

//     if (chair.notAvailable) {
//       return `
//         <div class="pos-card" style="opacity: 0.6;">
//           <div class="chair-label">Chair #${chairNum} | ${chair.barberName}</div>
//           <div class="card-meta">Not Available</div>
//           <button class="btn-card-action" style="background:#cbd5e1;" disabled>Check-in</button>
//         </div>`;
//     }

//     if (!activeTicket) {
//       return `
//         <div class="pos-card">
//           <div class="chair-label">Chair #${chairNum} | ${chair.barberName}</div>
//           <div class="card-meta">Vacant</div>
//           <div class="customer-name">Choose Client ∨</div>
//           <button class="btn-card-action" onclick="openWalkInForChair('${chair.id}')">Choose Client ∨</button>
//         </div>`;
//     }

//     const total = computeFinalTotal(activeTicket);
//     return `
//       <div class="pos-card" draggable="true" data-id="${activeTicket.ticketId}">
//         <div class="chair-label">Chair #${chairNum} | ${activeTicket.assignedBarber}</div>
//         <span class="badge badge-in-progress">In Progress</span>
//         <div class="customer-name">${activeTicket.customer.name}</div>
//         <div class="service-name">${activeTicket.items.map(i => i.name).join(', ')}</div>
//         <button class="btn-card-action" onclick="moveTicketStatus('${activeTicket.ticketId}', 'Checkout')">
//           Check Out ➔
//         </button>
//       </div>`;
//   }).join('');
// }

function renderCheckout() {
  const container = document.getElementById('checkoutCards');
  const checkoutTickets = appState.tickets.filter(t => t.status === 'Checkout' || t.status === 'Paid');

  container.innerHTML = checkoutTickets.map(t => {

    return renderPosCard(t);
  }).join('');
}

// ==================== PRICE ADJUSTMENT ====================
function overridePricePrompt(ticketId) {
  const ticket = appState.tickets.find(t => t.ticketId === ticketId);
  const currentTotal = computeFinalTotal(ticket);

  const input = prompt("Enter new total price override (₱):", currentTotal);
  if (input !== null && !isNaN(input) && input.trim() !== '') {
    const reason = prompt("Enter reason for override:", "Owner Friend Discount");
    ticket.pricing.ticketOverride.isOverridden = true;
    ticket.pricing.ticketOverride.overrideTotal = parseFloat(input);
    ticket.pricing.ticketOverride.reason = reason;
    renderDashboard();
  }
}

// ==================== STATE ACTIONS ====================
function moveTicketStatusv1(ticketId, newStatus, chairId = null) {
  const ticket = appState.tickets.find(t => t.ticketId === ticketId);
  if (ticket) {
    ticket.status = newStatus;
    if (newStatus === 'In Progress') {
      ticket.assignedChairId = chairId || ticket.assignedChairId || 'chair-1';
    } else {
      ticket.assignedChairId = null;
    }
    renderDashboard();
  }
}

// function checkInBookneticv1(bookneticId) {
//   const itemIndex = appState.bookneticQueue.findIndex(b => b.ticketId === bookneticId);
//   if (itemIndex > -1) {
//     const item = appState.bookneticQueue.splice(itemIndex, 1)[0];
//     appState.tickets.push({
//       ticketId: `tkt-${Date.now()}`,
//       customer: { name: item.customerName },
//       ticketType: "Appointment",
//       status: "Waiting",
//       assignedChairId: null,
//       assignedBarber: "Joshua",
//       items: [{ id: "s1", name: item.service, originalPrice: 250, overridePrice: null, quantity: 1 }],
//       pricing: { ticketOverride: { isOverridden: false, overrideTotal: null, reason: null } },
//       waitingMins: 0
//     });
//     renderDashboard();
//   }
// }

// Helper function to build a standalone card DOM node
function createCardDOMNode(ticket) {
  console.group(`Creating Card DOM Node for Ticket: ${ticket.ticketId}`);

  try {

    const card = document.createElement('div');
    card.className = 'pos-card';
    card.draggable = true;
    card.dataset.id = ticket.ticketId;

    card.innerHTML = `
    <div class="card-title-row">
      <span class="customer-name">${ticket.customer.name}</span>
      <span class="badge badge-appointment">Booknetic</span>
    </div>
    <div class="card-meta">Barber: ${ticket.preferredBarber.name || ticket.preferredBarber}</div>
    <div class="service-name">${ticket.items.map(i => i.name).join(', ')}</div>
    <div class="card-meta">Time: ${ticket.bookingTime || 'Just now'}</div>
    <button class="btn-card-action" onclick="moveTicketStatus('${ticket.ticketId}', 'In Progress')">
      Assign to Chair ➔
    </button>
  `;

    return card;
  } catch (error) {
    console.error(`Error creating card DOM node for ticket ${ticket.ticketId}:`, error);
    console.log("Ticket Data:", ticket);
  } finally {
    gE()
  }
}

function checkInBooknetic(bookneticId) {
  console.group(`Checking in Booknetic Ticket: ${bookneticId}`);

  // 1. Locate item in queue without mutating state yet
  const itemIndex = appState.bookneticQueue.findIndex(b => b.ticketId === bookneticId);
  if (itemIndex === -1) {
    console.warn(`Booknetic ticket ${bookneticId} not found in queue.`);
    console.groupEnd();
    return;
  }

  const item = appState.bookneticQueue[itemIndex];

  // 2. Open confirmation modal for routing and barber choice
  openCheckInModal({
    item,
    onConfirm: (destination, selectedBarber) => {
      try {
        // Remove from Booknetic queue upon user confirmation
        appState.bookneticQueue.splice(itemIndex, 1);


        renderBookneticQueue();


        // Construct new ticket object
        const newTicketId = `tkt-${Date.now()}`;
        const newTicket = {
          ticketId: newTicketId,
          customer: {
            id: `cust-${Date.now().toString().slice(-4)}`,
            name: item.customerName,
            phone: item.phone || null,
            isVip: false
          },
          ticketType: "Booknetic-Sync",
          bookingTime: item.time || null,
          paymentPreference: item.paymentPreference || "Pay at Shop",
          status: destination === 'waiting' ? "Waiting" : "In-Service",
          assignedChairId: null,
          preferredBarber: selectedBarber,
          items: [
            {
              id: `srv-${Date.now()}`,
              name: item.service || "Quick Cut",
              type: "SERVICE",
              originalPrice: 250.00,
              overridePrice: null,
              overrideReason: null,
              quantity: 1
            }
          ],
          pricing: {
            calculatedSubtotal: 250.00,
            ticketOverride: {
              isOverridden: false,
              overrideTotal: null,
              reason: null,
              adjustedBy: null
            },
            finalTotal: 250.00
          },
          timestamps: {
            created: new Date().toISOString(),
            seated: destination === 'chair' ? new Date().toISOString() : null,
            movedToCheckout: null,
            paidAt: null,
            waitingDurationMinutes: 0
          }
        };

        // Sync with app state
        if (appState.ticketsMap) {
          appState.ticketsMap.set(newTicketId, newTicket);
        }
        appState.tickets.push(newTicket);

        // Handle animation & DOM insertion according to selected option
        const queueCard = document.querySelector(`.queue-card[data-bookneticId="${bookneticId}"]`);
        if (queueCard && typeof smoothTransitionOut === 'function') {
          smoothTransitionOut(queueCard);
        }

        if (destination === 'waiting') {
          const cardElement = createCardDOMNode(newTicket);
          const newContainer = document.getElementById('waitingCards');

          if (typeof smoothTransitionMove === 'function') {
            smoothTransitionMove(cardElement, newContainer);
          } else if (newContainer) {
            newContainer.appendChild(cardElement);
          }

          showToast('Booknetic', `Checked in <strong>${item.customerName}</strong> to <i>Waiting Area</i>`, 'success');
        } else {
          // Route directly to chair selection handler


          assignToChairFunc(newTicketId);

          showToast('Booknetic', `Routing <strong>${item.customerName}</strong> directly to chair`, 'info');
        }

      } catch (error) {
        console.error(`Error processing check-in for ticket ${bookneticId}:`, error);
        showToast('Error', 'Failed to check in ticket.', 'danger');
      } finally {
        console.groupEnd();
      }
    }
  });
}



/**
 * Dynamic Check-In Modal with Barber Selector
 */
function openCheckInModal({ item, onConfirm }) {

  console.log(`Opening Check-In Modal for Booknetic Ticket: ${item.ticketId}`);
  const availableBarbers = get_available_barbers() || []

  const preferredName = item.preferredBarber || "Joshua";

  // Build barber options with preferred selection
  const barberOptionsHTML = availableBarbers.map(barber => {
    const isSelected = barber.name.toLowerCase() === preferredName.toLowerCase() ? 'selected' : '';
    return `<option value="${barber.id}" ${isSelected}>${barber.name}</option>`;
  }).join('');

  // Create modal markup container
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h3>Check In: ${item.customerName}</h3>
        <button class="modal-close-btn">&times;</button>
      </div>
      <div class="modal-body">
        <p><strong>Service:</strong> ${item.service || 'Quick Cut'}</p>
        <p><strong>Scheduled Time:</strong> ${item.time || 'N/A'}</p>
        
        <div class="form-group" style="margin-top: 16px;">
          <label for="modalBarberSelect" style="display: block; font-weight: 600; margin-bottom: 6px;">
            Assigned Barber:
          </label>
          <select id="modalBarberSelect" class="form-control" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1;">
            ${barberOptionsHTML}
          </select>
        </div>
      </div>
      <div class="modal-actions" style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
        <button id="btnWaitingArea" class="btn btn-secondary" style="flex: 1;">
          🛋️ Waiting Area
        </button>
        <button id="btnDirectChair" class="btn btn-primary" style="flex: 1;">
          💈 Direct to Chair
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  // Event handlers
  const closeModal = () => modalOverlay.remove();

  modalOverlay.querySelector('.modal-close-btn').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  const getSelectedBarber = () => {
    const select = modalOverlay.querySelector('#modalBarberSelect');
    const selectedOpt = select.options[select.selectedIndex];
    // return {
    //   id: select.value,
    //   name: selectedOpt.text
    // };

    return selectedOpt.text
  };

  // Primary action buttons
  modalOverlay.querySelector('#btnWaitingArea').addEventListener('click', () => {
    const selectedBarber = getSelectedBarber();
    closeModal();
    onConfirm('waiting', selectedBarber);
  });

  modalOverlay.querySelector('#btnDirectChair').addEventListener('click', () => {
    const selectedBarber = getSelectedBarber();
    closeModal();
    onConfirm('chair', selectedBarber);
  });
}

function checkInBookneticv2(bookneticId) {
  let item = {}
  console.group(`Checking in Booknetic Ticket: ${bookneticId}`);

  // 1. Locate and remove item from Booknetic queue
  const itemIndex = appState.bookneticQueue.findIndex(b => b.ticketId === bookneticId);
  if (itemIndex === -1) return;

  item = appState.bookneticQueue.splice(itemIndex, 1)[0];

  // Create prompt that chooses between check in or straight to chair.
  try {

    console.group(`Checking in Booknetic Ticket to waiting area: ${bookneticId}`);
    // 2. Create the complete ticket object
    const newTicketId = `tkt-${Date.now()}`;
    const newTicket = {
      ticketId: newTicketId,
      customer: {
        id: `cust-${Date.now().toString().slice(-4)}`,
        name: item.customerName,
        phone: item.phone || null,
        isVip: false
      },
      ticketType: "Booknetic-Sync",
      bookingTime: item.time || null,
      paymentPreference: item.paymentPreference || "Pay at Shop",
      status: "Waiting",
      assignedChairId: null,
      preferredBarber: {
        id: "barber-01",
        name: item.preferredBarber || "Joshua"
      },
      items: [
        {
          id: `srv-${Date.now()}`,
          name: item.service || "Quick Cut",
          type: "SERVICE",
          originalPrice: 250.00,
          overridePrice: null,
          overrideReason: null,
          quantity: 1
        }
      ],
      pricing: {
        calculatedSubtotal: 250.00,
        ticketOverride: {
          isOverridden: false,
          overrideTotal: null,
          reason: null,
          adjustedBy: null
        },
        finalTotal: 250.00
      },
      timestamps: {
        created: new Date().toISOString(),
        seated: null,
        movedToCheckout: null,
        paidAt: null,
        waitingDurationMinutes: 0
      }
    };

    // 3. Update State (Map & Array)
    if (appState.ticketsMap) {
      appState.ticketsMap.set(newTicketId, newTicket);
    }
    appState.tickets.push(newTicket);

    // 4. Update the Booknetic Sidebar DOM
    // renderBookneticQueue();

    // 5. Create DOM element for the new ticket
    const cardElement = createCardDOMNode(newTicket);

    // 6. Find target container  
    let newContainer


    if (checkIntoWaitingArea) {
      newContainer = document.getElementById('waitingCards');

      // Pass cardElement directly to your smooth transition function
      // (Note: Do NOT append it beforehand!)
      const queueCard = document.querySelector(`.queue-card[data-bookneticId="${bookneticId}"]`);
      // console.log("Queue Card to Animate Out:", queueCard);
      smoothTransitionOut(queueCard); // Animate out if needed
      smoothTransitionMove(cardElement, newContainer);
    } else {
      assignToChairFunc(newTicketId);
    }



  } catch (error) {
    console.error(`Error checking in Booknetic ticket ${bookneticId}:`, error);
  } finally {
    gE()
    showToast('Booknetic', `Checked in <strong>${item.customerName}</strong> to <i>Waiting Area</i>`, 'success');
  }
}

function checkInBookneticToWaitingArea(bookneticId) {
  let item = {}
  console.group(`Checking in Booknetic Ticket: ${bookneticId}`);
  try {

    // 1. Locate and remove item from Booknetic queue
    const itemIndex = appState.bookneticQueue.findIndex(b => b.ticketId === bookneticId);
    if (itemIndex === -1) return;

    item = appState.bookneticQueue.splice(itemIndex, 1)[0];

    // 2. Create the complete ticket object
    const newTicketId = `tkt-${Date.now()}`;
    const newTicket = {
      ticketId: newTicketId,
      customer: {
        id: `cust-${Date.now().toString().slice(-4)}`,
        name: item.customerName,
        phone: item.phone || null,
        isVip: false
      },
      ticketType: "Booknetic-Sync",
      bookingTime: item.time || null,
      paymentPreference: item.paymentPreference || "Pay at Shop",
      status: "Waiting",
      assignedChairId: null,
      preferredBarber: {
        id: "barber-01",
        name: item.preferredBarber || "Joshua"
      },
      items: [
        {
          id: `srv-${Date.now()}`,
          name: item.service || "Quick Cut",
          type: "SERVICE",
          originalPrice: 250.00,
          overridePrice: null,
          overrideReason: null,
          quantity: 1
        }
      ],
      pricing: {
        calculatedSubtotal: 250.00,
        ticketOverride: {
          isOverridden: false,
          overrideTotal: null,
          reason: null,
          adjustedBy: null
        },
        finalTotal: 250.00
      },
      timestamps: {
        created: new Date().toISOString(),
        seated: null,
        movedToCheckout: null,
        paidAt: null,
        waitingDurationMinutes: 0
      }
    };

    // 3. Update State (Map & Array)
    if (appState.ticketsMap) {
      appState.ticketsMap.set(newTicketId, newTicket);
    }
    appState.tickets.push(newTicket);

    // 4. Update the Booknetic Sidebar DOM
    // renderBookneticQueue();

    // 5. Create DOM element for the new ticket
    const cardElement = createCardDOMNode(newTicket);

    // 6. Find target container (Waiting Area)
    const waitingContainer = document.getElementById('waitingCards');

    if (waitingContainer) {
      // Pass cardElement directly to your smooth transition function
      // (Note: Do NOT append it beforehand!)
      const queueCard = document.querySelector(`.queue-card[data-bookneticId="${bookneticId}"]`);
      // console.log("Queue Card to Animate Out:", queueCard);
      smoothTransitionOut(queueCard); // Animate out if needed
      smoothTransitionMove(cardElement, waitingContainer);
    }
  } catch (error) {
    console.error(`Error checking in Booknetic ticket ${bookneticId}:`, error);
  } finally {
    gE()
    showToast('Booknetic', `Checked in <strong>${item.customerName}</strong> to <i>Waiting Area</i>`, 'success');
  }
}

// ==================== DRAG & DROP LOGIC ====================
// function setupDragAndDropv1() {
//   const cards = document.querySelectorAll('.pos-card[draggable="true"]');
//   const columns = document.querySelectorAll('.kanban-column');

//   cards.forEach(card => {
//     card.addEventListener('dragstart', (e) => {
//       e.dataTransfer.setData('text/plain', card.dataset.id);
//       card.style.opacity = '0.5';
//     });

//     card.addEventListener('dragend', () => {
//       card.style.opacity = '1';
//     });
//   });

//   columns.forEach(col => {
//     col.addEventListener('dragover', (e) => {
//       e.preventDefault();
//       col.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
//     });

//     col.addEventListener('dragleave', () => {
//       col.style.backgroundColor = '';
//     });

//     col.addEventListener('drop', (e) => {
//       e.preventDefault();
//       col.style.backgroundColor = '';
//       const ticketId = e.dataTransfer.getData('text/plain');
//       const targetStatus = col.dataset.status;

//       if (ticketId && targetStatus) {
//         let assignedChair = null;
//         if (targetStatus === 'In Progress') {
//           const openChair = appState.chairs.find(c => c.isAvailable && !c.notAvailable);
//           assignedChair = openChair ? openChair.id : 'chair-1';
//         }
//         moveTicketStatus(ticketId, targetStatus, assignedChair);
//       }
//     });
//   });
// }

// ==================== UPDATED DRAG & DROP WITH ANIMATIONS ====================
function setupDragAndDrop() {
  console.group("Setting up Drag & Drop with Animations");

  try {

    const cards = document.querySelectorAll('.pos-card[draggable="true"]');
    const columns = document.querySelectorAll('.kanban-column');

    cards.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.dataset.id);
        // Add dragging animation class
        card.classList.add('is-dragging');
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('is-dragging');
      });
    });

    columns.forEach(col => {
      console.log("Setting up drop events for column:", col.dataset.status, "with ID:", col.id);
      if (col.id != 'colActiveChairs') {

        col.addEventListener('dragover', (e) => {
          e.preventDefault();
          col.classList.add('drag-over');
        });

        col.addEventListener('dragleave', () => {
          col.classList.remove('drag-over');
        });

        col.addEventListener('drop', (e) => {
          e.preventDefault();
          console.log("Drop event triggered on column:", col.dataset.status);
          col.classList.remove('drag-over');

          const ticketId = e.dataTransfer.getData('text/plain');
          const targetStatus = col.dataset.status;
          const ticket = appState.tickets.find(t => t.ticketId === ticketId);

          if (ticketId && targetStatus) {
            let assignedChair = null;


            if (targetStatus == ticket.status) {
              return; // No status change, exit early
            }


            if (targetStatus === 'In Progress') {
              console.log("Finding available chair for ticket:", ticketId);
              console.log('Preferred barber is:',)
              const openChair = appState.chairs.find(c => c.isAvailable && !c.notAvailable);
              assignedChair = openChair ? openChair.id : 'chair-1';
              console.log("Assigned Chair for ticket:", ticketId, "is", assignedChair);
            }

            // Pass ticketId to moveTicketStatus with animation flag
            moveTicketStatus(ticketId, targetStatus, assignedChair, true);
          }
        });
      } else {
        console.log("Skipping drag & drop setup for Active Chairs column:", col.id);
      }
    });
  } catch (error) {
    console.error("Error setting up Drag & Drop:", error);
  } finally {
    gE()
  }
}

// // ==================== UPDATED TICKET MOVER WITH DROP ANIMATION ====================
// function moveTicketStatusv2(ticketId, newStatus, chairId = null, shouldAnimate = false) {

//   console.group(`Moving Ticket: ${ticketId} to Status: ${newStatus}`);

//   try {

//     const ticket = appState.tickets.find(t => t.ticketId === ticketId);
//     if (ticket) {
//       ticket.status = newStatus;
//       if (newStatus === 'In Progress') {
//         ticket.assignedChairId = chairId || ticket.assignedChairId || 'chair-1';
//       } else {
//         ticket.assignedChairId = null;
//       }

//       renderDashboard();

//       // Apply drop animation to the newly moved card
//       if (shouldAnimate) {
//         const movedCard = document.querySelector(`.pos-card[data-id="${ticketId}"]`);
//         if (movedCard) {
//           movedCard.classList.add('animate-drop');
//         }
//       }
//     }
//   } catch (error) {
//     console.error(`Error moving ticket ${ticketId}:`, error);
//   } finally {
//     gE()
//   }
// }


// // ==================== SURGICAL DOM UPDATE (NO RE-RENDER) ====================
// function moveTicketStatusv3(ticketId, newStatus, chairId = null) {
//   console.group(`Moving Ticket: ${ticketId} to Status: ${newStatus}`);
//   try {

//     // 1. Update underlying state
//     const ticket = appState.tickets.find(t => t.ticketId === ticketId);
//     if (!ticket) return;

//     ticket.status = newStatus;
//     ticket.assignedChairId = (newStatus === 'In Progress') ? (chairId || 'chair-1') : null;

//     // 2. Locate the existing card DOM element
//     const cardElement = document.querySelector(`.pos-card[data-id="${ticketId}"]`);
//     if (!cardElement) {
//       // Fallback if card isn't on DOM yet
//       renderDashboard();
//       return;
//     }

//     // 3. Find the target column container
//     let targetContainer;
//     if (newStatus === 'Waiting') {
//       targetContainer = document.getElementById('waitingCards');
//     } else if (newStatus === 'In Progress') {
//       targetContainer = document.getElementById('chairsGrid');
//     } else if (newStatus === 'Checkout' || newStatus === 'Paid') {
//       targetContainer = document.getElementById('checkoutCards');
//     }

//     // 4. Smoothly move the card node into the new container WITHOUT re-rendering the rest
//     // if (targetContainer) {
//     //   targetContainer.appendChild(cardElement);

//     //   // 5. Trigger smooth CSS drop animation on just this card
//     //   cardElement.classList.add('animate-drop');
//     //   setTimeout(() => cardElement.classList.remove('animate-drop'), 300);

//     //   // 6. Update inner text/badge on the moved card if needed (e.g. Paid status)
//     //   updateCardBadgeAndButtons(cardElement, ticket);
//     // }

//     if (targetContainer) {
//       smoothTransitionMove(cardElement, targetContainer)
//     }
//   } catch (error) {
//     console.error(`Error moving ticket ${ticketId}:`, error);
//   } finally {
//     gE()
//   }
// }

// ==================== SURGICAL DOM UPDATE (NO RE-RENDER) ====================
// async function moveTicketStatusv4(ticketId, newStatus, chairId = null, runAnimation = true) {
//   console.group(`Moving Ticket: ${ticketId} to Status: ${newStatus}`);
//   try {
//     // 1. Update underlying state (Map & Array)
//     const ticket = appState.ticketsMap 
//       ? appState.ticketsMap.get(ticketId) 
//       : appState.tickets.find(t => t.ticketId === ticketId);

//     if (!ticket) return;

//     const previousChairId = ticket.assignedChairId; // Track previous chair if leaving one

//     // Update ticket state
//     ticket.status = newStatus;
//     ticket.assignedChairId = (newStatus === 'In Progress') ? (chairId || 'chair-1') : null;

//     // Optional: Call REST API to update backend database
//     /*
//     await fetch(`/api/tickets/${ticketId}/status`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status: newStatus, assignedChairId: ticket.assignedChairId })
//     });
//     */

//     // 2. Locate the existing card DOM element
//     let cardElement = document.querySelector(`.pos-card[data-id="${ticketId}"]`);

//     // If card element doesn't exist on DOM yet, build it using renderPosCard
//     if (!cardElement) {
//       const cardHtml = renderPosCard(ticket);
//       const tempDiv = document.createElement('div');
//       tempDiv.innerHTML = cardHtml.trim();
//       cardElement = tempDiv.firstElementChild;
//     } else {
//       // Re-render inner HTML of the card so badge/buttons update for the new status
//       const updatedCardHtml = renderPosCard(ticket);
//       const tempDiv = document.createElement('div');
//       tempDiv.innerHTML = updatedCardHtml.trim();
//       if (tempDiv.firstElementChild) {
//         cardElement.innerHTML = tempDiv.firstElementChild.innerHTML;
//         cardElement.className = tempDiv.firstElementChild.className;
//       }
//     }

//     // 3. Resolve the exact target container
//     let targetContainer;

//     if (newStatus === 'Waiting') {
//       targetContainer = document.getElementById('waitingCards');
//     } else if (newStatus === 'In Progress') {
//       // 🎯 TARGET SPECIFIC CHAIR SLOT BODY!
//       const targetChairSlot = document.querySelector(`.chair-slot[data-chair-id="${ticket.assignedChairId}"]`);
//       if (targetChairSlot) {
//         // Clear out the "+ Seat Walk-In" vacant placeholder inside the slot body
//         const slotBody = targetChairSlot.querySelector('.chair-slot-body');
//         if (slotBody) {
//           slotBody.innerHTML = ''; 
//           targetContainer = slotBody;
//         }
//         // Mark slot visually as occupied
//         targetChairSlot.classList.remove('chair-vacant');
//         targetChairSlot.classList.add('chair-occupied');
//       }
//     } else if (newStatus === 'Checkout' || newStatus === 'Paid') {
//       targetContainer = document.getElementById('checkoutCards');
//     }

//     // 4. If ticket was moved AWAY from a chair, reset that previous chair slot to Vacant
//     if (previousChairId && previousChairId !== ticket.assignedChairId) {
//       resetChairSlotToVacant(previousChairId);
//     }

//     // 5. Move card into target container with animation
//     if (targetContainer) {
//       if (runAnimation) {
//         smoothTransitionMove(cardElement, targetContainer);
//       } else {
//         targetContainer.appendChild(cardElement);
//       }
//     }
//   } catch (error) {
//     console.error(`Error moving ticket ${ticketId}:`, error);
//   } finally {
//     console.groupEnd();
//   }
// }
// ==================== SURGICAL DOM UPDATE WITH OCCUPANCY CHECK ====================
async function moveTicketStatus(ticketId, newStatus, chairId = null, runAnimation = true, forceAssign = false, toast = true) {
  console.group(`Moving Ticket: ${ticketId} to Status: ${newStatus}`);
  try {
    const ticket = appState.ticketsMap
      ? appState.ticketsMap.get(ticketId)
      : appState.tickets.find(t => t.ticketId === ticketId);

    if (!ticket) return;
    console.log('Previous ticket state:', ticket.status);

    let activeTicketInChair
    let confirmed

    // ----------------------------------------------------
    // 🔍 STEP 0: CHECK BARBER / CHAIR OCCUPANCY
    // ----------------------------------------------------
    console.log(`Checking occupancy for ticket ${ticketId} moving to ${newStatus}...`);
    if (newStatus === 'In Progress' && !forceAssign) {
      const targetChairId = chairId || ticket.assignedChairId || 'chair-1';

      // Find if another ticket is ALREADY in progress at this chair
      activeTicketInChair = appState.tickets.find(
        t => t.assignedChairId === targetChairId &&
          t.status === 'In Progress' &&
          t.ticketId !== ticketId
      );

      console.log(`Active ticket in chair ${targetChairId}:`, activeTicketInChair);
      if (activeTicketInChair) {

        const chairObj = appState.chairs?.find(c => c.id === targetChairId);
        const barberName = chairObj?.barberName || ticket.assignedBarber || 'This barber';
        const currentClient = activeTicketInChair.customer?.name || 'another client';

        // Prompt the user for confirmation
        confirmed = await showParallelServicePrompt({
          barberName,
          currentClient,
          newClient: ticket.customer?.name || 'New Client',
          chairId: targetChairId
        });

        // User canceled -> abort status move completely
        if (!confirmed) {
          console.log(`Parallel servicing canceled for ticket ${ticketId}.`);
          return;
        }
      }
    }

    const previousChairId = ticket.assignedChairId;

    // 1. Update underlying state
    ticket.status = newStatus;
    ticket.assignedChairId = (newStatus === 'In Progress') ? (chairId || ticket.assignedChairId || 'chair-1') : null;

    // 2. Locate or create card element
    let cardElement = document.querySelector(`.pos-card[data-id="${ticketId}"]`);
    console.log(`Card element for ticket ${ticketId}:`, cardElement);

    if (!cardElement) {
      console.log(`Card element not found for ticket ${ticketId}, creating new DOM node...`);
      const cardHtml = renderPosCard(ticket);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cardHtml.trim();
      cardElement = tempDiv.firstElementChild;
    } else {
      const updatedCardHtml = renderPosCard(ticket);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = updatedCardHtml.trim();
      if (tempDiv.firstElementChild) {
        cardElement.innerHTML = tempDiv.firstElementChild.innerHTML;
        cardElement.className = tempDiv.firstElementChild.className;
      }
    }

    // 3. Resolve target container
    let targetContainer;
    console.group(`Determining target container for ticket ${ticketId} moving to ${newStatus}...`);
    if (newStatus === 'Waiting') {
      targetContainer = document.getElementById('waitingCards');
    } else if (newStatus === 'In Progress') {
      const targetChairSlot = document.querySelector(`.chair-slot[data-chair-id="${ticket.assignedChairId}"]`);
      if (targetChairSlot) {
        const slotBody = targetChairSlot.querySelector('.chair-slot-body');
        if (slotBody) {
          // If empty state exists, remove it. (For parallel service, we append alongside existing cards)
          const emptyZone = slotBody.querySelector('.vacant-drop-zone');
          if (emptyZone) emptyZone.remove();

          targetContainer = slotBody;
        }
        targetChairSlot.classList.remove('chair-vacant');
        targetChairSlot.classList.add('chair-occupied');
      }
    } else if (newStatus === 'Checkout' || newStatus === 'Paid') {
      targetContainer = document.getElementById('checkoutCards');
    }
    gE()

    // 4. Reset previous chair if it became completely empty
    if (previousChairId && previousChairId !== ticket.assignedChairId) {
      console.log('Emptying previous chair slot:', previousChairId);
      checkAndResetChairSlot(previousChairId);
    }

    // 5. Move card node
    if (targetContainer) {
      console.log(`Moving card for ticket ${ticketId} into target container:`, targetContainer);
      if (runAnimation) {
        smoothTransitionMove(cardElement, targetContainer);
      } else {
        targetContainer.appendChild(cardElement);
      }
    }


    // if (toast) {
    //   showToast(`Ticket ${ticketId} moved to ${newStatus}`, 'Success', 'success');
    // }
  } catch (error) {
    const title = `Error moving ticket ${ticketId}:`
    console.error(title, error);
    // When user approves parallel servicing:
    showToast(title, error.message, 'warning');
  } finally {
    console.groupEnd();
  }
}

// Check if any tickets remain in the chair before resetting to vacant
function checkAndResetChairSlot(chairId) {
  const remainingTickets = appState.tickets.filter(
    t => t.assignedChairId === chairId && t.status === 'In Progress'
  );

  if (remainingTickets.length === 0) {
    resetChairSlotToVacant(chairId);
  }
}



// Helper to revert a chair slot back to "+ Seat Walk-In" vacant state
function resetChairSlotToVacant(chairId) {
  const chairSlot = document.querySelector(`.chair-slot[data-chair-id="${chairId}"]`);
  if (!chairSlot) return;

  const slotBody = chairSlot.querySelector('.chair-slot-body');
  if (slotBody) {
    slotBody.innerHTML = `
      <div class="vacant-drop-zone" onclick="openWalkInForChair('${chairId}')">
        <span class="plus-icon">+</span>
        <span>Seat Walk-In</span>
      </div>
    `;
  }
  chairSlot.classList.remove('chair-occupied');
  chairSlot.classList.add('chair-vacant');
}
// Helper to update badges/buttons on the moved DOM node
function updateCardBadgeAndButtons(cardElement, ticket) {
  console.group(`Updating card for ticket ${ticket.ticketId}`);
  const badge = cardElement.querySelector('.badge');
  if (badge) {
    if (ticket.status === 'Paid') {
      badge.className = 'badge badge-paid';
      badge.textContent = 'Paid';
    } else if (ticket.status === 'In Progress') {
      badge.className = 'badge badge-in-progress';
      badge.textContent = 'In Progress';
    }
  }
  gE()
}
// ==================== MODAL HANDLERS ====================
document.addEventListener('DOMContentLoaded', () => {
  renderDashboard();

  const modal = document.getElementById('walkInModal');
  const btnWalkIn = document.getElementById('btnWalkIn');
  const btnClose = document.getElementById('closeWalkIn');
  const btnConfirm = document.getElementById('btnConfirmWalkIn');
  const segmentBtns = document.querySelectorAll('.segment-btn');
  const chairGroup = document.getElementById('chairSelectGroup');
  const chairDropdown = document.getElementById('walkInChairSelect');

  let selectedPlacement = 'WAITING';

  // Open / Close Modal
  btnWalkIn.addEventListener('click', () => {
    populateChairDropdown();
    modal.classList.remove('hidden');
  });

  btnClose.addEventListener('click', () => modal.classList.add('hidden'));

  // Segmented Control Switcher
  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segmentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPlacement = btn.dataset.value;

      if (selectedPlacement === 'CHAIR') {
        chairGroup.classList.remove('hidden');
      } else {
        chairGroup.classList.add('hidden');
      }
    });
  });

  function populateChairDropdown() {
    console.group("Populating Chair Dropdown");
    chairDropdown.innerHTML = appState.chairs
      .filter(c => !c.notAvailable)
      .map((c, i) => `<option value="${c.id}">Chair #${i + 1} - ${c.barberName} ${c.isAvailable ? '(Vacant)' : '(Busy)'}</option>`)
      .join('');
    gE()
  }

  // Confirm Walk-in Creation
  btnConfirm.addEventListener('click', () => {
    const nameInput = document.getElementById('walkInName').value.trim();
    const serviceSelect = document.getElementById('walkInService');
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];

    if (!nameInput) {
      alert("Please enter customer name.");
      return;
    }

    const newTicket = {
      ticketId: `tkt-${Date.now()}`,
      customer: { name: nameInput },
      ticketType: "Walk-in",
      status: selectedPlacement === 'CHAIR' ? 'In Progress' : 'Waiting',
      assignedChairId: selectedPlacement === 'CHAIR' ? chairDropdown.value : null,
      preferredBarber: "Joshua",
      items: [{
        id: "srv-walkin",
        name: selectedOption.value,
        originalPrice: parseFloat(selectedOption.dataset.price),
        overridePrice: null,
        quantity: 1
      }],
      pricing: { ticketOverride: { isOverridden: false, overrideTotal: null, reason: null } },
      waitingMins: 0
    };

    appState.tickets.push(newTicket);
    document.getElementById('walkInName').value = '';
    modal.classList.add('hidden');
    renderDashboard();
  });
});

// ==================== CARD METADATA INSPECTOR (CTRL + CLICK) ====================
document.addEventListener('DOMContentLoaded', () => {
  const metaModal = document.getElementById('metaModal');
  const closeMetaBtn = document.getElementById('closeMetaModal');
  const jsonViewer = document.getElementById('metaJsonViewer');
  const metaTicketId = document.getElementById('metaTicketId');
  const btnCopyMeta = document.getElementById('btnCopyMeta');

  // Close modal handler
  if (closeMetaBtn) {
    closeMetaBtn.addEventListener('click', () => {
      metaModal.classList.add('hidden');
    });
  }

  // Copy JSON handler
  if (btnCopyMeta) {
    btnCopyMeta.addEventListener('click', () => {
      navigator.clipboard.writeText(jsonViewer.textContent);
      btnCopyMeta.textContent = 'Copied! ✓';
      setTimeout(() => { btnCopyMeta.textContent = 'Copy JSON'; }, 1500);
    });
  }

  // Delegation: Listen for Ctrl + Click on any POS Card across the document
  document.addEventListener('click', (e) => {
    // Check if Ctrl key (or Cmd key on macOS) is held down
    if (e.ctrlKey || e.metaKey) {
      const card = e.target.closest('.pos-card');
      if (card && card.dataset.id) {
        e.preventDefault();
        e.stopPropagation();

        const ticketId = card.dataset.id;

        // Retrieve ticket object from Map or Array
        const ticketObj = appState.ticketsMap
          ? appState.ticketsMap.get(ticketId)
          : appState.tickets.find(t => t.ticketId === ticketId);

        if (ticketObj) {
          metaTicketId.textContent = ticketId;
          // Pretty-print JSON with 2-space indentation
          jsonViewer.textContent = JSON.stringify(ticketObj, null, 2);
          metaModal.classList.remove('hidden');
        }
      }
    }
  }, true); // Use capture phase to catch event early
});

// ==================== ASSIGN TO CHAIR / WALK-IN MODAL LOGIC ====================
async function assignToChairFunc(ticketId = null) {
  if (!ticketId) {
    showToast('Error', 'No ticket ID provided for chair assignment.', 'error');
    return
  };

  try {


    const ticket = appState.ticketsMap
      ? appState.ticketsMap.get(ticketId)
      : appState.tickets.find(t => t.ticketId === ticketId);

    console.group(`Processing chair assignment for Ticket ${ticketId}:`, ticket);


    if (!ticket) {
      console.error(`Ticket ${ticketId} not found.`);
      return;
    }


    // 1. Check if a barber is pre-assigned or preferred
    const targetBarber = ticket.assignedBarber || ticket.preferredBarber;

    let matchedChairId = null;

    console.log('targetBarber:', targetBarber)

    if (targetBarber) {
      // Look up the chair belonging to this barber in appState
      const barberChair = appState.chairs?.find(
        c => c.barberName && c.barberName.toLowerCase() === targetBarber.toLowerCase()
      );

      if (barberChair) {
        matchedChairId = barberChair.id;
      }
    }

    // 2. If we found a matching chair for the barber, move ticket directly!
    if (matchedChairId) {
      console.log(`Auto-assigning Ticket ${ticketId} to Barber "${targetBarber}" at Chair ${matchedChairId}`);

      // Note: moveTicketStatus will trigger the parallel servicing check automatically if occupied
      await moveTicketStatus(ticketId, 'In Progress', matchedChairId, true, false, false);
    } else {
      // 3. Fallback: No barber set or chair not found -> open selection modal
      console.log(`No specific chair pre-resolved for Ticket ${ticketId}. Opening modal.`);
      assignToChairModal(ticket.assignedChairId, ticketId);
    }

    // showToast('Assignment Successful', `<strong>${ticket.customer.name}</strong> has been assigned to a chair <i>${matchedChairId || 'Unknown'}</i>.`, 'success');
  } catch (error) {
    console.error('Error occurred while assigning ticket to chair:', error);
  } finally {
    console.groupEnd();
  }
}

// Alias function so either function name works smoothly without errors
function assignToChairModal(chairId, ticketId = null) {
  try {
    console.group(`Opening Assign to Chair Modal for Chair: ${chairId}, Ticket: ${ticketId || 'New Walk-In'}`);
    openWalkInForChair(chairId, ticketId);
  } catch (error) {
    console.error('Error occurred while opening Assign to Chair Modal:', error);
  } finally {
    console.groupEnd();

  }
}

function openWalkInForChair(chairId, ticketId = null) {

  console.group(`Opening Walk-In / Assign Modal for Chair: ${chairId}, Ticket: ${ticketId || 'New Walk-In'}`);
  try {
    const modal = document.getElementById('walkInModal') || document.getElementById('assignChairModal');
    if (!modal) {
      console.warn("Modal container not found in DOM");
      return;
    }

    // Find the chair state
    const chair = appState.chairs.find(c => c.id === chairId);
    const chairName = chair ? chair.barberName : `Chair ${chairId}`;

    // Set modal data context
    modal.dataset.targetChairId = chairId;
    modal.dataset.targetTicketId = ticketId || '';

    // Update UI headers if present
    const modalTitle = modal.querySelector('.modal-title') || modal.querySelector('h3');
    if (modalTitle) {
      modalTitle.textContent = ticketId
        ? `Assign Ticket to ${chairName}`
        : `New Walk-In for ${chairName}`;
    }

    // If assigning an existing waiting ticket, pre-fill customer name
    const nameInput = document.getElementById('walkInCustomerName');
    if (nameInput) {
      if (ticketId) {
        const ticket = appState.ticketsMap
          ? appState.ticketsMap.get(ticketId)
          : appState.tickets.find(t => t.ticketId === ticketId);
        nameInput.value = ticket ? ticket.customer.name : '';
      } else {
        nameInput.value = ''; // Reset for fresh walk-in
      }
    }

    // Display modal
    modal.classList.remove('hidden');
  } catch (error) {
    console.error('Error occurred while opening Walk-In / Assign Modal:', error);
  } finally {
    gE()
  }
}

// Function to close the modal
function closeWalkInModal() {
  const modal = document.getElementById('walkInModal') || document.getElementById('assignChairModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Function called when submitting the modal form
function submitWalkInToChair(event) {
  console.group("Submitting Walk-In / Assign to Chair");
  try {

    if (event) event.preventDefault();

    const modal = document.getElementById('walkInModal') || document.getElementById('assignChairModal');
    if (!modal) return;

    const chairId = modal.dataset.targetChairId;
    const ticketId = modal.dataset.targetTicketId;
    const nameInput = document.getElementById('walkInCustomerName');
    const serviceSelect = document.getElementById('walkInServiceSelect');

    const customerName = nameInput ? nameInput.value.trim() : 'Walk-In Customer';
    const serviceName = serviceSelect ? serviceSelect.value : 'Quick Cut';

    let ticket;

    if (ticketId) {
      // Case A: Moving an existing waiting ticket to In Progress
      ticket = appState.ticketsMap
        ? appState.ticketsMap.get(ticketId)
        : appState.tickets.find(t => t.ticketId === ticketId);

      if (ticket) {
        ticket.status = 'In Progress';
        ticket.assignedChairId = chairId;
      }
    } else {
      // Case B: Creating a fresh Walk-In ticket directly into the chair
      const newTicketId = `tkt-${Date.now()}`;
      ticket = {
        ticketId: newTicketId,
        customer: { id: `cust-${Date.now().toString().slice(-4)}`, name: customerName || 'Walk-In Customer' },
        ticketType: "Walk-in",
        status: "In Progress",
        assignedChairId: chairId,
        preferredBarber: { id: "barber-01", name: "Joshua" },
        items: [{ id: `srv-${Date.now()}`, name: serviceName, type: "SERVICE", originalPrice: 250.00, overridePrice: null, quantity: 1 }],
        pricing: { calculatedSubtotal: 250.00, ticketOverride: { isOverridden: false, overrideTotal: null }, finalTotal: 250.00 },
        timestamps: { created: new Date().toISOString(), seated: new Date().toISOString() }
      };

      if (appState.ticketsMap) appState.ticketsMap.set(newTicketId, ticket);
      appState.tickets.push(ticket);
    }

    closeWalkInModal();

    // Re-render chairs grid so the solid card replaces the vacant dashed slot
    renderActiveChairs();
  } catch (error) {
    console.error("Error occurred while submitting Walk-In / Assign to Chair:", error);
  } finally {
    console.groupEnd();
    showToast('Walk-In / Assignment Successful', 'Customer has been seated.', 'success');
  }
}


function showParallelServicePrompt({ barberName, currentClient, newClient }) {
  return new Promise((resolve) => {
    // Create modal element
    const modalDiv = document.createElement('div');
    modalDiv.className = 'custom-modal-overlay';
    modalDiv.innerHTML = `
      <div class="custom-modal-content">
        <div class="modal-icon">⚠️</div>
        <h3>Barber Currently Occupied</h3>
        <p>
          <strong>${barberName}</strong> is actively servicing <strong>${currentClient}</strong>.
          <br><br>
          Are you sure you want to assign <strong>${newClient}</strong> for parallel servicing?
        </p>
        <div class="modal-actions">
          <button class="btn-cancel" id="cancelParallelBtn">Cancel</button>
          <button class="btn-confirm-parallel" id="confirmParallelBtn">Allow Parallel Service</button>
        </div>
      </div>
    `;

    document.body.appendChild(modalDiv);

    // Event listeners
    modalDiv.querySelector('#confirmParallelBtn').addEventListener('click', () => {
      document.body.removeChild(modalDiv);
      resolve(true);
    });

    modalDiv.querySelector('#cancelParallelBtn').addEventListener('click', () => {
      document.body.removeChild(modalDiv);
      resolve(false);
    });
  });
}