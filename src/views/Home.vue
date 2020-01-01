// test.vue
<template>
    <div>
        <div id="container"></div>
        <div id="top">
            <chart :chartData='receivableAccepted' ></chart>
        </div>
    </div>


</template>
<script>
    import AMap from 'AMap'
    import AMapUI from 'AMapUI'
    import Loca from 'Loca'
    import chart from '../components/chart'
    import {heatmapData, locationArr,chartDataOption} from '../lib/data'


    export default {
        components: {chart},
        name: 'test',
        data() {
            return {
                show: false,
                map: null,
                heatmapData,
                locationArr,
                receivableAccepted: chartDataOption


        }
        },
        methods: {


            openInfo(e, item) {
                //构建信息窗体中显示的内容
                var infoWindow;
                var info = [];
                info.push("<h3 style='color: #ffffff;font-size: 15px;font-weight: 200;margin-bottom: 15px'>房价信息</h3>");
                info.push(`<p class='input-item mb-3' >所在地区:${item.n}</p>`);
                info.push(`<p class='input-item mb-3' >二手房价:${item.p}元/平方米</p>`);
                info.push(`<p class='input-item mb-3' >新房房价:${item.p - 1233}元/平方米</p>`);

                infoWindow = new AMap.InfoWindow({
                    content: info.join('')  //使用默认信息窗体框样式，显示信息内容
                });

                infoWindow.open(this.map, e.target.getPosition());
            },
            initmap() {
                let that = this

                that.map = new AMap.Map('container', {
                    center: [120.05, 36.5],
                    mapStyle: 'amap://styles/37a3f303898c1642ec5e1aeab3e7ae95',
                    zoom: 10.5,
                    viewMode: '2D',
                    pitch: 50,
                    showZoomBar: true,
                    resizeEnable: true,
                })
                this.dealHeat()
                //toolbar组件加载
                AMap.plugin('AMap.ToolBar', function () {//异步加载插件
                    var toolbar = new AMap.ToolBar();
                    that.map.addControl(toolbar);
                });

                //设置marker标记
                this.locationArr.forEach((item, key) => {
                    var marker = null

                    var content =
                        `<div class="custom-content-marker image" data_id="${key}" >
                        <img src="https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png" >
                            <span class="tip-title" >${key + 1}</span>
                            </div>`
                    marker = new AMap.Marker({
                        position: new AMap.LngLat(item.l, item.h),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        title: key + 1,
                        content: content,
                        draggable: true


                    });
                    marker.setzIndex(1300)
                    marker.on('click', function (e) {

                        that.openInfo(e, that.locationArr[key])
                    })

                    this.map.add(marker);


                })

                // this.setheat(AMap)


            },
            addMaker() {

            },
            setheat(AMap) {

                this.map.plugin(["AMap.Heatmap"], () => {
                    //初始化heatmap对象
                    let heatmap;
                    heatmap = new AMap.Heatmap(this.map, {
                        radius: 25, //给定半径
                        opacity: [0, 0.8],
                        gradient: {
                            0.5: 'blue',
                            0.65: 'rgb(117,211,248)',
                            0.7: 'rgb(0, 255, 0)',
                            0.9: '#ffea00',
                            1.0: 'red'
                        }
                    });
                    //设置数据集
                    heatmap.setDataSet({
                        data: this.heatmapData,
                        max: 5
                    });
                });

            },
            dealHeat() {
                var that = this
                this.$axios.get('//a.amap.com/Loca/static/mock/qingdao_500m.tsv').then(
                    res => {
                        var layer = new Loca.GridLayer({
                            map: that.map,
                            fitView: true
                        });

                        layer.setData(res.data, {
                            lnglat: function (obj) {
                                var val = obj.value;
                                return [val['lng'], val['lat']]
                            },
                            value: 'count',
                            type: 'tsv'
                        });

                        layer.setOptions({
                            unit: 'meter',
                            mode: 'count',
                            style: {
                                color: ['rgb(33,38,59)', 'rgb(33,49,63)', 'rgb(49,43,45)', 'rgb(47,31,64)', 'rgb(43,33,49)', 'rgb(131,105,53)', 'rgb(122,26,34)'],
                                radius: 600,
                                opacity: 0.9,
                                gap: 150,
                                height: [0, 0],
                                zIndex: 100
                            }
                        });

                        layer.render();
                    }
                )
            }
        },

        mounted() {
            this.initmap()

        }
    }
</script>
<style>
    div#top {
        width: 100%;
        height: 35vh;
        background: rgb(21, 23, 42);
    }

    #container {
        width: 100%;
        height: 65vh;
    }

    .custom-content-marker {
        position: relative;
        z-index: 1233;
        width: 28px;
        height: 34px;
        text-align: center;
    }

    .custom-content-marker img {
        width: 100%;
        height: 100%;
    }

    .custom-content-marker .close-btn {
        position: absolute;
        top: -6px;
        right: -8px;
        width: 15px;
        height: 15px;
        font-size: 12px;
        background: #ccc;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        line-height: 15px;
        box-shadow: -1px 1px 1px rgba(10, 10, 10, .2);
    }

    .custom-content-marker .close-btn:hover {
        background: #666;
    }

    .tip-title {
        color: white;
        font-size: 10px;
        position: relative;
        top: -28px

    }

    .image {

        /*放大完成时间*/
        transition: all 1s;
    }

    .image:hover {
        cursor: pointer;
        /*放大倍数*/
        transform: scale(1.5);
    }

    div.father-content {
        background: rgb(32, 34, 56);
        color: rgb(65, 73, 96);
    }

    div.amap-info-content {
        background: rgb(32, 34, 56);
        color: rgb(75, 86, 108);
    }

    .bottom-center .amap-info-sharp {
        border-top: 8px solid rgb(32, 34, 56)
    }

    .mb-3 {
        margin-bottom: 2px;
    }

    .amap-labellayers {
        z-index: 100 !important;
    }


</style>