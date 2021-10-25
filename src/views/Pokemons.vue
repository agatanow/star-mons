<template>
  <div class="pokemons">
    <h1> Pokemons </h1>
    <PokemonsList>
    </PokemonsList>
  </div>
</template>

<script>
import PokemonsList from '../components/pokemons/PokemonsList';

export default {
  name: 'Pokemons',
  components: {
    PokemonsList
  },
}
</script>

