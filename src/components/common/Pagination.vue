<template>
  <div :class="['pagination', lowerBoundDotsVisible ? 'pagination--lower-dots-visible' : '', upperBoundDotsVisible ? 'pagination--upper-dots-visible' : '']">
    <button 
      v-for="page in visiblePages" 
      :key="`pagination-item-${page}`" 
      :class="['pagination__btn', page==currentPage ? 'pagination__btn--active': '']"
      @click="clickPage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  props: {
    currentPage: Number,
    pagesNo: Number,
    neighborPagesNo: Number,
  },
  data() {
    return {
      visiblePages: [],
      lowerBoundDotsVisible: false,
      upperBoundDotsVisible: false
    }
  },
  async mounted() {
    this.updatePages(this.currentPage);
  },
  methods: {
    updatePages(pageNo){
      const lowerBound = Math.max(pageNo - this.neighborPagesNo, 2);
      const upperBound = Math.min(pageNo + this.neighborPagesNo, this.pagesNo);
      const neighborPages = Array.from(new Array(upperBound-lowerBound), (x, i) => i + lowerBound);
      this.visiblePages = [1, ...neighborPages, this.pagesNo];
      this.lowerBoundDotsVisible = lowerBound > 2;
      this.upperBoundDotsVisible = upperBound < this.pagesNo - 1;
    },
    clickPage(pageNo) {
      this.$emit('selectPage', pageNo);
      this.updatePages(pageNo);
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  &--lower-dots-visible::before {
    content: '...';
  }
  &--upper-dots-visible::after {
    content: '...';
  }
  &__btn:first-child{
    order: -1;
  }
  &__btn:last-child{
    order: 99999;
  }
  &__btn {
    background: #fff;
    border: none;
    cursor: pointer;
    border-radius: 34px;
    width: 34px;
    height: 34px;
    &:hover, &:focus {
      color: pink;
    }
    &--active {
      background: #000;
      color:white;
    }
  }
}
</style>
