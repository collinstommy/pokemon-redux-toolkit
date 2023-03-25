import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import { getPokemon, upVote, downVote } from "./store";

function App() {
  const { pokemon, loading, votes } = useAppSelector((state) => state.pokemon);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPokemon());
  }, []);

  const handleUpVote = (id: number) => {
    dispatch(upVote(id));
  };

  const handleDownVote = (id: number) => {
    dispatch(downVote(id));
  };

  if (loading) return "Loading";

  return (
    <div className="flex justify-center">
      <ul className="grid grid-cols-3 gap-y-8 gap-x-4">
        {pokemon.map((pokemon) => (
          <li key={pokemon.id} className="flex flex-col items-center">
            <img src={pokemon.image} alt={pokemon.name} />
            <div>{pokemon.name}</div>
            <div className="flex">
              <button
                className="border rounded px-3 hover:bg-slate-300 focus:outline-slate-700"
                onClick={() => handleDownVote(pokemon.id)}
              >
                -
              </button>
              <p className="px-2 max-w-lg">{votes[pokemon.id] || 0}</p>
              <button
                className="border rounded px-3 hover:bg-slate-300 focus:outline-slate-700"
                onClick={() => handleUpVote(pokemon.id)}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
