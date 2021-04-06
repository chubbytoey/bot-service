<template>
  <div class="block" @click="changePage">
    <div class="topic">
      เรื่อง : {{ data.topic }}
    </div>
    <div class="province">
      ประเภท : {{ typeReport }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {
          type: '',
          userId: '',
          province: '',
          detail: '',
          lineId: '',
          topic: '',
          id: ''
        }
      }
    }
  },
  data () {
    return {
      typeReport: null
    }
  },
  mounted () {
    this.changeType()
  },
  methods: {
    changePage () {
      this.$router.push(`/report/${this.data.id}`)
    },
    changeType () {
      if (this.data.type === 'AIRFREIGHT') {
        this.typeReport = 'ทางอากาศ'
      } else if (this.data.type === 'OVERLAND') {
        this.typeReport = 'ทางบก'
      } else {
        this.typeReport = 'ทางน้ำ'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.block {
  width: 100%;
  margin-bottom:12px;
  border-radius:8px;
  padding:8px 20px;
  border:1px solid rgba(0,0,0,0.2);
  cursor: pointer;
  & > .topic {
    font-weight: 700;
    font-size:14px;
    margin-right: 12px;
  }
  & > .province {
    font-size: 12px;
  }
  & > p {
    margin: 0;
  }
}
</style>
