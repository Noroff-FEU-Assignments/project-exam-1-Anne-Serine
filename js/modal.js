// MODAL, make the picture bigger by clicking on it


export function makeImageModal(altText) {

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