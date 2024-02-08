const PokemonCard = ({ pokemon, addToSelected }) => {
  return pokemon.map((poke, index) => {
    return (
      <div
        key={index}
        className="pokemon-card"
        onClick={() => addToSelected(poke)}
      >
        <img src={poke.image} alt={poke.name} />
        <h2>{poke.name}</h2>
      </div>
    );
  });
};

export default PokemonCard;
