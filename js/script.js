import { loadingIndicator } from "./functions.js";

loadingIndicator();




async function getPosts(url, container) {
  
  
  const loader = document.querySelector(".loading-container");

  try{
    const response = await fetch(url);
    const posts = await response.json();

    if(posts && loader) {
      loader.classList.add("dn")
    }

    if(response.status === 200) {
      
      return posts;

    } else {

      return null;
    }

  } catch(error){
    container.innerHTML = `<div role=alert class="api-error">
                                    Sorry, failed to fetch blog posts...
                                  </div>`
  }
  
  
}





async function createPostCard() {
  const postCardContainer = document.querySelector(".post-card-container");

  if(postCardContainer) {
    const url = "https://www.aservify.no/wp-json/wp/v2/posts?per_page=9&_embed";
    const posts = await getPosts(url, postCardContainer)

    for (let i = 0; i < posts.length; i++) {
      
      let formattedDate = new Date(Date.parse(posts[i].date))
      formattedDate = formattedDate.toLocaleDateString()

      let postImage = "";
      let altText = "";
      if (posts[i]._embedded["wp:featuredmedia"]) {

        postImage = posts[i]._embedded["wp:featuredmedia"][0].source_url;
        altText = posts[i]._embedded["wp:featuredmedia"][0].alt_text;

      }

    
      postCardContainer.innerHTML += `<a href="/html/blogPostSpecific.html?id=${posts[i].id}" class="post-card" draggable="false">
                                        <img src="${postImage}" alt="${altText}" draggable="false">
                                        <div>
                                          <p>${formattedDate}</p>
                                          <h2>${posts[i].title.rendered}</h2>
                                          <p>${posts[i].excerpt.rendered}</p>
                                        </div>
                                      </a>`
                            

      console.log(posts[i])
    }

    makeCarousel()

  }
}

createPostCard();




let blogPostPage = 1;


async function blogPostList(blogPostPage) {
  const blogPostContainer = document.querySelector(".blog-post-container");

  if(blogPostContainer) {
    const url = `https://www.aservify.no/wp-json/wp/v2/posts?_embed&page=${blogPostPage}`;
    const posts = await getPosts(url, blogPostContainer)

    if(!posts) {
      const loadMoreContainer = document.querySelector(".load-more-container");
      loadMoreContainer.innerHTML = "<div> No more posts to load. Take a coffee break! </div>"
    } else if(posts.length > 0) {
      
      for (let i = 0; i < posts.length; i++) {
        
        let formattedDate = new Date(Date.parse(posts[i].date))
        formattedDate = formattedDate.toLocaleDateString()
        
        let postImage = "";
        let altText = "";
        if (posts[i]._embedded["wp:featuredmedia"]) {
  
          postImage = posts[i]._embedded["wp:featuredmedia"][0].source_url;
          altText = posts[i]._embedded["wp:featuredmedia"][0].alt_text;
        }
        
          blogPostContainer.innerHTML += `<a href="/html/blogPostSpecific.html?id=${posts[i].id}" class="blog-post">
                                            <div class="blog-post-img">
                                              <img src="${postImage}" alt="${altText}">
                                            </div>
                                            <div class="blog-post-text">
                                              <p>${formattedDate}</p>
                                              <h2>${posts[i].title.rendered}</h2>
                                              <p>${posts[i].excerpt.rendered}</p>
                                            </div>
                                          </a>`
                                
      }
    }

  }
}

blogPostList(blogPostPage);


const loadMore = document.getElementById("loadMore");

if(loadMore) {

  loadMore.addEventListener("click", event => {

    
    
    blogPostPage = blogPostPage + 1;
    blogPostList(blogPostPage);

    

  })
}



async function createDetailBlogPost() {

  const detailPostContainer = document.querySelector(".detail-post-container");

  const params = new URLSearchParams(document.location.search);
  const id = params.get("id");

  if (id) {

    const detailUrl = "https://www.aservify.no/wp-json/wp/v2/posts/" + id + "?_embed";

    const detailBlogPost = await getPosts(detailUrl, detailPostContainer);

    if(detailBlogPost) {

      const blogContent = document.createElement("div");
      blogContent.innerHTML = detailBlogPost.content.rendered;
      detailPostContainer.appendChild(blogContent);

      const altText = detailBlogPost._embedded["wp:featuredmedia"][0].alt_text;
     
      document.title = detailBlogPost.title.rendered + " | Code ‘n coffee";

      
      makeImageModal(altText);
      

    }

    
  }
}


createDetailBlogPost();




function showNavMenu() {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const headerNav = document.querySelector("#headerNav");

  hamburgerIcon.addEventListener("click", event => {
    headerNav.classList.toggle("active");
   
  })
}

showNavMenu();







function validateInputLength(input, minlength) {
  if (input.length >= minlength) {
    return true;
  } else {
    return false;
  }
}

const inputs = document.querySelectorAll(".text-input")

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    const value = event.target.value;
    const withoutSpace = value.replace(/ /g,"")
    const minlength = event.target.dataset.minlength;
    const test = +minlength - withoutSpace.length
    const validate = validateInputLength(withoutSpace, +minlength);
    const error = input.parentElement.querySelector(".error-message");

    if(!validate) {
      input.parentElement.classList.add("error");
      error.innerHTML = `${event.target.id} must contain ${test} more characters!`;
    } else {
      error.innerHTML = "";
      input.parentElement.classList.remove("error");
      input.parentElement.classList.add("success");
    }
    console.log(validate)
  })
})



function validateEmail(email) {
  const Regex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
  if(Regex.test(email) && email.length > 3){
    return true;
  } else {
    return false;
  }
  
}

