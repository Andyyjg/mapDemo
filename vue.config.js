module.exports = {
    // ...
    lintOnSave :false,
    configureWebpack(config) {
        // ...

        config.externals = {
            'AMap': 'AMap' // 高德地图配置
        }
    }
}
