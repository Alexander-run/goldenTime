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
    <el-menu-item index="/photography">相册</el-menu-item>
  </el-menu>
</template>
<style lang="less" scoped>
.head-menu {
  margin: 20px;
}
</style>