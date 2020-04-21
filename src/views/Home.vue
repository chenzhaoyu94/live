<template>
  <div class="container">
    <div class="layout-left">
      <ul class="menu" :style="{width: mobileWidth}">
        <li v-for="(item,index) of channels" :key="index" :class="{'active':index === key}" @click="selectVideo(index)">
          {{item.title}}
        </li>
      </ul>
    </div>
    <div class="main">
      <video
          id="myVideo"
          class="video-js vjs-default-skin vjs-big-play-centered"
          controls
          preload="auto"
          style='width: 100%;height:100%'
      >
      </video>
    </div>
  </div>
</template>

<script>
import channels from '@/mock/channels.js'

export default {
  name: 'Home',
  data () {
    return {
      key: 0,
      channels,
      video: null,
      wWidth: null,
      mobileWidth: null,
    }
  },
  watch: {
    wWidth (val) {
      if (val <= 750) {
        this.mobileWidth = this.channels.length * 80 + 'px'
      } else {
        this.mobileWidth = '100%'
      }
    },
  },
  mounted () {
    this.$_resize()
    window.addEventListener('resize', this.$_resize)
    this.$nextTick(() => {
      this.initVideo()
      this.firstPlay()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.$_resize)
  },
  methods: {
    // video 初始化
    initVideo () {
      const el = document.getElementById('myVideo')
      this.video = this.$video(el, {
        bigPlayButton: true,
        textTrackDisplay: false,
        posterImage: false,
        errorDisplay: false,
        autoplay: true,
        hls: {
          withCredentials: true,
        },
      })
    },
    // 第一个频道
    firstPlay () {
      this.video.src({
        src: this.channels[0].url,
        type: 'application/x-mpegURL',
      })
    },
    // 选择频道播放
    selectVideo (index) {
      const url = this.channels[index].url
      this.key = index
      this.video.src({
        src: url,
        type: 'application/x-mpegURL',
      })
    },
    // window resize
    $_resize () {
      this.wWidth = window.innerWidth
    },
  },
}
</script>

<style lang="less" scoped>
  @import "index";
</style>
