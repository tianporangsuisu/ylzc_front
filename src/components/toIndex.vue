<template>
  <el-container class="boxIn">

    <el-aside style="width: 10%;height: 100%;background: #565d65">
      <el-row style="height: 5%" justify="center" align="middle">
        <div style="color: white;font-size: 2vh">
          <el-icon><ElementPlus /></el-icon>
          绳农之策
        </div>
      </el-row>
      <el-row>
        <el-col>
          <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
              router
          >
            <el-menu-item index="1" route="/toList">
              <template #title>
                <el-icon><location /></el-icon>
                <span>机器表单</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2" route="/toView">
              <el-icon><Odometer /></el-icon>
              <span>可视化</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>

    <el-container style="width: 90%;height: 100%;background: white">

      <el-header style="width: 100%;height: 5%;box-shadow: var(--el-box-shadow-light)"/>

      <router-view/>

    </el-container>

  </el-container>
</template>

<script>
import {onBeforeMount, } from "vue";

export default {
  name: "toList",
  setup(){

    onBeforeMount(()=>{
    })
  }
}
</script>

<style scoped>
.el-menu{
  width: 100%;
  height: 95%;
}
</style>