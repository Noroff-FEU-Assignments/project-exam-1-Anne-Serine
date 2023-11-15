import { loadingIndicator } from "./functions.js";

loadingIndicator();




async function getPosts(url) {
  
  const postCardContainer = document.querySelector(".post-card-container");
  const loader = document.querySelector(".loading-container");

  try{
    const response = await fetch(url);
    const posts = await response.json();

    if(posts) {
      loader.classList.add("dn")
    }

    if(response.status === 200) {
      
      return posts;

    } else {

      return null;
    }

  } catch(error){
    postCardContainer.innerHTML = `<div role=alert class="error">
                                    Sorry, failed to fetch blog posts...
                                  </div>`
  }
  
  
}





async function createPostCard() {
  const postCardContainer = document.querySelector(".post-card-container");

  if(postCardContainer) {
    const url = "https://www.aservify.no/wp-json/wp/v2/posts?per_page=9&_embed";
    const posts = await getPosts(url)

    for (let i = 0; i < posts.length; i++) {
      
      let formattedDate = new Date(Date.parse(posts[i].date))
      formattedDate = formattedDate.toLocaleDateString()

      let postImage = "";
      let altText = "";
      if (posts[i]._embedded["wp:featuredmedia"]) {

        postImage = posts[i]._embedded["wp:featuredmedia"][0].source_url;
        altText = posts[i]._embedded["wp:featuredmedia"][0].alt_text;

      }

    
      postCardContainer.innerHTML += `<div class="post-card">
                                        <img src="${postImage}" alt="${altText}">
                                        <div>
                                          <p>${formattedDate}</p>
                                          <h2>${posts[i].title.rendered}</h2>
                                          <p>${posts[i].excerpt.rendered}</p>
                                        </div>
                                      </div>`
                            

      console.log(posts[i])
    }
  }
}

createPostCard();




let blogPostPage = 1;


async function blogPostList(blogPostPage) {
  const blogPostContainer = document.querySelector(".blog-post-container");

  if(blogPostContainer) {
    const url = `https://www.aservify.no/wp-json/wp/v2/posts?_embed&page=${blogPostPage}`;
    const posts = await getPosts(url)

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
        
          blogPostContainer.innerHTML += `<div class="blog-post">
                                            <div class="blog-post-img">
                                              <img src="${postImage}" alt="${altText}">
                                            </div>
                                            <div class="blog-post-text">
                                              <p>${formattedDate}</p>
                                              <h2>${posts[i].title.rendered}</h2>
                                              <p>${posts[i].excerpt.rendered}</p>
                                            </div>
                                          </div>`
                                
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



function showNavMenu() {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const headerNav = document.querySelector("#headerNav");

  hamburgerIcon.addEventListener("click", event => {
    headerNav.classList.toggle("active");
   
  })
}

showNavMenu();



const form = document.getElementById("contactForm");
const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");



function validateInputLength(input, minlength) {
  if (input.length >= minlength) {
    return true;
  } else {
    return false;
  }
}

const inputs = document.querySelectorAll(".text-input")

inputs.forEach((input) => {
  input.addEventListener("keyup", (event) => {
    const value = event.target.value;
    const minlength = event.target.dataset.minlength;
    const validate = validateInputLength(value, +minlength);
    const error = input.parentElement.querySelector(".error-message");

    if(!validate) {
      input.parentElement.classList.add("error");
      error.innerHTML = `${event.target.id} must be at least ${minlength} characters long!`;
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
    emailInput.addEventListener("keyup", (event) => {
      const value = event.target.value;
      const validate = validateEmail(value);
      const error = emailInput.parentElement.querySelector(".error-message");
  
      if(!validate) {
        emailInput.parentElement.classList.add("error");
        error.innerHTML = `Invalid e-mail format`;
      } else {
        error.innerHTML = "";
        emailInput.parentElement.classList.remove("error");
        emailInput.parentElement.classList.add("success");
      }
      console.log(validate)
    })
  }
  



// const navMenuContainer = document.createElement("div");
// document.body.appendChild(navMenuContainer)

// const navMenu1 = document.createElement("p");
// navMenu1.innerText = "HOME";
// navMenuContainer.appendChild(navMenu1)

// const navMenu2 = document.createElement("p");
// navMenu2.innerText = "BLOG";
// navMenuContainer.appendChild(navMenu2)

// const navMenu3 = document.createElement("p");
// navMenu3.innerText = "</>CODE";
// navMenuContainer.appendChild(navMenu3)

// const navMenu4 = document.createElement("p");
// navMenu4.innerText = "CONTACT";
// navMenuContainer.appendChild(navMenu4)

// const navMenu5 = document.createElement("p");
// navMenu5.innerText = "ABOUT";
// navMenuContainer.appendChild(navMenu5)