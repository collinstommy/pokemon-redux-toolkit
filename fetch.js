import fs from 'fs'


const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')

const data = await response.json()
const { results: pokemon } = data;
const getDetails = async (name, i) => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name)
  const data = await response.json()

  const stats = data.stats.reduce((obj, detail) => ({
    ...obj,
    [detail.stat.name]: detail.base_stat
  }), {})

  return {
    name,
    id: i,
    image: data.sprites.front_default,
    ...stats
  };
}

const allPokemon = await Promise.all(pokemon.map(({ name }, i) => getDetails(name, i)))


try {
  fs.writeFileSync('pokemon.json', JSON.stringify(allPokemon, null, 4));
} catch (err) {
  console.error(err);
}
