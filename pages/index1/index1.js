// pages/books/books.js

// 获取服务器接口地址
const api = require("../../config/config.js");
// 获取app应用实例
const app = getApp();



Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasLogin: false,
    indicatorDots: true, // 是否显示轮播指示点
    autoplay: true, // 是否自动播放轮播
    interval: 5000, // 轮播间隔
    duration: 1000, // 轮播播放延迟
    circular: true, // 是否采用衔接滑动
    sideMargin: "100rpx", // 幻灯片前后边距
    showLoading: true, // 是否显示loading态
    userInfo: {
      nickName: "未登录",
      avatarUrl: "../../images/login.png",
    }, // 用户信息
    bannerList: [
      { url: "../../images/banner1.jpg" },
      { url: "../../images/banner2.jpg" },
    ],
  },



  onLogin: function () {
    let that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: function (res) {
              console.log("用户已经授权过了");
              console.log("app.globalData.userInfo", app.globalData.userInfo);
              that.setData({
                userInfo: app.globalData.userInfo,
              });
              if (that.data.userInfo == null) {
                app.doLogin();
              }
            },
            fail: function (res) {
              wx.switchTab({
                url: "/pages/index/index",
                success: (result) => {},
                fail: () => {},
                complete: () => {},
              });
            },
          });
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({
        hasLogin: true,
        userInfo: app.globalData.userInfo,
      });

    } else {
      this.setData({
        hasLogin: false,
        userInfo: {
          nickName: "未登录",
          avatarUrl: "../../images/login.png",
        },
      });
    }
  },


  goIndex: function () {
    if (!app.globalData.userInfo) {
      console.log("去往登录页");
      wx.navigateTo({
        url: "../index/index",
        success: (result) => {},
        fail: () => {},
        complete: () => {},
      });
    }
  },



});
