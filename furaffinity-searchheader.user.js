// ==UserScript==
// @name        furaffinity search sidebar to header
// @namespace   Violentmonkey Scripts
// @match       *://www.furaffinity.net/search*
// @grant       none
// @version     1.0
// @author      klazo
// @description script that reformats the advanced search settings from a sidebar to a headerbar
// ==/UserScript==

// move search sidebar to header of gallery section
document.querySelector(".gallery-section").prepend(document.querySelector(".browse-sidebar-container"));

// extend search sidebar to take full width of header
// container
document.querySelector(".browse-sidebar-container").style.setProperty("width", "initial");
document.querySelector(".sidebar-options-content").style.setProperty("width", "initial");
// search settings
document.getElementById("search-flex-container").style.setProperty("max-width", "initial");
document.getElementById("search-flex-container").style.margin = "0";

// reformat advanced search settings for increased width
// remove extra search button since its taking space
document.querySelector(".extra-search-btn-container").remove();
// move advanced search settings outside of this weird hell hole
document.querySelector(".l-sidebar").append(document.getElementById("search-advanced"));
document.querySelector(".l-sidebar").append(document.getElementById("search-flex-container"));

// ENGRIDIFY advanced search settings, allowing for things to be side by side
document.getElementById("search-advanced").classList.add("gridContainer");
// reformat all advanced search settings to be able to be side by side
let sidebarElements = document.querySelectorAll(".sidebar-section");
for (let sidebarElement of sidebarElements) {
  sidebarElement.classList = "";
  sidebarElement.classList.add("sidebar-section");
}
