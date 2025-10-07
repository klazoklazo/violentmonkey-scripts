// ==UserScript==
// @name        stop it with the looping
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      -
// @description removes loop attributes from all videos when it can
// ==/UserScript==
document.getElementsByTagName("video")[0].removeAttribute("loop");
