const carousel = document.querySelector(".grid-carousel");
const slideContainer = document.querySelector(".slides-container");
const slides = carousel.querySelectorAll(".grid-carousel__item");
const leftButton = carousel.querySelector(".js-left");
const rightButton = carousel.querySelector(".js-right");

rightButton.addEventListener("click", () => slideAndReOrder(true));
leftButton.addEventListener("click", () => slideAndReOrder(false));

function slideAndReOrder(right = true) {
  if (right) {
    carousel.addEventListener("animationend", slideRight);
  } else {
    carousel.addEventListener("animationend", slideLeft);
  }
  animateSlide(right);
}

function animateSlide(right = true) {
  slideContainer.style.animation = `slide-${
    right ? "right" : "left"
  } 500ms ease-in-out`;
}

// slide right and cleanup
function slideRight() {
  slide();
  carousel.removeEventListener("animationend", slideRight);
  // remove animation value so that it can be re-added to initiate animation
  slideContainer.style.animation = "";
}

// slide left and cleanup
function slideLeft() {
  slide(false);
  carousel.removeEventListener("animationend", slideLeft);
  slideContainer.style.animation = "";
}

// slide all element to the right(default) or left
function slide(right = true) {
  const offsetBy = right ? 1 : -1;
  reOrderAll(offsetBy);
}

// get CSS order property value for given element
function getOrder(elem) {
  const styles = getComputedStyle(elem);
  return +styles.order; // computedStyle has all the values as string
}

// Re-order all elements in slides node by the given offset-value
// NOTE: CSS order starts from 1
function reOrderAll(offsetBy = 1) {
  slides.forEach(slide => {
    const currOrder = getOrder(slide);
    // order starts from 1 (CSS thing.)
    slide.style.order =
      ((currOrder - 1 + offsetBy + slides.length) % slides.length) + 1;
    if (slide.style.order === "3") {
      // DOM style props are strings!
      slide.classList.add("featured");
    } else {
      slide.classList.remove("featured");
    }
  });
}

// init order (place IPA in the middle);
reOrderAll(2);
