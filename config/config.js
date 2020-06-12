//区分开发环境和生产环境
const current = "dev";

const profiles = {
  //服务器开发环境地址
  dev: {
    baseURL: "http://localhost:8000/",
    baseApi: "api/"
  },
  //服务器生产环境地址
  prod: {
    baseURL: 'https://xxx.xxx.xxx:8000/',
    baseApi: "api/"
  }
};

// 服务器域名
const baseUrl = profiles[current].baseURL;
//api路径
const baseApi = profiles[current].baseApi;

// 登录接口
const loginUrl = baseUrl + baseApi + "auth/login";

//保存用户信息接口
const wxSaveUserInfoUrl = baseUrl + baseApi + "security/saveUserInfo";
//获取用户信息接口
const wxGetUserInfoUrl = baseUrl + baseApi + "security/getUserInfo";


/*
Tencent  Face-2-Face Translator.
*/


module.exports = {
  baseUrl: baseUrl,
  baseApi: baseApi,
  loginUrl: loginUrl,
  wxSaveUserInfoUrl: wxSaveUserInfoUrl,
  wxGetUserInfoUrl: wxGetUserInfoUrl,

};
