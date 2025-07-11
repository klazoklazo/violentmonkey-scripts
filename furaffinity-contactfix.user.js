// ==UserScript==
// @name        furaffinity fix contact links
// @namespace   Violentmonkey Scripts
// @match       *://www.furaffinity.net/user/*
// @grant       none
// @version     1.0
// @author      klazo
// @description sometimes a furaffinity user will include the domain of a site within their contacts, resulting in a duplicated domain within the full url. this fixes that by removing that second domain
// ==/UserScript==

// thank you past me for making this with redirector before
// regex to match and split apart urls with duplicated domains
const contactCheck = /^(https:\/\/)([^/]*\/)(https?%3A%2F%2F)?([^.]*)(\.com|\.app|\.tv)(%2F)(.*)/gi;

// gather all the contact links within a userpage
const contactElements = Array.from(document.getElementById("userpage-contact").getElementsByTagName("a"));

// go through all the contact links to check and modify as needed
contactElements.forEach(function(contactElement) {
  let contactLink = contactElement.href;

  // i hate the fact i have to create this regex object every time
  // but writing 0 into lastIndex still produces weird ass behavior
  if (contactCheck.test(contactLink)) {
    // reset regex objects lastIndex value
    contactCheck.lastIndex = 0;

    // split apart and reassemble broken url into a working url
    let contactDuplicates = contactCheck.exec(contactLink); contactCheck.lastIndex = 0;
    let contactDomain = contactDuplicates[2];
    let contactUsername = contactDuplicates[7];
    let contactLinkNew = "https://" + contactDomain + contactUsername;

    // replace href and textContent with working counterparts
    contactElement.href = contactLinkNew;
    contactElement.textContent = contactUsername;
  }
});
