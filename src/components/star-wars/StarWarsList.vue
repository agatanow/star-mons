<template>
  <div>
    <DownloadSelectableList
      :pagesNo="pagesNo"
      :itemIdPropertyKey="itemIdPropertyKey"
      :namePropertyKey="namePropertyKey"
      :getResourceList="getPeopleList"
      :getResourceItem="getResourceItem"
      :downloadFileName= "downloadFileName"
    />
  </div>
</template>

<script>
import DownloadSelectableList from '../common/DownloadSelectableList'
import { getPeopleList } from '@/services/star-wars';

export default {
  name: 'PokemonsList',
  components: { DownloadSelectableList },
  data() {
    return {
      pagesNo: 9,
      itemIdPropertyKey: 'url',
      namePropertyKey: 'name',
      downloadFileName: 'star-wars-data'
    }
  },
  methods: {
    getPeopleList,
    async getResourceItem(url) {
      let response = await fetch(url);
      return response.json();
    }
  }
}
</script>