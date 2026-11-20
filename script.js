"use strict";

// SLIDING MOBILE NAVIGATION - Created with AI assistance for mobile optimization

// Variables
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileNav = document.getElementById("mobileNav");
const navLinks = mobileNav.querySelectorAll("a");
const themeToggle = document.querySelector("li img");

function setMenuState(isOpen) {
    mobileNav.classList.toggle("is-open", isOpen);
    mobileNav.setAttribute("aria-hidden", String(!isOpen));
    openBtn.setAttribute("aria-expanded", String(isOpen));

    // Lock page scroll while the menu is open
    document.body.style.overflow = isOpen ? "hidden" : "";
}

openBtn.addEventListener("click", () => setMenuState(true));
closeBtn.addEventListener("click", () => setMenuState(false));

// Close the menu when a link inside it is clicked
navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
});

// Close the menu when the theme toggle is clicked
themeToggle.addEventListener("click", () => setMenuState(false));

// Close the menu when pressing the Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileNav.classList.contains("is-open")) {
        setMenuState(false);
    }
});



// SCROLL INDICATOR - Created with AI assistance

const scrollIndicator = document.querySelector(".scroll-indicator");

function toggleScrollIndicator() {
    if (!scrollIndicator) return;
    const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    scrollIndicator.classList.toggle("is-hidden", scrollPos > 10);
}

window.addEventListener("scroll", toggleScrollIndicator, { passive: true });
document.body.addEventListener("scroll", toggleScrollIndicator, { passive: true });
toggleScrollIndicator();



// POPUP BOX FOR GUESSING GAME

// Variables
const gif = document.querySelector(".floating-widget");
const popupOverlay = document.getElementById("popupOverlay");
const popupCloseBtn = document.getElementById("closePopup");
const popupForm = document.getElementById("popupForm");
const guessInput = document.getElementById("guess");
const popupHeader = document.querySelector("#popup h2");
const popupMsg = document.querySelector("#popup p");

const DEFAULT_HEADER = "You've got a chance to win free bread!";
const DEFAULT_MSG = "If you guess the number we're thinking of, you get a FREE loaf of bread! Try your luck by entering an integer between 1 and 9 inclusive.";

// Changes the popup text
function setPopupText(header, message, isHTML = false) {
    popupHeader.textContent = header;
    popupMsg[isHTML ? "innerHTML" : "textContent"] = message;
}

// Changes the popup depending on game results
function handleGuess(event) {
    event.preventDefault();

    const userGuess = Number(guessInput.value.trim());
    const answer = Math.floor(Math.random() * 9) + 1;

    // Checks to make sure entered guess is a positive integeter between 1 and 9 and adjusts text accordingly
    if (!Number.isInteger(userGuess) || userGuess < 1 || userGuess > 9) {
        setPopupText("Invalid entry", "Please enter an integer between 1 and 9.");
        return;
    }

    // Checks if entered guess matches the answer and adjusts text accordingly
    if (userGuess !== answer) {
        setPopupText("So close!", `You entered: ${userGuess}<br>Answer: ${answer}`, true);
        return;
    }

    // Displays celebratory text if entered guess matches answer
    setPopupText(
        "You won!",
        "Take a screenshot of this popup and bring it to our farmers market stand or upload on an order form to receive a free loaf of bread! Discount applies to the lowest price item."
    );
}

// Closes the popup and resets the popup content
function closePopup() {
    setPopupText(DEFAULT_HEADER, DEFAULT_MSG);
    popupForm.reset();
    popupOverlay.classList.remove("active");
}

// Opens the popup
gif.addEventListener("click", () => popupOverlay.classList.add("active"));

// Runs the game and adjusts popup according to results
popupForm.addEventListener("submit", handleGuess);

// Closes the popup when the "X" button is clicked
popupCloseBtn.addEventListener("click", closePopup);

// Closes the popup when the user clicks outside the popup
popupOverlay.addEventListener("click", (event) => {
    if (event.target === popupOverlay) {
        closePopup();
    }
});

// Closes the popup when the user hits the Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closePopup();
    }
});



// PRODUCT DISPLAY

