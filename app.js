//app.js
const api = require("./config/config.js");

App({
  // 小程序启动生命周期
  onLaunch: function () {
    let that = this;
    let userStorageInfo = wx.getStorageSync("userInfo");
    if (userStorageInfo) {
      that.globalData.userInfo = userStorageInfo;
    }
  },

  // 检查本地 storage 中是否有登录态标识
  checkLoginStatus: function () {
    let that = this;
    let loginFlag = wx.getStorageSync("loginFlag");
    if (loginFlag) {
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 有效(为过期)
        success: function () {
          // 直接从Storage中获取用户信息
          let userStorageInfo = wx.getStorageSync("userInfo");

          if (userStorageInfo) {
            that.globalData.userInfo = userStorageInfo;
          } else {
            that.showInfo("缓存信息缺失");
            console.error(
              "登录成功后将用户信息存在Storage的userStorageInfo字段中，该字段丢失"
            );
          }
        },
        // session_key 过期
        fail: function () {
          // session_key过期
          that.doLogin();
        },
      });
    } else {
      // 无登录态
      that.doLogin();
    }
  },

  // 公共登录动作
  doLogin: function (callback) {
    let that = this;
    wx.login({
      success: function (loginRes) {
        //console.log(loginRes, "loginRes");
        if (loginRes.code) {
          /*
           * @desc: 获取用户信息 期望数据如下
           *
           * @param: userInfo       [Object]
           * @param: rawData        [String]
           * @param: signature      [String]
           * @param: encryptedData  [String]
           * @param: iv             [String]
           **/
          wx.getUserInfo({
            withCredentials: true, // 非必填, 默认为true

            success: function (infoRes) {
              console.log("infoRes:", infoRes);
              // 请求服务端的登录接口
              wx.request({
                url: api.loginUrl,
                method: "POST",
                data: {
                  authType: 1,  //1代表微信端登录
                  userName: "",
                  password: "",
                  code: loginRes.code, // 临时登录凭证
                  rawData: infoRes.rawData, // 用户非敏感信息
                  signature: infoRes.signature, // 签名
                  encryptedData: infoRes.encryptedData, // 用户敏感信息
                  iv: infoRes.iv, // 解密算法的向量
                  token: wx.getStorageSync("loginFlag"),
                },

                success: function(res) {
                  console.log("login success:", res);
                  res = res.data;
                  if (res.success) {
                    that.globalData.userInfo = res.module.userInfo;
                    console.log(
                      "globalData.userInfo",
                      that.globalData.userInfo
                    );
                    wx.setStorageSync("userInfo", res.module.userInfo);
                    wx.setStorageSync("loginFlag", res.module.token);
                    if (callback) {
                      callback();
                    }
                  } else {
                    that.showInfo(res.message);
                  }
                },
                
                fail: function (error) {
                  // 调用服务端登录接口失败
                  that.showInfo("调用接口失败");
                  console.log(error);
                },
              });
            },

            fail: function (error) {
              console.log(error);
              // 获取 userInfo 失败，去检查是否未开启权限
              wx.hideLoading();
              that.showInfo("调用request接口失败");
              console.log(error);
              wwx.navigateTo({
                url: "/pages/index/index",
              });
            },
          });
        } else {
          // 获取 code 失败
          that.showInfo("登录失败");
          console.log("调用wx.login获取code失败");
        }
      },

      fail: function (error) {
        // 调用 wx.login 接口失败
        that.showInfo("接口调用失败");
        console.log(error);
      },
    });
  },

  // 检查用户信息授权设置
  checkUserInfoPermission: function (callback = () => {}) {
    wx.getSetting({
      success: function (res) {
        console.log(res);
        if (!res.authSetting["scope.userInfo"]) {
          wx.openSetting({
            success: function (authSetting) {
              console.log("success:authSetting：");
              console.log(authSetting);
              callback();
            },
            fail: function (error) {
              console.log("fail:authSetting：");
              console.log(error);
            },
          });
        }
      },
      fail: function (error) {
        console.log(用户信息授权设置);
        console.log(error);
      },
    });
  },

  //切换到tab首页
  switchTheTab: function () {
    console.log("回调函数：callback swithcTheTab");
    wx.switchTab({
      url: "/pages/index1/index1",
      success: (result) => {
        console.log(wx.getStorageSync("loginFlag"));
      },
      fail: () => {},
      complete: () => {},
    });
  },

  // 获取用户登录标示 供全局调用
  getLoginFlag: function () {
    return wx.getStorageSync("loginFlag");
  },

  // 封装 wx.showToast 方法
  showInfo: function (info = "error", icon = "none") {
    wx.showToast({
      title: info,
      icon: icon,
      duration: 2000,
      mask: false,
    });
  },


  // app全局数据
  globalData: {
    userInfo: null
  },
});
