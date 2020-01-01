// src/assets/js/AMap.js

export default function MapLoader () {   // <-- 原作者这里使用的是module.exports
    return new Promise((resolve, reject) => {
        if (window.AMap) {
            resolve(window.AMap)
        } else {
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = 'http://webapi.amap.com/maps?v=1.3&callback=initAMap&key=0f32c5b9fc74c21bf5f826af6b638156'
            script.onerror = reject
            document.head.appendChild(script)

            var script1 = document.createElement('script')
            script1.type = 'text/javascript'
            script1.async = true
            script1.src = 'http://webapi.amap.com/loca?v=1.3.0&key=0f32c5b9fc74c21bf5f826af6b638156'
            script1.onerror = reject
            document.head.appendChild(script1)
        }
        window.initAMap = () => {
            resolve(window.AMap)
        }
    })
}