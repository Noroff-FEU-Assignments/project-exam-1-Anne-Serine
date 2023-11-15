export function loadingIndicator() {

  const loading = document.querySelectorAll(".loading-container");
  loading.forEach((container) => {
   container.innerHTML =`<div class="loading-indicator"></div>`;
  })
 
 }
 
 