<script lang="ts" setup>
// @ts-nocheck
import {
  ref,
  Ref,
  onMounted
} from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
declare module 'element-plus' {
  export const ElMessage: any
}

interface UserTableItem {
  id: number,
  name: string,
  depatureDate: string,
  backDate: string,
  headCount: number,
  description: string,
  isCheckedIn: boolean,
}
interface JourneyTableItem {
  id: number,
  depatureDate: string,
  fee: number,
}
const activeTab = ref('users')
const isAdmin = ref(false)
const password = ref('')
const userTableData: Ref<UserTableItem[]> = ref([])
const journeyTableData: Ref<JourneyTableItem[]> = ref([])
const journeyForm: Ref<JourneyTableItem> = ref({
  id: 0,
  depatureDate: '',
  fee: 0,
})
const initTable = () => {
  axios.get('/api/cases/all').then((res: any) => {
    userTableData.value = res.data
  })
  axios.get('/api/journeys/all').then((res: any) => {
    journeyTableData.value = res.data
  })
}
const handleDeleteUser = (row: UserTableItem) => {
  const params = {
    id: row.id,
  }
  axios.post('/api/cases/delete', params).then((res: any) => {
    if (res.status.toString()[0] == 2) {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    } else {
      ElMessage({
        message: '删除失败',
        type: 'error',
      })
    }
    initTable()
  })
}
const handleDeleteJourney = (row: JourneyTableItem) => {
  const params = {
    id: row.id,
  }
  axios.post('/api/journeys/delete', params).then((res: any) => {
    if (res.status.toString()[0] == 2) {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    } else {
      ElMessage({
        message: '删除失败',
        type: 'error',
      })
    }
    initTable()
  })
}
const handleCheckedStatusChange = (row: UserTableItem) => {
  axios.post('/api/cases/update', row).then((res: any) => {
    if (res.status.toString()[0] == 2) {
      ElMessage({
        message: '更新成功',
        type: 'success',
      })
    } else {
      ElMessage({
        message: '更新失败',
        type: 'error',
      })
    }
    initTable()
  })
}
const handleCreateJourney = () => {
  axios.post('/api/journeys/create', journeyForm.value).then((res: any) => {
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
    initTable()
  })
}
onMounted(() => {
  initTable()
})
</script>
<template>
  <div class="user">
    <h2>Admin</h2>
    <el-form class="form" v-if="!isAdmin" @submit.prevent="isAdmin = password === 'woshixiaopacai'">
      <el-form-item label="接头暗号">
        <el-input v-model="password" placeholder="接头暗号" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="isAdmin = password === 'woshixiaopacai'" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
    <div v-else>
      <el-tabs v-model="activeTab" class="tabs">
        <el-tab-pane label="登记用户管理" name="users">
          <el-table :data="userTableData" class="table">
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="depatureDate" label="出发日期" width="110" />
            <el-table-column prop="backDate" label="回程日期" width="110" />
            <el-table-column prop="headCount" label="出行人数" width="80" />
            <el-table-column prop="description" label="备注" width="200" />
            <el-table-column prop="isCheckedIn" label="已交定金" width="80">
              <template #default="{ row }">
                <el-switch @change="handleCheckedStatusChange(row)" v-model="row.isCheckedIn" />
              </template>
            </el-table-column>
            <el-table-column width="50">
              <template #default="{ row }">
                <el-button @click="handleDeleteUser(row)" type="danger" size="small">X</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="活动管理" name="journeys">
          <el-form :model="journeyForm">
            <el-form-item label="出发日期" prop="depatureDate">
              <el-date-picker
                v-model="journeyForm.depatureDate"
                type="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="费用" prop="fee">
              <el-input-number v-model="journeyForm.fee" :min="0" :max="100000" label="费用/人" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleCreateJourney">发布活动</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="journeyTableData" class="table">
            <el-table-column prop="depatureDate" label="出发日期" />
            <el-table-column prop="fee" label="费用/人">
              <template #default="{ row }">
                {{ row.fee }}元
              </template>
            </el-table-column>
            <el-table-column width="50">
              <template #default="{ row }">
                <el-button @click="handleDeleteJourney(row)" type="danger" size="small">X</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style lang="less" scoped>
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .table {
    width: 100%;
    margin-top: 20px;
  }
}
</style>