<template>
  <div class="download-selectable-list">
    <div class="download-selectable-list__bar">
      <div>
        <input 
          type="checkbox"
          :name="'selectAll'"
          v-model="selectAllCheckboxValue"
          @change="(event) => onChangeSelectAllCheckbox(event)"
        />
        <label> Select all </label>
      </div>
      <Pagination
        :pagesNo="pagesNo"
        :neighborPagesNo="3"
        v-on:selectPage="loadPage"
      />
    </div>
    <ul class="download-selectable-list__list">
      <li v-for="(el, idx) in list" :key="`selectable-item-${idx}`"> 
        <input 
          type="checkbox"
          :name="el[itemIdPropertyKey]"
          v-model="listValues[el[itemIdPropertyKey]]"
          @change="(event) => onChangeCheckbox(event)"
        />
        {{ el[namePropertyKey] }}
      </li>
    </ul>

    <DownloadPanel
      :downloadItemsNo="downloadItemsIds.size"
      :getDownloadData="getDownloadData"
      :downloadFileName="downloadFileName"
    />
    <Loading :visible="loading"/>
  </div>
</template>

<script>
import Pagination from './Pagination'
import DownloadPanel from './DownloadPanel'
import Loading from './Loading'

export default {
  name: 'DownloadSelectableList',
  components: {
    Pagination,
    DownloadPanel,
    Loading
  },
  props: {
    itemIdPropertyKey: String,
    namePropertyKey: String,
    pagesNo: Number,
    getResourceList: Function,
    getResourceItem: Function,
    downloadFileName: String
  },
  data() {
    return {
      list: [],
      listValues: {},
      downloadItemsIds: new Set(),
      selectAllCheckboxValue: false,
      loading: false,
    }
  },
  async mounted() {
    await this.loadPage(1);
  },
  methods: {
    selectItem(id, value) {
      if(value) {
        this.downloadItemsIds.add(id);
      }
      else {
        this.downloadItemsIds.delete(id);
      }
      this.listValues[id] = value;
    },
    onChangeCheckbox(event) {
      this.selectItem(event.target.name, event.target.checked);
    },
    onChangeSelectAllCheckbox(event) {
      this.list.forEach(el => {
        this.selectItem(el[this.itemIdPropertyKey], event.target.checked)
      })
    },
    async loadPage(pageNo) {
      this.loading = true;
      const res = await this.getResourceList(pageNo);
      this.list = res.results;
      this.listValues = this.list.reduce((obj, item) => 
        (obj[item[this.itemIdPropertyKey]] = this.downloadItemsIds.has(item[this.itemIdPropertyKey]), obj), {}
      );
      this.selectAllCheckboxValue = Object.values(this.listValues).every(item => item === true);
      this.loading = false;
    },
    async getDownloadData() {
      let res = [];
      await Promise.all(Array.from(this.downloadItemsIds).map(async el => {
        const itemData = await this.getResourceItem(el);
        res.push(itemData)
      }));
      return res;
    }
  }
}
</script>

<style lang="scss" scoped>
.download-selectable-list{
  position:relative;
  &__bar {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__list {
    list-style-type: none;
    padding:0;
    margin: 5px 0;
    li {
      padding: 10px;
      background: $--light-gray;
      margin-bottom: 5px;
      border-radius: 20px;
    }
  }
}
</style>

