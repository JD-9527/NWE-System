<template>
  <div>
    <el-row class="header-row">機台維護</el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="機台基本資料維護" name="1">
        <el-row>
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
                @click="saveRow(row, index)">
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
      <el-tab-pane label="前置作業時間維護" name="2">
        <el-row>
          <el-button size="mini" style="margin-right: 10px;" @click="addRow">新增</el-button>
          <a>
            <el-button size="mini" style="margin-right: 5px;" class="upload" plain>選擇檔案</el-button>
            <input type="file" id="file" ref="file" @change="onChangeFileUpload()" class="change"/>
          </a>
          <span v-if="typeof(file) != 'undefined'" class="commit">{{ file.name }}</span>
          <el-button 
            size="mini" 
            type="primary"
            @click="submitForm()" 
            class="commit"
            style="margin-left: 5px;"
            :disabled="typeof(file) == 'undefined'">上傳</el-button>
        </el-row>
        <el-row>
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
                @click="saveRowCT(row, $index)">
              </el-button>
              <el-button 
                type="danger" 
                icon="el-icon-delete"
                size="mini"
                @click="openDialog(row, $index)">
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
        </el-row>
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
  line-height: 28px;
  left: 66px;
  width: 80px;
  opacity: 0;
}
</style>

<script>
import axios from 'axios'
import EditableCell from "./EditableCell.vue";
// import { apiMachineColor } from "../api.js"

export default {
  components: {
      EditableCell
  },
  data() {
    return {
      columns: [
        {prop: 'machine_NO', label: "機台號"},
        // {prop: 'machine_ton', label: "噸位"},
        // {prop: 'product_color', label: "機台當前顏色"},
      ],
      tableData: [],
      columnsCT: [
        {prop: 'machine_ton', label: "噸位"},
        {prop: 'mold_cttime', label: "前置作業時間"},
      ],
      tableDataCT: [],
      activeName: '2',  // 默認激活的tab
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
      const url='http://10.124.131.87:8880/data/machinecolor/'
      this.loading=true
      axios.get(url).then((response)=>{
        this.loading=false
        this.tableData = response.data.data
        this.tableData = this.tableData.map(row => {
          return {
            ...row,
            editMode: false
          };
        });
      })
      // apiMachineColor().then((response)=>{
      //   this.loading=false
      //   this.tableData = response.data.data
      //   this.tableData = this.tableData.map(row => {
      //     return {
      //       ...row,
      //       editMode: false
      //     };
      //   });
      // })
    },
    getTableDataCT() {
      const url='http://10.124.131.87:8880/data/cttime/'
      this.loading_ct=true
      axios.get(url).then((response)=>{
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
      // console.log(row)
      var vm = this
      const url='http://10.124.131.87:8880/data/machinecolor/'
      var bodyFormData = new FormData();
      bodyFormData.append('machine_NO', row.machine_NO);
      bodyFormData.append('machine_ton', row.machine_ton);
      bodyFormData.append('product_color', row.product_color);
      axios({
        method: 'post',
        url: url,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(function (response) {
          vm.$message.success('修改成功！');
          // 修改成功之後 刷新表格
          this.getTableData();
          // console.log(response);
        })
        .catch(function (error) {
          let error_code = error.response.status
          vm.$message.error('修改失敗！ Error Code: ' + error_code);
        });
      // apiMachineColorMaintain(bodyFormData)
      //   .then(function (response) {
      //     vm.$message.success('修改成功！');
      //     // console.log(response);
      //   })
      //   .catch(function (response) {
      //     vm.$message.error(response);
      //     // console.log(response);
      //   });
      row.editMode = false;
    },
    addRow() {
      let new_row = {
        machine_ton: '',
        mold_cttime: '',
        editMode: true
      }
      this.tableDataCT.unshift(new_row)
    },
    deleteRow(row, index) {
      // console.log(row,index)
      const url='http://10.124.131.87:8880/data/delcttime/'
      var bodyFormData = new FormData();
      bodyFormData.append('machine_ton', row.machine_ton);
      axios({
        method: 'post',
        url: url,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
        })
        .then((response) => {
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
      // console.log(row)
      var vm = this
      const url='http://10.124.131.87:8880/data/cttime/'
      var bodyFormData = new FormData();
      bodyFormData.append('machine_ton', row.machine_ton);
      bodyFormData.append('mold_cttime', row.mold_cttime);
      axios({
        method: 'post',
        url: url,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(function (response) {
          vm.$message.success('修改成功！');
          // 修改成功之後 刷新表格
          this.getTableDataCT();
          // console.log(response);
        })
        .catch(function (error) {
          console.log(error.response.status);
          let error_code = error.response.status
          vm.$message.error('修改失敗！ Error Code: ' + error_code);
        });
      // apiMachineColorMaintain(bodyFormData)
      //   .then(function (response) {
      //     vm.$message.success('修改成功！');
      //     // console.log(response);
      //   })
      //   .catch(function (response) {
      //     vm.$message.error(response);
      //     // console.log(response);
      //   });
      row.editMode = false;
    },
    openDialog(row,index) {
      this.dialogVisible = true
      this.dialogMessage = row
      this.dialogMessageRow = index
    },
    getColorList() {
      const url = 'http://10.124.131.87:8880/data/colorlist/'
      this.$http.get(url).then((response)=>{
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
      const url = 'http://10.124.131.87:8880/data/tonlist/'
      this.$http.get(url).then((response)=>{
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
      let formData = new FormData();
      formData.append('file', this.file);
      this.$http.post('http://10.124.131.87:8880/data/import/cttime/',
          formData,
          {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          console.log(response)
          this.$message.success('上傳成功！')
          this.getTableDataCT();
        }
        else {
          this.$message.error(error.response)
        }
      })
      .catch((error) => {
        this.$message.error('上傳失敗！')
        console.log(error.response);
      });
    },
    onChangeFileUpload(){
      console.log(this.$refs.file.files[0])
      this.file = this.$refs.file.files[0];
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