// loginPageJS.js - logic for the Login page only
// With seperate pages, navigation is simple: 
// window.location.href = "../home/homePage.html"
// This tells the browser to load a new page - no show/hide needed

const continueBtn = document.getElemenetById('continue-btn'); 
const usernameInput = document.getElementById('username'); 
const passwordInput = document.getElementById('password'); 
const errorMsg = document.getElementById('login-error'); 

// LOGIN HANDLER
function handleLogin() { 
    // NOTE: .value gets the content of an HTML element
    //       .trim() removes the "whitespace" charecters from both the beginning and end of the string 
    const username = usernameInput.value.trim(); 
    const password = passwordInput.value.trim(); 

    // double checks if user filled both username and password fields
    // IF NOT filled it returns and error message
    if (!username || !password) { 
        errorMsg.classList.remove('d-none'); 
        return; 
    }

    errorMsg.classList.add('d-none'); 
}
