<script lang="ts" setup>
// @ts-nocheck
import {
  ref,
  Ref,
  onMounted
} from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { ElMessage, ElMessageBox } from 'element-plus'
declare module 'element-plus' {
  export const ElMessage: any
}

interface UserTableItem {
  id: number,
  name: string,
  depatureDate: string,
  headCount: number,
  description: string,
  isCheckedIn: boolean,
}
interface JourneyTableItem {
  id: number,
  depatureDate: string,
  fee: number,
  depaturePositionName: string,
  destinationPositionName: string,
  leaderName: string,
  leaderPhone: string,
  description: string,
}
const activeTab = ref('users')
const isAdmin = ref(sessionStorage.getItem('password') && sessionStorage.getItem('password') === 'woshixiaopacai')
const password = ref('')
const activePage = ref('journeyTable')
const userTableData: Ref<UserTableItem[]> = ref([])
const journeyTableData: Ref<JourneyTableItem[]> = ref([])
const newJourneyForm: Ref<JourneyTableItem> = ref({
  id: 0,
  depatureDate: '',
  fee: 0,
  depaturePositionName: '',
  destinationPositionName: '丰宁大滩镇',
  leaderName: '',
  leaderPhone: '',
  description: '',
})
const selectedJourneyForm: Ref<JourneyTableItem> = ref({
  id: 0,
  depatureDate: '',
  fee: 0,
  depaturePositionName: '',
  destinationPositionName: '丰宁大滩镇',
  leaderName: '',
  leaderPhone: '',
  description: '',
})
const createFormRef = ref<FormInstance>()
const editFormRef = ref<FormInstance>()
const rules = {
  depatureDate: [
    { required: true, message: '请选择日期', trigger: 'blur' },
  ],
  fee: [
    { required: true, message: '请输入费用', trigger: 'blur' },
  ],
  depaturePositionName: [
    { required: true, message: '请选择出发地', trigger: 'blur' },
  ],
  destinationPositionName: [
    { required: true, message: '请选择目的地', trigger: 'blur' },
  ],
  leaderName: [
    { required: true, message: '请选择领队姓名', trigger: 'blur' },
  ],
  leaderPhone: [
    { required: true, message: '请输入领队电话', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请输入行程描述', trigger: 'blur' },
  ],
}
const handleClickBtnEditJourney = (row: JourneyTableItem) => {
  selectedJourneyForm.value = row
  activePage.value = 'edit'
}
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
  ElMessageBox.confirm('确认删除该用户吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
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
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除',
    })
  })
}
const handleDeleteJourney = (row: JourneyTableItem) => {
  const params = {
    id: row.id,
  }
  ElMessageBox.confirm('确认删除该行程吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
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
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除',
    })
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
const handleCreateJourney = async() => {
  if (!createFormRef.value) return
  await createFormRef.value.validate((valid) => {
    if (valid) {
      axios.post('/api/journeys/create', newJourneyForm.value).then((res: any) => {
        if (res.status.toString()[0] == 2) {
          ElMessage({
            message: '创建成功',
            type: 'success',
          })
          activePage.value = 'journeyTable'
        } else {
          ElMessage({
            message: '创建失败',
            type: 'error',
          })
        }
        initTable()
      })
    } else {
      ElMessage({
        message: '请检查表单',
        type: 'error',
      })
      return false
    }
  })
}
const handleEditJourney = async() => {
  if (!editFormRef.value) return
  await editFormRef.value.validate((valid) => {
    if (valid) {
      axios.post('/api/journeys/update', selectedJourneyForm.value).then((res: any) => {
        if (res.status.toString()[0] == 2) {
          ElMessage({
            message: '更新成功',
            type: 'success',
          })
          activePage.value = 'journeyTable'
        } else {
          ElMessage({
            message: '更新失败',
            type: 'error',
          })
        }
        initTable()
      })
    } else {
      ElMessage({
        message: '请检查表单',
        type: 'error',
      })
      return false
    }
  })
}
const handleDownload = () => {
  const data = userTableData.value.map((item: UserTableItem) => {
    return {
      姓名: item.name,
      出发日期: item.depatureDate,
      出行人数: item.headCount,
      备注: item.description,
      已交定金: item.isCheckedIn ? '是' : '否',
    }
  })
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')

  XLSX.writeFile(wb, '登记用户.xlsx')

  ElMessage({
    message: '开始下载',
    type: 'success',
  })
}
const handleLogin = () => {
  if (password.value === 'woshixiaopacai') {
    isAdmin.value = true
    sessionStorage.setItem('password', 'woshixiaopacai')
  } else {
    ElMessage({
      message: '接头暗号错误',
      type: 'error',
    })
  }
}
onMounted(() => {
  initTable()
})
</script>
<template>
  <div class="user">
    <h2>Admin</h2>
    <el-form class="form" v-if="!isAdmin" @submit.prevent="handleLogin">
      <el-form-item label="接头暗号">
        <el-input v-model="password" placeholder="接头暗号" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleLogin" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
    <div v-else>
      <el-tabs v-model="activeTab" class="tabs">
        <el-tab-pane label="登记用户管理" name="users">
          <div :style="{ marginBottom: '40px' }">
            <el-button @click="handleDownload" type="primary">下载所有信息(xlsx)</el-button>
            <el-table :data="userTableData" class="table">
              <el-table-column prop="name" label="姓名" />
              <el-table-column prop="depatureDate" label="出发日期" width="110" />
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="活动管理" name="journeys">
          <div class="tab-container">
            <el-form :model="newJourneyForm" class="journey-form sub-tab" :rules="rules" ref="createFormRef" v-if="activePage==='create'">
              <div class="title-with-route">
                <el-button @click="activePage='journeyTable'" type="primary">返回</el-button>
                <h3>发布新活动</h3>
              </div>
              <el-form-item label="出发日期" prop="depatureDate">
                <el-date-picker
                  v-model="newJourneyForm.depatureDate"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="费用/人" prop="fee">
                <el-input-number v-model="newJourneyForm.fee" :min="0" :max="100000" label="费用/人" />
              </el-form-item>
              <el-form-item label="领队" prop="leaderName">
                <el-select v-model="newJourneyForm.leaderName" placeholder="选择领队">
                  <el-option label="曹旭" value="曹旭" />
                  <el-option label="暴依宁" value="暴依宁" />
                  <el-option label="郭彪" value="郭彪" />
                </el-select>
              </el-form-item>
              <el-form-item label="联系电话" prop="leaderPhone">
                <el-input v-model="newJourneyForm.leaderPhone" placeholder="联系电话" />
              </el-form-item>
              <el-form-item label="集合地点" prop="depaturePositionName">
                <el-select placeholder="选择集合地点" v-model="newJourneyForm.depaturePositionName">
                  <el-option label="望京华彩" value="望京华彩" />
                  <el-option label="海淀清河" value="海淀清河" />
                  <el-option label="通州梨园" value="通州梨园" />
                </el-select>
              </el-form-item>
              <el-form-item label="目的地" prop="destinationPositionName">
                <el-select disabled placeholder="选择目的地" v-model="newJourneyForm.destinationPositionName">
                  <el-option label="丰宁大滩镇" value="丰宁大滩镇" />
                </el-select>
              </el-form-item>
              <el-form-item label="活动安排" prop="description">
                <el-input rows="6" type="textarea" placeholder="活动详情" v-model="newJourneyForm.description" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleCreateJourney">发布新活动</el-button>
              </el-form-item>
            </el-form>
            <div v-else-if="activePage==='journeyTable'" class="sub-tab">
              <div class="title-with-route">
                <h3>已发布的活动</h3>
                <el-button @click="activePage = 'create'" type="primary">发布一个新活动</el-button>
              </div>
              <el-table :data="journeyTableData" class="table">
                <el-table-column prop="depatureDate" width="110" label="出发日期" />
                <el-table-column prop="depaturePositionName" label="集合地点" />
                <el-table-column prop="leaderName" label="领队" />
                <el-table-column prop="fee" label="费用/人">
                  <template #default="{ row }">
                    {{ row.fee }}元
                  </template>
                </el-table-column>
                <el-table-column width="120">
                  <template #default="{ row }">
                    <el-button @click="handleClickBtnEditJourney(row)" type="primary" size="small">
                      <el-icon>
                        <Edit />
                      </el-icon>
                    </el-button>
                    <el-button @click="handleDeleteJourney(row)" type="danger" size="small">
                      <el-icon>
                        <Delete />
                      </el-icon>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-form :model="selectedJourneyForm" class="journey-form sub-tab" :rules="rules" ref="editFormRef" v-else-if="activePage==='edit'">
              <div class="title-with-route">
                <el-button @click="activePage='journeyTable'" type="primary">返回</el-button>
                <h3>编辑此活动</h3>
              </div>
              <el-form-item label="出发日期" prop="depatureDate">
                <el-date-picker
                  v-model="selectedJourneyForm.depatureDate"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="费用/人" prop="fee">
                <el-input-number v-model="selectedJourneyForm.fee" :min="0" :max="100000" label="费用/人" />
              </el-form-item>
              <el-form-item label="领队" prop="leaderName">
                <el-select v-model="selectedJourneyForm.leaderName" placeholder="选择领队">
                  <el-option label="曹旭" value="曹旭" />
                  <el-option label="暴依宁" value="暴依宁" />
                  <el-option label="郭彪" value="郭彪" />
                </el-select>
              </el-form-item>
              <el-form-item label="联系电话" prop="leaderPhone">
                <el-input v-model="selectedJourneyForm.leaderPhone" placeholder="联系电话" />
              </el-form-item>
              <el-form-item label="集合地点" prop="depaturePositionName">
                <el-select placeholder="选择集合地点" v-model="selectedJourneyForm.depaturePositionName">
                  <el-option label="望京华彩" value="望京华彩" />
                  <el-option label="海淀清河" value="海淀清河" />
                  <el-option label="通州梨园" value="通州梨园" />
                </el-select>
              </el-form-item>
              <el-form-item label="目的地" prop="destinationPositionName">
                <el-select disabled placeholder="选择目的地" v-model="selectedJourneyForm.destinationPositionName">
                  <el-option label="丰宁大滩镇" value="丰宁大滩镇" />
                </el-select>
              </el-form-item>
              <el-form-item label="活动安排" prop="description">
                <el-input rows="6" type="textarea" placeholder="活动详情" v-model="selectedJourneyForm.description" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleEditJourney">确认修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style lang="less" scoped>
.title-with-route {
  display: flex;
  flex-direction: row;
  align-items: center;
  button {
    margin: 16px;
  }
}
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  // background: lightgrey;
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
.tab-container {
  width: 95%;
  display: flex;
  flex-direction: row;
  .sub-tab {
    width: 100%;
  }
  .journey-form {
    margin-right: 40px;
    :deep(.el-form-item__content) {
      display: flex;
      flex-direction: row;
      justify-content: right;
      align-items: center;
    }
  }
}
</style>