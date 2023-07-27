<script lang="ts" setup>
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

interface TableItem {
  id: number,
  name: string,
  depatureDate: string,
  backDate: string,
  headCount: number,
  description: string,
  isCheckedIn: boolean,
}
const isAdmin = ref(false)
const password = ref('')
const tableData: Ref<TableItem[]> = ref([])
const initTable = () => {
  axios.get('/api/cases/all').then((res: any) => {
    tableData.value = res.data
  })
}
const handleDeleteRow = (row: TableItem) => {
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
const handleCheckedStatusChange = (row: TableItem) => {
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
    <el-table v-else :data="tableData" class="table">
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
          <el-button @click="handleDeleteRow(row)" type="danger" size="small">X</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    width: 80%;
    margin-top: 20px;
  }
}
</style>