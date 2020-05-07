<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
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
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{row}"
          v-model="row.part_num"
        >
          <span slot="content">{{row.part_num}}</span>
        </editable-cell>
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
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{row}"
          v-model="row.count"
        >
          <span slot="content">{{row.count}}</span>
        </editable-cell>
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
      </el-table-column>
      <el-table-column
        prop="uph"
        label="UPH"
        width="100"
        align="center"
      >
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
          @click="saveRow(row, index)">
        </el-button>
        <el-button
          type="info"
          icon="el-icon-close"
          size="mini"
          @click="cancelEditMode(row, index)">
        </el-button>
       </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import EditableCell from "./EditableCell.vue";

export default {
  components: {
      EditableCell,
  },
  data: () => ({
    tableData: []
  }),
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
          plastic_num: '8M460-002E',
          count: '513',
          mold_num: 'NP10713',
          mold_seq: 'M1',
          mold_pos: 'D10-C2-02',
          plan_time: '24',
          standard_cycle: '24',
          uph: '306'
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
    /* eslint-enable */
  },
  mounted() {
    // this.lines = this.loadLine()
    this.tableData = this.loadTable()
  }
}
</script>