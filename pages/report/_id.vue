<template>
  <div class="container">
    <div class="text-wrap">
      <p class="topic">
        หัวข้อ : {{ data.topic }}
      </p>
      <p>
        จังหวัด : {{ data.province }}
      </p>
      <p>
        รายละเอียด : {{ data.detail }}
      </p>
    </div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="ตอบกลับ">
        <a-textarea
          v-model="value"
          v-decorator="['reply', { rules: [{ required: true, message: 'กรุณากรอกข้อมูลการตอบกลับ' }] }]"
          placeholder="ตอบกลับ"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">
          ยืนยัน
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import reportAPI from '~/api/report'
export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      data: {},
      reply: ''
    }
  },
  mounted () {
    this.getReport()
  },
  methods: {
    async getReport () {
      await reportAPI.queryReport(this.$route.params.id).then((res) => {
        this.data = res
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const data = {
            message: values.reply,
            userId: this.data.userId
          }
          await reportAPI.reply(data)
          this.$message.success('สำเร็จ')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding:20px;
  & > .text-wrap {
    margin-bottom: 10px;
    & > .topic {
      font-weight: 700;
      font-size: 16px;
    }
    & > p {
      margin: 0;
    }
  }
}
</style>
<style>
.ant-col-12 {
  text-align:center;
  margin: 0;
}
</style>
