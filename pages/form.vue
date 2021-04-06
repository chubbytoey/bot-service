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
          v-decorator="[
            'province',
            { rules: [{ required: true, message: 'กรุณาเลือกจังหวัด' }] },
          ]"
          placeholder="เลือกจังหวัดของท่าน"
          @change="handleSelectChange"
        >
          <a-select-option value="เชียงใหม่">
            เชียงใหม่
          </a-select-option>
          <a-select-option value="กรุงเทพ">
            กรุงเทพ
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="ไอดีไลน์">
        <a-input
          v-decorator="['lineId', { rules: [{ required: true, message: 'กรุณากรอกไอดีไลน์' }] }]"
          placeholder="ไอดีไลน์"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
    {{ success }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      data: {
        detail: '',
        province: '',
        topic: '',
        lineId: ''
      },
      success: null
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.data = values
          this.success = 'ส่งรายการสำเร็จ'
        } else {
          this.success = 'ลองใหม่อีกครั้ง'
        }
      })
    },
    handleSelectChange (value) {
      this.form.setFieldsValue({
        note: `Hi, ${value === 'เชียงใหม่' ? 'เชียงใหม่' : 'กรุงเทพ'}!`
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
