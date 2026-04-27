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