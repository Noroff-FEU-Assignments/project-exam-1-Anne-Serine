async function getPosts() {
  const url = "https://www.aservify.no/wp-json/wp/v2/posts";
  
  const response = await fetch(url);
  const posts = await response.json();

  for (let i = 0; i < posts.length; i++) {
    const postCard = document.querySelector(".post-card");
    let formattedDate = new Date(Date.parse(posts[i].date))
    formattedDate = formattedDate.toLocaleDateString()

    postCard.innerHTML += `<img src="${posts[i].jetpack_featured_media_url}" alt="#">
                            <div>
                            <p>${formattedDate}</p>
                            <h2>${posts[i].title.rendered}</h2>
                            <p>${posts[i].excerpt.rendered}</p>
                            </div>`
                            

    console.log(posts[i])

  }
}

getPosts();




function showNavMenu() {
  const hamburgerIcon = document.querySelector(".hamburger-icon");

  hamburgerIcon.addEventListener("click", event => {

    const navMenuContainer = document.createElement("div");
    document.body.appendChild(navMenuContainer)

    const navMenu1 = document.createElement("p");
    navMenu1.innerText = "HOME";
    navMenuContainer.appendChild(navMenu1)

    const navMenu2 = document.createElement("p");
    navMenu2.innerText = "BLOG";
    navMenuContainer.appendChild(navMenu2)

    const navMenu3 = document.createElement("p");
    navMenu3.innerText = "</>CODE";
    navMenuContainer.appendChild(navMenu3)

    const navMenu4 = document.createElement("p");
    navMenu4.innerText = "CONTACT";
    navMenuContainer.appendChild(navMenu4)

    const navMenu5 = document.createElement("p");
    navMenu5.innerText = "ABOUT";
    navMenuContainer.appendChild(navMenu5)
    
  })
}

showNavMenu();