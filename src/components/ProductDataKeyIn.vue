<template>
  <div>
    <el-row class="header-row">排配資料輸入</el-row>
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="急單、其他製程資料導入" name="1">
        <NewRowButton
          :tableLabel="tableData_label"
          :tableInfo="tableData.length ==0? []: Object.keys(tableData[0])"
        />
        <!-- <el-button size="small" style="margin-right: 10px; position: relative;" @click="addRow">新增</el-button> -->
        <a>
          <el-button size="small" class="upload" plain>選擇檔案</el-button>
          <input type="file" id="file" ref="file" @change="onChangeFileUpload()" class="change"/>
        </a>
        <span v-if="typeof(file) != 'undefined'" class="commit">{{ file.name }}</span>
        <el-button
          size="small"
          type="primary"
          @click="submitForm()"
          class="commit"
          style="margin-left: 5px;"
          :disabled="typeof(file) == 'undefined'"
        >上傳</el-button>
        <DownloadButton file_type="dayplan" class="commit"/>
        <el-row>
          <el-table
            :data="tableData"
            style="width: 100%"
            :max-height="650"
            v-loading="loading"
          >
            <el-table-column
              prop="sec_Part_NO"
              label="料號"
              align="center"
              show-overflow-tooltip
            >
              <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.sec_Part_NO">
                <span slot="content">{{row.sec_Part_NO}}</span>
              </editable-cell>
            </el-table-column>
            <el-table-column
              prop="require_source"
              label="種類"
              align="center"
              show-overflow-tooltip
            >
              <editable-cell
                :show-input="row.editMode"
                slot-scope="{row}"
                v-model="row.require_source"
                editable-component="el-select"
              >
                <span slot="content">{{row.require_source}}</span>
                <template slot="edit-component-slot">
                  <el-option
                    v-for="(item,index) in categorylist"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </template>
              </editable-cell>
            </el-table-column>
            <el-table-column
              prop="plan_number"
              label="數量"
              align="center"
              show-overflow-tooltip
            >
              <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.plan_number">
                <span slot="content">{{row.plan_number}}</span>
              </editable-cell>
            </el-table-column>
            <el-table-column
              prop="require_date"
              label="交期"
              align="center"
              show-overflow-tooltip
            >
              <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.require_date">
                <span slot="content">{{row.require_date}}</span>
              </editable-cell>
            </el-table-column>
            <el-table-column
              prop="place_of_shipment"
              label="出貨地"
              align="center"
              show-overflow-tooltip
            >
              <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.place_of_shipment">
                <span slot="content">{{row.place_of_shipment}}</span>
              </editable-cell>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="200"
            >
             <template slot-scope="{row, $index}">
              <el-button
                size="mini"
                icon="el-icon-edit"
                @click="setEditMode(row, $index)">
              </el-button>
              <el-button
                type="success"
                icon="el-icon-check"
                size="mini"
                @click="saveRow(row, $index)">
              </el-button>
              <el-button
                type="info"
                icon="el-icon-close"
                size="mini"
                @click="cancelEditMode(row, $index)">
              </el-button>
             </template>
            </el-table-column>
          </el-table>
          <div>
            <el-pagination
              :hide-on-single-page='true'
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10,20,50]"
              :page-size="pagesize"
              layout="total, sizes,prev, pager, next"
              :total="tableData.length"
              prev-text="上一頁"
              next-text="下一頁">
            </el-pagination>
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="周料號導入" name="2">
        <NewRowButton
          :tableInfo="week_part_no.length ==0? []: Object.keys(week_part_no[0])"
          :tableLabel="week_part_label"
        />
        <!-- <el-button
          size="small"
          style="margin-right: 10px; position: relative;"
          @click="addRow"
        >新增</el-button> -->
        <a>
          <el-button size="small" class="upload" plain>選擇檔案</el-button>
          <input type="file" id="file" ref="file" @change="onChangeFileUpload()" class="change"/>
        </a>
        <span v-if="typeof(file) != 'undefined'" class="commit">{{ file.name }}</span>
        <el-button
          size="small"
          type="primary"
          @click="submitForm()"
          class="commit"
          style="margin-left: 5px;"
          :disabled="typeof(file) == 'undefined'"
        >上傳</el-button>
        <DownloadButton file_type="weekplan" class="commit"/>
        <el-row>
          <el-table
            :data="week_part_no"
            style="width: 100%"
            :max-height="650"
            v-loading="loading"
          >
            <el-table-column
              prop="part_NO"
              label="料號"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="count"
              label="數量"
              align="center"
              show-overflow-tooltip
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
              label="操作"
              align="center"
            >
             <template slot-scope="{row, $index}">
              <el-button
                size="mini"
                icon="el-icon-edit"
                @click="setEditMode(row, $index)">
              </el-button>
              <el-button
                type="success"
                icon="el-icon-check"
                size="mini"
                @click="saveRow(row, $index)">
              </el-button>
              <el-button
                type="info"
                icon="el-icon-close"
                size="mini"
                @click="cancelEditMode(row, $index)">
              </el-button>
             </template>
            </el-table-column>
          </el-table>
          <div>
            <el-pagination
              :hide-on-single-page='true'
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10,20,50]"
              :page-size="pagesize"
              layout="total, sizes,prev, pager, next"
              :total="tableData.length"
              prev-text="上一頁"
              next-text="下一頁">
            </el-pagination>
          </div>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 5px;
}
.upload {
  position: relative;
  width: 80px;
  /*right: -80px;*/
  color: #409EFF;
}
.commit {
  position: relative;
  /*margin-left: 5px;*/
  right: 80px;
}
.change{
  position: relative;
  overflow: hidden;
  line-height: 32px;
  right: 80px;
  top: 13px;
  width: 80px;
  opacity: 0;
}
.tabs >>> .el-tabs__header {
  margin:0;
}
</style>

