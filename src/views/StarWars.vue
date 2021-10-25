<template>
  <div class="star-wars">
    <h1> Star Wars </h1>
    <StarWarsList>
    </StarWarsList>
  </div>
</template>

<script>
import StarWarsList from '../components/star-wars/StarWarsList';

export default {
  name: 'StarWars',
  components: {
    StarWarsList
  },
}
</script>