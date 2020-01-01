module.exports = {
    // ...
    lintOnSave :false,
    configureWebpack(config) {
        // ...

        config.externals = {
            'AMap': 'AMap',
            'Loca': 'Loca',
            'AMapUI': 'AMapUI'
        }
    }
}
