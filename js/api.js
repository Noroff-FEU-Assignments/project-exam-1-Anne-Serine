// Fetching the blogpost from the API

export async function getPosts(url, container) {
  
  const loader = document.querySelector(".loading-container");

  try{
    const response = await fetch(url);
    const posts = await response.json();

    if(posts && loader) {
      loader.innerHTML = "";
    }

    if(response.status === 200) {
      
      return posts;

    } else {

      return null;
    }

  } catch(error) {
    container.innerHTML = `<div role="alert" class="api-error">
                                    Sorry, failed to fetch blog posts...
                                  </div>`
  }
}