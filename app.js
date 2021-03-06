//app.js
var QQMapWX = require('/qqmap/qqmap-wx-jssdk.min.js');
App({
  qqmapsdk: null,
  userInfo: {
    userInfo: null
  },
  globalData: {

  },
  currentView:null,
  //酒店相册
  hotelImg:null,
  city: '济南',
  //出发城市（车票）
  startCity:'请选择',
  //到达城市
  endCity:'请选择',
  //热门城市
  hotCity: [],
  //入住时间
  startTime: '',
  //离店时间
  endTime: '',
  //共 几 晚
  days: 1,
  // 省份
  province:'山东',
  //轮播 酒店图片信息全局存储，减少请求
  swiperHotel:[],
  // 获取景点所需要的 cityId
  cityId:null,
  // 获取景点所需要的 proId
  proId:null,
  onLaunch: function () {
    this.qqmapsdk = new QQMapWX({
      key: 'M7JBZ-3TSKJ-U3FFV-KVSPJ-LKHE6-QTFJ2'
    })
    this.login();
    this.getUserInfo();
    this.setDefaultTime();
    try {
      const deviceInfo = wx.getStorageSync("deviceInfo");
      if (!deviceInfo) {
        const res = wx.getSystemInfoSync()
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.windowWidth = res.windowWidth;
        wx.setStorageSync("deviceInfo", {
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      } else {
        this.globalData.windowHeight = deviceInfo.windowHeight;
        this.globalData.windowWidth = deviceInfo.windowWidth;
      }
    } catch (e) { }
  },
  login() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
      },
      fail: () => {
      }
    })
  },
  getUserInfo() {
    wx.getStorage({
      key: 'loginInfo',
      success: (res) => {
        this.userId = res.data.userId
        this.phone = res.data.phone
      },
    })
  },
  setDefaultTime(){
    var dd = new Date();
    var d = dd.getDate();
    var m1 = dd.getMonth() + 1;
    var y1 = dd.getFullYear();


    dd.setDate(d + 1);
    var y2 = dd.getFullYear();
    var m2 = dd.getMonth() + 1;
    var nextd = dd.getDate();
    if (m1 < 10) {
      m1 = "0" + m1
    }
    if (m2 < 10) {
      m2 = "0" + m2
    }
    if (d < 10) {
      d = "0" + d
    }
    if (nextd < 10) {
      nextd = "0" + nextd
    }
    this.startTime = y1 + "-" + m1 + "-" + d
    this.endTime = y2 + "-" + m2 + "-" + nextd
  }
})