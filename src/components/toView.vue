<template>
  <el-main>
    <el-row>
      <el-col>
        <el-descriptions title="User Info">
          <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
          <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
          <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
          <el-descriptions-item label="Remarks">
            <el-tag size="small">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
            Province</el-descriptions-item
          >
        </el-descriptions>
      </el-col>
    </el-row>

    <el-tabs
        type="card"
        v-model="activeName"
    >
      <el-tab-pane label="数据可视化" name="first">
        <el-row justify="space-around">
          <el-col :span="8" style="">
            <div class="charts" id="chart1">

            </div>
          </el-col>
          <el-col :span="8">
            <div class="charts" id="chart2">

            </div>
          </el-col>
        </el-row>
        <el-row justify="space-around">
          <el-col :span="8">
            <div class="charts" id="chart3">

            </div>
          </el-col>
          <el-col :span="8">
            <div class="charts" id="chart4">

            </div>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="实时查看" name="second">
        <div class="boxIn" style="flex-direction: column">
          <div style="width: 70%;height: 70%" class="flexCenter">
            <video ref="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"></video>
          </div>
          <el-row justify="center">
            <el-col :span="13" style="margin-bottom: 5px">
              <div class="slider-demo-block">
                左右移动（X）:<el-slider v-model="XVar" show-input />
              </div>
            </el-col>

            <el-col :span="13" style="margin-bottom: 5px">
              <div class="slider-demo-block">
                前后移动（Y）:<el-slider v-model="YVar" show-input />
              </div>
            </el-col>
            <el-col :span="13" style="margin-bottom: 5px">
              <div class="slider-demo-block">
                上下移动（Z）:<el-slider v-model="ZVar" show-input />
              </div>
            </el-col>
          </el-row>
          <el-row justify="space-around">
            <el-col :span="12" style="text-align: center">
              <el-button type="primary">提交</el-button>
            </el-col>
            <el-col :span="12" style="text-align: center">
              <el-button type="warning">归零</el-button>
            </el-col>
          </el-row>
        </div>

      </el-tab-pane>

      <el-tab-pane label="照片记录" name="third">
        <div class="boxIn" style="justify-content: center;flex-wrap: wrap;">
          <div class="demo-image__preview">
            <el-image
                style="width: 100px; height: 100px"
                :src="url[189]"
                :zoom-rate="1.2"
                :preview-src-list="url"
                :initial-index="189"
                fit="cover"
            />
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="定时任务" name="fourth">
        <!--定时任务操作清单-->
        <el-table
            ref="multipleTableRef"
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="Date" width="120">
            <template #default="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column property="name" label="Name" width="120" />
          <el-table-column property="address" label="Address" show-overflow-tooltip />
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData[1], tableData[2]])"
          >Toggle selection status of second and third rows</el-button
          >
          <el-button @click="toggleSelection()">Clear selection</el-button>
        </div>
      </el-tab-pane>

    </el-tabs>

  </el-main>
</template>

<script>
import * as echarts from "echarts";
import {onMounted, onUnmounted, reactive, ref, toRefs} from "vue";
import api from "@/axios/api";
import videojs from 'video.js'
import 'videojs-contrib-hls'
import "@videojs/http-streaming"


