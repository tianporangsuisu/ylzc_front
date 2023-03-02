<template>

  <el-main style="width: 100%;height: 90%">

    <!--作废-->
    <!--<el-row gutter="20">-->

    <!--  <el-button type="primary" @click="beforeCreate" style="margin: 0 20px">-->
    <!--    新增机器-->
    <!--  </el-button>-->

    <!--  <el-button type="success">-->
    <!--    关联机器-->
    <!--  </el-button>-->

    <!--</el-row>-->

    <!--<el-divider/>-->

    <!--<el-dialog-->
    <!--    v-model="dialogVisible1"-->
    <!--    title="新建机器"-->
    <!--    width="50%"-->
    <!--&gt;-->
    <!--  <el-input placeholder="机器名" style="margin: 20px 0 0 0"/>-->

    <!--  <el-input placeholder="机器类名" style="margin: 20px 0"/>-->

    <!--  <template #footer>-->

    <!--    <span class="dialog-footer">-->

    <!--      <el-button @click="dialogVisible1 = false">取消</el-button>-->

    <!--      <el-button type="primary" @click="toCreate">-->
    <!--        提交-->
    <!--      </el-button>-->

    <!--    </span>-->

    <!--  </template>-->
    <!--</el-dialog>-->

    <el-table style="width: 100%;height:100%;justify-content: center" :data="tableData" stripe border>

      <el-table-column label="创建日期" prop="createdDate" fixed width="350px"/>

      <el-table-column label="最后一次修改日期" prop="lastModifiedDate" width="350px"/>

      <el-table-column label="机器名" prop="customName" width="350px"/>

      <el-table-column label="类型名" prop="typeName" width="350px"/>

      <el-table-column label="操作" fixed="right" width="215px">

        <template #default>

          <el-button @click="toview('4028818585b0ece90185b0eddac20000')">
            查看机器
          </el-button>

          <el-button @click="toConnect">
            关联机器
          </el-button>

        </template>

      </el-table-column>

    </el-table>

  </el-main>

</template>

<script>
// eslint-disable-next-line no-unused-vars
import {onBeforeMount, reactive, toRefs} from "vue";
import cookie from "vue-cookie";
import api from "@/axios/api";
import router from "@/router";
import {ElMessage} from "element-plus";

export default {
  name: "toList",
  setup(){
    let obj = reactive({
      userId: cookie.get("userId"),
      tableData:[],
      getMachine: ()=>{
        api.getAllMachines(obj.userId).then(res=>{
          obj.tableData = res.data
        })
      },
      toview:async (deviceId)=>{
        let images = []
        await api.getImages(deviceId).then(res => {
          images = res.data
        })
        router.push({
          name:"toView",
          state: {
            images:images
          }
        })
      },
      toCreate:async ()=>{
        await ElMessage({
          message: '提交成功!',
          type: 'success'
        })
        obj.dialogVisible1=false
      },
      beforeCreate:()=>{
        obj.dialogVisible1=true
      },
      dialogVisible1: false,
      dialogVisible2: false
    })



    onBeforeMount(()=>{
      obj.getMachine()
    })
    return {...toRefs(obj)}
  }
}
</script>

<style scoped>
.el-row{
  margin: 0 0 20px 0;
}
</style>