<template>
  <div>
    <el-row class="header-row">機台維護</el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="機台基本資料維護" name="1">
        <div style="display: flex;">
          <a>
            <el-button size="small" style="margin-right: 5px; left:0;" class="upload" plain>選擇檔案</el-button>
            <input type="file" id="file" ref="file1" @change="onChangeFileUpload()" class="change" style="left:0;" />
          </a>
          <span v-if="typeof(file) != 'undefined'" class="commit" style="line-height: 32px;">{{ file.name }}</span>
          <el-button
            size="mini"
            type="primary"
            @click="submitForm()"
            class="commit"
            style="margin-left: 5px;"
            :disabled="typeof(file) == 'undefined'"
          >上傳
          </el-button>
          <div style="flex-grow: 1;"></div>
          <DownloadButton file_type="machineton"/>
        </div>
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%"
          :max-height="650"
          v-loading="loading"
        >
          <el-table-column
            prop="machine_NO"
            label="機台號"
            align="center"
            width="300"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="machine_ton"
            label="噸位"
            align="center"
            show-overflow-tooltip
          >
            <editable-cell
              :show-input="row.editMode"
              slot-scope="{row}"
              editable-component="el-select"
              v-model="row.machine_ton"
            >
              <span slot="content">{{row.machine_ton}}</span>
              <template slot="edit-component-slot">
                <el-option
                  v-for="(ton,index) in tonList"
                  :key="index"
                  :label="ton.label"
                  :value="ton.value"
                ></el-option>
              </template>
            </editable-cell>
          </el-table-column>
          <el-table-column
            prop="product_color"
            label="機台當前顏色"
            align="center"
            width="150"
            show-overflow-tooltip
          >
            <editable-cell
              :show-input="row.editMode"
              slot-scope="{row}"
              editable-component="el-select"
              v-model="row.product_color"
            >
              <span slot="content">{{row.product_color}}</span>
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
      </el-tab-pane>
      <el-tab-pane label="前置作業時間維護" name="2">
        <div style="display: flex;">
          <NewRowButton type='cttime' :tableInfo='columnsCT' @update="getTableDataCT"/>
          <a>
            <el-button size="small" style="margin-right: 5px;" class="upload" plain>選擇檔案</el-button>
            <input type="file" id="file" ref="file" @change="onChangeFileUpload()" class="change"/>
          </a>
          <span v-if="typeof(file) != 'undefined'" class="commit" style="line-height: 32px;">{{ file.name }}</span>
          <el-button
            size="mini"
            type="primary"
            @click="submitForm()"
            class="commit"
            style="margin-left: 5px;"
            :disabled="typeof(file) == 'undefined'"
          >上傳
          </el-button>
          <div style="flex-grow: 1;"></div>
          <DownloadButton file_type="tondata"/>
        </div>

        <el-table
          :data="tableDataCT.slice((currentPageCT-1)*pagesizeCT,currentPageCT*pagesizeCT)"
          style="width: 100%"
          max-height="650"
          v-loading="loading_ct"
        >
          <el-table-column
            prop="machine_ton"
            label="噸位"
            align="center"
            show-overflow-tooltip
          >
            <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.machine_ton">
              <span slot="content">{{row.machine_ton}}</span>
            </editable-cell>
          </el-table-column>
          <el-table-column
            prop="mold_cttime"
            label="前置作業時間"
            align="center"
            show-overflow-tooltip
          >
            <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.mold_cttime">
              <span slot="content">{{row.mold_cttime}}</span>
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
              @click="saveRowCT(row, $index)">
            </el-button>
            <el-button
              type="info"
              icon="el-icon-close"
              size="mini"
              v-show="row.editMode"
              @click="cancelEditMode(row, $index)">
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              v-show="!row.editMode"
              @click="openDialog(row, $index)">
            </el-button>
           </template>
          </el-table-column>
        </el-table>
        <div>
          <el-pagination
            :hide-on-single-page='true'
            @size-change="handleSizeChangeCT"
            @current-change="handleCurrentChangeCT"
            :current-page="currentPageCT"
            :page-sizes="[10,20,50]"
            :page-size="pagesizeCT"
            layout="total, sizes,prev, pager, next"
            :total="tableDataCT.length"
            prev-text="上一頁"
            next-text="下一頁">
          </el-pagination>
        </div>
        <el-dialog
          :visible.sync="dialogVisible"
          width="20%"
          center
        >
          <div slot="title">是否確認刪除這筆資料？</div>
          <!-- <div style="display: inline-block; text-align: center;"> -->
            <!-- <span>是否確認刪除這筆資料？<br/></span> -->
            <span>噸位：{{ dialogMessage.machine_ton }}<br/></span>
            <span>前置作業時間：{{ dialogMessage.mold_cttime }}<br/></span>
          <!-- </div> -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="danger" @click="deleteRow(dialogMessage,dialogMessageRow)" size="small">確認刪除</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.header-row {
  font-size: 32px;
  font-weight:bold;
}
.sub-header-row {
  font-size: 20px;
  color: #888;
  font-weight: normal;
}
.el-row {
  margin-bottom: 5px;
}
.upload {
  position: absolute;
  left: 66px;
  width: 80px;
  color: #409EFF;
}
.commit {
  position: relative;
  /*margin-left: 5px;*/
  left: 86px;
}
.change{
  position: absolute;
  overflow: hidden;
  line-height: 32px;
  left: 66px;
  width: 80px;
  opacity: 0;
}
</style>

