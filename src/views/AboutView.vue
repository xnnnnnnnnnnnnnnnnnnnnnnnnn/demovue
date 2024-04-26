<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span>{{date}}</span>
  </div>
</template>
<script>
export default {
  data(){
    return{
      date:new Date()
    }
  },
  created() {
    this.load()
  },
  methods:{
    load() {
      this.data = Date(this.$moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'))
      // console.log(new DateTime(new Date()))
      console.log(new Date().getVarDate())
      // console.log(new Date().)
    }
  }
}
</script>
