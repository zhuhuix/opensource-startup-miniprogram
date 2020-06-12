/**
 * description: request处理基础类
 * author: zhuhuix
 * date: 2020-01-09
 */

// 获取app应用实例
const app = getApp();

class request {
  constructor() {
    this._header = {
        "Authorization": wx.getStorageSync("loginFlag"),
        "Content-Type": "application/json"
    };
  }

  /**
   * 设置统一的异常处理
   */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, "GET");
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, "DELETE");
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, "PUT");
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, "POST");
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        success: res => {
          if (res.statusCode >= 200 && res.statusCode<=300 ) {
            //200: 服务端业务处理正常结束
            resolve(res);
          } else {
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res);
            }
            reject(res);
            
          }
        },
        fail: res => {
          if (this._errorHandler != null) {
            this._errorHandler(res);
          }
          reject(res);
        }
      });
    });
  }
}

export default request;
