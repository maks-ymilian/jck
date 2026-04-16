import { get_location } from './location.js'
import { BASE_URL } from './common.js'

const searchBox = document.getElementById("searchBox");   

get_location((location) => searchBox.placeholder = "Search in " + location);

searchBox.addEventListener("keyup", (event) => {
    if (event.key !== "Enter")
        return;

    window.location.href = BASE_URL + `/?search=${searchBox.value.trim()}`;
});