// ==UserScript==
// @name        furaffinity unify notification pages
// @namespace   Violentmonkey Scripts
// @match       https://www.furaffinity.net/msg/submissions/*
// @grant       none
// @version     1.0
// @author      klazo
// @description jankily combines both notification pages by loading one inside another
// ==/UserScript==

const notificationsOthers = document.createElement("iframe");
notificationsOthers.src = "https://www.furaffinity.net/msg/others/";
notificationsOthers.width = "100%"; notificationsOthers.height = "900px";
document.getElementById("site-content").appendChild(notificationsOthers);
