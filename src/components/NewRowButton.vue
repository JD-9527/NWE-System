<template>
  <div style="display: inline-block;">
    <el-button
      size="small"
      style="margin-right: 10px; position: relative;"
      @click="addRow"
    >
      新增
    </el-button>
    <el-dialog
      title="新增資料"
      :visible.sync="dialog"
      width="50%"
    >
      <div
        style="padding: 5px; width: 45%; display: inline-block;"
        v-for="(column,index) in tableLabel"
        :key="index"
      >
        <div v-if="column != 'editMode'">{{column}}</div>
        <el-input
          :placeholder="column"
          size='small'
          style='width: 100%;'
          v-model="new_row[column]"
          v-if="column != 'editMode'"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  /* eslint-disable */
export default {
  data() {
    return {
      dialog: false,
      // tableInfo: [],
      new_row: {}
    }
  },
  props: {
    tableInfo: {
      type: Array,
      default: () => []
    },
    tableLabel: Array,
  },
  methods: {
    addRow() {
      this.dialog = true
    },
    initNewRow() {
      Object.keys(this.tableData[0]).forEach((key) => {
        if (key != 'editMode') this.new_row[key] = ''
      })
    }
  },
  mounted() {
    // this.tableInfo = Object.keys(this.tableData[0])
  }
}
</script>