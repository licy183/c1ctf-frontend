<template>
  <span>{{ hours }}:{{ minutes }}:{{ seconds }}</span>
</template>>

<script>
export default {
  name: "ContainerTimer",
  props: {
    expire: {
      required: true
    }
  },
  data() {
    return {
      timer: null,
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  },
  methods: {
    zeroPadding(i) {
      let s = i.toString();
      if (s.length < 2) {
        return '0' + s;
      } else {
        return s;
      }
    },
    refreshTime() {

      let remainTime = this.expire - Date.now();

      remainTime = Math.floor(remainTime / 1000);
      if (remainTime < 0) {
        this.$emit('expired');
      }
      let m = remainTime % 3600;
      this.hours = this.zeroPadding(Math.floor(remainTime / 3600));
      this.minutes = this.zeroPadding(Math.floor(m / 60));
      this.seconds = this.zeroPadding(m % 60);
    }
  },
  mounted() {
    this.refreshTime();
    this.timer = setInterval(this.refreshTime, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>
