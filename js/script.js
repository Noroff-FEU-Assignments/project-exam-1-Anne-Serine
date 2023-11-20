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

    const detailUrl = "https://www.aservify.no/wp-json/wp/v2/posts/" + id;

    const detailBlogPost = await getPosts(detailUrl, detailPostContainer);

    if(detailBlogPost) {

      const blogContent = document.createElement("div");
      blogContent.innerHTML = detailBlogPost.content.rendered;
      detailPostContainer.appendChild(blogContent);


     
      document.title = detailBlogPost.title.rendered + " | Code ‘n coffee";

      

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
  input.addEventListener("keyup", (event) => {
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
  



// CAROUSEL

const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".carousel-wrapper i");

let firstCardWidth;

setTimeout(() => {
  firstCardWidth = carousel.querySelector(".post-card").offsetWidth;
}, 2000)

let isDragging = false;
let startX;
let startScrollLeft;

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    console.log(btn.id)
    carousel.scrollLeft += btn.id === "left-arrow-carousel" ? -firstCardWidth : firstCardWidth;
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

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);


