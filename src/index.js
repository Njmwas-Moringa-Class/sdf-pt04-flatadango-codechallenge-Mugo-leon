document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "http://localhost:3000";
  let availableTickets = 0; // Initialize the available tickets variable.

  // Function to fetch movie details and update the UI
  const GetAndDisplayMovies = async (filmsId) => {
    try {
      const response = await fetch(`${BASE_URL}/films/${filmsId}`);
      if (!response.ok) {
        throw Error("Failed to get movie details.");
      }
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

      // Calculate available tickets
      availableTickets = capacity - tickets_sold; // Update availableTickets

      // Update the DOM elements with movie details
      document.getElementById("poster").src = poster;
      document.getElementById("title").textContent = title;
      document.getElementById("runtime").textContent = `${runtime} minutes`;
      document.getElementById("showtime").textContent = showtime;
      document.getElementById("ticket-num").textContent = availableTickets; // Update available tickets
      document.getElementById("film-info").textContent = description;
    } catch (error) {
      console.error("Error getting movie details:", error);
    }
  };

  // Function to update available tickets and handle ticket purchase
  const updateAvailableTickets = () => {
    // Update the number of available tickets in the DOM
    document.getElementById("ticket-num").textContent = availableTickets;
  };

  // Function to simulate a ticket purchase
  const buyTicket = async () => {
    try {
      if (availableTickets > 0) {
        // Simulate a ticket purchase (no persistence)
        availableTickets -= 1;

        // Update available tickets on the frontend
        updateAvailableTickets();

        // Simulate updating the server 
        const newTicketsSold = capacity - availableTickets;

        // Simulate a successful purchase
        setTimeout(() => {
          // Simulate updating the server 
          filmData.tickets_sold = newTicketsSold;
        }, 1000);
      }
    } catch (error) {
      console.error("Error purchasing ticket:", error);
    }
  };

  // Function to populate the movie list
  const populateMovieList = async () => {
    try {
      const filmsList = document.getElementById("films");
      const response = await fetch(`${BASE_URL}/films`);
      if (!response.ok) {
        throw new Error("Failed to fetch movie list.");
      }
      const films = await response.json();
      films.forEach((film) => {
        const li = document.createElement("li");
        li.textContent = film.title;
        li.classList.add("film-item");
        li.addEventListener("click", () => {
          GetAndDisplayMovies(film.id);
        });
        filmsList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  const placeholderLi = document.querySelector("#films > li");
  if (placeholderLi) {
    placeholderLi.remove();
  }

  // Call populateMovieList to fetch and display the list of movies
  populateMovieList();

  // Add a click event listener to the "Buy Ticket" button
  const buyButton = document.getElementById("buy-ticket");
  buyButton.addEventListener("click", () => {
    buyTicket();
  });

  // Fetch and display movie details for The Giant Gila Monster
  GetAndDisplayMovies(1);
});



