<template>
  <div>
    <div class="header-row">歷史資料查詢</div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="週料號" name="first">
        <div class="sub-title select">年</div>
        <el-select
          size='mini'
          v-model="year"
          style="width: 120px;"
          placeholder=""
          clearable
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
          clearable
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
          clearable
        >
        </el-input>
        <el-button size='mini' style="margin-left: 10px;" @click="getWeekPlanHis">查詢</el-button>
        <el-table
          :data="weekTableData.slice((currentPage-1)*10,currentPage*10)"
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
        <div style="text-align: center;">
          <el-pagination
            :hide-on-single-page='true'
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total ,prev, pager, next"
            :total="weekTableData.length"
            prev-text="上一頁"
            next-text="下一頁">
          </el-pagination>
        </div>
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
      <el-tab-pane label="計畫查詢" name="third">
        <el-table
          :data="planTableData"
          style="width: 100%"
          empty-text="No Data"
        >
          <el-table-column
            v-for="column in planTableInfo"
            :key="column.label"
            :prop="column.prop"
            :label="column.label"
            align="center"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import FactorySelection from './FactorySelection'
  import { planYearlist, planWeeklist, planWeekPlanHis } from '@/api.js'
  export default {
    components: {
      FactorySelection
    },
    data() {
      return {
        activeName: 'first',
        currentPage: 1, //默认显示页面为1
        pagesize: 9,
        year: '',
        year_list: ['2018', '2019', '2020'],
        week: '',
        week_list: ['W1', 'W2', 'W3'],
        part: '',
        start_end: [],
        weekTableInfo: [
          { prop: 'year', label: '年', width: ''},
          { prop: 'week', label: '週次', width: ''},
          { prop: 'CHNNAME', label: '品名', width: ''},
          { prop: 'ton', label: '噸位', width: ''},
          { prop: 'Part_NO', label: '料號', width: ''},
          { prop: 'plastic_part_NO', label: '塑膠料號', width: ''},
          { prop: 'plan_number', label: '計畫數量', width: ''},
          { prop: 'real_NO', label: '已完成數量', width: ''},
          { prop: 'last_number', label: '剩餘數量', width: ''},
          { prop: 'plan_time', label: '計畫工時', width: ''},
          { prop: 'rate', label: '完成度', width: ''}
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
        planTableInfo: [
          { prop: 'Part_NO', label: '料號', width: ''},
          { prop: 'machine_ton', label: '噸位', width: ''},
          { prop: 'machine_NO', label: '機台號', width: ''},
          { prop: 'plastic_color', label: '當前顏色', width: ''},
          { prop: 'mold_down_t', label: '上下模時間', width: ''},
          { prop: 'plan_s_time', label: '起始時間', width: ''},
          { prop: 'plan_e_time', label: '結束時間', width: ''},
          { prop: 'product_name', label: '品名', width: ''},
          { prop: 'plastic_Part_NO', label: '塑膠料號', width: ''},
          { prop: 'plan_number', label: '數量', width: ''},
          { prop: 'mold_NO', label: '模號', width: ''},
          { prop: 'mold_Serial', label: '模序', width: ''},
          { prop: 'mold_position', label: '模具儲位', width: ''},
          { prop: 'plan_work_time', label: '計畫工時', width: ''},
          { prop: 'machine_CT', label: '標準週期', width: ''},
          { prop: 'UPH', label: 'UPH', width: ''},
          { prop: 'emergency', label: '緊急程度', width: ''},
          { prop: 'need', label: '量產', width: ''},
          { prop: 'note', label: '備註', width: ''}
        ],
        planTableData: [],
      };
    },
    watch: {
      year: function () {
        this.getWeekList(this.year);
      }
    },
    methods: {
      date(item) {
        /* eslint-disable */
        console.log(item)
      },
      getYearList() {
        planYearlist().then(response=>{
          let data = response.data.data
          // console.log(data)
          this.year_list = data
        })
      },
      getWeekList(year) {
        planWeeklist(year).then(response=>{
          let data = response.data.data
          // console.log(data)
          let tmp = []
          data.forEach(item => {
            tmp.push('W'+item)
          })
          this.week_list = tmp
        })
      },
      getWeekPlanHis() {
        let y = undefined,w = undefined,p = undefined
        if (this.year) y=this.year
        if (this.week) w = this.week.substring(1,3)
        if (this.part) p = this.part
        planWeekPlanHis(y, w, p).then(response =>{
          let data = response.data.data
          this.weekTableData = data
        })
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
        /*console.log(this.currentPage) */
      },
    },
    mounted() {
      this.getYearList();
      this.getWeekList();
      this.getWeekPlanHis();
    }
  };
</script>