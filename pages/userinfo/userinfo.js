// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    indexSelect: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timesRun = 0
    var num = Math.ceil(Math.random() * 40)
    console.log('num----------------------',num)
    var that = this
    var timer = setInterval(function () {
      let index = that.data.indexSelect
      index++
      if (index >= 8) {
        index = 0
      }
      that.setData({
        indexSelect: index
      })
      timesRun += 1
      console.log('timesrun--',timesRun)
      if (timesRun == num) {
        console.log('timer--', timer)
        clearInterval(timer)

        wx.showModal({
          title: '恭喜您',

          success: function (res) {
            if (res.confirm) {
              console.log("用户点击确定")
              return
            } else {
              console.log("点击取消")
              return
            }
          }
        })
      }
    }, 500)

  },
  opensetting: function (e) {
    console.log('---------------------------')
    wx.openSetting({
      success: function (res) {
        console.log('openSetting --success-- ,', res.authSetting)
      },
      fail: function (res) {
        console.log('openSetting -fail--- ,', res.errMsg)
      }
    })
  },

  bindGetUserInfo: function (e) {
    console.log(e)
  }
})