/** index.js **/

//获取app实例
const app = getApp();

Page({
  data: {
    token: wx.getStorageSync("loginFlag"),
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    // 是否登录，根据后台返回的token判断
    hasLogin: wx.getStorageSync("loginFlag") ? true : false,
  },

  onLoad: function () {},

  bindGetUserInfo: function (e) {
    console.log("用户按了允许授权按钮", e.detail.userInfo);
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      app.doLogin(app.switchTheTab);
    } else {
      //用户按了拒绝按钮
    }
  },

  onShow: function () {},
});
