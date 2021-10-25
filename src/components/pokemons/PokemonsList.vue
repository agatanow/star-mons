<template>
  <div>
    <DownloadSelectableList
      :pagesNo="pagesNo"
      :itemIdPropertyKey="itemIdPropertyKey"
      :namePropertyKey="namePropertyKey"
      :itemsPerPage="itemsPerPage"
      :getResourceList="getResourceList"
      :getResourceItem="getResourceItem"
      :downloadFileName="downloadFileName"
    />
  </div>
</template>

<script>
import DownloadSelectableList from '../common/DownloadSelectableList'
import { getPokemonsList } from '@/services/pokemons';

export default {
  name: 'PokemonsList',
  components: { DownloadSelectableList },
  data() {
    return {
      pagesNo: 112,
      itemIdPropertyKey: 'url',
      namePropertyKey: 'name',
      itemsPerPage: 10,
      downloadFileName: 'pokemons-data'
    }
  },
  methods: {
    async getResourceList(pageNo) {
      const res = await getPokemonsList({ 
        limit: this.itemsPerPage, 
        offset: (pageNo - 1) * this.itemsPerPage
      });
      return res;
    },
    async getResourceItem(url) {
      let response = await fetch(url);
      return response.json();
    }
  }
}
</script>