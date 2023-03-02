<template>
  <el-container class="boxIn">

    <el-main class="login halfPage" style="background: #f0f2f5">
      <div class="flexCenter">
        <h1>
          绳农之策
        </h1>
      </div>
    </el-main>

    <el-main  class="login halfPage">
      <div class="flexCenter" style="background: white;width: 300px;height: 200px">
        <el-row justify="center">
          <el-col>
            <el-input placeholder="用户名" suffix-icon="user" v-model="username"/>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col>
            <el-input placeholder="密码" suffix-icon="lock" v-model="password" show-password/>
          </el-col>
        </el-row>
        <el-row justify="space-between">
          <el-col :span="12">
            自动登录
            <el-switch v-model="auto"/>
          </el-col>
          <el-col :span="8" style="display: flex">
            <el-button link type="primary" style="margin: auto">
              忘记密码？
            </el-button>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col>
            <el-button type="primary" style="width: 100%;" @click="login">
              登录
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-main>

  </el-container>
</template>

<script>
import { reactive, toRefs} from "vue";
import api from "@/axios/api";
import {ElMessage} from "element-plus";
import router from "@/router";
import cookie from "vue-cookie";

export default {
  name: "toLogin",
  setup(){
    let obj = reactive({
      username: null,
      password: null,
      auto:false,
      login:()=>{
        api.login(obj.username,obj.password).then(res=>{
          if (res.data!=null){
            ElMessage({
              message: '登录成功！',
              type: 'success'
            })
            cookie.set("userId",res.data.id)
            router.push("/toIndex")
          }else{
            ElMessage({
              message: '登录失败！',
              type: 'info'
            })
          }
        })
      }
    })


    return {...toRefs(obj)}
  }
}
</script>

<style scoped>
.el-row{
  margin-bottom: 20px;
}

.el-row:last-child{
  margin-bottom: 0;
}
</style>