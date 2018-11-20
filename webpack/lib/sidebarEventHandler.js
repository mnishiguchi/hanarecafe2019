export default {
  init: () => {
    // console.log("sidebarEventHander.init");
    const toggleIcon = document.querySelector(".menu-toggle > i.fas");
    document
      .querySelector(".menu-toggle")
      .addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector("#sidebar-wrapper").classList.toggle("active");
        if (toggleIcon.classList.contains("fa-bars")) {
          toggleIcon.classList.remove("fa-bars");
          toggleIcon.classList.add("fa-times");
        } else {
          toggleIcon.classList.remove("fa-times");
          toggleIcon.classList.add("fa-bars");
        }
        this.classList.toggle("active");
      });
  }
};
