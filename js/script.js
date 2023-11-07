const url = "https://www.aservify.no/wp-json/wp/v2/posts";


async function getPosts() {
  const response = await fetch(url);
  const posts = await response.json();

  for (let i = 0; i < posts.length; i++) {
    const postCard = document.querySelector(".post-card");
    let formattedDate = new Date(Date.parse(posts[i].date))
    formattedDate = formattedDate.toLocaleDateString()

    postCard.innerHTML += `<img src="${posts[i].jetpack_featured_media_url}" class="wp-image-86">
                            <div>
                            <p>${formattedDate}</p>
                            <h2>${posts[i].title.rendered}</h2>
                            <p>${posts[i].excerpt.rendered}</p>
                            </div>`
                            

    console.log(posts[i])

  }
}

getPosts();

