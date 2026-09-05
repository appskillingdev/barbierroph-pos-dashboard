console.group('Initializing Tusar Application');
const initStartTime = performance.now();


const appState = {
    chairs: [],
    bookneticQueue: [],
    tickets: []
};

if (window.test_script) {
    console.log('Test script detected. Using mock data for appState.');
    appState.chairs = mockUpData.chairs;
    appState.bookneticQueue = mockUpData.bookneticQueue;
    appState.tickets = mockUpData.tickets;
}
console.log('App state initialized:', appState);

const initEndTime = performance.now();
console.log(`Initialization completed in ${(initEndTime - initStartTime).toFixed(2)} ms`);
gE()
