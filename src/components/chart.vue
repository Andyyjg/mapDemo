<template>

    <div id="pieChart" >

        <div :id="echarts" class="echarts" ref="echarts" style="height:450px;width: 100%"></div>
    </div>

</template>

<script>
    import echarts from 'echarts'

    export default {
        name: "chart",
        props: {
            // 接收父组件传递过来的信息
            chartData: {
                type: Object,  //此处可以为Array或者Object或者其它，根据需求来。
                default: () => []
            },
            title:{
                type:String
            }
        },
        data() {
            return {
                charts: '',}

        },
        methods: {
            drawChart() {
                const that = this
                let myChart = echarts.init(document.getElementById(that.echarts))
                let option =  this.chartData;

                // 清除画布
                myChart.clear()
                myChart.setOption(option)
                // 在渲染点击事件之前先清除点击事件
                myChart.off('click')
            }
        },
        computed: {
            echarts() {
                return 'echarts' + Math.random() * 100000
            }
        },
        mounted() {

            const that = this
            that.$nextTick(() => {
                console.log(that.chartData)
                that.drawChart()
            })
        }
    }
</script>

<style scoped>

</style>
