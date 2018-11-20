export default {
  init: () => {
    // console.log("scrollEventHandler.init");
    const scrollTriggers = document.querySelectorAll(
      'a.js-scroll-trigger[href*="#"]:not([href="#"])'
    );
    Array.from(scrollTriggers).forEach(scrollTrigger => {
      scrollTrigger.addEventListener("click", function(event) {
        if (
          location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
          location.hostname == this.hostname
        ) {
          const el = document.querySelector(this.hash);
          if (el !== null) {
            // console.log(this.hash);
            const menuToggle = document.querySelector(".menu-toggle");
            if (menuToggle.classList.contains("active")) {
              menuToggle.dispatchEvent(new Event("click"));
            }
          }
        }
      });
    });
  }
};
