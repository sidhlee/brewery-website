/* TODO: fix error in carousel OR redo  */

const carousel = document.querySelector(".grid-carousel");
const slides = carousel.querySelectorAll(".grid-carousel__item");
const leftButton = carousel.querySelector(".js-left");
const rightButton = carousel.querySelector(".js-right");

function getOrder(elem) {
  const styles = getComputedStyle(elem);
  return +styles.order; // computedStyle has all the values as string
}

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

// init order (IPA in the middle!);
reOrderAll(2);

// to the right => decrement order
rightButton.addEventListener("click", () => slideAndReOrder(true));
leftButton.addEventListener("click", () => slideAndReOrder(false));

function slide(right = true) {
  slides.forEach(slide => {
    slide.style.animation = `slide-${
      right ? "right" : "left"
    } 750ms ease-in-out`;
  });
}

function slideAndReOrder(right = true) {
  if (right) {
    carousel.addEventListener("animationend", slideRight);
  } else {
    carousel.addEventListener("animationend", slideLeft);
  }

  slide(right);
}

function slideRight(e) {
  reOrder(e, true);
  carousel.removeEventListener("animationend", slideRight);
}

function slideLeft(e) {
  reOrder(e, false);
  carousel.removeEventListener("animationend", slideLeft);
}

function reOrder(e, right) {
  const offsetBy = right ? -1 : 1;
  console.log(offsetBy);
  const slide = e.target;
  const currOrder = slide.style.order;
  e.target.style.order =
    ((currOrder - 1 + offsetBy + slides.length) % slides.length) + 1;
  if (slide.style.order === "3") {
    // DOM style props are strings!
    slide.classList.add("featured");
  } else {
    slide.classList.remove("featured");
  }
}