const emailInput = document.querySelector("#email")

  if(emailInput) {
    emailInput.addEventListener("change", (event) => {
      const error = emailInput.parentElement.querySelector(".error-message");
      const value = event.target.value;
      
      if(value === "") {
        emailInput.parentElement.classList.add("error");
        error.innerHTML = "This field is mandatory";
      } else {
        const validate = validateEmail(value);
    
        if(!validate) {
          emailInput.parentElement.classList.add("error");
          error.innerHTML = `* example@email.com`;
        } else {
          error.innerHTML = "";
          emailInput.parentElement.classList.remove("error");
          emailInput.parentElement.classList.add("success");
        }
      }
    })
  }
  


const contactFormButton = document.querySelector("#contactFormButton");

  if(contactFormButton) {
    contactFormButton.addEventListener("click", () => {

      const inputFields = document.querySelectorAll(".validate-input");
      let valid = true;

      inputFields.forEach(input => {
        if(input.parentElement.classList.contains("error") || !input.value) {
          valid = false;
        }
      })
      const success = contactFormButton.parentElement.querySelector(".status");

      success.classList.remove("success-message", "error-message");

      if(valid) {
        success.classList.add("success-message");
        success.innerHTML = `Wohoo! Message has been sent. Now take a sip of coffee, and you will hear from me!`
      } else {
        success.classList.add("error-message");
        success.innerHTML = `Some of the input fields are not valid.`
      }
      
      
    })
  }





// CAROUSEL

function makeCarousel() {

  const carousel = document.querySelector(".carousel");
if(carousel) {

const arrowBtns = document.querySelectorAll(".carousel-wrapper button");


const firstCardWidth = carousel.querySelector(".post-card").offsetWidth;


const carouselChildren = [...carousel.children];

let isDragging = false;
let startX;
let startScrollLeft;
carousel.scrollLeft = carousel.offsetWidth;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildren.slice(-cardPerView).reverse().forEach(postCard => {
  carousel.insertAdjacentHTML("afterbegin", postCard.outerHTML);
})

carouselChildren.slice(0, cardPerView).forEach(postCard => {
  carousel.insertAdjacentHTML("beforeend", postCard.outerHTML);
})

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    console.log(btn.id)
    carousel.scrollLeft += btn.id === "leftArrowCarousel" ? -firstCardWidth : firstCardWidth;
  })
})

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");

  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if(!isDragging) return;
  carousel.classList.add("no-event");
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {

  isDragging = false;
  carousel.classList.remove("dragging");
  carousel.classList.remove("no-event");
}

const infinitScroll = () => {

  if(carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");

  } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infinitScroll);

}

}




// MODAL, make the picture bigger by clicking on it


function makeImageModal(altText) {

  const imageModal = document.getElementById("imageModal");

  if (imageModal) {

    const closeModal = imageModal.querySelector(".close-modal");
    const imageElement = document.createElement("img");
    imageModal.prepend(imageElement)

    

    const images = document.querySelectorAll(".wp-block-image img");
    images.forEach((img) => {
      img.addEventListener("click", (e) => {
        imageElement.setAttribute("src", e.target.src);
        imageElement.setAttribute("alt", altText);

        const description = document.getElementById("description");
        description.innerHTML = `<p>${altText}</p>`;
  
        imageModal.showModal();
      })
    })
    
    closeModal.addEventListener("click", () => {
      imageModal.close();
    })

    imageModal.addEventListener("click", (event) => {
      const rect = imageModal.getBoundingClientRect();

      if (event.clientY < rect.top || event.clientY > rect.bottom || event.clientX <  rect.left || event.clientX > rect.right) {
        imageModal.close();
      }

    });


  }

}  







// ABOUT ME object

// const aboutMe = {
  
//   name: "Anne-Serine",
//   gender: "female",
//   age: 37,
//   location: "Haugesund, Norway",
//   hobbies: [
//     "photography",
//     "drawing"
//   ],
//   favoriteFood: [
//     "Norwegian Lamb Fricassee",
//     "Komle"
//   ],
//   favoriteCoffee: "Sweet Chili Mocha",
//   dailyGoal: "Master the art of not hitting snooze more than three times",

// }

// const aboutMeContainer = document.querySelector(".about-text");

// aboutMeContainer.innerHTML = `<div> const aboutMe = ${JSON.stringify(aboutMe, null, 2)} </div>`;


// console.log(aboutMe)




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







// COFFEE FACTS - make a function generate random facts about coffee


let coffeeFacts = [
  "Approximately 400 billion cups of coffee are consumed every year.",
  "It takes 100 beans to make 1 cup of coffee.",
  "It takes 5 years for a coffee tree to mature enough to produce its first crop.",
  "Once roasted a coffee bean increases in volume but decreases in weight (Like popcorn!)",
  "Coffee consists of 98.5% water.",
  "Light-roasted coffee contains more caffeine than dark-roasted coffee.",
  "Coffee beans: While they do look a lot like beans, coffee “beans” are actually the seed, or pit, of the fruit that grows on coffee trees. Coffee trees grow small, bright red fruit called coffee cherries.",
]

const coffeeFactContainer = document.querySelector(".coffee-fact-container");


function outputRandomCoffeeFact() {
  const coffeeFactButton = document.getElementById("coffeeFactButton");

  coffeeFactButton.addEventListener("click", (fact) => {
    generateCoffeeFact(coffeeFacts);
  })
}

if(coffeeFactContainer) {
  outputRandomCoffeeFact();
  generateCoffeeFact(coffeeFacts);
}



function generateCoffeeFact(coffeeFacts) {
  coffeeFactContainer.innerHTML = `<p>${coffeeFacts[(Math.floor(Math.random() * coffeeFacts.length))]}</p>`;
}