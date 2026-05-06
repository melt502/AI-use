// pages/test/test.js - 答题页逻辑
const app = getApp()

Page({
  data: {
    questions: [],
    options: [],
    totalQuestions: 15,
    currentIndex: 0,
    currentQuestion: null,
    selectedScore: -1,
    answers: [],       // 存储每题选中的分数，-1表示未答
    progressPercent: 0,
    typeLabel: '',
    showJumpPanel: false,
    jumpList: []
  },

  onLoad() {
    const questions = app.globalData.questions
    const options = app.globalData.options
    // 初始化答案数组，全部设为-1（未答）
    const answers = new Array(questions.length).fill(-1)
    // 初始化跳转列表
    const jumpList = questions.map((_, index) => ({ index }))

    this.setData({
      questions,
      options,
      answers,
      jumpList
    })

    this.updateQuestion(0)
  },

  // 更新当前题目显示
  updateQuestion(index) {
    const question = this.data.questions[index]
    const typeMap = {
      mood: '心境障碍',
      oppose: '对立违抗性行为',
      school: '学校/工作问题'
    }
    const percent = Math.round(((index + 1) / this.data.totalQuestions) * 100)

    this.setData({
      currentIndex: index,
      currentQuestion: question,
      selectedScore: this.data.answers[index],
      progressPercent: percent,
      progressStyle: 'width: ' + percent + '%',
      typeLabel: typeMap[question.type] || ''
    })
  },

  // 选择选项
  selectOption(e) {
    const score = e.currentTarget.dataset.score
    // 更新答案数组
    const answers = this.data.answers
    answers[this.data.currentIndex] = score

    this.setData({
      selectedScore: score,
      answers: answers,
      jumpList: this.data.jumpList // 触发跳转列表更新显示
    })
  },

  // 上一题
  prevQuestion() {
    if (this.data.currentIndex > 0) {
      this.updateQuestion(this.data.currentIndex - 1)
    }
  },

  // 下一题
  nextQuestion() {
    if (this.data.currentIndex < this.data.totalQuestions - 1) {
      // 检查当前题是否已作答
      if (this.data.selectedScore === -1) {
        wx.showToast({
          title: '请先选择一个选项',
          icon: 'none',
          duration: 1500
        })
        return
      }
      this.updateQuestion(this.data.currentIndex + 1)
    }
  },

  // 跳转到指定题目
  jumpToQuestion(e) {
    const index = e.currentTarget.dataset.index
    this.updateQuestion(index)
    this.setData({ showJumpPanel: false })
  },

  // 展开/收起跳转面板
  toggleJumpPanel() {
    this.setData({
      showJumpPanel: !this.data.showJumpPanel
    })
  },

  // 提交测评
  submitTest() {
    const answers = this.data.answers

    // 检查是否全部作答
    const unanswered = []
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === -1) {
        unanswered.push(i + 1)
      }
    }

    if (unanswered.length > 0) {
      wx.showModal({
        title: '尚未完成所有题目',
        content: `还有 ${unanswered.length} 题未作答（第${unanswered.join('、')}题），请完成后再提交。`,
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#07C160'
      })
      return
    }

    // 计算总分和维度分
    let totalScore = 0
    let moodScore = 0
    let opposeScore = 0
    let schoolScore = 0

    for (let i = 0; i < this.data.questions.length; i++) {
      const q = this.data.questions[i]
      const s = answers[i]
      totalScore += s

      if (q.type === 'mood') moodScore += s
      else if (q.type === 'oppose') opposeScore += s
      else if (q.type === 'school') schoolScore += s
    }

    // 跳转到结果页，携带分数数据
    wx.redirectTo({
      url: `/pages/result/result?total=${totalScore}&mood=${moodScore}&oppose=${opposeScore}&school=${schoolScore}`
    })
  }
})