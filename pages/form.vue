<template>
  <div class="container">
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
          <a-select-option value="เชียงใหม่">
            เชียงใหม่
          </a-select-option>
          <a-select-option value="กรุงเทพมหานคร">
            กรุงเทพ
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
    const self = this
    setTimeout(function () {
      liff.init({ liffId: '1655832876-mQJo6BbZ' })
        .then(() => {
          if (!liff.isLoggedIn()) {
            liff.login()
          } else {
            liff.getProfile().then((profile) => {
              self.data.userId = profile.userId
            }).catch(err => console.log(err))
          }
        }).catch(err => console.log(err))
    }, 0)
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.data.topic = values.topic
          this.data.province = values.province
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
    success (position) {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      const apiKey = 'b9a603fbea534698ba75cab622aa2109'
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${this.latitude},${this.longitude}&key=${apiKey}`
      axios.get(url).then((res) => {
        if (res.data.results[0].components.state === 'Chiang Mai Province') {
          this.data.province = 'เชียงใหม่'
        } else if (res.data.results[0].components.state === 'Bangkok Province') {
          this.data.province = 'กรุงเทพมหานคร'
        }
        // this.data.province = res.data.results[0].components.state
      })
    },
    failed () {
      console.log('failed')
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
