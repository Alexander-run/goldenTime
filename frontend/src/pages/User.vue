<script lang="ts" setup>
import {
  ref,
  Ref
} from 'vue'
import axios from 'axios'

interface FormData {
  name: string,
  depatureDate: string,
  backDate: string,
  headCount: number,
  description: string,
}
const formData: Ref<FormData> = ref({
  name: '',
  depatureDate: '',
  backDate: '',
  headCount: 0,
  description: '',
})
const onSubmit = () => {
  // TODO post update to backend
  axios.post('/api/cases/create', formData.value).then(res => {
    console.log(res)
  })
}
</script>
<template>
  <div class="user">
    <h2>输入你的信息</h2>
    {{ formData.backDate }}
    <el-form :model="formData" class="form">
      <el-form-item label="怎么称呼～" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="出发日期" prop="depatureDate">
        <el-date-picker
          v-model="formData.depatureDate"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="回程日期" prop="backDate">
        <el-date-picker
          v-model="formData.backDate"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="出行人数" prop="headCount">
        <el-input-number v-model="formData.headCount"></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input type="textarea" rows="5" v-model="formData.description"></el-input>
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button @click="onSubmit" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="less" scoped>
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  .submit-btn {
    :deep(.el-form-item__content) {
      display: flex;
      flex-direction: row;
      justify-content: right;
      align-items: center;
      button {
        width: 80%;
      }
    }
  }
}
:deep(.el-form-item__label) {
  width: 90px;
  text-align: right;
}
</style>