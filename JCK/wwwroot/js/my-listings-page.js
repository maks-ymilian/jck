import { getUserId } from "./auth.js";
import { format_date_range } from './common.js'

let listings = [];
try {
    const userId = await getUserId();
    const response = await fetch(`/api/listing/user?userId=${userId}`);

    if (!response.ok)
        throw new Error("code " + response.status + ": " + response);

    listings = await response.json()
}
catch (e)
{
    console.error(e);
    alert("Failed to fetch listings");
}

const container = document.getElementById("container");
const main = document.getElementById("main");
container.id = "listing-container";

if (listings.length === 0) {
    container.style = "display: none";
    main.insertAdjacentHTML("beforeend", `
        <p>You don't have any listings.</p>
        <form style="display: inline" action="/create-listing" method="get">
            <button>Create a listing</button>
        </form>
    `);
}
else {
    listings.forEach(async listing => {
        try {
            const response = await fetch(`/api/Listing/${listing.id}`);
            if (!response.ok)
                throw new Error("couldnt fetch listing: " + response);

            const info = await response.json();
            const average_rating = info.review;
            container.insertAdjacentHTML("beforeend", `
                <a href="/listing?id=${listing.id}" style="text-decoration:none; color:inherit;">
                    <div class="listing-card">
                        <div class="img-wrap">
                            <div class="slides">
                                <div class="slide"><img src="${info.images[0]}"/></div>
                            </div>
                        </div>
                        <div class="card-info">
                            <div class="card-row">
                                <span class="card-title">${listing.carName}</span>
                                ${average_rating == null || average_rating === -1 ? "" : `
                                    <span class="card-rating" style="font: inherit; font-size: 14px; margin-right: 5px">
                                        <svg width="14" height="14" viewBox="0 0 12 12" fill="#222"><path d="M6 1l1.4 2.8 3.1.4-2.25 2.2.53 3.1L6 8l-2.78 1.5.53-3.1L1.5 4.2l3.1-.4z"/></svg>
                                        ${average_rating.toFixed(2)}
                                    </span>
                                `}
                            </div>
                            <div class="card-sub">${format_date_range(listing.startDate, listing.endDate, true)}</div>
                            <div class="card-price"><strong>&euro;${listing.price}</strong> / day</div>
                        </div>
                    </div>
                </a>
            `);
        }
        catch (e) {
            console.error(e);
            alert("failed to fetch listings");
        }
    });
}

