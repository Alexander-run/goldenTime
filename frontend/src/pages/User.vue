<script lang="ts" setup>
// @ts-nocheck
import {
  ref,
  Ref,
  onMounted,
  computed
} from 'vue'
import axios from 'axios'
import moment from 'moment'
import { ElMessage } from 'element-plus'
declare module 'element-plus' {
  export const ElMessage: any
}

const fromPos = '北京-望京-华彩'
const toPos = '承德-丰宁-大滩'
const leader = '曹旭'

interface FormData {
  name: string,
  depatureDate: string,
  headCount: number,
  description: string,
}
const formData: Ref<FormData> = ref({
  name: '',
  depatureDate: '',
  headCount: 0,
  description: '',
})
const availableDates = ref([])
const selectedFee = ref(0)
const handleDateChange = (e) => {
  const target = availableDates.value.find((item: any) => {
    return item.depatureDate === e
  })
  if (target) {
    selectedFee.value = target.fee
  }
}
const onSubmit = () => {
  // TODO post update to backend
  axios.post('/api/cases/create', formData.value).then((res: any) => {
    if (res.status.toString()[0] == 2) {
      ElMessage({
        message: '创建成功',
        type: 'success',
      })
    } else {
      ElMessage({
        message: '创建失败',
        type: 'error',
      })
    }
  })
}
const initAvailableDates = () => {
  axios.get('/api/journeys/all').then((res: any) => {
    if (res.status.toString()[0] == 2) {
      availableDates.value = res.data
    }
  })
}
const disabledDate = (time: Date) => {
  const temp = moment(time).format('YYYY-MM-DD')
  return !availableDates.value.some((item: any) => {
    return item.depatureDate === temp
  })
}
onMounted(() => {
  initAvailableDates()
})
</script>
<template>
  <div class="user">
    <h2>行程信息</h2>
    <el-form class="form">
      <el-form-item label="集合地">
        <el-input v-model="fromPos" />
      </el-form-item>
      <el-form-item label="目的地">
        <el-input v-model="toPos" />
      </el-form-item>
      <el-form-item label="领队">
        <el-input v-model="leader" />
      </el-form-item>
    </el-form>
    <h2>你的信息</h2>
    <el-form :model="formData" class="form">
      <el-form-item label="怎么称呼～" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="出发日期" prop="depatureDate">
        <el-date-picker
          :disabled-date="disabledDate"
          v-model="formData.depatureDate"
          @change="handleDateChange"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD">
        </el-date-picker>
        <span>{{ selectedFee }} 元/人</span>
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