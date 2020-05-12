<template>
  <div>
    <el-row class="header-row">料號維護</el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="料號顏色" name="1">
        <el-row :gutter="10">
          <el-col :sm="7" :md="5" :lg="3" :xl="2">
            <span style="line-height: 30px">請填入查詢料號：</span>
          </el-col>
          <el-col :sm="8" :md="8" :lg="5">
            <el-input v-model="input" size="small"></el-input>
          </el-col>
          <el-col :sm="8" :md="8" :lg="5">
            <el-button @click="dataSearch(input)" size="small">搜尋</el-button>
            <el-button @click="dataClear()" size="small">清除搜索</el-button>
          </el-col>
          <el-col :md="24" :lg="11" :xl="12" style="text-align: right;">
            <!-- <el-button size="small" style="margin-right: 10px; position: relative;" @click="addRow">新增</el-button> -->
            <NewRowButton
              type='partno'
              :tableInfo="tableInfo"
              style="text-align: left;"
              @update="getTableData"
            />
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
            <!-- <el-col style="text-align: right;" :span="10"> -->
            <DownloadButton file_type="plasticcolor" class="commit"/>
          <!-- </el-col> -->
          </el-col>
        </el-row>
        <el-row>
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            style="width: 100%"
            :max-height="650"
            v-loading="loading"
          >
            <el-table-column
              prop="plastic_part_NO"
              label="塑膠粒料號"
              align="center"
              show-overflow-tooltip
            >
              <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.plastic_part_NO">
                <span slot="content">{{row.plastic_part_NO}}</span>
              </editable-cell>
            </el-table-column>
            <el-table-column
              prop="plastic_color"
              label="顏色"
              align="center"
              show-overflow-tooltip
            >
              <editable-cell
                :show-input="row.editMode"
                slot-scope="{row}"
                editable-component="el-select"
                v-model="row.plastic_color"
              >
                <span slot="content">{{row.plastic_color}}</span>
                <template slot="edit-component-slot">
                  <el-option
                    v-for="(color,index) in colorlist"
                    :key="index"
                    :label="color.label"
                    :value="color.value"
                  ></el-option>
                </template>
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
                v-show="row.editMode"
                @click="saveRow(row, $index)">
              </el-button>
              <el-button
                type="info"
                icon="el-icon-close"
                size="mini"
                v-show="row.editMode"
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
</style>

<script>
import EditableCell from "./EditableCell.vue";
import DownloadButton from "./DownloadButton.vue";
import NewRowButton from './NewRowButton.vue'
import { dataPlasticColor, dataImportPlasticColor, dataEditPlasticColor, dataColorList } from '../api.js'

export default {
  components: {
    EditableCell,
    DownloadButton,
    NewRowButton
  },
  data() {
    return {
      tableData: [],
      input: '',
      currentPage: 1, //默认显示页面为1
      pagesize: 10, //    每页的数据条数
      activeName: '1',
      colorlist: [],
      loading: false,
      file: undefined,
      tableInfo: [
        { prop: 'plastic_part_NO', label: '塑膠粒料號' },
        { prop: 'plastic_color', label: '顏色'}
      ]
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
    getTableData(data) {
      this.loading=true
      dataPlasticColor(data).then((response)=>{
        this.loading=false
        this.tableData = response.data.data
        this.tableData = this.tableData.map(row => {
          return {
            ...row,
            editMode: false
          };
        });
      })
    },
    setEditMode(row, index) {
      row.editMode = true;
    },
    cancelEditMode(row, index) {
      row.editMode = false;
      this.getTableData();
    },
    saveRow(row, index) {
      dataEditPlasticColor(row,'user').then((response) => {
        this.$message.success('修改成功！');
        // 修改成功之後 刷新表格
        this.getTableData();
        // console.log(response);
      })
      .catch((error) => {
        let error_code = error.response.status
        this.$message.error('修改失敗！ Error Code: ' + error_code);
      });
      row.editMode = false;
    },
    addRow() {
      let new_row = {
        plastic_part_NO: '',
        plastic_color: '',
        editMode: true
      }
      this.tableData.unshift(new_row)
    },
    getColorList() {
      dataColorList().then((response)=>{
        let data = response.data.color
        for (let i=0;i<data.length;i++) {
          this.colorlist.push({
            value: data[i].toString(),
            label: data[i].toString()
          })
        }
      })
    },
    submitForm(){
      dataImportPlasticColor('user',this.file).then((response) => {
        // console.log(response.data);
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
      this.file = this.$refs.file.files[0];
    }
    /* eslint-enable */
  },
  mounted() {
    this.getTableData();
    this.getColorList();
  }
}
</script>