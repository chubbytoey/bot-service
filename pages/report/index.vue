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
    async getReport () {
      await reportAPI.getReport(this.$route.query.province).then((res) => {
        this.reports = res
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
