import DingdingBot from './index'

const curDate = new Date()
const dd = new DingdingBot({
  webhookUrl: 'your_webhookUrl', // ⚠️记得替换成你的 webhookUrl
  secret: 'your_secret', // ⚠️记得替换成你的 secret
  msgtype: 'markdown', 
  title: '测试标题',
  /* picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577114596765&di=e45e353bbe693a5cbb51215b47fad2dc&imgtype=0&src=http%3A%2F%2Fimg3.tbcdn.cn%2Ftfscom%2Fi2%2F101742512%2FTB2x7C0nFXXXXbsXpXXXXXXXXXX_%2521%2521101742512.jpg',
  messageUrl: 'https://www.dingtalk.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI', */
  msg:  `> “<font color=#FF0000>测试</font>环境\n\n` + 
  `> 更新内容为：测试测试测试...” \n` + 
  `> ###### ${curDate.getHours()}点${curDate.getMinutes()}分${curDate.getSeconds()}秒发布 \n`
})
dd.run(1)
