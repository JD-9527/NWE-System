<template>
  <div>
    <el-row class="header-row">機台維護</el-row>
    <el-tabs v-model="activeName">
        <!-- <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">選取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">提交</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->
      <el-tab-pane label="前置作業時間維護" name="1">
        <el-row>
          <el-table
            :data="tableDataCT.slice((currentPageCT-1)*pagesizeCT,currentPageCT*pagesizeCT)"
            style="width: 100%"
            max-height="650"
            v-loading="loading_ct"
          >
            <el-table-column
              v-for="(column,index) in columnsCT"
              :key="index"
              :prop="column.prop"
              :label="column.label"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
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
      </el-tab-pane>
      <el-tab-pane label="機台基本資料維護" name="2">
        <el-row>
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            style="width: 100%"
            max-height="650"
            v-loading="loading"
          >
            <el-table-column
              v-for="(column,index) in columns"
              :key="index"
              :prop="column.prop"
              :label="column.label"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="product_color"
              label="機台當前顏色"
              align="center"
              width="150"
              show-overflow-tooltip
            >
              <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.product_color">
                <span slot="content">{{row.product_color}}</span>
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
</style>

<script>
import axios from 'axios'
import EditableCell from "./EditableCell.vue";

export default {
  components: {
      EditableCell
  },
  data() {
    return {
      columns: [
        {prop: 'machine_NO', label: "機台號"},
        {prop: 'machine_ton', label: "噸位"},
        // {prop: 'product_color', label: "機台當前顏色"},
      ],
      tableData: [],
      columnsCT: [
        {prop: 'machine_ton', label: "噸位"},
        {prop: 'mold_changerover_time', label: "前置作業時間"},
      ],
      tableDataCT: [],
      activeName: '1',
      input: '',
      currentPage: 1, //默认显示页面为1
      pagesize: 20, //    每页的数据条数
      currentPageCT: 1,
      pagesizeCT: 20,
      loading: false,
      loading_ct: false,
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }]
    }
  },
  methods: {
    /* eslint-disable */
    getTableData() {
      const url='http://172.31.8.175:8000/data/machinecolor/'
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
    },
    getTableDataCT() {
      const url='http://172.31.8.175:8000/data/cttime/'
      this.loading_ct=true
      axios.get(url).then((response)=>{
        this.loading_ct=false
        this.tableDataCT = response.data.data
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
    saveRow(row, index) {
      // console.log(row)
      var vm = this
      const url='http://172.31.8.175:8000/data/machinecolor/'
      var bodyFormData = new FormData();
      bodyFormData.append('machine_NO', row.machine_NO);
      bodyFormData.append('product_color', row.product_color);
      axios({
        method: 'post',
        url: url,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(function (response) {
          vm.$message.success('修改成功！');
          // console.log(response);
        })
        .catch(function (response) {
          vm.$message.error(response);
          // console.log(response);
        });
      row.editMode = false;
    },
    handleDelete(index) {
      this.tableData.splice(index, 1)
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    fileExceed () {
      this.$message.error('一次只能上傳一個檔案');
    },
    // 请求成功
    importSuccess (res) {
        // 后端的返回码--上传成功
      if (res.code == 200) {
        // 显示√图标
        let e = document.getElementsByClassName('el-upload-list__item-status-label');
        e[0].setAttribute('style', 'display:block !important')
        // 成功提示
        this.$message.success('上传成功');
        // 重新调用列表请求（代码略）
        this.getList();
        // 后端的返回码--上传失败
      } else {
        // 隐藏√图标
        let e = document.getElementsByClassName('el-upload-list__item-status-label');
        e[0].setAttribute('style', 'display:none !important')
        // 失败提示--及后端返回的失败详情
        this.$message.error({
          dangerouslyUseHTMLString: true,
          duration: 4500,
          message: res.remark+',<br/>请删除上传失败的文件，修改后重新上传'
        });
      }
    },
    // 请求失败
    importError (err) {
      this.$message.error({
        dangerouslyUseHTMLString: true,
        duration: 4500,
        message: '上传出现异常，请稍后重试'+',<br/><br/>异常原因：'+err
      });
    },
    // // 自定义上传
    // uploadFile (item) {
    //   const form = new FormData()
    //   form.append('file', item.file)
    //   HTTP_API.xlsx_upload(form).then(res => {
    //     this.importSuccess(res)
    //   }).catch(err => {
    //     this.importError(err)
    //   })
    // }
    /* eslint-enable */
  },
  mounted() {
    this.getTableData();
    this.getTableDataCT();
  }
}
</script>