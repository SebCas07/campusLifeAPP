// homePageJS.js = logic for the Home Dashboard page. 
// THis file handles: 
// 1)Hamburger/ side drawer (open and close)
// 2) logout button
// 3) Eventbrite API -fetches today's campus events and 
//    renders them in both the main feed and the sidebar

// SECURITY NOTE: 
// No API tokens live in this file. THe browser calls Netlify
// function at /.netlify/functions/events, which holds 
// the Eventbrite token securely as a server environment var. 
// In this production this pattern scales to any backend framework 
//(Node.js/Express, Python/Flask, etc.)

// DOM ELEMENTS
const hamburgerBtn = document.getElementById('hamburger-btn'); 
const sideDrawer = document.getElementById('side-drawer'); 
const drawerBackdrop = document.getElementById('drawer-backdrop'); 
const drawerCloseBtn = document.getElementById('drawer-close-btn'); 
const userOptionsBtn = document.getElementById('user-options-btn'); 
const logoutBtn = document.getElementById('logout-btn'); 
const drawerUsername = document.getElementById('drawer-username');
const eventsList = document.getElementById('events-list'); 
const eventsLoading = document.getElementById('event-loading'); 
const eventsEmpty = document.getElementById('events-empty'); 
const sidebarEvents = document.getElementById('sidebar-events'); 

// ON PAGE LOAD
document.addEventListener('DOMContentLoaded', function() { 

    // Show the username saved during login
    const savedUser = sessionStorage.getItem('campusUser'); 
    if(savedUser && drawerUsername){
        drawerUsername.textContent = savedUser; 
    }

    // Start of API call 
    fetchCampusEvents(); 
});

// DRAWER FUNCTIONS
function openDrawer()  {
    sideDrawer.classList.add('open'); 
    drawerBackdrop.classList.remove('visible'); 
    sideDrawer.setAttribute('aria-hidden', 'true'); 
    hamburgerBtn.setAttribute('aria-expanded', 'false'); 

}

function closeDrawer (){ 
    sideDrawer.classList.remove('open'); 
    drawerBackdrop.classList.remove('visible'); 
    sideDrawer.setAttribute('aria-hidden', 'true'); 
    hamburgerBtn.setAttribute('aria-expanded', 'false'); 

}

hamburgerBtn.addEventListener('click', openDrawer);
userOptionsBtn.addEventListener('click', openDrawer); 
drawerCloseBtn.addEventListener('click', closeDrawer); 
drawerBackdrop.addEventListener('click', closeDrawer); 

// Close on Escape key 
document.addEventListener('keydown', function(e) { 
    if(e.key ==='Escape') closeDrawer(); 

});

// LOGOUT
logoutBtn.addEventListener('click', function (){ 
    sessionStorage.removeItem('campusUser'); 
    window.location.href = '../loginPage/loginPage_campusLifeAPP.html';

});

// EVENTS API
    // call Netlify function instead of Eventbrite direclty. 

    // On Netlify(deployed): /.netlify/functions/events
    // On localhost (testing): http://localhost:8888/.netlify/functions/events

    // TO test locally you need the Netlify CLI: 
    // npm install -g netlify-cli
    // netlify dev (run this in project root)
    // This spins up a local sever tha runs the function 

async function fetchCampusEvents(){ 
    
    // window.location.hostname shows where the page is running. 
    //If it's localhost, we use the local netlify dev server URL.
    // If it's deployed, use the relative path which Netlify handles. 

    const isLocal = window.location.hostname === 'localhost'; 
    const functionUrl = isLocal
     ?'http://localhost:8888/.netlify/functions/events'
     :'/.netlify/functions/events'; 

    try{ 
        const response = await fetch(functionUrl); 

        if(!response.ok){ 
            throw new Error('Function error: ${response.status}'); 

        }

        const data = await response.json(); 
        const events = data.events || []; 
        
        eventsLoading.classList.add('d-none'); 
        
        if(events.length === 0) { 
            eventsEmpty.classList.remove('d-none'); 
            sidebarEvents.innerHTML = '<small class = "text-muted">No events today.</small>'; 
            return; 
        }

        renderEvents(events); 
        renderSidebar(events); 

     } catch(error){ 
        console.error('Failed to load events:', error); 
        eventsLoading.classList.add('d-none'); 
        eventsEmpty.textContent='Could not load events right now.  Please try again later.'; 
        eventsEmpty.classList.remove('d-none'); 
        sidebarEvents.innerHTML = '<small class="text-muted">Events unavailable.</small>'; 

     }
}

// RENDER FUNCTIONS
function renderEvents(events) { 
    const html = events.map(function (event) {
        const name = event.name?.text || 'Unnamed Event'; 
        const url = event.url || '#'; 
        const venue = event.venue?.name || 'On Campus'; 
        const time = event.start?.local? formatTime(event.start.local): 'Time TBD' ;

        return `
            <a href="${url}" class="event-item" target="_blank" rel="noopener noreferrer" 
            aria-label="${name} at ${venue}, ${time}">
            <div class="event-item-name">${name}</div>
            <div class="event-item-meta">${time} &bull; ${venue}</div>
            </a>`;            
            


        
    }).join('');

    eventsList.innerHTML = html; 
}

function renderSidebar(events){ 
    const html = events.slice(0, 5).map(function(event){ 
        const name = event.name?.text || 'Unnamed Event'
        const time = event.start?.local ? formatTime(event.start.local): 'TBD'; 

        return `
            <div class="sidebar-event">
            <span class="sidebar-event-name">${name}</span>
            <span class="sidebar-event-time">${time}</span>
            </div>
            `;
    }).join(``);

    sidebarEvents.innerHTML = html; 
}

// HELPER FUNCTIONS
function formatTime(isoString){ 
    const date = new Date(isoString); 
    return date.toLocaleTimeString('en-US',  {
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true
    });
}