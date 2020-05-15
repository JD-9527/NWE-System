<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="578"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="ton"
        label="噸位"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="number"
        label="機台號"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="color"
        label="當前顏色"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ch_time"
        label="上下模時間"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="start_time"
        label="起始時間"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="結束時間"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="品名"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="part_num"
        label="料號"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="work_num"
        label="工令號"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plastic_num"
        label="塑膠料號"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="count"
        label="數量"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mold_num"
        label="模號"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mold_seq"
        label="模序"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mold_count"
        label="模穴數"
        width="100"
        align="center"
      >
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{row}"
          v-model="row.mold_count"
          v-if="editable"
        >
          <span slot="content">{{row.mold_count}}</span>
        </editable-cell>
        <template v-else slot-scope="{row}">
          <span>{{ row.mold_count }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="mold_pos"
        label="模具儲位"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plan_time"
        label="計畫工時"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="standard_cycle"
        label="標準週期"
        width="100"
        align="center"
      >
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{row}"
          v-model="row.standard_cycle"
          v-if="editable"
        >
          <span slot="content">{{row.standard_cycle}}</span>
        </editable-cell>
        <template v-else slot-scope="{row}">
          <span>{{ row.standard_cycle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        width="180"
      >
       <template slot-scope="{row, index}">
        <el-button
          size="mini"
          icon="el-icon-edit"
          @click="setEditMode(row, index)">
        </el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          size="mini"
          v-show="row.editMode"
          @click="saveRow(row, index)">
        </el-button>
        <el-button
          type="info"
          icon="el-icon-close"
          size="mini"
          v-show="row.editMode"
          @click="cancelEditMode(row, index)">
        </el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
        >
        </el-button>
       </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        :hide-on-single-page='true'
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="tableData.length"
        prev-text="Prev"
        next-text="Next"
        class='dark-btn'
      >
      </el-pagination>
    </div>
  </div>
</template>

<style scoped>
.select {
  width: 40px;
  display: inline-block;
}
</style>

<script>
import EditableCell from "./EditableCell.vue";

export default {
  components: {
      EditableCell,
  },
  data: () => ({
    lines: [],
    ton: 'All',
    tableData: [],
    currentPage: 1,
    pageSize: 10,
  }),
  props: {
    name: String,
    editable: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    site: function() {
      this.lines = this.loadLine(this.site)
      this.line = 'All'
    }
  },
  methods: {
    /* eslint-disable */
    loadTable() {
      let newTable = []
      for (let i=0;i<10;i++) {
        newTable.push({
          ton: '130',
          number: 'A01',
          color: '黑',
          ch_time: '00:00',
          start_time: '02:00',
          end_time: '14:00',
          name: '支架',
          part_num: '700-30985-01WA',
          work_num: '6110394',
          plastic_num: '8M460-002E',
          count: '513',
          mold_num: 'NP10713',
          mold_seq: 'M1',
          mold_count: '2',
          mold_pos: 'D10-C2-02',
          plan_time: '24',
          standard_cycle: '24',
        })
      }
      newTable = newTable.map(row => {
        return {
          ...row,
          editMode: false
        };
      });
      return newTable
    },
    saveRow(row, index) {
      row.editMode = false;
    },
    cancelEditMode(row, index) {
      row.editMode = false;
      // this.getTableData();
    },
    setEditMode(row, index) {
      row.editMode = true;
    },
    cancelEditMode(row, index) {
      row.editMode = false;
      // this.getTableData();
      // this.getTableDataCT();
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      else if (rowIndex === 5) {
        return 'safe-row';
      }
      return '';
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      /*console.log(this.currentPage) */
    },
    /* eslint-enable */
  },
  mounted() {
    this.tableData = this.loadTable()
  }
}
</script>