// Making a loading indicator that shows while loading posts from API

export function loadingIndicator() {

  const loading = document.querySelectorAll(".loading-container");
  loading.forEach((container) => {
   container.innerHTML =`<div class="loading-indicator mb"></div>`;
  })
 
 }
 
 
// Show/hide navigation menu when clicking on the hamburger icon

export function showNavMenu() {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const headerNav = document.querySelector("#headerNav");

  hamburgerIcon.addEventListener("click", event => {
    headerNav.classList.toggle("active");
   
  })
}


// COFFEE FACTS - make a function generate random facts about coffee

export function generateCoffeeFact(coffeeFacts) {
  
  const coffeeFactContainer = document.querySelector(".coffee-fact-container");
  const coffeeFactButton = document.getElementById("coffeeFactButton");

  if(coffeeFactContainer && coffeeFactButton) {
    coffeeFactButton.addEventListener("click", (fact) => {
      generateCoffeeFact(coffeeFacts);
    })
  
    coffeeFactContainer.innerHTML = `<p>${coffeeFacts[(Math.floor(Math.random() * coffeeFacts.length))]}</p>`;
  }
}


// ABOUT ME , making the text for the about page

export function aboutMeText() {
  const aboutMeContainer = document.querySelector(".about-text");

  if(aboutMeContainer) {
    aboutMeContainer.innerHTML = `<div> <span class="about-const">const</span> <span class="about-obj">aboutMe</span> = {
    
      <span class="about-attr">name</span>: "Anne-Serine",
      <span class="about-attr">gender</span>: "female",
      <span class="about-attr">age</span>: 37,
      <span class="about-attr">location</span>: "Haugesund, Norway",
      <span class="about-attr">hobbies</span>: [
        "photography",
        "drawing"
      ],
      <span class="about-attr">favoriteFood</span>: [
        "Norwegian Lamb Fricassee",
        "Komle"
      ],
      <span class="about-attr">favoriteCoffee</span>: "Sweet Chili Mocha",
      <span class="about-attr">dailyGoal</span>: "Master the art of not hitting snooze more than three times",
    
    } </div>`;
  }
}