<template>
  <div class="container">
    {{ latitude }}
    {{ longitude }}
    {{ country }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      latitude: '',
      longitude: '',
      country: ''
    }
  },
  mounted () {
    this.getLocation()
  },
  methods: {
    getLocation () {
      if (window.navigator) {
        window.navigator.geolocation.getCurrentPosition(this.success, this.failed)
      }
    },
    success (position) {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      const apiKey = 'b9a603fbea534698ba75cab622aa2109'
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${this.latitude},${this.longitude}&key=${apiKey}`
      axios.get(url).then((res) => {
        this.country = res.data.results[0].components.state
      })
    },
    failed () {
      this.latitude = 'country'
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding:20px;
}
</style>