<script>
import EditableCell from "./EditableCell.vue";
import DownloadButton from "./DownloadButton.vue";
import NewRowButton from './NewRowButton.vue'
import { dataMachineColor, dataEditMachineColor, dataCtTime, dataEditCtTime, dataDelCtTime,
         dataColorList, dataTonList, dataImportCtTime, dataImportMachine } from "../api.js"

export default {
  components: {
      EditableCell,
      DownloadButton,
      NewRowButton
  },
  data() {
    return {
      tableData: [],
      columnsCT: [
        {prop: 'machine_ton', label: "噸位", type: 'input'},
        {prop: 'mold_cttime', label: "前置作業時間", type: 'input'},
      ],
      tableDataCT: [],
      activeName: '1',  // 默認激活的tab
      colorlist: [],
      tonList: [],
      input: '',
      currentPage: 1, //默认显示页面为1
      pagesize: 20, //    每页的数据条数
      currentPageCT: 1,
      pagesizeCT: 20,
      loading: false,
      loading_ct: false,
      dialogVisible: false,
      dialogMessage: '',
      dialogMessageRow: 0,
      file: undefined
    }
  },
  methods: {
    /* eslint-disable */
    getTableData() {
      this.loading=true
      dataMachineColor().then((response)=>{
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
    getTableDataCT() {
      this.loading_ct=true
      dataCtTime().then((response)=>{
        this.loading_ct=false
        this.tableDataCT = response.data.data
        this.tableDataCT = this.tableDataCT.map(row => {
          return {
            ...row,
            editMode: false
          };
        });
      })
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChangeCT: function(size) {
      this.pagesizeCT = size;
    },
    handleCurrentChangeCT: function(currentPage) {
      this.currentPageCT = currentPage;
    },
    setEditMode(row, index) {
      row.editMode = true;
    },
    cancelEditMode(row, index) {
      row.editMode = false;
      this.getTableData();
      this.getTableDataCT();
    },
    saveRow(row, index) {
      dataEditMachineColor(row,this.$store.getters.name).then((response) => {
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
    deleteRow(row, index) {
      dataDelCtTime(row.machine_ton).then((response) => {
        this.$message.success('刪除成功！');
        // 刪除成功之後 刷新表格
        this.getTableDataCT();
        // console.log(response);
        // this.tableDataCT.splice(index, 1)
        this.dialogVisible = false
      })
      .catch((error) => {
        let error_code = error.response.status
        this.$message.error('刪除失敗！ Error Code: ' + error_code);
      });
    },
    saveRowCT(row, index) {
      dataEditCtTime(row,this.$store.getters.name).then((response) => {
        this.$message.success('修改成功！');
        // 修改成功之後 刷新表格
        this.getTableDataCT();
        // console.log(response);
      })
      .catch((error) => {
        console.log(error.response.status);
        let error_code = error.response.status
        this.$message.error('修改失敗！ Error Code: ' + error_code);
      });
      row.editMode = false;
    },
    openDialog(row,index) {
      this.dialogVisible = true
      this.dialogMessage = row
      this.dialogMessageRow = index
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
    getTonList() {
      dataTonList().then((response)=>{
        let data = response.data.ton_list
        for (let i=0;i<data.length;i++) {
          this.tonList.push({
            value: data[i].toString(),
            label: data[i].toString()
          })
        }
      })
    },
    submitForm(){
      if (this.activeName == '1') {
        dataImportMachine('import',this.file).then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            console.log(response)
            this.$message.success('上傳成功！')
            this.getTableDataCT();
          }
          else {
            this.$message.error(response.status)
          }
        })
        .catch((error) => {
          this.$message.error('上傳失敗！')
          console.log(error.response);
        });
      }
      else {
        dataImportCtTime('import',this.file).then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            console.log(response)
            this.$message.success('上傳成功！')
            this.getTableDataCT();
          }
          else {
            this.$message.error(response.status)
          }
        })
        .catch((error) => {
          this.$message.error('上傳失敗！')
          console.log(error.response);
        });

      }
    },
    onChangeFileUpload(){
      if (this.activeName == '1') this.file = this.$refs.file1.files[0];
      // console.log(this.$refs.file.files[0])
      else this.file = this.$refs.file.files[0];
    }
    /* eslint-enable */
  },
  mounted() {
    this.getColorList();
    this.getTableData();
    this.getTableDataCT();
    this.getTonList();
  }
}
</script>