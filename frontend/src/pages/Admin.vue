<script lang="ts" setup>
import {
  ref,
  Ref,
  onMounted
} from 'vue'
import { MOCK_TABLE_DATA } from './mockData'
import axios from 'axios'
interface TableItem {
  name: string,
  depatureDate: string,
  backDate: string,
  headCount: number,
  description: string,
  isCheckedIn: boolean,
}
const tableData: Ref<TableItem[]> = ref(MOCK_TABLE_DATA)

onMounted(() => {
  // TODO fetch table data from backend
  axios.get('/api/cases/all').then(res => {
    console.log(res)
  })
})
</script>
<template>
  <div class="user">
    <h2>Admin</h2>
    <el-table :data="tableData" class="table">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="depatureDate" label="出发日期" />
      <el-table-column prop="backDate" label="回程日期" />
      <el-table-column prop="headCount" label="出行人数" />
      <el-table-column prop="description" label="备注" width="200" />
      <el-table-column prop="isCheckedIn" label="已交定金">
        <template #default="{ row }">
          <el-switch v-model="row.isCheckedIn" />
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="{ }">
          <el-button type="danger" size="small">X</el-button>
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
  .table {
    width: 80%;
    margin-top: 20px;
  }
}
</style>