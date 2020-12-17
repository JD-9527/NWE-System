<template>
  <div>
    <el-row class="header-row">料號維護</el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="料號顏色" name="1">
        <el-row :gutter="5">
          <el-col :sm='23' :md='21' :lg='13' :xl='12'>
            <span style="line-height: 30px; margin-left: 5px;">請填入查詢料號：</span>
            <el-input v-model="input" size="small" style="width: 20vw; margin-right: 10px;"></el-input>
            <el-button @click="dataSearch(input)" size="small">搜尋</el-button>
            <el-button @click="dataClear()" size="small">清除搜索</el-button>
          </el-col>
          <el-col :md="24" :lg="11" :xl="12" style="text-align: right;">
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
            <DownloadButton file_type="plasticcolor" class="commit"/>
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
      <el-tab-pane label="特殊料號" name="2">
        <el-row :gutter="10">
          <el-col :sm='23' :md='21' :lg='13' :xl='12'>
            <span style="line-height: 30px; margin-left: 5px;">請填入查詢料號：</span>
            <el-input v-model="input" size="small" style="width: 20vw; margin-right: 10px;"></el-input>
            <el-button @click="dataSearch(input)" size="small">搜尋</el-button>
            <el-button @click="dataClear()" size="small">清除搜索</el-button>
          </el-col>
          <el-col :md="24" :lg="11" :xl="12" style="text-align: right;">
            <NewRowButton
              type='partnoS'
              :tableInfo="tableInfo_s"
              style="text-align: left;"
              @update="getTableData"
            />
            <a>
              <el-button size="small" class="upload" plain>選擇檔案</el-button>
              <input type="file" id="file_s" ref="file_s" @change="onChangeFileUpload()" class="change"/>
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
            <DownloadButton file_type="specialpartno" class="commit"/>
          </el-col>
        </el-row>
        <el-row>
          <el-table
            :data="tableData_s.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            style="width: 100%"
            :max-height="650"
            v-loading="loading"
          >
            <el-table-column
              prop="Part_NO"
              label="料號"
              align="center"
              show-overflow-tooltip
            >
              <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.Part_NO">
                <span slot="content">{{row.Part_NO}}</span>
              </editable-cell>
            </el-table-column>
            <el-table-column
              prop="machine_NO"
              label="指定機台"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="{row}">
                <el-select
                  v-model="row.machine_NO"
                  placeholder="請選擇"
                  filterable
                  clearable
                  multiple
                  v-show="row.editMode"
                  size='small'
                >
                  <el-option
                    v-for="(machine,index) in machinelist"
                    :key="index"
                    :label="machine"
                    :value="machine"
                  ></el-option>
                </el-select>
                <span slot="content" v-show="!row.editMode">
                  <span
                    v-for="(item,index) in row.machine_NO"
                    :key="item"
                  >
                    <span v-show="index!=0">、</span>
                    {{ item }}
                  </span>
                </span>
              </template>
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
              :total="tableData_s.length"
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
  top: 0px;
  width: 80px;
  opacity: 0;
}
</style>

<script>
import EditableCell from "./EditableCell.vue";
import DownloadButton from "./base/DownloadButton.vue";
import NewRowButton from './base/NewRowButton.vue'
import { dataPlasticColor, dataImportPlasticColor, dataEditPlasticColor,
         dataColorList, dataSpecPartno, dataSpecPartnoEdit } from '../api.js'

export default {
  components: {
    EditableCell,
    DownloadButton,
    NewRowButton
  },
  data() {
    return {
      tableData: [],
      tableData_s: [
        {
          Part_NO: 'abc123',
          machine_NO: ['A01', 'B01', 'C01'],
          editMode: false
        },
      ],
      input: '',
      currentPage: 1, //默认显示页面为1
      pagesize: 10, //    每页的数据条数
      activeName: '1',
      colorlist: [],
      loading: false,
      loadingS: false,
      file: undefined,
      file_s: undefined,
      tableInfo: [
        { prop: 'plastic_part_NO', label: '塑膠粒料號', type: 'input' },
        { prop: 'plastic_color', label: '顏色', type: 'select'}
      ],
      tableInfo_s: [
        { prop: 'Part_NO', label: '料號', type: 'input' },
        { prop: 'machine_NO', label: '指定機台', type: 'select'},
      ],
      machinelist: []
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
    getTableDataS(data) {
      this.loadingS=true
      dataSpecPartno(data).then((response)=>{
        this.loadingS=false
        // console.log(response.data.data)
        this.tableData_s = response.data.data
        this.tableData_s = this.tableData_s.map(row => {
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
      if (this.activeName == '1') {
        this.getTableData();
      }
      else {
        this.getTableDataS();
      }
    },
    saveRow(row, index) {
      // dataSpecPartnoEdit
      if (this.activeName == '1') {
        dataEditPlasticColor(row,this.$store.getters.name).then((response) => {
          this.$message.success('修改成功！');
          // 修改成功之後 刷新表格
          this.getTableData();
          // console.log(response);
        })
        .catch((error) => {
          let error_code = error.response.status
          this.$message.error('修改失敗！ Error Code: ' + error_code);
        });
      }
      else {
        dataSpecPartnoEdit(row,this.$store.getters.name).then((response) => {
          this.$message.success('修改成功！');
          // 修改成功之後 刷新表格
          this.getTableDataS();
          // console.log(response);
        })
        .catch((error) => {
          let error_code = error.response.status
          console.log(error.response.data)
          this.$message.error('修改失敗！ Error Code: ' + error_code);
          this.getTableDataS();
        });
      }
      row.editMode = false;
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
      dataImportPlasticColor(this.$store.getters.name,this.file).then((response) => {
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
      if (this.activeName == '1') this.file = this.$refs.file.files[0];
      else this.file = this.$refs.file_s.files[0];
    },
    getMachineList() {
      let tmp = []
      for (let i=0;i<15;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('A'+num)
      }
      for (let i=0;i<14;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('B'+num)
      }
      for (let i=0;i<12;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('C'+num)
      }
      for (let i=0;i<19;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('D'+num)
      }
      for (let i=0;i<21;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('E'+num)
      }
      for (let i=0;i<17;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('F'+num)
      }
      for (let i=0;i<9;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('G'+num)
      }
      this.machinelist = tmp
    },
    /* eslint-enable */
  },
  mounted() {
    this.getTableData();
    this.getTableDataS();
    this.getColorList();
    this.getMachineList();
  }
}
</script>