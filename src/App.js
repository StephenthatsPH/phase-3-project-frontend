import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from 'react'
import './App.css';
import Header from './components/Header';

function App() {

  const [platforms, setPlatforms] = useState([])
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      fetch('http://localhost:9292/platforms')
        .then(res => {
          if (!res.ok) {
            throw Error('Could not fetch the data')
          }
          return res.json();
        })
        .then(data => {
          setPlatforms(data);
          setIsPending(false);
          setError(null);
          setRefresh(false);
        })
        .catch(err => {
          setIsPending(false);
          setError(err.message);
        })
    }
  }, []);


  function handleNewGame(newGame) {
    const platform = platforms.find((platform) => platform.id === newGame.platform_id)
    const updatedGames = [...platform.games, newGame]
    const updatedPlatform = { ...platform, games: updatedGames }
    const updatedPlatforms = platforms.map((obj) => {
      if (obj.id === platform.id) {
        return updatedPlatform
      }
      else {
        return obj
      }
    })
    setPlatforms(updatedPlatforms)
  }

  function handleNewPlatform(newPlatform) {
    setPlatforms([...platforms, { ...newPlatform, games: [] }])
  }

  function handleDeletedGame(deletedGame) {
    const platform = platforms.find((platform) => platform.id === deletedGame.game.platform_id)
    const updatedGames = platform.games.filter((g) => g.id !== deletedGame.game.id);
    const updatedPlatform = { ...platform, games: updatedGames }
    const updatedPlatforms = platforms.map((obj) => {
      if (obj.id === platform.id) {
        return updatedPlatform
      }
      else {
        return obj
      }
    })
    setPlatforms(updatedPlatforms);
  }

  function handleEditedGames(updatedGame) {
    const platform = platforms.find((platform) => platform.id === updatedGame.platform_id)
    const updatedGames = platform.games.map((game) => {
      if (game.id === updatedGame.id) {
        return updatedGame;
      } else {
        return game;
      }
    });
    const updatedPlatform = { ...platform, games: updatedGames }
    const updatedPlatforms = platforms.map((obj) => {
      if (obj.id === platform.id) {
        return updatedPlatform
      }
      else {
        return obj
      }
    })
    setPlatforms(updatedPlatforms);
  }

  return (
    <Router>
      <div className="game-app">
        <Header platforms={platforms} onGameDelete={handleDeletedGame} onGameEdit={handleEditedGames} onAddPlatform={handleNewPlatform} onAddGame={handleNewGame} />
      </div>
    </Router>
  );
}

export default App;
