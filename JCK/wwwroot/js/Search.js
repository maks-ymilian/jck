const searchBox = document.getElementById("searchBox");   
const listingList = document.getElementById("listingList");



const SearchDatabase = async (query) => {
    try{
        const response = await fetch(`/api/listing/search?query=${encodeURIComponent(query)}`);
        const data = await response.json(); 

        listingList.innerHTML = "";
        data.forEach(listing => {
            const listing
        })
    }
}
