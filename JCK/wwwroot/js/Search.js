const searchBox = document.getElementById("searchBox");   

searchBox.addEventListener("keyup", (event) => {
    if (event.key !== "Enter")
        return;
    window.location.href = `/?search=${searchBox.value.trim()}`;
});

