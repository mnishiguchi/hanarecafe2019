import mapEventHandler from "./js/mapEventHandler";
import sidebarEventHandler from "./js/sidebarEventHandler";
import scrollEventHandler from "./js/scrollEventHandler";
import serviceworkerHandler from "./js/serviceworkerHandler";

import "./main.scss";

document.addEventListener("DOMContentLoaded", function() {
  mapEventHandler.init();
  sidebarEventHandler.init();
  scrollEventHandler.init();
  serviceworkerHandler.init();
});
