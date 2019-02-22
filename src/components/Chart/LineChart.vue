<template>
<canvas  :style="classStyle" :id="id" :width="width" :height="height"></canvas>
</template>
<script>
    export default {
        name: "LineChart",                
       mounted(){
            const chart = document.getElementById(this.id);
            new Chart(chart, {
            type: this.type,
            data: this.getData,
            options:  this.optionChart        
            })
            console.log('mounted', this.id, this)
            console.log(this.dataChart,'this.dataChart',this.optionChart,'this.optionChart')
        },
        computed:{
         getData(){
             console.log(this.dataChart)
             return this.dataChart
         },
        }
        ,
        props: {
            dataChart:Object,
            type:String,
            optionChart:Object,            
            id:String,
            width:String,
            height:String,
            classStyle:String

        },
        beforeUpdate(){
            console.log('beforeUpdate', this)
        },
        updated(){
            console.log('updated', this.dataChart,'this.dataChart',this.optionChart,'this.optionChart')
        }

    }
</script>
<style lang="scss">
   
</style>

