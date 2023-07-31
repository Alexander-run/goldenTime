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
import { ElMessage, ElMessageBox } from 'element-plus'
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
const selectedJourney = ref({})
const availableJourneys = ref([])
const selectedFee = ref(0)
const userFormRef = ref<FormInstance>()
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  depatureDate: [
    { required: true, message: '请选择日期', trigger: 'blur' },
  ],
  headCount: [
    { required: true, message: '请输入人数', trigger: 'blur' },
  ],
}
const handleDateChange = (e) => {
  const target = availableJourneys.value.find((item: any) => {
    return item.depatureDate === e
  })
  if (target) {
    selectedFee.value = target.fee
    selectedJourney.value = target
  }
}
const onSubmit = async() => {
  if(!userFormRef.value) return
  await userFormRef.value.validate((valid: boolean) => {
    if (valid) {
      ElMessageBox.confirm('您每天只有三次报名机会，请确认信息是否正确，确认报名吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        axios.post('/api/cases/create', formData.value).then((res: any) => {
          if (res.status.toString()[0] == 2) {
            ElMessage({
              message: '报名成功',
              type: 'success',
            })
          } else {
            ElMessage({
              message: '失败了，请稍后重试',
              type: 'error',
            })
          }
        })
      })
    }
  })
  
}
const initAvailableJourneys = () => {
  axios.get('/api/journeys/all').then((res: any) => {
    if (res.status.toString()[0] == 2) {
      availableJourneys.value = res.data
    }
  })
}
const disabledDate = (time: Date) => {
  const temp = moment(time).format('YYYY-MM-DD')
  return !availableJourneys.value.some((item: any) => {
    return item.depatureDate === temp
  })
}
onMounted(() => {
  initAvailableJourneys()
})
</script>
<template>
  <div class="user">
    <h2>报名中心</h2>
    <div class="journey-content-container" v-if="selectedJourney && Object.keys(selectedJourney).length>0">
      <el-form class="form">
        <el-form-item label="集合地">
          <el-input v-model="selectedJourney.depaturePositionName" />
        </el-form-item>
        <el-form-item label="目的地">
          <el-input v-model="selectedJourney.destinationPositionName" />
        </el-form-item>
        <el-form-item label="领队">
          <el-input v-model="selectedJourney.leaderName" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="selectedJourney.leaderPhone" />
        </el-form-item>
      </el-form>
      <div class="main-content">
        <div>日程安排</div>
        <el-input rows="6" type="textarea" v-model="selectedJourney.description" />
      </div>
    </div>
    <p class="tip" v-else>选择出发日期后可以浏览行程明细</p>
    <h2>你的信息</h2>
    <el-form :model="formData" class="form" :rules="rules" ref="userFormRef">
      <el-form-item label="怎么称呼～" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="出发日期" prop="depatureDate">
        <el-date-picker
          auto-focus
          :disabled-date="disabledDate"
          v-model="formData.depatureDate"
          @change="handleDateChange"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD">
        </el-date-picker>
        <span :style="{ color: 'lightcoral', marginLeft: '16px' }">{{ selectedFee }} 元/人</span>
      </el-form-item>
      <el-form-item label="出行人数" prop="headCount">
        <el-input-number v-model="formData.headCount"></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input type="textarea" rows="5" v-model="formData.description"></el-input>
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button @click="onSubmit" type="primary">报名！</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="less" scoped>
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: lightyellow;
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
.tip {
  color: lightcoral;
}
.journey-content-container {
  display: flex;
  flex-direction: row;
  .form {
    margin-right: 16px;
    width: 40%;
  }
  .main-content {
    width: 360px;
    > div {
      margin-bottom: 28px;
    }
  }
}
</style>