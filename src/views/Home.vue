// test.vue
<template>
    <div>
        <el-tooltip class="item" effect="dark" content="点击打开图表" placement="top-start">
            <el-button type="primary" @click="drawer=true" size="mini" icon="el-icon-arrow-up" style="position: absolute;z-index: 1400;bottom: 0;left: 50%;height: 35px"></el-button>
        </el-tooltip>

<!--        <div class='input-card'>-->
<!--            <div class="input-item">-->
<!--                <input type="checkbox" onclick="toggleScale(this)"/>比例尺-->
<!--            </div>-->

<!--            <div class="input-item">-->
<!--                <input type="checkbox" id="toolbar" onclick="toggleToolBar(this)"/>工具条-->
<!--            </div>-->

<!--            <div class="input-item">-->
<!--                <input type="checkbox" id="toolbarDirection" disabled onclick="toggleToolBarDirection(this)"/>工具条方向盘-->
<!--            </div>-->

<!--            <div class="input-item">-->
<!--                <input type="checkbox" id="toolbarRuler" disabled onclick="toggleToolBarRuler(this)"/>工具条标尺-->
<!--            </div>-->

<!--            <div class="input-item">-->
<!--                <input type="checkbox" id="overview" onclick="toggleOverViewShow(this)"/>显示鹰眼-->
<!--            </div>-->

<!--            <div class="input-item">-->
<!--                <input type="checkbox" id="overviewOpen" disabled onclick="toggleOverViewOpen(this)"/>展开鹰眼-->
<!--            </div>-->
<!--        </div>-->
        <div id="myPageTop" style="position: absolute;top: 20px;right: 50px;background: #fff;z-index: 2000">
            <table>

                <tr>
                    <td>
                        <input v-model="input" id="tipinput" class="search-input" placeholder="请输入地址或关联街道"
                               @input="searchAddress"/>
                        <button class="search-btn" @click="searchAddress">地块定位</button>
                        <div id="panel" style="position: absolute;z-index: 1000" v-if="showSuggest"></div>
                    </td>
                </tr>

            </table>
        </div>
        <div id="container" @click.stop.prevent="showSuggest=false"></div>

        <el-drawer
                :visible.sync="drawer"

                :direction="direction"
                :before-close="handleClose">
                <div style="padding-right: 40px">
                    <chart :chartData='receivableAccepted'></chart>
                </div>



        </el-drawer>

    </div>


</template>
<script>
    import AMap from 'AMap'
    import AMapUI from 'AMapUI'
    import Loca from 'Loca'
    import chart from '../components/chart'
    import {heatmapData, locationArr, chartDataOption} from '../lib/data'
    // var jsonData=require('../assets/json/grid')
    // console.log('这是data',jsonData.data);
    var placeSearch
    export default {
        components: {chart},
        name: 'test',
        data() {
            return {
                drawer:false,
                direction:'btt',
                showSuggest: true,
                input: '',
                show: false,
                map: null,
                heatmapData,
                locationArr,
                receivableAccepted: chartDataOption


            }
        },
        methods: {
            handleClose(done) {
                done()
            },
            searchAddress() {
                this.showSuggest = true
                if (!this.input) {
                    return
                }
                placeSearch.search(this.input);

            },
            //地点搜索及选择
            selectAddress(e) {
                //这里获得点选地点的经纬度
                let location = e.selected.data.location;

                // Do Something
            },


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

                //输入提示
                AMap.service(["AMap.PlaceSearch"], function () {
                    //构造地点查询类
                    placeSearch = new AMap.PlaceSearch({
                        pageSize: 4, // 单页显示结果条数
                        pageIndex: 1, // 页码
                        citylimit: false,  //是否强制限制在设置的城市内搜索
                        map: that.map, // 展现结果的地图实例
                        panel: "panel", // 结果列表将在此容器中进行展示。
                        autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                        renderStyle: 'default'
                    });

                });
                console.log('event5', AMap.event);
                // 添加列表点选监听事件
                AMap.event.addListener(placeSearch, "selectChanged", this.selectAddress);

                this.dealHeat()
                //toolbar组件加载
                // AMap.plugin('AMap.ToolBar', function () {//异步加载插件
                //     var toolbar = new AMap.ToolBar();
                //     that.map.addControl(toolbar);
                // });

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
        height: 100vh;
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

    #panel {
        position: absolute;

        max-height: 500px;
        overflow-y: auto;
        top: 37px;
        left: 0;
        width: 250px;
    }

    .search-input {

        width: 250px;
        height: 35px;
        font-size: 12px;
        background: #38497A;
        box-sizing: border-box;
        border: none;
        line-height: 35px;
        text-indent: 20px;
        background-clip: padding-box, border-box;
        color: #ffffff;
        background-origin: padding-box, border-box;

    }

    .search-btn {
        width: 70px;
        height: 35px;
        border: none;
        background: linear-gradient(to right, #3C55B6 0%, #4B4AB5 100%);
        border-radius-topleft: 2px;
        border-radius-bottomleft: 2px;
        color: #ffffff;
        outline: none;
        cursor: pointer;
        font-size: 12px;
    }

    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: #5E7093;
        font-size: 14px;
    }

    ::-moz-placeholder { /* Firefox 19+ */
        color: #5E7093;
        font-size: 14px;
    }

    :-ms-input-placeholder { /* IE 10+ */
        color: #5E7093;
        font-size: 14px;
        font-weight: 300;
    }

    :-moz-placeholder { /* Firefox 18- */
        color: #5E7093;
        font-size: 14px;
    }

    .input-card {
        padding: 15px;
        position: absolute;
        left: 30px;
        top: 20px;
        width: 100px;
        z-index: 1300;
        background: #8F9BC6;
        color: #ffffff;
        bottom: auto;

        border-radius: 10px;
    }
    .input-card .input-item{
        margin-top: 15px;
        margin-bottom: 15px;
    }
    div.el-drawer{
        height: 500px!important;
        background: #15172B!important;

    }

</style>
