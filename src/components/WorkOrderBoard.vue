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
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="no"
              label="工單號"
              width="180">
            </el-table-column>
            <el-table-column
              prop="part_no"
              label="料號"
              width="180">
            </el-table-column>
            <el-table-column
              prop="machine"
              label="生產機台">
            </el-table-column>
            <el-table-column
              prop="mod_no"
              label="模具編號">
            </el-table-column>
            <el-table-column
              prop="plan_count"
              label="計畫數量">
            </el-table-column>
            <el-table-column
              prop="has_count"
              label="已生產數量">
            </el-table-column>
            <el-table-column
              prop="status"
              label="工單狀態">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="second">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="no"
              label="工單號"
              width="180">
            </el-table-column>
            <el-table-column
              prop="part_no"
              label="料號"
              width="180">
            </el-table-column>
            <el-table-column
              prop="machine"
              label="生產機台">
            </el-table-column>
            <el-table-column
              prop="mod_no"
              label="模具編號">
            </el-table-column>
            <el-table-column
              prop="plan_count"
              label="計畫數量">
            </el-table-column>
            <el-table-column
              prop="has_count"
              label="已生產數量">
            </el-table-column>
            <el-table-column
              prop="status"
              label="工單狀態">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
export default {
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
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '延遲',
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
        },
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      // eslint-disable-next-line no-console
      console.log(tab, event);
    },
    /* eslint-disable */
    tableRowClassName({row, rowIndex}) {
      console.log({row, rowIndex})
      if (row.status === '延遲') {
        return 'warning-row';
      }
      return '';
    }
    /* eslint-enable */
  },

};
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
    color: #000;
  }
</style>