// Product Object Map
const products = {
    loaf: {
        img: "assets/Sourdough_Loaf.png",
        alt: "Sourdough bread",
        name: "Sourdough Loaf",
        price: "$6.00",
        description: "Keeping it simple! Made with just three ingredients, this organic sourdough loaf is our best-seller. Pair it with fresh butter or homemade preserves for a light breakfast or snack, or add a thick slice to bolster any soup.",
        ingredients: "Organic bread flour, Water, Sea salt"
    },
    baguette: {
        img: "assets/Sourdough_Baguettes.png",
        alt: "Sourdough baguettes",
        name: "Sourdough Baguette",
        price: "$6.00",
        description: "Keeping it simple! Made with just three ingredients, this organic sourdough baguette is perfect with soups and pastas.",
        ingredients: "Organic bread flour, Water, Sea salt"
    },
    pretzel: {
        img: "assets/Pretzel_Rolls.png",
        alt: "Pretzel rolls",
        name: "Pretzel Rolls",
        price: "$10.00",
        description: "Soft, chewy, and delicious ~ These pretzel bites are the perfect snack. Pair with cheese dip or enjoy plain. Contact us for special party orders.",
        ingredients: "Organic all-purpose flour, Organic unsalted butter, Water, Organic brown sugar, Yeast, Sea salt, Sea salt flakes (for topping)"
    },
    dessert: {
        img: "assets/Dessert_Bread.png",
        alt: "Dessert bread",
        name: "Dessert Bread",
        price: "$8.00",
        description: "Looking for something sweet? Our famous dessert bread is nice and dense, packed with chocolate chips and roasted pecans to cut through the sweetness. Nut-free version available upon request.",
        ingredients: "Organic all-purpose flour, Organic unsweetened cocoa powder, Organic dark brown sugar, Organic granulated cane sugar, Organic plain Greek yogurt, Organic canola oil, Organic cage-free eggs, Organic pecans, Organic semisweet chocolate chips, Baking powder, Baking soda, Organic vanilla extract, Sea salt"
    }
};

//Variables
const productImg = document.querySelector("#display img");
const productName = document.querySelector("#display h3");
const productPrice = document.querySelector("#display .price");
const productDes = document.querySelector("#display .description");
const productIngr = document.querySelector("#display .ingredients");
const productTiles = document.querySelectorAll(".productSwitch");
const productTileContainer = document.querySelector("#products ul");

// Function to change product when a tile is clicked
function updateProduct(productKey) {
    const item = products[productKey];
    if (!item) return;

    productImg.src = item.img;
    productImg.alt = item.alt;
    productName.textContent = item.name;
    productPrice.textContent = item.price;
    productDes.innerHTML = `${item.description}`;
    productIngr.textContent = item.ingredients;
}

// Automatically generate productSwitch tiles from the products object
function renderProductTiles() {
    productTileContainer.innerHTML = "";

    Object.entries(products).forEach(([key, item]) => {
        const tile = document.createElement("li");
        tile.id = key;
        tile.classList.add("productSwitch");
        tile.textContent = item.name;

        tile.addEventListener("click", () => {
            updateProduct(key);
        });

        productTileContainer.appendChild(tile);
    });
}

// Initialize the tiles on page load
renderProductTiles();



// FORM VALIDATION

//Variables
const phoneRegex = /^\d{10}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;

let name = document.getElementById("name");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let phoneCheck = document.getElementById("phone_radio");
let emailCheck = document.getElementById("email_radio");
let message = document.getElementById("message");
let formSubmit = document.getElementById("submit");

let nameErr = document.querySelector("p.name");
let phoneErr = document.querySelector("p.phone");
let emailErr = document.querySelector("p.email");
let messageErr = document.querySelector("p.message");

// Validates the form and throws errors when needed
function contactValidate(event) {
    event.preventDefault();

    // Resets input border styles
    name.classList.remove("error");
    phone.classList.remove("error");
    email.classList.remove("error");
    message.classList.remove("error");
    
    // Removes all error messages
    nameErr.classList.add("hidden");
    phoneErr.classList.add("hidden");
    emailErr.classList.add("hidden");
    messageErr.classList.add("hidden");

    // Checks if name is entered
    if (name.value.trim() == "") {
        nameErr.classList.remove("hidden");
        name.classList.add("error");
    }

    // Checks if proper phone format is entered where required
    if (phoneCheck.checked && !phoneRegex.test(phone.value.trim())) {
        phoneErr.classList.remove("hidden");
        phone.classList.add("error");
    }

    // Checks if proper email format is entered where required
    if (emailCheck.checked && !emailRegex.test(email.value.trim())) {
        emailErr.classList.remove("hidden");
        email.classList.add("error");
    }

    // Checks if message is entered
    if (message.value.trim() == "") {
        messageErr.classList.remove("hidden");
        message.classList.add("error");
    }
}

// Validates the form when the submission button is clicked
formSubmit.addEventListener("click", contactValidate);



// LIGHT & DARK MODE

// Variables
const modeToggle = document.querySelector("li img");
const body = document.querySelector("body");
const preferTheme = localStorage.getItem("theme");

if(preferTheme === "dark") {
    body.classList.add("dark");
}

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
});