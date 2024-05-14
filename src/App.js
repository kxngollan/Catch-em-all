// App.js
import { useCallback, useEffect, useState } from "react";
import PokemonGet from "./components/PokemonGet";
import GetPokePhotos from "./components/GetPokePhotos";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const mixedPokemon = useCallback(() => {
    return shuffle(pokemon);
  }, [pokemon]);

  const addToSelected = (poke) => {
    if (selected.map((p) => p.name).includes(poke.name)) {
      setPlaying(false);
    } else {
      setSelected([...selected, poke]);
      setScore(score + 1);
      setPokemon(mixedPokemon());
    }
  };

  useEffect(() => {
    if (selected.length === 20 || score === 20) {
      setPlaying(false);
    }
  }, [playing, selected, score]);

  useEffect(() => {
    if (playing) {
      setTimeout(() => {
        setTime(time + 1);
      }, 1000);
    }
  }, [time, playing]);

  useEffect(() => {
    const fetchData = async () => {
      setPlaying(false)
      try {
        const pokeNames = await PokemonGet();
        const pokePhotos = await GetPokePhotos(pokeNames);
        setPokemon(pokePhotos);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
      setPlaying(true)
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    setSelected([]);
    setScore(0);
    setTime(0);
    setPlaying(true);
  };

  if (playing) {
    return (
      <div className="App">
        <div className="title">
          <h2>Catch em all</h2>
          <h3>
            Score: {score}/20 Time:{time}
          </h3>
        </div>
        <div className="game-screen">
          <PokemonCard pokemon={pokemon} addToSelected={addToSelected} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="title">
          <h2>Catch em all</h2>
        </div>
        <div className="game-over">
          {score === 20 ? <h1>You win!</h1> : <h1>Game over!</h1>}
          <h3>Score: {score}/20</h3>
          <h3>Time: {time}</h3>
          <button type="button" onClick={reset}>
            Play again
          </button>
        </div>
      </div>
    );
  }
}

export default App;
