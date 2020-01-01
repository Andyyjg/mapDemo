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
    {l: 120.38, h: 36.07, p: 30000, n: '市南区'},
    {l: 120.38, h: 36.08, p: 24343, n: '市北区'},
    {l: 120.35, h: 36.10, p: 32244, n: '四方区'},
    {l: 120.45, h: 36.38, p: 234234, n: '即墨区'},
    {l: 120.47, h: 36.10, p: 342432, n: '崂山区'},
    {l: 120.43, h: 36.15, p: 498588, n: '李沧区'},
    {l: 120.37, h: 36.30, p: 98893, n: '城阳区'},
    {l: 120.03, h: 36.27, p: 63645, n: '胶州市'},
    {l: 119.95, h: 36.78, p: 67565, n: '平度市'},
    {l: 120.50, h: 36.87, p: 98989, n: '莱西市'},
    {l: 120.03, h: 35.87, p: 98989, n: '黄岛区'},


]
var cdatax=[],cdatay=[],cdatay1=[]
locationArr.forEach(item=>{
    cdatax.push(item.n)
    cdatay.push(item.p)
    cdatay1.push(item.p-1233)
})

export const chartDataOption={
    title: {
        text: '青岛市各区房价分布图',
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