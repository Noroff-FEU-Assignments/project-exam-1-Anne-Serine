import { makeCarousel} from "./carousel.js"
import { makeImageModal } from "./modal.js";
import { getPosts } from "./api.js";
import { loadingIndicator } from "./functions.js";


// make post for carousel

export async function createPostCard() {
  const postCardContainer = document.querySelector(".post-card-container");

  if(postCardContainer) {

    loadingIndicator();
    
    const url = "https://www.aservify.no/wp-json/wp/v2/posts?per_page=9&_embed";
    const posts = await getPosts(url, postCardContainer)

    if(posts) {

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
      }
      makeCarousel()

    } else {
      postCardContainer.innerHTML = `<p role="alert"> Couldn´t find any posts...</p>`
    }
  }
}



// BLOGPOST LIST, make blogpost cards for the blogpost list pages

let page = 0;

export async function blogPostList(blogPostPage) {
  page = blogPostPage

  const blogPostContainer = document.querySelector(".blog-post-container");

  if(blogPostContainer) {

    loadingIndicator();

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

const loadMore = document.getElementById("loadMore");

if(loadMore) {
  loadMore.addEventListener("click", event => {
    page = page + 1;
    blogPostList(page);
  })
}



// DETAIL BLOGPOST

export async function createDetailBlogPost() {

  const detailPostContainer = document.querySelector(".detail-post-container");

  const params = new URLSearchParams(document.location.search);
  const id = params.get("id");

  if (id) {

    loadingIndicator();

    const detailUrl = "https://www.aservify.no/wp-json/wp/v2/posts/" + id + "?_embed";

    const detailBlogPost = await getPosts(detailUrl, detailPostContainer);

    if(detailBlogPost) {

      const blogContent = document.createElement("div");
      blogContent.innerHTML = detailBlogPost.content.rendered;
      detailPostContainer.appendChild(blogContent);

      const altText = detailBlogPost._embedded["wp:featuredmedia"][0].alt_text;
     
      document.title = detailBlogPost.title.rendered + " | Code ‘n coffee";

      
      makeImageModal(altText);
      
    } else {
      detailPostContainer.innerHTML = `<p role="alert"> Couldn´t find any posts...</p>`
    }
  }
}