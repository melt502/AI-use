// pages/result/result.js - 结果页逻辑
Page({
  data: {
    totalScore: 0,
    moodScore: 0,
    opposeScore: 0,
    schoolScore: 0,
    moodPercent: 0,
    opposePercent: 0,
    schoolPercent: 0,
    level: 'low',
    levelText: '',
    levelDesc: '',
    adviceList: []
  },

  onLoad(options) {
    const total = parseInt(options.total) || 0
    const mood = parseInt(options.mood) || 0
    const oppose = parseInt(options.oppose) || 0
    const school = parseInt(options.school) || 0

    // 计算维度百分比
    const moodPercent = Math.round((mood / 28) * 100)
    const opposePercent = Math.round((oppose / 24) * 100)
    const schoolPercent = Math.round((school / 8) * 100)

    // 判断等级
    let level = 'low'
    let levelText = ''
    let levelDesc = ''
    let adviceList = []

    if (total <= 19) {
      level = 'low'
      levelText = 'ADHD相关风险较低'
      levelDesc = '根据您的自评结果，您在6~10岁期间的ADHD相关表现较少，当前提示风险较低。这并不意味着完全排除可能性，如有疑虑仍建议咨询专业人士。'
      adviceList = [
        '保持健康的生活作息规律，确保充足的睡眠',
        '适度运动有助于维持注意力与情绪稳定',
        '如后续出现注意力或情绪方面的困扰，可定期自评观察变化'
      ]
    } else if (total <= 39) {
      level = 'mid'
      levelText = '存在中度ADHD相关表现'
      levelDesc = '根据您的自评结果，您在6~10岁期间存在一定程度的ADHD相关表现，建议您关注自身的注意力、情绪及行为模式，必要时寻求专业评估。'
      adviceList = [
        '建议前往精神科或心理科做进一步专业评估',
        '记录日常注意力困难、冲动行为的具体场景，便于就医时参考',
        '尝试建立结构化的日程安排，减少因注意力不集中带来的影响',
        '了解ADHD相关知识，消除误解，正确认识自身状态'
      ]
    } else {
      level = 'high'
      levelText = '高度提示可能存在ADHD'
      levelDesc = '根据您的自评结果，您在6~10岁期间表现出较多的ADHD相关特征，强烈建议您尽快前往专业医疗机构进行系统评估和诊断。'
      adviceList = [
        '尽快前往三甲医院精神科或心理科进行专业评估',
        '就诊时携带本量表结果作为参考信息',
        '告知医生您童年的具体表现，帮助准确评估',
        'ADHD是可治疗、可管理的，早干预效果更好',
        '避免自行判断或延误就医，专业诊断后可制定个性化方案'
      ]
    }

    this.setData({
      totalScore: total,
      moodScore: mood,
      opposeScore: oppose,
      schoolScore: school,
      moodPercent: moodPercent,
      opposePercent: opposePercent,
      schoolPercent: schoolPercent,
      moodStyle: 'width: ' + moodPercent + '%',
      opposeStyle: 'width: ' + opposePercent + '%',
      schoolStyle: 'width: ' + schoolPercent + '%',
      level: level,
      levelText: levelText,
      levelDesc: levelDesc,
      adviceList: adviceList
    })
  },

  // 重新测评
  retakeTest() {
    wx.redirectTo({
      url: '/pages/test/test'
    })
  },

  // 返回首页
  backHome() {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  }
})