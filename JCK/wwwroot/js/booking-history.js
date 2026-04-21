const container = document.getElementById("booking-container");

async function loadBookingHistory() {
    try {
        const response = await fetch("/history", {
            credentials: "include" // important if using auth cookies
        });

        if (!response.ok) {
            container.innerHTML = "<p>You are not logged in.</p>";
            return;
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            container.innerHTML = "<p>No bookings found.</p>";
            return;
        }

        container.innerHTML = "";

        data.forEach(booking => {
            const card = document.createElement("div");
            card.className = "booking-card";

            card.innerHTML = `
                <div class="car-name">${booking.carName}</div>

                <p><strong>Start:</strong> ${new Date(booking.startDate).toLocaleDateString()}</p>
                <p><strong>End:</strong> ${new Date(booking.endDate).toLocaleDateString()}</p>

                <div class="price">€${booking.price}</div>

                <div class="status">
                    Status: ${booking.confirmed ? "Confirmed" : "Pending"}
                </div>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Failed to load booking history.</p>";
    }
}

loadBookingHistory();