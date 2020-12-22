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
        <FactorySelection
          tonlist
          @lineSelected="getLine"
          @siteSelected="getSite"
          @tonSelected="getTon"
        />
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
        <el-button size='mini' style="margin-left: 10px;" @click="WorkListSearch">查詢</el-button>
        <el-table
          :data="reportTableData.slice((currentPage-1)*10,currentPage*10)"
          style="width: 100%"
          empty-text="No Data"
        >
          <el-table-column
            v-for="column in reportTableInfo"
            :key="column.label"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
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
            :total="reportTableData.length"
            prev-text="上一頁"
            next-text="下一頁">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="計畫查詢" name="third">
        <FactorySelection
          tonlist
          @lineSelected="getLine"
          @siteSelected="getSite"
          @tonSelected="getTon"
        />
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
        <el-button size='mini' style="margin-left: 10px;" @click="ArrangementSearch">查詢</el-button>
        <el-table
          :data="planTableData.slice((currentPage-1)*10,currentPage*10)"
          style="width: 100%"
          empty-text="No Data"
        >
          <el-table-column
            v-for="column in planTableInfo"
            :key="column.label"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :fixed="column.label == '料號'"
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
            :total="planTableData.length"
            prev-text="上一頁"
            next-text="下一頁">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import FactorySelection from '../base/FactorySelection'
  import { planYearlist, planWeeklist, planWeekPlanHis, planWorkListHis, planArrangementHis } from '@/api.js'
  import { String2Date, getLast7Days } from '@/utils/common.js'
  export default {
    components: {
      FactorySelection
    },
    data() {
      return {
        activeName: 'first',
        currentPage: 1, //默认显示页面为1
        pagesize: 10,
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
          { prop: 'work_list_NO', label: '工令號', width: '80'},
          { prop: 'machine_NO', label: '機台號', width: '80'},
          { prop: 'mold_NO', label: '模號', width: '100'},
          { prop: 'Part_NO', label: '料號', width: '200'},
          { prop: 'VER', label: '版次', width: '100'},
          { prop: 'real_mold_changerover_time', label: '上下模時間', width: '100'},
          { prop: 'real_s_time', label: '開始時間', width: '100'},
          { prop: 'real_e_time', label: '結束時間', width: '100'},
          { prop: 'plan_number', label: '計畫數量', width: '100'},
          { prop: 'good_number', label: '已完成數量', width: '100'},
          { prop: 'left_number', label: '剩餘數量', width: '100'},
          { prop: 'rate', label: '完成度', width: '80'}
        ],
        reportTableData: [],
        planTableInfo: [
          { prop: 'Part_NO', label: '料號', width: '200'},
          { prop: 'VER', label: '版次', width: '100'},
          { prop: 'machine_ton', label: '噸位', width: '80'},
          { prop: 'machine_NO', label: '機台號', width: '80'},
          { prop: 'plastic_color', label: '當前顏色', width: '100'},
          { prop: 'mold_down_t', label: '上下模時間', width: '100'},
          { prop: 'plan_s_time', label: '起始時間', width: '100'},
          { prop: 'plan_e_time', label: '結束時間', width: '100'},
          { prop: 'product_name', label: '品名', width: '120'},
          { prop: 'plastic_Part_NO', label: '塑膠料號', width: '100'},
          { prop: 'plan_number', label: '數量', width: '100'},
          { prop: 'mold_NO', label: '模號', width: '100'},
          { prop: 'mold_Serial', label: '模序', width: '100'},
          { prop: 'mold_position', label: '模具儲位', width: '100'},
          { prop: 'plan_work_time', label: '計畫工時', width: '100'},
          { prop: 'machine_CT', label: '標準週期', width: '100'},
          { prop: 'UPH', label: 'UPH', width: '100'},
          { prop: 'emergency', label: '緊急程度', width: '100'},
          { prop: 'need', label: '量產', width: '100'},
          { prop: 'note', label: '備註', width: '100'}
        ],
        planTableData: [],
        current_site: '',
        current_line: '',
        current_ton: ''
      };
    },
    watch: {
      year: function () {
        this.getWeekList(this.year);
      },
      activeName: function() {
        this.currentPage = 1
      },
      start_end:function() {
        if (!this.start_end) this.start_end = []
      },
    },
    methods: {
      date() {
        /* eslint-disable */
        // console.log(item)
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
        if (this.year) y = this.year
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
      getSite(site) {
        this.current_site = site
      },
      getLine(line) {
        this.current_line = line
      },
      getTon(ton) {
        this.current_ton = ton
      },
      WorkListSearch() {
        if (this.start_end.length == 0 || !this.start_end) {
          this.$alert('請輸入時間範圍！', '溫馨提示', {
            confirmButtonText: '確定',
          });
        }
        else {
          let s_time = String2Date(this.start_end[0])
          let e_time = String2Date(this.start_end[1])
          // 不能超過三個月時間
          let time_3Mon = s_time.setMonth( s_time.getMonth() + 3 ) ;
          if (time_3Mon < e_time) {
            this.$alert('時間範圍不可超過三個月！', '溫馨提示', {
              confirmButtonText: '確定',
            });
          }
          else {
            // console.log(this.current_site, this.current_line, this.current_ton, this.part, this.start_end )
            let s = undefined,l = undefined,t = undefined,p = undefined
            if (this.current_site && this.current_site != 'All') {
              if (this.current_site == 'D9 - 1F') s = this.current_site.substring(0,2)
              else s = this.current_site.substring(0,3)
            }
            if (this.current_line && this.current_line != 'All') {
              l = this.current_line.substring(0,1)
            }
            if (this.current_ton && this.current_ton != 'All') t = this.current_ton
            if (this.part) p = this.part
            planWorkListHis(s,l,t,p,this.start_end).then(response => {
              let data = response.data.data
              this.reportTableData = data
            })
            .catch(() =>{
              this.$message.error({
                message: '查詢失敗，請嘗試更換搜尋參數',
                center: true,
                duration: 2000
              });
            })
          }
        }
      },
      ArrangementSearch() {
        if (this.start_end.length == 0 || !this.start_end) {
          this.$alert('請輸入時間範圍！', '溫馨提示', {
            confirmButtonText: '確定',
          });
        }
        else {
          let s_time = String2Date(this.start_end[0])
          let e_time = String2Date(this.start_end[1])
          // 不能超過三個月時間
          let time_3Mon = s_time.setMonth( s_time.getMonth() + 3 ) ;
          if (time_3Mon < e_time) {
            this.$alert('時間範圍不可超過三個月！', '溫馨提示', {
              confirmButtonText: '確定',
            });
          }
          else {
            // console.log(this.current_site, this.current_line, this.current_ton, this.part, this.start_end )
            let s = undefined,l = undefined,t = undefined,p = undefined
            if (this.current_site && this.current_site != 'All') {
              if (this.current_site == 'D9 - 1F') s = this.current_site.substring(0,2)
              else s = this.current_site.substring(0,3)
            }
            if (this.current_line && this.current_line != 'All') {
              l = this.current_line.substring(0,1)
            }
            if (this.current_ton && this.current_ton != 'All') t = this.current_ton
            if (this.part) p = this.part
            planArrangementHis(s,l,t,p,this.start_end).then(response => {
              let data = response.data.data
              console.log(data)
              this.planTableData = data
            })
            .catch(() =>{
              this.$message.error({
                message: '查詢失敗，請嘗試更換搜尋參數',
                center: true,
                duration: 2000
              });
            })
          }
        }
      }
    },
    mounted() {
      this.getYearList();
      this.getWeekList();
      this.getWeekPlanHis();
      this.start_end = getLast7Days()
      this.WorkListSearch()
    }
  };
</script>