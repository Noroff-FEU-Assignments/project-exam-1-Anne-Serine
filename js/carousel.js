// CAROUSEL, make carousel displaying the latest posts for det home page


export function makeCarousel() {
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

