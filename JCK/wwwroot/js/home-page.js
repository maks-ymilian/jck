import { get_location } from '/js/location.js'

async function fetchListings(query) {
    try {
        let response;
        if (query)
            response = await fetch(`/api/listing/search?query=${encodeURIComponent(query)}`);
        else
            response = await fetch("/api/Listing");

        if (!response.ok) throw new Error(`${response.status}`);
        return await response.json();
    } catch (err) {
        console.error('Error fetching listings:', err);
    }
}

const listing_container = document.getElementById("listing-container");
const title = document.getElementById("title");
const listingList = document.getElementById("listingList");

const params = new URLSearchParams(window.location.search);
const listings = await fetchListings(params.get("search"));
listings.forEach(async item => {
    const response = await fetch(`/api/Listing/${item.id}`);
    if (!response.ok) console.log(`couldnt get image: ${response.status}`);
    const images = (await response.json()).images;
    const image_url = images.length !== 0 ? images[0] : "";

    listing_container.insertAdjacentHTML("beforeend", `
        <a href="/listing?id=${item.id}">
            <div class="card" style="padding: 16px; gap: 7px; display: flex; flex-direction: column">
                <img src="${image_url}" style="width: 100%; aspect-ratio: 1 / 1; border-radius: 16px; object-fit: cover">
                <p style="margin: 0px; font-size: 16px">${item.carName}</p>
                <p style="margin: 0px; font-size: 14px; color: #676767">${"22 - 24 May"}<br/>&euro;${item.price} &middot; <svg style="height: 10px; width: 10px; fill: #676767"><use href="#star"></use></svg> ${item.review}</p>
            </div>
        </a>
    `);
});

get_location((location) => {
    title.innerHTML = "Cars in " + location;
});
