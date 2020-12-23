<template>
  <el-input
    v-model="input"
    placeholder="在此搜索..."
    @input="emitInput"
    :size="$attrs.size"
    :style="`width: ${$attrs.width};`"
  ></el-input>
</template>

<script>
  export default {
  data() {
    return {
      input: ''
    }
  },
  methods: {
    emitInput(input) {
      this.$emit('change', input)
    }
  }
}
</script>