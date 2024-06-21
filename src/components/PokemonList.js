import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = ({ onSelectProduct }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const fetches = response.data.results.map(async pokemon => {
          const pokemonData = await axios.get(pokemon.url);
          return { name: pokemon.name, image: pokemonData.data.sprites.front_default, id: pokemonData.data.id };
        });
        const pokemonDetails = await Promise.all(fetches);
        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {filteredPokemonList.map(pokemon => (
          <div key={pokemon.name} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
            <img src={pokemon.image} alt={pokemon.name} style={{ marginRight: '10px' }} />
            <span>{pokemon.name}</span>
            <button onClick={() => onSelectProduct(pokemon.id)} style={{ marginLeft: '10px' }}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
