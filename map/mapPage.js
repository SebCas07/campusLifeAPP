// mapPage.js 

// building data 
    // The array below is the source for all buldings.
    // both the map markers and the sidebar cards are working 
    // because of this 
    
    const buildings = [{ 
        id: `old-main`, 
        name: `Old Main`, 
        category: `academic`, 
        lat: 41.97445, 
        lng: -87.71210,
        address: '3225 W Foster Ave',
        description: 'The oldest building on campus, built in 1894. Home to the Admissions Office.',
        contact: '(773) 244-5500',
        hours: 'Mon-Fri 8:30am - 4:30pm'
    }, { 
        id: `johnson-center`, 
        name: 'The Johnson Center',
        category: 'academic',
        lat: 41.97380,
        lng: -87.71280,
        address: '3225 W Foster Ave',
        description: 'State-of-the-art science building with 30 labs, smart classrooms, and 1891 Bread Co.',
        contact: '(773) 244-6200',
        hours: 'Mon-Fri 7:00am - 10:00pm'    
    }, {
        id:`brandel-library`, 
        name: 'Brandel Library',
        category: 'services',
        lat: 41.97350,
        lng: -87.71190,
        address: 'Christiana Ave, South of Foster',
        description: 'Main university library. Home to computer labs, the Writing Center, and study rooms.',
        contact: '(773) 244-5580',
        hours: 'Mon-Thu 8:00am - 11:00pm, Fri 8:00am - 6:00pm'
    }, {
        id: 'nyvall-hall',
        name: 'Nyvall Hall',
        category: 'academic',
        lat: 41.97310,
        lng: -87.71250,
        address: 'North Park Campus',
        description: 'Built in 1947. Home of North Park Theological Seminary, with Isaacson Chapel and Olsson Lounge.',
        contact: '(773) 244-6200',
        hours: 'Mon-Fri 8:00am - 5:00pm'
    }, { 
        id: 'magnuson-center',
        name: 'Magnuson Campus Center',
        category: 'student-life',
        lat: 41.97400,
        lng: -87.71160,
        address: 'North Park Campus',
        description: 'Student hub with the dining hall upstairs and a vending lounge downstairs.',
        contact: '(773) 244-6200',
        hours: 'Mon-Fri 7:30am - 9:00pm, Sat-Sun 10:00am - 7:00pm'
    }, {
        id: 'student-services',
        name: 'Student Services',
        category: 'services',
        lat: 41.97430,
        lng: -87.71230,
        address: 'North Park Campus',
        description: 'One-stop shop for academic advising, financial aid, and registration support.',
        contact: '(773) 244-5500',
        hours: 'Mon-Fri 8:30am - 4:30pm'
    }, {
        id: 'financial-aid',
        name: 'Financial Aid',
        category: 'services',
        lat: 41.97460,
        lng: -87.71200,
        address: 'North Park Campus',
        description: 'Assistance with scholarships, grants, loans, and financial planning.',
        contact: '(773) 244-5506',
        hours: 'Mon-Fri 8:30am - 4:30pm'
    },{
        id: 'registrar',
        name: "Registrar's Office",
        category: 'services',
        lat: 41.97420,
        lng: -87.71170,
        address: 'North Park Campus',
        description: 'Register for courses, apply for graduation, update your address, and manage billing.',
        contact: '(773) 244-5510',
        hours: 'Mon-Fri 8:30am - 4:30pm'
    }, {
        id: 'health-center',
        name: 'Health and Wellness',
        category: 'services',
        lat: 41.97360,
        lng: -87.71220,
        address: 'North Park Campus',
        description: 'Medical care, mental health counseling, and wellness resources for students.',
        contact: '(773) 244-5570',
        hours: 'Mon-Fri 9:00am - 5:00pm'
    }, {
        id: 'campus-security',
        name: 'Campus Security',
        category: 'services',
        lat: 41.97390,
        lng: -87.71300,
        address: 'North Park Campus',
        description: '24/7 campus safety and security services.',
        contact: '(773) 244-5245',
        hours: 'Open 24 hours'
    }

    ];

// Category colors
    // each category gets its own marker color on the map.
    // these hex colors are used by leaflet's divIcon. 

    const categoryColors = { 
        'academic':     '#1a3a5c',   
        'services':     '#15803d',   
        'student-life': '#b45309'    
    }

// Map state
    // Storing the maps instance and all marker references here
    // so the filter and sidebar click functions can access them 

    let map; 
    // array of {building, marker, card} objects
    let markers = [];
    let activeFilter = `all`; 

// initialize on page load 
    document.addEventListener(`DOMContentLoaded`, function(){
        // show username from sessions
        const savedUser = sessionStorage.getItem(`campusUser`); 
        if(savedUser){ 
            document.getElementById(`drawer-username`).textContent = savedUser; 

        }

        initMap(); 
        buildSidebar(); 
        setupFilters(); 
        setupDrawer(); 
        setupLogout(); 

    });

// initializing leaflet map 

    function initMap() { 
        // L.map() creates the map inside the #map div. 
        // setView([lat, lng], zoom) centers adn zooms the map.
        map = L.map(`map`).setView([41.97400, -87.71220], 17);

        //L.titleLayer() loads the map tiles from OpenStreetMap.
        L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
            maxZoom: 19
        }).addTo(map); 
        
        // adds a marker for every building in our array 
        buildings.forEach(function(building){
            addMarker(building); 
        }); 
    }

