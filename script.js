// HTML all elements
let logOutBtn = document.getElementById('logOutRegisterBtn');
let logInBtn = document.getElementById('loginRegisterBtn');
let dashBoardBtn = document.getElementById('Dashboard-view');
let dashBoard = document.getElementById('userDashBoard');

// Hide the dashboard and logout button initially
dashBoardBtn.style.display = 'none';
dashBoard.style.display = 'none';


// Function to fetch and display dynamic cards
// This function fetches product data from an API and displays it in a grid of cards
async function dynamicCards() {
    let apiFetch = await fetch("https://dummyjson.com/products")
    let apiData = await apiFetch.json()
    let { products } = apiData
    let cardsBox = document.getElementById("dynamic-cards");
    console.log(apiData);

    products.map((product) => {
        let { title, description, availabilityStatus, category, shippingInformation, price, rating, thumbnail, brand } = product
        cardsBox.innerHTML += `  <div class="ad-box">
                    <div class="img-box">
                        <img src="${thumbnail}" alt="">
                    </div>
                    <div class="ad-content">
                        <h3>$ ${price}</h3>
                        <p>${title}</p>
                        <div class="address">
                            <p>${shippingInformation}</p>
                            <p>2 days ago</p>
                        </div>
                    </div>
                </div>`
    })
}
dynamicCards();


// Initialize an empty array to store user data
// This array will hold user objects created during registration
let users = [];

// Person class to create user objects
class Person {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

// Function to show the login/register form
function showForm() {
    document.getElementById('popupForm').style.display = 'flex';
}

// Function to close the login/register form
function closeForm() {
    document.getElementById('popupForm').style.display = 'none';
}

// Function to toggle between login and register forms
// This function switches the visibility of the login and register forms based on the type parameter
function toggleForm(type) {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('registerTab').classList.remove('active');

    if (type === 'login') {
        document.getElementById('loginForm').classList.add('active');
        document.getElementById('loginTab').classList.add('active');
    } else {
        document.getElementById('registerForm').classList.add('active');
        document.getElementById('registerTab').classList.add('active');
    }
}

// Function to handle user login
// This function checks the entered credentials against stored user data and logs the user in if valid
function loginUser(event) {
    event.preventDefault(); // Prevent form submission
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');

    // login logic here
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let savedUser = users.find((element) => element.email === email.value);

    if (savedUser?.email === email.value && savedUser?.password === password.value) {
        localStorage.setItem('currentUser', JSON.stringify(savedUser));
        alert(`Welcome back, ${savedUser.name}!`);
        closeForm();
        logInBtn.style.display = 'none';
        dashBoardBtn.style.display = 'block';
    } else {
        alert("Invalid credentials. Please try again.");

    }

}

// Function to handle user registration
// This function creates a new user object and saves it to local storage if the email is not already registered
function registerUser(event) {
    event.preventDefault(); // Prevent form submission
    const userName = document.getElementById('registerName');
    const email = document.getElementById('registerEmail');
    const password = document.getElementById('registerPassword');

    // registration logic here
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let savedUser = users.find((element) => element.email === email.value);

    if (savedUser?.email === email.value) {
        alert("Credentials already registered");
        toggleForm('login');
    } else {
        let newUser = new Person(userName.value, email.value, password.value);
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        userName.value = '';
        email.value = '';
        password.value = '';

        toggleForm('login');
    }
}

// Event listener for the logOut button
// This listener handles the logout functionality by hiding the dashboard, showing the login button, and clearing the current user from local storage
logOutBtn.addEventListener('click', () => {
    dashBoardBtn.style.display = 'none';
    logInBtn.style.display = 'block';
    localStorage.removeItem('currentUser');
    closeForm();
    alert('You have been logged out.');

    dashBoard.style.display = 'none';

    // Reset form view
    toggleForm('login'); // Show login tab
    document.getElementById('toggleBtn').style.display = 'flex';
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
});


// Function for the dashboard button
// This function retrieves the current user from local storage and displays their information in the dashboard
function showUserDashboard() {
    let savedUser = JSON.parse(localStorage.getItem('currentUser'));

    // Always hide forms
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('toggleBtn').style.display = 'none';

    if (savedUser) {
        dashBoard.style.display = 'block';
        document.getElementById('userDashBoardName').innerText = `Name: ${savedUser.name}`;
        document.getElementById('userDashBoardEmail').innerText = `Email: ${savedUser.email}`;
    } else {
        dashBoard.style.display = 'none';
    }

    document.getElementById('popupForm').style.display = 'flex'; // Always show popup
}

