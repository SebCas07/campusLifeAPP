//  support.js 

// Department data 
    // Each department object contains everything needed to render
    // its card. To add a new departmnet you have to add a new object, 
    // to this array 

    // categories must watch the data-filter values on the filter buttons in the html: 

    const departments = [ 
    {
        id: 'student-services',
        name: 'Student Services',
        category: 'academics',
        description: 'Your one-stop shop for academic advising, registration support, and general student assistance.',
        phone: '(773) 244-5500',
        email: 'studentservices@northpark.edu',
        hours: 'Mon–Fri 8:30am – 4:30pm',
        location: 'Old Main, 1st Floor',
        tags: ['Academic Advising', 'Registration', 'General Help']
    }, {
        id: 'financial-aid',
        name: 'Financial Aid',
        category: 'finance',
        description: 'Assistance with scholarships, grants, loans, work-study programs, and financial planning.',
        phone: '(773) 244-5506',
        email: 'finaid@northpark.edu',
        hours: 'Mon–Fri 8:30am – 4:30pm',
        location: 'Old Main, 2nd Floor',
        tags: ['Scholarships', 'Grants', 'Loans', 'Work-Study']
    }, {
        id: 'registrar',
        name: "Registrar's Office",
        category: 'academics',
        description: 'Register for courses, apply for graduation, manage transcripts, and update personal information.',
        phone: '(773) 244-5510',
        email: 'registrar@northpark.edu',
        hours: 'Mon–Fri 8:30am – 4:30pm',
        location: 'Old Main, 1st Floor',
        tags: ['Course Registration', 'Transcripts', 'Graduation']
    }, {
        id: 'health-wellness',
        name: 'Health and Wellness',
        category: 'health',
        description: 'Medical care, mental health counseling, and wellness resources to support your whole self.',
        phone: '(773) 244-5570',
        email: 'health@northpark.edu',
        hours: 'Mon–Fri 9:00am – 5:00pm',
        location: 'Brandel Library, Lower Level',
        tags: ['Medical Care', 'Counseling', 'Wellness']
    },  {
        id: 'campus-security',
        name: 'Campus Security',
        category: 'campus-life',
        description: '24/7 campus safety services including emergency response, lost and found, and parking.',
        phone: '(773) 244-5245',
        email: 'security@northpark.edu',
        hours: 'Open 24 Hours',
        location: 'Campus Security Office',
        tags: ['Emergency', 'Safety', 'Parking', 'Lost & Found']
    }, {
        id: 'it-helpdesk',
        name: 'IT Help Desk',
        category: 'tech',
        description: 'Technical support for student accounts, campus Wi-Fi, software, and classroom technology.',
        phone: '(773) 244-5535',
        email: 'helpdesk@northpark.edu',
        hours: 'Mon–Fri 8:00am – 6:00pm',
        location: 'Brandel Library, 1st Floor',
        tags: ['Wi-Fi', 'Accounts', 'Software', 'Equipment']
    }, {
        id: 'residence-life',
        name: 'Residence Life',
        category: 'campus-life',
        description: 'Housing assignments, roommate concerns, residential programming, and community standards.',
        phone: '(773) 244-5520',
        email: 'reslife@northpark.edu',
        hours: 'Mon–Fri 9:00am – 5:00pm',
        location: 'Magnuson Campus Center, 1st Floor',
        tags: ['Housing', 'Roommates', 'Community']
    }, {
        id: 'career-development',
        name: 'Career Development',
        category: 'academics',
        description: 'Resume reviews, internship connections, career counseling, and job search resources.',
        phone: '(773) 244-5560',
        email: 'careers@northpark.edu',
        hours: 'Mon–Fri 9:00am – 5:00pm',
        location: 'Johnson Center, 2nd Floor',
        tags: ['Resumes', 'Internships', 'Job Search']
    }, {
        id: 'multicultural',
        name: 'Multicultural Student Affairs',
        category: 'campus-life',
        description: 'Support and programming for diverse student communities, cultural celebrations, and identity resources.',
        phone: '(773) 244-5580',
        email: 'multicultural@northpark.edu',
        hours: 'Mon–Fri 9:00am – 5:00pm',
        location: 'Magnuson Campus Center, 2nd Floor',
        tags: ['Diversity', 'Inclusion', 'Cultural Events']
    }
    ]; 

