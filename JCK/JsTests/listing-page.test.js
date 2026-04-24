import { jest } from "@jest/globals";

/* -----------------------------
   GLOBAL MOCKS
------------------------------*/

global.fetch = jest.fn();
global.alert = jest.fn();

/* Mock Clerk so it NEVER runs real code */
jest.mock("@clerk/clerk-js", () => ({
  Clerk: jest.fn(() => ({
    load: jest.fn().mockResolvedValue(true),
    session: {
      getToken: jest.fn().mockResolvedValue("token")
    }
  }))
}));

/* Mock auth completely */
jest.mock("../wwwroot/js/auth.js", () => ({
  getUser: jest.fn().mockResolvedValue({
    username: "John",
    imageUrl: ""
  }),
  getUserId: jest.fn(() => 5)
}));

/* Mock helpers */
jest.mock("../wwwroot/js/common.js", () => ({
  shake_element: jest.fn(),
  format_date: jest.fn(),
  format_date_range: jest.fn()
}));

/* -----------------------------
   TEST SUITE
------------------------------*/

describe("listing page", () => {
  const mockListing = {
    userId: 1,
    carName: "Test Car",
    description: "Nice car",
    pricePerDay: 50,
    availableStartDate: "2030-01-01",
    availableEndDate: "2030-12-31",
    images: []
  };

  const mockReviews = {
    averageRating: 4,
    reviews: []
  };

  beforeEach(() => {
    jest.resetModules();
    fetch.mockReset();

    document.body.innerHTML = `
      <div id="image-list-container"></div>
      <div id="first-image-container"></div>
      <div id="image-grid-container"></div>
      <div id="image-layer"></div>

      <button id="view-photos-button"></button>

      <div id="star-selector">
        <div></div><div></div><div></div><div></div><div></div>
      </div>

      <div id="reviews-container"></div>
      <div id="reviews-title-text"></div>
      <div id="average-rating-text"></div>
      <div id="average-rating-parent"></div>

      <div id="review-input-box"></div>
      <textarea id="review-text-area"></textarea>
      <button id="post-review-button"></button>

      <input id="from-date" />
      <input id="to-date" />
      <button id="book-button"></button>

      <h1 id="listing-title-text"></h1>
      <p id="description-text"></p>

      <div id="owner-text"></div>
      <img id="owner-profile-picture" />
    `;
  });

  /* -----------------------------
     TEST HELPERS
  ------------------------------*/

  const setupFetch = () => {
    fetch.mockImplementation((url) => {
      if (url.includes("/api/Listing/")) {
        return Promise.resolve({
          ok: true,
          json: async () => mockListing
        });
      }

      if (url.includes("/api/Reviews")) {
        return Promise.resolve({
          ok: true,
          json: async () => mockReviews
        });
      }

      if (url.includes("/book")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({})
        });
      }

      return Promise.resolve({
        ok: true,
        json: async () => ({})
      });
    });
  };

  /* -----------------------------
     TEST 1
  ------------------------------*/

  test("loads listing and renders title", async () => {
    setupFetch();

    await import("../wwwroot/js/listing-page.js");

    expect(
      document.getElementById("listing-title-text").textContent
    ).toBe("Test Car");
  });

  /* -----------------------------
     TEST 2
  ------------------------------*/

  test("posts review when valid", async () => {
    setupFetch();

    await import("../wwwroot/js/listing-page.js");

    document.getElementById("review-text-area").value = "Great car";
    document.querySelectorAll("#star-selector div")[4].click();
    document.getElementById("post-review-button").click();

    expect(fetch).toHaveBeenCalledWith(
      "/api/Reviews",
      expect.objectContaining({
        method: "POST"
      })
    );
  });

  /* -----------------------------
     TEST 3
  ------------------------------*/

  test("handles booking request", async () => {
    setupFetch();

    await import("../wwwroot/js/listing-page.js");

    document.getElementById("from-date").value = "2030-02-01";
    document.getElementById("to-date").value = "2030-02-05";
    document.getElementById("book-button").click();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/book"),
      expect.any(Object)
    );
  });
});