<template>
  <canvas
    :id="id"
    :style="'height:'+height+'px; width:'+width+'px;'"
  ></canvas>
</template>

<script>
import JSMpeg from '@/utils/vue-jsmpeg'

export default {
  data: () => ({
    clientjsmpeg: Object
  }),
  props: {
    id: String,
    src: String,
    height: {
      type: Number,
      default: 1080,
    },
    width: {
      type: Number,
      default: 1920
    }
  },
  mounted () {
    /* eslint-disable */
    let canvas = document.getElementById(this.id)
    let clientjsmpeg = new JSMpeg.Player(this.src, {
      canvas: canvas,
      autoplay: true
    })
  }
}
</script>