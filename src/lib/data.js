export const heatmapData = [{
    "lng": 121.48,
    "lat": 31.23,
    "count": 100000
}, {
    "lng": 121.47,
    "lat": 31.22,
    "count": 20
}, {
    "lng": 121.2,
    "lat": 31.03,
    "count": 30
}, ]

export const locationArr = [
    {l: 113.60, h: 34.75, p: 30000, n: '中原区'},
    {l: 113.65, h: 34.73, p: 24343, n: '二七区'},
    {l: 113.67 , h: 34.75, p: 32244, n: '管城回族区'},
    {l: 113.65 , h: 34.78, p: 23423, n: '金水区'},
    {l: 113.28, h: 34.82, p: 34243, n: '上街区'},
    {l: 113.60, h: 34.87, p: 49858, n: '惠济区'},
    {l: 113.73 , h: 34.40, p: 18893, n: '新郑市'},
    {l: 113.03, h: 34.47, p: 23645, n: '登封市'},
    {l: 113.97, h: 34.72, p: 37565, n: '中牟县'},
    {l: 112.98 , h: 34.77, p: 68989, n: '巩义市'},
    {l: 113.40, h: 34.78, p: 58989, n: '荥阳市'},
    {l: 113.38 , h:34.53, p: 58989, n: '新密市'},


]
var cdatax=[],cdatay=[],cdatay1=[]
locationArr.forEach(item=>{
    cdatax.push(item.n)
    cdatay.push(item.p)
    cdatay1.push(item.p-1233)
})

export const chartDataOption={
    title: {
        text: '郑州市下辖区房价分布图',
        textStyle: {
            color:'#fff'
        }
        // subtext: '单位：条'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['二手房价', '新房价'],
        textStyle: { //图例文字的样式
            color: '#fff',
            fontSize: 10
        },

    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            }, //区域缩放，区域缩放还原
            dataView: {
                readOnly: false
            }, //数据视图
            magicType: {
                type: ['line', 'bar']
            },
            restore: {},
            saveAsImage: {}
        },

    },

    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: cdatax,
        axisLabel: {
            color: '#fff'
        }
    },
    yAxis: {
        nameTextStyle:{ color:"#fff", },
        name:'元/平方米',
        type: 'value',
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        }
    },

    series: [{
        name: '二手房价',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: cdatay
    },
        {
            name: '新房价',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: cdatay1
        }]
}
export const randomNum=function (minNum, maxNum) {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}