<template>
  <div
    v-if="isCalling"
    class="loading"
  >
    <a-icon
      class="loader"
      type="loading"
      :style="{ fontSize: '60px', color: '#EC2025' }"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      isCalling: false
    }
  },
  methods: {
    start () {
      this.isCalling = true
    },
    finish () {
      this.isCalling = false
    }
  }
}
</script>
<style lang="scss" scoped>
.loading {
    width: 100%;
    height: 100%;
    z-index: 99999;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    & .loader {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
    }
}
</style>
