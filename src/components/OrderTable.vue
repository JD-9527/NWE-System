<template>
    <div>
        <el-table 
        :data="tableData" 
        v-show="holding & table_show"
        style="width: 100%"
        >
        <el-table-column 
            label="縮小" 
            width="70" 
            align="center">
            <el-button 
            @click="close_table"
            size='small'
            >▲</el-button>
        </el-table-column>
        <el-table-column
            prop="work_list"
            label="工單號"
            width="100"
            align="center"
            v-if="!IsPlanorder">
        </el-table-column>
        <el-table-column
            prop="label"
            label="料號"
            width="150"
            align="center">
        </el-table-column>
        <el-table-column
            prop="plan_number"
            label="生產數量"
            width="100"
            align="center"
            v-if="IsPlanorder">
        </el-table-column>
        <el-table-column
            prop="work_list_number"
            label="工單數量"
            width="100"
            align="center"
            v-if="!IsPlanorder">
        </el-table-column>
        <el-table-column
            prop="product_name"
            label="品名"
            width="100"
            align="center">
        </el-table-column>
        <el-table-column
            prop="machine_ton"
            label="噸位"
            width="100"
            align="center">
        </el-table-column>
        <el-table-column
            prop="rowId"
            label="機台號"
            width="100"
            align="center">
        </el-table-column>
        <el-table-column
            prop="plastic_color"
            label="塑料顏色"
            width="100"
            align="center"
            v-if="IsPlanorder">
        </el-table-column>
        <el-table-column
            prop="plastic_Part_NO"
            label="塑膠粒料號"
            width="100"
            align="center">
        </el-table-column>
        <el-table-column
            prop="mold_NO"
            label="模號"
            width="100"
            align="center">
        </el-table-column>
        <el-table-column
            prop="mold_Serial"
            label="模序"
            width="100"
            align="center">
        </el-table-column>
        <el-table-column
            prop="mold_position"
            label="模具儲位"
            width="100"
            align="center">
        </el-table-column>
        <el-table-column
            prop="machine_CT"
            label="C.T."
            width="100"
            align="center">
        </el-table-column>
        <el-table-column
            prop="UPH"
            label="UPH"
            width="100"
            align="center">
        </el-table-column>
        <el-table-column
            prop="emergency"
            label="緊急程度"
            width="100"
            align="center"
            v-if="IsPlanorder">
            <!-- <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.emergency" type="number">
            <span slot="content">{{row.emergency}}</span>
            </editable-cell> -->
        </el-table-column>
        <el-table-column
            prop="note"
            label="備註"
            width="100"
            align="center"
            v-if="IsPlanorder">
            <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.note" :maxlength="800">
              <span slot="content">{{row.note}}</span>
            </editable-cell>
        </el-table-column>
        <el-table-column 
            abel="操作"
            align="center"
            fixed="right"
            width="180">
            <template slot-scope="{row}">
                <el-button
                v-show="!row.editMode"
                @click="setEditMode(row)"
                icon="el-icon-edit"
                size="mini">
                </el-button>
                <el-button
                v-show="row.editMode"
                @click="saveRow(row)"
                icon="el-icon-check"
                type="success"
                size="mini">
                </el-button>
                <el-button
                v-show="row.editMode"
                @click="cancelEditMode(row)"
                icon="el-icon-close"
                type="info"
                size="mini">
                </el-button>
            </template>
        </el-table-column>
        </el-table>

    </div>
</template>
<script>
import EditableCell from "./EditableCell.vue";
export default {
  components: {
    EditableCell
  },
  props: {
    tableData : Array,
    holding : Boolean,
    table_show : Boolean,
    IsPlanorder : Boolean,
    temptableData : String,
  },
  methods:{
    close_table:function(){      // 表格縮小
      this.$emit("update:table_show",false)
    },
    saveRow(row) {
      row.editMode = false
    },
    cancelEditMode(row) {
      let temp = this.tableData
      temp[0] = JSON.parse(this.temptableData)
      temp[0].editMode = false
      row.editMode = false
      this.$emit("update:tableData",temp)
    },
    setEditMode(row) {
      row.editMode = true
      let temp = this.temptableData
      temp= JSON.stringify(row) //暫存結果 先轉String存 否則object call by reference
      this.$emit("update:temptableData",temp)
    //   this.$emit("update:tableData",this.tableData)
    },
      

    
  },
  mounted(){
    // this.saved()
  }

}
</script>