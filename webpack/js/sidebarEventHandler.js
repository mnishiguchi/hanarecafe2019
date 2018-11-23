export default {
  init: () => {
    console.log("sidebarEventHander.init");
    const toggleIcon = document.querySelector(".menu-toggle > svg-icon");
    document
      .querySelector(".menu-toggle")
      .addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector("#sidebar-wrapper").classList.toggle("active");
        this.classList.toggle("active");
      });
  }
};
