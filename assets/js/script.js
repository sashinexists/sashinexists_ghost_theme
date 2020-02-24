let ghostSearch = new GhostSearch({
    key: 'da73f2357063aed766e8ff9166',//"858cb0231865f4b8d0baa1ca75" for development, "da73f2357063aed766e8ff9166" for production
    host: 'https://sashinexists.com'//"http://localhost:2368" for development, "https://sashinexists.com" for production
})

const SEARCH_BUTTON = document.querySelector(".search-button");
const MENU_BUTTON = document.querySelector(".js-menu-button");
const MAIN = document.querySelector("main");

SEARCH_BUTTON.addEventListener("click", toggleSearchBar);
MENU_BUTTON.addEventListener("click", toggleDeviceMenu);

const NAV = document.querySelector(".js-nav-hide");
const GHOST_SEARCH_FIELD = document.querySelector(".ghost-search-field");
const SEARCH_BAR = document.querySelector(".search-bar");
const RESULTS_FIELD = document.querySelector(".results-field");

SEARCH_BAR.addEventListener("input", toggleHideMainContent);


const DEVICE_MENU = document.querySelector(".js-device-nav");

const BACK_TO_TOP = document.querySelector(".back-to-top-button");

BACK_TO_TOP.addEventListener("click", scrollToTop);

let deviceMenuActive = false;
let searchResultsActive = false;

function toggleDeviceMenu(){
    if (!deviceMenuActive) {
        closeSearch();
        openDeviceMenu();
    } else {
        closeDeviceMenu();
    }
}

function toggleSearchBar() {
    if (!searchResultsActive) {
        openSearch();
        closeDeviceMenu();
    } else {
        closeSearch();
    }
}

function toggleHideMainContent() {
    SEARCH_BAR.value.length > 0 ? MAIN.classList.add("hide") : MAIN.classList.remove("hide");
}

function openSearch(){
    GHOST_SEARCH_FIELD.classList.remove("hide");
    NAV.classList.add("hide");
    RESULTS_FIELD.classList.add("ghost-search-results");
    RESULTS_FIELD.classList.remove("hide");
    SEARCH_BAR.focus();
    searchResultsActive = true;
}

function closeSearch(){
    GHOST_SEARCH_FIELD.classList.add("hide");
    NAV.classList.remove("hide");
    RESULTS_FIELD.classList.remove("ghost-search-results");
    RESULTS_FIELD.classList.add("hide");
    RESULTS_FIELD.innerHTML = "";
    searchResultsActive = false;
    SEARCH_BAR.value = null;
    toggleHideMainContent();
}

function openDeviceMenu() {
    DEVICE_MENU.classList.remove("hide");
    MAIN.classList.add("hide");
    deviceMenuActive = true;
}

function closeDeviceMenu() {
    DEVICE_MENU.classList.add("hide");
    MAIN.classList.remove("hide");
    deviceMenuActive = false;
}

window.onscroll = function() {displayBackToTopButton()};

function displayBackToTopButton() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    BACK_TO_TOP.style.opacity = "1";
  } else {
    BACK_TO_TOP.style.opacity = ".3";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 