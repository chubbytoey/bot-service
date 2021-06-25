<template>
  <div class="container">
    <Report v-for="report in reports" :key="report.id" :data="report" />
  </div>
</template>

<script>
import Report from '~/components/report'
import reportAPI from '~/api/report'
export default {
  components: {
    Report
  },
  data () {
    return {
      reports: null
    }
  },
  mounted () {
    this.getReport()
  },
  methods: {
    getReport () {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      reportAPI.getReport(new URLSearchParams(decodeURIComponent(window.location.search).replace('?liff.state=', '')).get('province'))
        .then((res) => {
          this.reports = res
          this.$nuxt.$loading.finish()
        })
    }
  }
}
</script>

<style scoped>
.container {
  padding:20px;
}
</style>
