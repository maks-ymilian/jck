import { get_location } from './location.js'

const searchBox = document.getElementById("searchBox");   

get_location((location) => searchBox.placeholder = "Search near " + location + "by name");

searchBox.addEventListener("keyup", (event) => {
    if (event.key !== "Enter")
        return;

    window.location.href = `/?search=${searchBox.value.trim()}`;
});