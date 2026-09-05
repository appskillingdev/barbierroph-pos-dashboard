function openServiceSelectionModal() {
  const serviceModal = document.getElementById('servicesModal');
  serviceModal.classList.remove('hidden');
  
  // Focus search input immediately for barcode scanner / keyboard entry
  setTimeout(() => {
    document.getElementById('searchInput')?.focus();
  }, 100);
}

function confirmServiceSelectionToTicket(selectedItems) {
  // 1. Pass selected services back to the active ticket in appState
  appState.activeTicket.items.push(...selectedItems);
  
  // 2. Re-render Ticket Modal UI
  renderTicketModalItems();
  
  // 3. Close ONLY the Service Selection Modal
  document.getElementById('servicesModal').classList.add('hidden');
}