<template>
  <div>
    <el-table
      :data="tableData.filter(data => !ton || data.machine_ton.toString() == ton).slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%"
      height="425"
      highlight-current-row
      :row-class-name="tableRowClassName"
      @row-click="onClick"
    >
      <el-table-column
        prop="machine_ton"
        label="噸位"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="machine_NO"
        label="機台號"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plastic_color"
        label="當前顏色"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="real_mold_changerover_time"
        label="上下模時間"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="real_s_time"
        :label="'實際\n開始時間'"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="real_s_time"
        :label="'實際\n結束時間'"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="real_s_time"
        :label="'計畫\n開始時間'"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plan_e_time"
        :label="'計畫\n結束時間'"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="product_name"
        label="品名"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="Part_NO"
        label="料號"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="work_list"
        label="工令號"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plastic_Part_NO"
        label="塑膠料號"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="work_list_number"
        label="數量"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mold_NO"
        label="模號"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mold_Serial"
        label="模序"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mold_hole"
        label="模穴數"
        width="100"
        align="center"
      >
        <template slot-scope="{row}">
          <el-input
            v-if="row.editMode"
            v-model="row.mold_hole"
          ></el-input>
          <span v-else>{{ row.mold_hole }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="mold_position"
        label="模具儲位"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plan_work_time"
        label="計畫工時"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="machine_CT"
        label="標準週期"
        width="100"
        align="center"
      >
        <template slot-scope="{row}">
          <el-input
            v-if="row.editMode"
            v-model="row.machine_CT"
          ></el-input>
          <span v-else>{{ row.machine_CT }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        width="180"
        v-if="editable"
      >
       <template slot-scope="{row, index}">
        <el-button
          size="mini"
          icon="el-icon-edit"
          :disabled="row.status == 1"
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
          :disabled="row.status == 1"
          v-show="!row.editMode"
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
        :total="tableData.filter(data => !ton || data.machine_ton.toString() == ton).length"
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
// import EditableCell from "./EditableCell.vue";
import { planWorklist } from '../api.js'

export default {
  components: {
      // EditableCell,
  },
  data: () => ({
    lines: [],
    // ton: 'All',
    tableData: [],
    currentPage: 1,
    pageSize: 10,
    // line: '',
  }),
  props: {
    name: String,
    editable: {
      type: Boolean,
      default: false
    },
    ton: {
      type: String,
      default: null
    },
    // line: String,
  },
  computed: {
    line: function(){
      if (this.name == 'A線') return 'A'
      else if (this.name == 'B線') return 'B'
      else if (this.name == 'C線') return 'C'
      else if (this.name == 'D線') return 'D'
      else if (this.name == 'E線') return 'E'
      else if (this.name == 'F線') return 'F'
      else if (this.name == 'G線') return 'G'
      else return 'A'
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
    getTableData() {
      planWorklist(this.line).then((response)=>{
        // console.log(this.line, response.data.data)
        let data = response.data.data
        this.tableData = data
        this.tableData = this.tableData.map(row => {
          return {
            ...row,
            editMode: false
          };
        });
      })
    },
    print(data) {
      console.log(data)
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
    },
    tableRowClassName({row}) {
      if (row.status == 3) {
        // 紅
        return 'warning-row';
      }
      else if (row.status == 4) {
        // 綠
        return 'success-row';
      }
      else if (row.status == 1) {
        // 藍
        return 'safe-row';
      }
      return '';
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      /*console.log(this.currentPage) */
    },
    onClick(row) {
      // eslint-disable-next-line no-console
      // console.log(row);
      this.$emit('row-click',row)
    },
    /* eslint-enable */
  },
  mounted() {
    this.getTableData()
  }
}
</script>