// Category accent colors
    // each category gets a unique color for the top stripe on its card.
    // matches the filte rbutton categories 

    const categoryColors = { 
    'academics':    '#1a3a5c',   
    'finance':      '#15803d',   
    'health':       '#be123c',   
    'campus-life':  '#b45309',  
    'tech':         '#6d28d9'    
    }

// state 
    let activeFilter = `all` ;
    let searchQuery = ``; 

// On page load
    document.addEventListener(`DOMContentLoaded`, function() { 
        // show username from sessionStorage
        const savedUser = sessionStorage.getItem(`campusUser`); 
        if (savedUser) { 
            document.getElementById(`drawer-username`).textContent = savedUser; 

        }

        // building the initial cards with all departments 
        renderCards(); 
        setupFilters(); 
        setupSearch(); 
        setupDrawer(); 
        setupLogout(); 

    }); 

// render cards 
    // filters the departments array based on the active categoy 
    // filter and the search query, then builds html cards for each 
    // matching departmnet and injects them into the grid

    function renderCards() { 
        const grid      = document.getElementById('dept-grid');
        const noResults = document.getElementById('no-results');
        
            // filter by category 
        let filtered = departments.filter(function (dept) {
            const matchesCategory = activeFilter === 'all' || dept.category === activeFilter;
    
            // Filter by search by checking name, description, and tags
            const query = searchQuery.toLowerCase();
            const matchesSearch = !query
                || dept.name.toLowerCase().includes(query)
                || dept.description.toLowerCase().includes(query)
                || dept.tags.some(tag => tag.toLowerCase().includes(query));
    
            return matchesCategory && matchesSearch;
        });
    
        // Show empty state if nothing matches
        if (filtered.length === 0) {
            grid.innerHTML = '';
            noResults.classList.remove('d-none');
            return;
        }
    
        noResults.classList.add('d-none');

        // Each card gets col-12 col-md-6 col-lg-4 so:
        // - Mobile: 1 column
        // - Tablet: 2 columns
        // - Desktop: 3 columns
        
        grid.innerHTML = filtered.map(function (dept) {
            const accentColor = categoryColors[dept.category] || '#1a3a5c';
            const tagsHTML    = dept.tags.map(tag => `<span class="dept-tag">${tag}</span>`).join('');
    
            return `
                <div class="col-12 col-md-6 col-lg-4"
                    data-category="${dept.category}"
                    data-id="${dept.id}">
    
                    <article class="dept-card" aria-label="${dept.name} department information">
    
                        <!-- Colored accent bar at the top of the card -->
                        <div class="dept-card-accent" style="background: ${accentColor};"></div>
    
                        <div class="dept-card-body">
                            <h2 class="dept-card-name">${dept.name}</h2>
                            <p class="dept-card-desc">${dept.description}</p>
    
                            <!-- Contact details -->
                            <ul class="dept-contact-list">
                                <li class="dept-contact-item">
                                    <span class="dept-contact-label">Phone</span>
                                    <!--
                                        tel: links let mobile users tap to call directly.
                                        This is an accessibility and UX win.
                                    -->
                                    <a href="tel:${dept.phone}" class="dept-contact-link">${dept.phone}</a>
                                </li>
                                <li class="dept-contact-item">
                                    <span class="dept-contact-label">Email</span>
                                    <a href="mailto:${dept.email}" class="dept-contact-link">${dept.email}</a>
                                </li>
                                <li class="dept-contact-item">
                                    <span class="dept-contact-label">Hours</span>
                                    <span>${dept.hours}</span>
                                </li>
                                <li class="dept-contact-item">
                                    <span class="dept-contact-label">Where</span>
                                    <span>${dept.location}</span>
                                </li>
                            </ul>
    
                            <!-- "How we can help" tags -->
                            <div class="dept-tags" aria-label="Services offered">
                                ${tagsHTML}
                            </div>
                        </div>
    
                    </article>
                </div>
            `;
        }).join('');
    }

// filter buttons

    function setupFilters(){ 
        document.querySelectorAll('.filter-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
    
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
    
                activeFilter = btn.dataset.filter;
                renderCards();
            });
        });   
    }

// live search 
    // the input event fires on every keystroke
    // it updates the searchQuery and re-render on each one.
    // this gives instant filtering as the user types

    function setupSearch() {
        document.getElementById('dept-search').addEventListener('input', function () {
            searchQuery = this.value.trim();
            renderCards();
        });
    }

// drawer and logout
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