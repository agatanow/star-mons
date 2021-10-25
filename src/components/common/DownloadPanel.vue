<template>
  <div class="download-panel">
    <div class="download-panel__pop-up" v-if="isPopUpOpened">
      <div class="download-panel__pop-up__content">
        <div class="download-panel__pop-up__header">
          Download
          <button
            @click="closePopUp"
            class="download-panel__btn--close"
          >
            &times;
          </button>
        </div>
        <div v-if="fileGenerationCompleted">
          <p>file generated!</p>
          <a 
            class="download-panel__link"
            :href="jsonDataEncoded"
            :download="`${downloadFileName}.json`"
            >
            Download
          </a>
        </div>
        <div v-else-if="downloadItemsNo">
          Items to download: {{ downloadItemsNo }} <br/>
          Generating file...
          <div class="download-panel__loading-wrapper">
            <Loading :visible="true"/>
          </div>
        </div>
        <div v-else>
          There are no items to download yet
        </div>
      </div>
    </div>
    <button
      @click="openPopUp"
      class="download-panel__btn"
    >
      download 
    </button>
  </div>
</template>

<script>
import Loading from './Loading'

export default {
  name: 'DownloadPanel',
  components: { Loading },
  props: {
    downloadItemsNo: Number,
    getDownloadData: Function,
    downloadFileName: String
  },
  data() {
    return {
      isPopUpOpened: false,
      fileGenerationCompleted: false,
      jsonDataEncoded: ""
    }
  },
  methods: {
    closePopUp() {
      this.isPopUpOpened = false;
      this.fileGenerationCompleted = false;
    },
    async openPopUp() {
      this.isPopUpOpened = true;
      const response = await this.getDownloadData();
      this.jsonDataEncoded = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response));
      this.fileGenerationCompleted = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.download-panel {
  margin-top: 20px;
  &__pop-up {
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.6);
    position: fixed;
    top: 0;
    left: 0;
    display:flex;
    align-items:center;
    justify-content: center;
    &__content {
      background: white;
      padding: 20px;
      border-radius: 20px;
      width: 80%;
      max-width: 1000px;
    }
    &__header{
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
  &__btn {
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    color: white;  
    text-align: center;
    text-transform: uppercase; 
    background-image: linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%);
    transition: 0.5s;
    background-size: 200% auto;
    &:hover {
      background-position: right center; 
    }
    &--close {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 15px;
      padding: 5px;
      margin-top: -10px;
    }
  }
  &__loading-wrapper {
    position: relative;
    height: 70px;
  }
  &__link {
    text-decoration: none;
    &:hover, &:focus {
      color:pink;
    }
  }
}
</style>

