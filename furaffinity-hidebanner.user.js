// ==UserScript==
// @name        furaffinity hide default banner
// @namespace   Violentmonkey Scripts
// @match       *://www.furaffinity.net/*
// @grant       none
// @version     1.1
// @author      klazo
// @description script that hides the default banner in furaffinity pages while leaving profile banners intact
// ==/UserScript==

// list of subdomains to invoke alternate behavior with
// userpage subdomains in furaffinity cause the users navbar to clip into the sitewide navbar
// if the user does not have their own custom profile banner
const userpageSubdomains = ["user", "gallery", "scraps", "favorites", "journals"];
// identifiable userpage subdomain bit is always immediately after the domain
const subdomainIndex = 28;

// function to check if default sitewide banner is used
function checkValid(domain, subdomains) {
  for (let subdomain of subdomains) {
    if (domain.indexOf(subdomain) == subdomainIndex) {
      // check if subdomain is a profile subdomain
      return true;
    }
  }
  // return false if elsewhere on furaffinity
  return false;
}

// main behavior
if (checkValid(document.URL, userpageSubdomains)) {
  // check again if userpage doesnt have a profile banner
  if (!!document.querySelector(".banner-justify-center")) {
    // a userpage without a profile banner
    // remove banner then create empty space for userpage to clip into
    document.querySelector(".banner-justify-center").remove();
    document.getElementById("header").style.height = '59px';
  }
} else {
  // not a userpage
  // simple removal of banner
  document.querySelector(".banner-justify-center").remove();
}
