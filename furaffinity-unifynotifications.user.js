// ==UserScript==
// @name        furaffinity unify notification pages
// @namespace   Violentmonkey Scripts
// @match       *://www.furaffinity.net/msg/submissions*
// @match       *://www.furaffinity.net/msg/others*
// @grant       none
// @version     2.1
// @author      klazo
// @description jankily combines both notification pages by loading one inside another
// ==/UserScript==

// make sure we're not modifying or redirecting the iframe
if (window.top == window.self) {
  if (window.location.href.includes("/msg/others")) {
    // redirect users to submissions notifications page to not confuse them
    // will still be slightly confusing since page will load twice,
    // but better than running the script on every page
    window.location.replace("https://www.furaffinity.net/msg/submissions/");
  } else {
    // modify the submissions notifications page

    // create and insert second notifications page
    const notificationsOthers = document.createElement("iframe");
    notificationsOthers.src = "https://www.furaffinity.net/msg/others/";
    notificationsOthers.width = "100%"; // make sure notifications take up as much width as rest of notifications
    notificationsOthers.frameBorder = "0"; // hide border to make both sets of notifications look seamless
    document.getElementById("site-content").appendChild(notificationsOthers);

    // id for debugging
    notificationsOthers.id = "notifications-others";

    // modifications to appended notifications page
    notificationsOthers.onload = function() {
      // extra modifications to appended notifications page
      // remove extra navbar and footer in second notifications page
      notificationsOthers.contentWindow.document.getElementById("header").remove();
      notificationsOthers.contentWindow.document.getElementById("ddmenu").remove();
      notificationsOthers.contentWindow.document.getElementById("footer").remove();
      // remove sidebar for consistency and to stop the user from getting lost
      notificationsOthers.contentWindow.document.querySelector(".sidebar").remove();

      // prevent unnecessary scrolling in appended notifications
      var notificationsOthersInside = notificationsOthers.contentWindow.document.getElementById("main-window");
      notificationsOthersInside.style.setProperty("min-height", "initial");
      // dynamically resize iframe to match height of notifications list
      var heightObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          notificationsOthers.height = notificationsOthersInside.offsetHeight + "px";
        }
      });
      heightObserver.observe(notificationsOthersInside);

      // make sure all links within iframe redirect window parent as opposed to just in the iframe
      var iframeLinks = Array.from(notificationsOthers.contentWindow.document.getElementsByTagName("a"));
      console.log(iframeLinks);
      iframeLinks.forEach(function(iframeLink) {
        iframeLink.setAttribute("target", "_parent");
      });
    };
  }
}
