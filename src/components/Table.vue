<template>
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
</template>

<script>
export default {
	props: {
		tableData: {
        type: Array,
    },
	},
	methods: {
		/* eslint-disable */
    tableRowClassName({row, rowIndex}) {
      // console.log({row, rowIndex})
      if (row.isDelay === 1) {
        return 'warning-row';
      }
      return '';
    }
    /* eslint-enable */
	}
}
</script>

<style>
  .el-table .warning-row {
    background: #FFDEDE;
    /*color: #000;*/
  },
  .el-table .error-row {
    background: #FFDEDE;
    /*color: #000;*/
  }
</style>