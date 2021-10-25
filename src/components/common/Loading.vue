<template>
  <div class="loading" v-if="visible">
    <span class="loading__spinner" />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    visible: Boolean
  },
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: $--white-semi-transparent;

  &__spinner::after {
    content: '';
    width: 30px;
    height: 30px;
    border-radius: 30px;
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    border: 5px solid $--pink;
    border-right: 5px solid transparent;
    animation: spinner 1s linear infinite;
  }
}

@keyframes spinner {
  to {transform: rotate(360deg);}
}
</style>




