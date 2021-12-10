window.onload = function () {
    initMap()
}


function initMap() {
    const longitude = 104.0701492091, latitude = 30.54456338739;
    var map = new BMapGL.Map("map");    // 创建Map实例
    map.centerAndZoom(new BMapGL.Point(longitude, latitude), 16);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    var marker = new BMapGL.Marker(new BMapGL.Point(longitude, latitude));
    map.addOverlay(marker);
}