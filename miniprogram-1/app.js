// app.js
App({
  onLaunch() {
    // 小程序启动时执行
  },
  globalData: {
    questions: [
      { id: 1, text: "注意力不集中，易分心", type: "school" },
      { id: 2, text: "心情焦虑，担心", type: "mood" },
      { id: 3, text: "紧张，焦躁不安", type: "mood" },
      { id: 4, text: "心不在焉，做白日梦", type: "school" },
      { id: 5, text: "悲伤忧郁，不高兴", type: "mood" },
      { id: 6, text: "不听父母的话，叛逆，无礼", type: "oppose" },
      { id: 7, text: "对自己评价很低", type: "mood" },
      { id: 8, text: "感到生气", type: "mood" },
      { id: 9, text: "与小孩关系不好，不受其他儿童欢迎，不能维持长久的友谊", type: "mood" },
      { id: 10, text: "不经过思考就做事，冲动", type: "oppose" },
      { id: 11, text: "表现得不成熟", type: "oppose" },
      { id: 12, text: "感到愧疚，自责", type: "mood" },
      { id: 13, text: "失去自控能力", type: "oppose" },
      { id: 14, text: "表现得不够理智", type: "oppose" },
      { id: 15, text: "很难从别人的角度看问题", type: "oppose" }
    ],
    options: [
      { text: "根本不或者非常少", score: 0 },
      { text: "较少", score: 1 },
      { text: "一般多", score: 2 },
      { text: "比较多", score: 3 },
      { text: "非常多", score: 4 }
    ]
  }
})