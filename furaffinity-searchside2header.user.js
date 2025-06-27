// ==UserScript==
// @name        furaffinity.net | move sidebar search to top
// @namespace   Violentmonkey Scripts
// @match       https://www.furaffinity.net/search/*
// @grant       none
// @version     1.0
// @author      klazo
// @description move the sidebar to the top so theres less negative space
// ==/UserScript==

document.querySelector("#search-form").appendChild(document.querySelector(".browse-content"));
