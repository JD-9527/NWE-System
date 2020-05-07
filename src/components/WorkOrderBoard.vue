<template>
  <div>
    <el-row
      class="header-row"
      type="flex"
      align="middle"
    >
      NWE D10 工單看板
    </el-row>
    <el-row>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="排程中" name="first">
          <Table :tableData="tableData" @row-click="onClick"></Table>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="second">
          <Table :tableData="tableData" @row-click="onClick"></Table>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <el-row>
      <el-card>
        <div slot="header" class="header"><span>工單詳情</span></div>
        <el-row>
          <el-col :span="9">
            <div class="message-subtitle">
              生產數量(件)
            </div>
            <div>
              <el-progress :text-inside="true" :stroke-width="26" :percentage="70" color="#17ba6a"></el-progress>
            </div>
          </el-col>
          <el-col :span="9" :offset="3">
            <div class="message-subtitle">
              總進度/超前
            </div>
            <div>
              <el-progress :text-inside="true" :stroke-width="26" :percentage="100" color="#17ba6a"></el-progress>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div class="message-subtitle">
              客戶
            </div>
            <div class="message">
              Cisco
            </div>
          </el-col>
          <el-col :span="3">
            <div class="message-subtitle">
              工單負責人
            </div>
            <div class="message">
              小兵
            </div>
          </el-col>
          <el-col :span="3" :offset="3">
            <div class="message-subtitle">
              生產延遲
            </div>
            <div>
              <el-progress :text-inside="true" :stroke-width="20" :percentage="70" color="#F50000"></el-progress>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="message-subtitle">
              調機延遲
            </div>
            <div>
              <el-progress :text-inside="true" :stroke-width="20" :percentage="70" color="#F50000"></el-progress>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="message-subtitle">
              維修延遲
            </div>
            <div>
              <el-progress :text-inside="true" :stroke-width="20" :percentage="70" color="#F50000"></el-progress>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="message-subtitle">
              修模待機
            </div>
            <div>
              <el-progress :text-inside="true" :stroke-width="20" :percentage="70" color="#F50000"></el-progress>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="message-subtitle">
              換模延遲
            </div>
            <div>
              <el-progress :text-inside="true" :stroke-width="20" :percentage="70" color="#F50000"></el-progress>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import Table from './Table'

let data_detail = {
  produced: 28400,
  plan_count: 40000,
  customer: 'Cisco',
  owner: '小兵',
  // 0:超前, 1:延遲
  progress: 1,
  //生產延遲
  produced_delay: 0,
  // 調機延遲
  config_delay: 5,
  // 維修延遲
  repair_delay: 5,
  // 修模待機
  fix_delay: 5,
  // 換模延遲
  change_delay: 5
}
export default {
  components : {
    Table
  },
  data() {
    return {
      activeName: 'first',
      tableData: [
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
          isDelay: 0
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '延遲',
          isDelay: 1
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
          isDelay: 0
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
          isDelay: 0
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
          isDelay: 0
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
          isDelay: 0
        },
      ],
      data_detail: data_detail
    };
  },
  methods: {
    handleClick(tab, event) {
      // eslint-disable-next-line no-console
      console.log(tab, event);
    },
    onClick(row) {
      // eslint-disable-next-line no-console
      console.log(row);
    },
    /* eslint-disable */
    tableRowClassName({row}) {
      // console.log({row, rowIndex})
      if (row.isDelay === 1) {
        return 'warning-row';
      }
      return '';
    }
    /* eslint-enable */
  },

};
</script>

<style scoped>
.header {
  font-size: 20px;
  font-weight: bold;
}
.el-card >>> .el-card__header {
  padding: 10px 20px;
}
</style>