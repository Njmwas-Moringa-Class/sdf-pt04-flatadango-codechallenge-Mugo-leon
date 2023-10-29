document.addEventListener("DOMContentLoaded", () => {
  // Define the base URL for API requests.
  const BASE_URL = "http://localhost:3000";
  
  // Initialize the available tickets variable.
  let availableTickets = 0;

  // Function to fetch movie details and update the UI.
  const getAndDisplayMovies = async (filmsId) => {
    try {
      // Fetch movie details from the API.
      const response = await fetch(`${BASE_URL}/films/${filmsId}`);

      // Check if the API request was successful.
      if (!response.ok) {
        throw Error("Failed to fetch movie details.");
      }

      // Parse movie data from the response.
      const filmData = await response.json();
      const {
        title,
        runtime,
        showtime,
        capacity,
        tickets_sold,
        description,
        poster,
      } = filmData;

      // Calculate the number of available tickets.
      availableTickets = capacity - tickets_sold;

      // Update the DOM elements with movie details.
      document.getElementById("poster").src = poster;
      document.getElementById("title").textContent = title;
      document.getElementById("runtime").textContent = `${runtime} minutes`;
      document.getElementById("showtime").textContent = showtime;
      document.getElementById("ticket-num").textContent = availableTickets;
      document.getElementById("film-info").textContent = description;
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  // Function to update the available tickets in the UI.
  const updateAvailableTickets = () => {
    document.getElementById("ticket-num").textContent = availableTickets;
  };

  // Function to simulate a ticket purchase.
  const buyTicket = async () => {
    try {
      // Check if there are available tickets to purchase.
      if (availableTickets > 0) {
        // Simulate a ticket purchase (no persistence).
        availableTickets -= 1;

        // Update available tickets on the frontend.
        updateAvailableTickets();

        // Simulate updating the server.
        const ticketsSold = capacity - availableTickets;

        // Simulate a successful purchase after a delay.
        setTimeout(() => {
          // Simulate updating the server.
          filmData.tickets_sold = ticketsSold; 
        }, 1000);
      }
    } catch (error) {
      console.error("Error purchasing ticket:", error);
    }
  };

  // Function to populate the movie list from the API.
  const populateMovieList = async () => {
    try {
      // Get the element that will hold the list of movies.
      const filmsList = document.getElementById("films");

      // Fetch the list of movies from the API.
      const response = await fetch(`${BASE_URL}/films`);

      // Check if the API request was successful.
      if (!response.ok) {
        throw new Error("Failed to fetch movie list.");
      }

      // Parse the list of films from the response.
      const films = await response.json();

      // Iterate through the list of films and create list items for each.
      films.forEach((film) => {
        const li = document.createElement("li");
        li.textContent = film.title;
        li.classList.add("film-item");

        // Add a click event listener to display movie details when clicked.
        li.addEventListener("click", () => {
          getAndDisplayMovies(film.id);
        });

        // Add the list item to the movie list.
        filmsList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  // Remove the placeholder <li> element if it exists.
  const placeholderLi = document.querySelector("#films > li");
  if (placeholderLi) {
    placeholderLi.remove();
  }

  // Call populateMovieList to fetch and display the list of movies.
  populateMovieList();

  // Add a click event listener to the "Buy Ticket" button.
  const buyButton = document.getElementById("buy-ticket");
  buyButton.addEventListener("click", () => {
    buyTicket();
  });

  // Fetch and display movie details for the first movie.
  getAndDisplayMovies(1);
});




