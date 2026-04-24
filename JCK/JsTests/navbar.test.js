import { jest } from '@jest/globals';

jest.unstable_mockModule('../wwwroot/js/location.js', () => ({
  get_location: jest.fn((cb) => cb("Dublin"))
}));

describe('navbar search', () => {

  let location;

  beforeEach(async () => {
    jest.resetModules();

    document.body.innerHTML = `
      <div id="sidebar"></div>
      <div id="navbar"></div>
    `;

    location = await import('../wwwroot/js/location.js');
  });

  test('sets placeholder using location', async () => {

    location.get_location.mockImplementation((cb) => cb("Dublin"));

    await import('../wwwroot/js/navbar.js');

    const searchBox = document.getElementById("searchBox");

    expect(searchBox.placeholder).toBe("Search in Dublin");
  });

  test('does nothing on other keys', async () => {

    location.get_location.mockImplementation((cb) => cb("Dublin"));

    await import('../wwwroot/js/navbar.js');

    const searchBox = document.getElementById("searchBox");

    searchBox.value = "pizza";

    searchBox.dispatchEvent(
      new KeyboardEvent("keyup", { key: "a", bubbles: true })
    );

    expect(window.location.href).toBe("http://localhost/");
  });

});