// Adding a single marker 
    function addMarker(building){ 
        const color = categoryColors[building.category] || `#1a3a5c`;

        // L.divIcon() creates a custom HTML marker instead
        // of the default Leaflet blue pin.
    const icon = L.divIcon({
        //clear Leaflet's default class 
        className: '',   
        html: `
            <div style="
                width: 16px;
                height: 16px;
                background: ${color};
                border: 2.5px solid #fff;
                border-radius: 50%;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            "></div>
        `,
        iconSize: [16, 16],
        // center of the circle
        iconAnchor: [8, 8],
        // popup appears above the marker 
        popupAnchor: [0, -12]    
    });
 
    const marker = L.marker([building.lat, building.lng], { icon })
        .addTo(map)
        .bindPopup(buildPopupHTML(building), {
            maxWidth: 240,
            className: 'campus-popup'
        });
 
    // Store marker reference so we can show/hide it during filtering
    markers.push({ building, marker });
 
    // Clicking a marker also highlights its card in the sidebar
    marker.on('click', function () {
        highlightCard(building.id);
    });
}
 
 
//  BUILD POPUP HTML
    // Returns the HTML string for a building's popup.
    // Template literals make this clean and readable.
    
    function buildPopupHTML(building) {
        const badgeClass = `badge-${building.category}`;
        return `
            <div class="popup-header">
                <p class="popup-building-name">${building.name}</p>
                <span class="popup-category">${formatCategory(building.category)}</span>
            </div>
            <div class="popup-body">
                <div class="popup-detail"><strong>About</strong>${building.description}</div>
                <div class="popup-detail"><strong>Hours</strong>${building.hours}</div>
                <div class="popup-detail"><strong>Phone</strong>${building.contact}</div>
            </div>
        `;
    }
 
 
// Building sidebar
    // Builds the building card list in the sidebar from the
    // same buildings array used for map markers.
    // Single source of truth - update the array, both update.

    function buildSidebar() {
        const container = document.getElementById('building-cards');
    
        const html = buildings.map(function (building) {
            const badgeClass = `badge-${building.category}`;
            return `
                <div class="building-card"
                    data-id="${building.id}"
                    data-category="${building.category}"
                    onclick="flyToBuilding('${building.id}')"
                    role="button"
                    tabindex="0"
                    aria-label="View ${building.name} on map">
                    <span class="building-badge ${badgeClass}">${formatCategory(building.category)}</span>
                    <div class="building-card-name">${building.name}</div>
                    <div class="building-card-meta">${building.address}</div>
                </div>
            `;
        }).join('');
    
        container.innerHTML = html;
    
        // Allow keyboard users to activate cards with Enter key
        container.querySelectorAll('.building-card').forEach(function (card) {
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') flyToBuilding(card.dataset.id);
            });
        });
    }
    
    
// fly to building
    // Called when a sidebar card is clicked.
    // Smoothly pans the map to the building and opens its popup.

    function flyToBuilding(buildingId) {
        const match = markers.find(m => m.building.id === buildingId);
        if (!match) return;
    
        // flyTo() smoothly animates the map to the new position.
        // panTo() would also work but flyTo looks more polished.
        map.flyTo([match.building.lat, match.building.lng], 18, {
            animate: true,
            // seconds
            duration: 0.8   
        });
    
        // Open the popup after the animation completes
        setTimeout(function () {
            match.marker.openPopup();
        }, 850);
    
        highlightCard(buildingId);
    }
    
    
// Highlight side bar

    function highlightCard(buildingId) {
        // Remove active class from all cards
        document.querySelectorAll('.building-card').forEach(function (card) {
            card.classList.remove('active');
        });
    
        // Add active class to the matching card
        const activeCard = document.querySelector(`.building-card[data-id="${buildingId}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
            // Scroll the sidebar to show the active card
            activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
 
 
// filter buttons
    function setupFilters() {
        document.querySelectorAll('.filter-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
    
                // Update active filter button styling
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
    
                activeFilter = btn.dataset.filter;
                applyFilter();
            });
        });
    }
    
    function applyFilter() {
        markers.forEach(function ({ building, marker }) {
            const show = activeFilter === 'all' || building.category === activeFilter;
    
            if (show) {
                // Show marker
                marker.addTo(map);   
            } else {
                // hide marker
                marker.remove(); 
            }
        });
    
        // Also show/hide sidebar cards to match
        document.querySelectorAll('.building-card').forEach(function (card) {
            const show = activeFilter === 'all' || card.dataset.category === activeFilter;
            card.style.display = show ? 'block' : 'none';
        });
    }
 
 
// Drawer and logout
    // These are identical to home.js — same navbar, same behavior.

    function setupDrawer() {
        const hamburgerBtn   = document.getElementById('hamburger-btn');
        const sideDrawer     = document.getElementById('side-drawer');
        const drawerBackdrop = document.getElementById('drawer-backdrop');
        const drawerCloseBtn = document.getElementById('drawer-close-btn');
        const userOptionsBtn = document.getElementById('user-options-btn');
    
        function openDrawer() {
            sideDrawer.classList.add('open');
            drawerBackdrop.classList.add('visible');
            sideDrawer.setAttribute('aria-hidden', 'false');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
        }
    
        function closeDrawer() {
            sideDrawer.classList.remove('open');
            drawerBackdrop.classList.remove('visible');
            sideDrawer.setAttribute('aria-hidden', 'true');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    
        hamburgerBtn.addEventListener('click', openDrawer);
        userOptionsBtn.addEventListener('click', openDrawer);
        drawerCloseBtn.addEventListener('click', closeDrawer);
        drawerBackdrop.addEventListener('click', closeDrawer);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
    }
    
    function setupLogout() {
        document.getElementById('logout-btn').addEventListener('click', function () {
            sessionStorage.removeItem('campusUser');
            window.location.href = '../login/index.html';
        });
    }
 
 
// Helper
    function formatCategory(cat) {
        const labels = {
            'academic':     'Academic',
            'services':     'Services',
            'student-life': 'Student Life'
        };
        return labels[cat] || cat;
    }
 

    
