<template>
  <el-table
    :data="data"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot name="head" />
    <el-table-column
      v-for="{prop, label, width} in tableInfo"
      :key="prop"
      :prop="prop"
      :label="label"
      :width="width"
      align="center"
    >
      <template slot-scope="rowInfo">
        <slot
          :name="prop"
          v-bind="rowInfo"
        >
          {{ rowInfo.row[prop] }}
        </slot>
      </template>
    </el-table-column>
    <slot name="tail" />
  </el-table>
</template>

<script>
  export default {
    data: () => ({

    }),

    props: {
      data: Array,
      tableInfo: Array,
    }
  }
</script>