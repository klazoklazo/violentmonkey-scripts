// ==UserScript==
// @name        aryion.com | blacklists for tags/users
// @namespace   Violentmonkey Scripts
// @match       *://aryion.com/g4/tags*
// @match       *://aryion.com/g4/search*
// @author      klazo
// @description blacklists prevent gallery posts from appearing in the tag cloud/searches
// ==/UserScript==
//                                                                             |                   |

// before anyone asks, you can't as easily remove items from a individual
// user's gallery via tags since tags aren't provided in those elements' titles

// *** USERS, EDIT THESE VALUES ***
// id recommend saving these blacklists externally as well since its probably going to get
// overwritten whenever this updates

// fill in these two arrays for tags/users you don't want to see
// tags/users are case-insensitive
// put values between pairs of double quotation marks

// tags
const blacklistTags  = [];
// users
const blacklistUsers = [];
// posts (the numbers from their urls)
const blacklistPosts = [];

// *** USERS, DON'T TOUCH ANYTHING BEYOND THIS POINT *** (unless you know what you're doing)
// statistics for transparency
var blacklistTagsCount = 0;
var blacklistUsersCount = 0;
var blacklistPostsCount = 0;

// gather all the gallery items from page
let galleryItems = document.querySelectorAll(".gallery-item");

// start hiding gallery items
galleryItems.forEach(function(galleryItem) {
    // hiding via tags
    // ---
    // find all the tags associated with the post
    // and also make back up variable to restore title by end
    let elementTitle = galleryItem.title;
    let backupTitle = galleryItem.title;

    // convert elements title into an array of tags
    let associatedTags = [];
    while (elementTitle.includes(", ")) {
        // get current tags' ending string index
        let currentTagIndex = elementTitle.indexOf(", ");
        // get tag
        let tagToAdd = elementTitle.substring(0, currentTagIndex);
        // modify tag to account for capitalization/underscores
        tagToAdd = tagToAdd.toLowerCase().replaceAll(" ","_");
        associatedTags.push(tagToAdd);
        // remove tag from title
        elementTitle = elementTitle.substring(currentTagIndex + 2);
    }
    // add final tag to array of tags since while loop left it out
    associatedTags.push(elementTitle.toLowerCase().replaceAll(" ","_"));
    // restore title to how it was originally (in the case that the gallery item
    // isn't one that's supposed to be deleted)
    galleryItem.title = backupTitle;
    // start looking through each tag to see whether it should be removed
    blacklistTags.forEach(function(blacklistedTag) {
        // modify blacklisted tag to account for capitalization/underscores
        if (associatedTags.includes(blacklistedTag.toLowerCase().replaceAll(" ","_"))) {
            galleryItem.remove();
            blacklistTagsCount++;
        }
    })

    // hiding via users
    // ---
    // grab gallery item's user-link (modified)
    let elementUser = galleryItem.querySelector(".user-link").textContent;
    // check if user matches with blacklisted users
    blacklistUsers.forEach(function(blacklistedUser) {
        // make both sides of comparison lowercase to account for capitalization
        if (elementUser.toLowerCase() === blacklistedUser.toLowerCase()) {
            galleryItem.remove();
            blacklistUsersCount++;
        }
    })

    // hiding via post ids
    // ---
    // grann gallery item's post id
    let elementPost = galleryItem.id;
    // check if user matches with blacklisted post ids
    blacklistPosts.forEach(function(blacklistedPost) {
        if (elementPost === blacklistedPost) {
            galleryItem.remove();
            blacklistPostsCount++;
        }
    })
})

// display statistics in gallery view
// tags
if (blacklistTagsCount > 0) {
    var blacklistTagsCountNode = document.createElement("div");
    // handling plural for item count
    if (blacklistTagsCount > 1) {
        blacklistTagsCountNode.textContent = blacklistTagsCount +
        " items with blacklisted tag(s) hidden";
    } else {
        blacklistTagsCountNode.textContent = blacklistTagsCount +
        " item with blacklisted tag(s) hidden";
    }
    document.querySelector("#gallery-items").appendChild(blacklistTagsCountNode);
}
// users
if (blacklistUsersCount > 0) {
    var blacklistUsersCountNode = document.createElement("div");
    // handling plural for item count
    if (blacklistUsersCount > 1) {
        blacklistUsersCountNode.textContent = blacklistUsersCount +
        " items with blacklisted user(s) hidden";
    } else {
        blacklistUsersCountNode.textContent = blacklistUsersCount +
        " item with blacklisted user(s) hidden";
    }
    document.querySelector("#gallery-items").appendChild(blacklistUsersCountNode);
}
// posts
if (blacklistPostsCount > 0) {
    var blacklistPostsCountNode = document.createElement("div");
    // handling plural for item count
    if (blacklistPostsCount > 1) {
        blacklistPostsCountNode.textContent = blacklistPostsCount +
        " blacklisted posts hidden";
    } else {
        blacklistPostsCountNode.textContent = blacklistPostsCount +
        " blacklisted post hidden";
    }
    document.querySelector("#gallery-items").appendChild(blacklistPostsCountNode);
}