export default {
  name: "toView",
  setup(){
    // eslint-disable-next-line no-unused-vars
    const videoPlayer = ref(null)
    const myPlayer = ref(null)
    let obj =reactive({
      activeName: 'first',

      //后台获取
      positionVar: api.getPosition(),

      //三个方向的偏移量,由PositionVar设定
      XVar: "",
      YVar: "",
      ZVar: "",

    });

    let url = history.state.images

    let name = [];

    url.forEach(i=>{
      if (i.length>25)
        name.push(i.slice(27))
      else
        name.push(i.slice(20))
    })



    onMounted(async ()=>{
      // 基于准备好的dom，初始化echarts实例
      let chart1 = echarts.init(document.getElementById('chart1'))
      let chart2 = echarts.init(document.getElementById('chart2'))
      let chart3 = echarts.init(document.getElementById('chart3'))
      let chart4 = echarts.init(document.getElementById('chart4'))

      let dataSet1= []
      let dataSet2= []
      let dataSet3= []
      let dataSet4= []
      let dataSet5= []

      await api.getEnvirData().then(res=>{
        res.data.forEach(item=>{
          dataSet1.push(item.lightIntensity)
          dataSet2.push(item.temperature)
          dataSet3.push(item.airHumidity)
          dataSet4.push(item.soilMoisture)
          dataSet5.push(item.time)
        })
      })

      // 指定图表的配置项和数据
      let option1 = {
        title: {
          text: '叶片面积x时间'
        },
        xAxis: {
          // type: 'category',
          data: dataSet5
        },
        yAxis: {
          type: 'value'
        },
        tooltip:{
          trigger:'axis'
        },
        dataZoom: [{
          type: 'slider',//图表下方的伸缩条
          show : true, //是否显示
          realtime : true, //拖动时，是否实时更新系列的视图
          start : 0, //伸缩条开始位置（1-100），可以随时更改
          end : 100, //伸缩条结束位置（1-100），可以随时更改
        }],
        series: [
          {
            data: dataSet1,
            type: 'line'
          }
        ]
      };

      let option2 = {
        title: {
          text: '温度x时间'
        },
        xAxis: {
          type: 'category',
          data: dataSet5
        },
        yAxis: {
          type: 'value'
        },
        tooltip:{
          trigger:'axis'
        },
        dataZoom: [{
          type: 'slider',//图表下方的伸缩条
          show : true, //是否显示
          realtime : true, //拖动时，是否实时更新系列的视图
          start : 0, //伸缩条开始位置（1-100），可以随时更改
          end : 100, //伸缩条结束位置（1-100），可以随时更改
        }],
        series: [
          {
            data: dataSet2,
            type: 'line'
          }
        ]
      };

      let option3 = {
        title: {
          text: '空气湿度x时间'
        },
        xAxis: {
          type: 'category',
          data: dataSet5
        },
        yAxis: {
          type: 'value'
        },
        tooltip:{
          trigger:'axis'
        },
        dataZoom: [{
          type: 'slider',//图表下方的伸缩条
          show : true, //是否显示
          realtime : true, //拖动时，是否实时更新系列的视图
          start : 0, //伸缩条开始位置（1-100），可以随时更改
          end : 100, //伸缩条结束位置（1-100），可以随时更改
        }],
        series: [
          {
            data: dataSet3,
            type: 'line'
          }
        ]
      };

      let option4 = {
        title: {
          text: '土壤湿度x时间'
        },
        xAxis: {
          type: 'category',
          data: dataSet5
        },
        yAxis: {
          type: 'value'
        },
        tooltip:{
          trigger:'axis'
        },
        dataZoom: [{
          type: 'slider',//图表下方的伸缩条
          show : true, //是否显示
          realtime : true, //拖动时，是否实时更新系列的视图
          start : 0, //伸缩条开始位置（1-100），可以随时更改
          end : 100, //伸缩条结束位置（1-100），可以随时更改
        }],
        series: [
          {
            data: dataSet4,
            type: 'line'
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      chart1.setOption(option1)
      chart2.setOption(option2)
      chart3.setOption(option3)
      chart4.setOption(option4)

      myPlayer.value = videojs(videoPlayer.value, {
        poster: "",
        sources: [
          {
            src: "http://81.70.11.150:8080/live/111.flv",
            type: 'flv',
          }
        ],
      }, () => {
        myPlayer.value.log("play.....")
      })

    })

    onUnmounted(() => {
      if (myPlayer.value) {
        myPlayer.value.dispose()
      }
    })

    return {...toRefs(obj),myPlayer,videoPlayer,log:console.log,url}
  }
}
</script>

<style scoped>
.el-row{
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-row:last-child{
  margin: 0;
}
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>