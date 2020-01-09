<template>
	<el-button 
    icon="el-icon-download" 
    @click="downloadData()" 
    type="primary" 
    round
    plain
    size="small"
  ></el-button>
</template>

<script>
export default {
  props: {
    file_type: {
      type: String,
      default: ""
    },
  },
  methods: {
    downloadData() {
      const url='http://10.124.131.87:8880/data/filedown/?filetype='+this.file_type
      this.$http({
        method:'get',
        url:url,
        responseType:'blob',
      })
      .then((response) => {
        if (!response) {
          return
        }
        // debugger
        let url = window.URL.createObjectURL(response.data)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'example.xlsx')
        document.body.appendChild(link)
        link.click()
      })
    },
  }
}
</script>