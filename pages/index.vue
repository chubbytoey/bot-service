<template>
  <div class="container">
    {{ location }}
    <div id="map" />
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="หัวข้อ">
        <a-input
          v-decorator="['topic', { rules: [{ required: true, message: 'กรุณากรอกหัวข้อ!' }] }]"
          placeholder="หัวข้อ"
        />
      </a-form-item>
      <a-form-item label="รายละเอียด">
        <a-textarea
          v-model="value"
          v-decorator="['detail', { rules: [{ required: true, message: 'กรุณากรอกรายละเอียด' }] }]"
          placeholder="รายละเอียด"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-item>
      <a-form-item label="จังหวัด">
        <a-select
          v-model="data.province"
          placeholder="เลือกจังหวัดของท่าน"
          @change="handleSelectChange"
        >
          <a-select-option value="กรุงเทพมหานคร">
            กรุงเทพ
          </a-select-option>
          <a-select-option value="เชียงใหม่">
            เชียงใหม่
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import liff from '@line/liff'
import axios from 'axios'
import reportAPI from '~/api/report'

export default {
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      data: {
        topic: '',
        province: '',
        detail: '',
        userId: '',
        type: new URLSearchParams(decodeURIComponent(window.location.search).replace('?liff.state=', '')).get('type')
      },
      location: {
        latitude: '',
        longitude: ''
      }
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()
    // })
    this.success()
    // const self = this
    // setTimeout(function () {
    //   liff.init({ liffId: '1655832876-mQJo6BbZ' })
    //     .then(() => {
    //       if (!liff.isLoggedIn()) {
    //         liff.login()
    //       } else {
    //         liff.getProfile().then((profile) => {
    //           self.data.userId = profile.userId
    //           self.getLocation()
    //         }).catch(err => console.log(err))
    //       }
    //     }).catch(err => console.log(err))
    // }, 0)
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.data.topic = values.topic
          if (values.province) {
            this.data.province = values.province
          }
          this.data.detail = values.detail
          this.data.lineId = values.lineId
          await reportAPI.addReport(this.data).then((res) => {
            if (res.successful) {
              liff.closeWindow()
            }
          })
        }
      })
    },
    handleSelectChange (value) {
      this.form.setFieldsValue({
        note: `Hi, ${value === 'เชียงใหม่' ? 'เชียงใหม่' : 'กรุงเทพ'}!`
      })
    },
    getLocation () {
      if (window.navigator) {
        window.navigator.geolocation.getCurrentPosition(this.success, this.failed)
      }
    },
    async success () {
      // const geocoder = window.google.maps
      const latlng = {
        lat: '18.78774487571035',
        lng: '98.95339548758108'
      }
      // console.log('>>>>', geocoder)
      this.location.longitude = latlng
      // geocoder.geocode({ location: latlng }, (results, status) => {
      //   alert('เข้า')
      //   this.location.latitude = results
      // })
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&key=AIzaSyCryQIhioR7MbzgqBmEozaTxpRNyHNfb9k`
      const res = await axios.get(url)
      const data = res.data.results[0].address_components.find((value) => {
        return value.types.includes('administrative_area_level_1')
      })
      console.log('>>>>', data.short_name)
    },
    failed (error) {
      console.log('failed', error)
      this.$nextTick(() => {
        this.$nuxt.$loading.finish()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding:20px;
}
</style>
<style>
.ant-col-12 {
  text-align:center;
  margin: 0;
}
</style>
