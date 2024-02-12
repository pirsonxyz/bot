// Define a TypeScript interface to represent the game data
interface Game {
  away_team: string;
  away_score: number;
  home_team: string;
  home_score: number;
  game_time: string;
}

// Make a GET request to the Flask server
fetch('http://127.0.0.1:6969/games')
  .then(response => {
      // Check if the response is successful
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      // Parse JSON response
      return response.json();
  })
  .then((data: Game[]) => {
      // Process the data
      data.forEach(game => {
          console.log(`${game.away_team} ${game.away_score} - ${game.home_team} ${game.home_score} (${game.game_time})`);
      });
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
