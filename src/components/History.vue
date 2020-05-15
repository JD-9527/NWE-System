<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="週料號" name="first">
      <div class="sub-title select">年</div>
      <el-select
        size='mini'
        v-model="year"
        style="width: 120px;"
        placeholder=""
      >
        <el-option
          v-for="item in year_list"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <div class="sub-title select">週次</div>
      <el-select
        size='mini'
        v-model="week"
        style="width: 120px;"
        placeholder=""
      >
        <el-option
          v-for="item in week_list"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <div class="sub-title select">料號</div>
      <el-input
        size='mini'
        v-model="part"
        style="width: 200px;"
      >
      </el-input>
      <el-button size='mini' style="margin-left: 10px;">查詢</el-button>
      <el-table
        :data="weekTableData"
        style="width: 100%"
        empty-text="No Data"
      >
        <el-table-column
          v-for="column in weekTableInfo"
          :key="column.label"
          :prop="column.prop"
          :label="column.label"
          align="center"
        ></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="工單總結報表" name="second">
      <FactorySelection tonlist/>
      <div class="sub-title select">料號</div>
      <el-input
        size='mini'
        v-model="part"
        style="width: 200px;"
      >
      </el-input>
      <div class="sub-title select">日期</div>
      <el-date-picker
        v-model="start_end"
        type="daterange"
        size="mini"
        value-format="yyyy-MM-dd"
        @change="date"
        style="width: 250px;"
      ></el-date-picker>
      <el-button size='mini' style="margin-left: 10px;">查詢</el-button>
      <el-table
        :data="reportTableData"
        style="width: 100%"
        empty-text="No Data"
      >
        <el-table-column
          v-for="column in reportTableInfo"
          :key="column.label"
          :prop="column.prop"
          :label="column.label"
          align="center"
        ></el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import FactorySelection from './FactorySelection'
  export default {
    components: {
      FactorySelection
    },
    data() {
      return {
        activeName: 'first',
        year: '',
        year_list: ['2018', '2019', '2020'],
        week: '',
        week_list: ['W1', 'W2', 'W3'],
        part: '',
        start_end: [],
        weekTableInfo: [
          { prop: '', label: '年', width: ''},
          { prop: '', label: '週次', width: ''},
          { prop: '', label: '品名', width: ''},
          { prop: '', label: '噸位', width: ''},
          { prop: '', label: '料號', width: ''},
          { prop: '', label: '塑膠料號', width: ''},
          { prop: '', label: '計畫數量', width: ''},
          { prop: '', label: '已完成數量', width: ''},
          { prop: '', label: '剩餘數量', width: ''},
          { prop: '', label: '計畫工時', width: ''},
          { prop: '', label: '完成度', width: ''}
        ],
        weekTableData: [],
        reportTableInfo: [
          { prop: '', label: '工令號', width: ''},
          { prop: '', label: '機台號', width: ''},
          { prop: '', label: '模號', width: ''},
          { prop: '', label: '料號', width: ''},
          { prop: '', label: '上下模時間', width: ''},
          { prop: '', label: '開始時間', width: ''},
          { prop: '', label: '結束時間', width: ''},
          { prop: '', label: '計畫數量', width: ''},
          { prop: '', label: '已完成數量', width: ''},
          { prop: '', label: '剩餘數量', width: ''},
          { prop: '', label: '完成度', width: ''}
        ],
        reportTableData: [],

      };
    },
    methods: {
      date(item) {
        /* eslint-disable */
        console.log(item)
      }
    }
  };
</script>