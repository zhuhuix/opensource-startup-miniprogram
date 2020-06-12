//获取app实例
const app = getApp();

// 获取服务器接口地址
const api = require("../../config/config.js");

import request from "../../utils/request.js";

Page({
  data: {
    userInfo: {
      nickName: "未登录",
      avatarUrl: "../../images/login.png"
    }, // 用户信息
    userName: "",
    hasLogin: wx.getStorageSync("loginFlag") ? true : false // 是否登录，根据后台返回的skey判断
  },


  /**
   * 执行登录操作
   */
  doLogin: function() {
    let that = this;
    wx.showLoading({
      title: "登录中...",
      mask: true
    });
    app.doLogin(that.getUserInfo);
  },

  goIndex: function() {
    if (!app.globalData.userInfo) {
      console.log("去往登录页");
      wx.navigateTo({
        url: "../index/index",
        success: result => {},
        fail: () => {},
        complete: () => {}
      });
    }
  },

  /**
   * 从 globalData 中获取 userInfo
   */
  getUserInfo: function() {
    let that = this;

    let userInfo = app.globalData.userInfo;

    console.info("userInfo is:", userInfo);

    if (userInfo) {
      that.setData({
        hasLogin: true,
        userInfo: userInfo
      });
      wx.hideLoading();
      console.info("userInfo.avatarUrl", userInfo.avatarUrl);
    } else {
      console.log("globalData中userInfo为空");
    }
  },



  onShow: function() {
    let that = this;
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      
      that.setData({
        userInfo: app.globalData.userInfo,
        hasLogin: true
      });
    }else{
      that.setData({
      userInfo:
      {
        nickName: "未登录",
        avatarUrl: "../../images/login.png"
      }
    });
    }
  },

  getData() {
    let that = this;
    wx.showLoading();
    const _request = new request();
    _request
      .getRequest(api.wxGetUserInfoUrl, {
        openId: app.globalData.userInfo.openId
      })
      .then(res => {
        console.log(res, "then res");
        let data = res.data;
        if (data.success) {
          console.log("getData", data.module);
          const module = data.module;
          this.setData({
            userName: module.userName,
            myPhone: module.phone
          });
        }
      })
      .catch(res => {
        console.log(res, "catch res");
        if (res.statusCode == "401") {
          app.doLogin(that.getData);
        } else {
          console.log("res.statusCode", res.statusCode);
          app.showInfo("异常错误" + ",请重新进入");
          wx.navigateTo({
            url: '../index/index',
            success: (result)=>{
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }
      });

    wx.hideLoading();
  },

});
