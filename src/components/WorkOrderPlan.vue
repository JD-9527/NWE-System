<template>
  <div>
    <div class="header-row">
      工單計畫
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="工單報表" name="first">
        <el-tabs v-model="activeLine" type="card" @tab-click="handleClick">
          <div>
            <div style="width: 50%; display: inline-block;"></div>
            <div class="sub-title select">噸位</div>
            <el-select
              size='mini'
              v-model="ton"
            >
              <el-option
                v-for="item in tons"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <div style="padding: 5px; display: inline-block;">
              <font-awesome-icon
                :icon="['fas','square']"
                class="legend-blue"
              ></font-awesome-icon>
              已完成
            </div>
            <div style="padding: 5px; display: inline-block;">
              <font-awesome-icon
                :icon="['fas','square']"
                class="legend-white"
              ></font-awesome-icon>
              待開始
            </div>
            <div style="padding: 5px; display: inline-block;">
              <font-awesome-icon
                :icon="['fas','square']"
                class="legend-red"
              ></font-awesome-icon>
              延遲
            </div>
            <div style="padding: 5px; display: inline-block;">
              <font-awesome-icon
                :icon="['fas','square']"
                class="legend-green"
              ></font-awesome-icon>
              正常生產
            </div>
          </div>
          <el-tab-pane
            v-for="(line,index) in lines"
            :key="line"
            :label="line"
            :name="(index+1).toString()"
          >
            <WOTable :name="line"/>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="生產甘特圖" name="second">
        生產甘特圖
      </el-tab-pane>
      <el-tab-pane label="現場作業狀況" name="third">
        現場作業狀況
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.select {
  width: 40px;
  display: inline-block;
}
.legend-blue {
  color:#cbd2ff;
  background: #cbd2ff;
  border: 1px #000 solid;
}
.legend-white {
  color:#f2f2f2;
  background: #f2f2f2;
  border: 1px #000 solid;
}
.legend-red {
  color:#ffc8ca;
  background: #ffc8ca;
  border: 1px #000 solid;
}
.legend-green {
  color:#bcffc6;
  background: #bcffc6;
  border: 1px #000 solid;
}
</style>

<script>
  import WOTable from './WorkOrderTable.vue'
  export default {
    components:{
      WOTable,
    },
    data() {
      return {
        activeName: 'first',
        activeLine: '1',
        lines: ['A線', 'B線', 'C線', 'D線', 'E線', 'F線', 'G線'],
        tons: ['50','80','100','130'],
        ton: '130'
      };
    },
    methods: {
      /* eslint-disable */
      handleClick(tab, event) {
        console.log(tab, event);
      }
      /* eslint-enable */
    }
  };
</script>

