const onMapMouseleaveHandler = function() {
  this.addEventListener("click", onMapClickHandler);
  this.removeEventListener("mouseleave", onMapMouseleaveHandler);
  this.querySelector("iframe").style.pointerEvents = "none";
};

const onMapClickHandler = function() {
  this.removeEventListener("click", onMapClickHandler);
  this.querySelector("iframe").style.pointerEvents = "auto";
  this.addEventListener("mouseleave", onMapMouseleaveHandler);
};

export default {
  init: () => {
    // console.log("mapEventHander.init")
    document
      .querySelector(".map")
      .addEventListener("click", onMapMouseleaveHandler);
  }
};