<script>
import EditableCell from "./EditableCell.vue";
import DownloadButton from "./DownloadButton.vue";
import NewRowButton from "./NewRowButton.vue";
import { dataDayPlan, dataWeekPlan, dataImportDayPlan, dataImportWeekPlan,
         dataEditDayPlan, dataEditWeekPlan } from '../api.js'

export default {
  components: {
    EditableCell,
    DownloadButton,
    NewRowButton
  },
  data() {
    return {
      tableData: [],    //急單、其他資料
      input: '',
      currentPage: 1, //默认显示页面为1
      pagesize: 10, //    每页的数据条数
      activeName: '1',
      categorylist: [],
      loading: false,
      file: undefined,
      week_part_no: [],   //周料號
      tableData_label: ['料號', '種類', '數量', '交期', '出貨地'],
      week_part_label: ['料號', '數量'],
    }
  },
  methods: {
    /* eslint-disable */
    dataSearch(data) {
      this.getTableData(data)
    },
    dataClear(data) {
      this.input=''
      this.getTableData()
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    getCategoryList() {
      this.categorylist = ['急單', 'D11組裝', '成型組裝', 'NSD', '海外', '印刷', '重試' ]
    },
    async getTableData(data) {
      // this.week_part_no =[
      //   { part_NO: '700-43545-03M', count: '100' },
      //   { part_NO: '700-43545-03M', count: '100' },
      //   { part_NO: '700-43545-03M', count: '100' },
      //   { part_NO: '700-43545-03M', count: '100' },
      //   { part_NO: '700-43545-03M', count: '100' },
      // ]
      // for (let i=0;i<5;i++) {
      //   this.tableData.push({
      //     part_NO: '700-43545-03M',
      //     category: '急單',
      //     count: '100',
      //     time: '2020-01-01',
      //     place: 'Longhua'
      //   })
      // }
      const day = await dataDayPlan()
      const week = await dataWeekPlan()
      console.log(day.data.data,week.data)
      this.tableData = day.data.data
      // this.week_part_no = week.data.data
      // this.week_part_no = this.week_part_no.map(row => {
      //   return {
      //     ...row,
      //     editMode: false
      //   };
      // });
      this.tableData = this.tableData.map(row => {
        return {
          ...row,
          editMode: false
        };
      });
    },
    setEditMode(row, index) {
      row.editMode = true;
    },
    cancelEditMode(row, index) {
      row.editMode = false;
      this.getTableData();
    },
    saveRow(row, index) {
      // console.log(row)
      let EditPlan = new Object()
      if (this.activeName == '1') {
        EditPlan = dataEditDayPlan
      }
      else {
        EditPlan = dataEditWeekPlan
      }
      // console.log(row)
      EditPlan(row,'user').then((response)=>{
        if (response.status == 200) {
          // console.log(response.status)
          this.$message.success('修改成功！')
          this.getTableData();
          row.editMode = false;
        }
        else {
          this.$message.error(error.response)
        }
      })
    },
    addRow() {
      // console.log(this.activeName)
      if (this.activeName == '1') {
        let new_row = {
          plastic_part_NO: '',
          plastic_color: '',
          editMode: true
        }
        this.tableData.unshift(new_row)
      }
      else {
        let new_row = {
          plastic_part_NO: '',
          plastic_color: '',
          editMode: true
        }
        this.week_part_no.unshift(new_row)
      }
    },
    submitForm(){
      let upload = new Object()
      if (this.activeName == '1') {
        upload = dataImportDayPlan
      }
      else {
        upload = dataImportWeekPlan
      }
      upload('user',this.file).then((response)=>{
        if (response.status == 200) {
          // console.log(response.status)
          this.$message.success('上傳成功！')
          this.getTableData();
        }
        else {
          this.$message.error(error.response)
        }
      })
      .catch((error) => {
        this.$message.error('上傳失敗！')
        // console.log(error.response);
      });
    },
    onChangeFileUpload(){
      // console.log(this.$refs.file.files[0])
      this.file = this.$refs.file.files[0];
    }
    /* eslint-enable */
  },
  mounted() {
    this.getTableData();
    this.getCategoryList();
  }
}
</script>