<script lang="ts" setup>
import {
  computed
} from 'vue'
import {
  useRoute
} from 'vue-router'

const route = useRoute()
const activeIndex = computed(() => route.path)

</script>
<template>
  <el-menu
    router
    :default-active="activeIndex"
    class="head-menu"
    mode="horizontal"
  >
    <el-menu-item index="/user">user</el-menu-item>
    <el-menu-item index="/admin">admin</el-menu-item>
  </el-menu>
</template>
<style lang="less" scoped>
.head-menu {
  margin: 20px;
}
</style>