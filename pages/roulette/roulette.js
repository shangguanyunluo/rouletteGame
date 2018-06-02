// pages/roulette/roulette.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    circleList: [],
    colorCircleFirst: '#FFDF2F',
    colorCircleSecond: '#F44D32',
    imageAward: [{ "image": "../../images/1.jpg", "content": "1" },
    {
      "image": "../../images/2.jpg", "content": "2"
    },
    { "image": "../../images/3.jpg", "content": "3" },
    { "image": "../../images/1.jpg", "content": "4" },
    { "image": "../../images/2.jpg", "content": "5" },
    { "image": "../../images/3.jpg", "content": "6" },
    { "image": "../../images/1.jpg", "content": "7" },
    { "image": "../../images/2.jpg", "content": "8" },],
    indexSelect: 0,
    canRunning: true,
    colorAwardSelect: '#FFDF2F',
    colorAwardDefault: 'darkviolet'


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var circleList = [];
    var topCircle = 15;
    var leftCircle = 15;
    for (var i = 0; i < 24; i++) {
      // 设置每个点的坐标值，页面就会相应的显示
      if (i < 7) {
        topCircle = 15
        leftCircle = 15 + 112 * i
      } else if (i < 13) {
        leftCircle = 15
        topCircle = topCircle + 112
      } else if (i < 19) {
        topCircle = 685
        leftCircle = leftCircle + 112
      } else if (i < 24) {
        leftCircle = 685
        topCircle = topCircle - 112
      }
      circleList.push({ "topCircle": topCircle, "leftCircle": leftCircle })
    }
    this.setData({ circleList: circleList })
    setInterval(() => {
      if (this.data.colorCircleFirst == '#FFDF2F') {
        this.setData({
          index: index,
          colorCircleFirst: '#F44D32',
          colorCircleSecond: '#FFDF2F'
        })
      } else {
        this.setData({
          colorCircleFirst: '#FFDF2F',
          colorCircleSecond: '#F44D32'
        })
      }
    }, 500)

    var awardList = []

    var topAward = 75
    var leftAward = 75
    var index
    for (var j = 0; j < 8; j++) {
      index = j
      if (j == 0) {
        topAward = 75
        leftAward = 75
      } else if (j < 3) {
        topAward = topAward
        leftAward = leftAward + 250
      } else if (j < 5) {
        topAward = topAward + 250
        leftAward = leftAward
      } else if (j < 7) {
        topAward = topAward
        leftAward = leftAward - 250
      } else {
        topAward = topAward - 250
        leftAward = leftAward
      }
      var imageAward = this.data.imageAward[j]
      awardList.push({
        index: index,
        topAward,
        leftAward,
        imageAward
      })
    }
    this.setData({ awardList: awardList })

  },
  startGo: function () {
    var timesRun = 0
    var num = Math.ceil(Math.random() * 40) + 8
    console.log('num----------------------', num)
    var that = this
    var timer = setInterval(function () {
      var index = that.data.indexSelect
      index++
      if (index >= that.data.imageAward.length) {
        index = 0
      }
      that.setData({
        indexSelect: index
      })
      timesRun += 1
      if (timesRun == num) {
        clearInterval(timer)
        wx.showModal({
          title: '恭喜您',
          content: that.data.awardList[that.data.indexSelect].imageAward["content"],
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

  startGame: function (e) {
    var canRunning = this.data.canRunning
    var that = this
    if (canRunning) {
      console.log('-----canRunning------------')
      this.setData({
        canRunning: false
      })
      var timesRun = 0
      var num = Math.ceil(Math.random() * 40) + 8
      console.log('num----------------------', num)
      var that = this
      var timer = setInterval(function () {
        var index = that.data.indexSelect
        index++
        if (index >= that.data.imageAward.length) {
          index = 0
        }
        that.setData({
          indexSelect: index
        })
        timesRun += 1
        if (timesRun == num) {
          clearInterval(timer)
          that.setData({
            canRunning: true
          })
          wx.showModal({
            title: '恭喜您',
            content: that.data.awardList[that.data.indexSelect].imageAward["content"],
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
    }
    console.log('-----------------')
    
  }
})