### Node钉钉推送

当前v1.0.0仅支持：
  1. 纯文本
  2. Link跳转
  3. 钉钉支持的markdown(Tips: https://open-doc.dingtalk.com/microapp/serverapi2/qf2nxq)


具体参数如何配置，详细的说明，具体参考“钉钉文档链接”，链接同上👆。

```

/**
 * 参数说明
 * 
 * @param webhookUrl, // 机器人webhookUrl
 * @param secret, // 机器人secret
 * @param msg, // 推送内容
 * @param msgtype = 'text', // text- 纯文本， markdown- .md格式， link- 链接
 * @param title = '', // 消息标题
 * @param picUrl = '', // 图片URL
 * @param messageUrl = '', // 点击消息跳转的URL
 *
 */

可调用方法 run(type) // type: 0- 推送但不at任何人, 1- 推送并且at全体群员, 2- 推送并且at指定群员工

```

#### Demo: (Text类型)，功能：推送消息并且at指定人员（需知道对方钉钉绑定的手机号）

```
import DingdingBot from './dd'

const curDate = new Date()
const dd = new DingdingBot({
  webhookUrl: 'your_webhookUrl',
  secret: 'your_secret',
  msgtype: 'text',
  msg: '偷偷@一下部门里的其他同事😏',
  atMobiles: ['同事A的手机号', '同事B的手机号']
})
dd.run(2)

```

#### Demo: (Link类型)，功能：推送消息(可点击跳转到详情链接)

```
import DingdingBot from './dd'

const curDate = new Date()
const dd = new DingdingBot({
  webhookUrl: 'your_webhookUrl',
  secret: 'your_secret',
  msgtype: 'link', 
  title: '测试标题',
  picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577114596765&di=e45e353bbe693a5cbb51215b47fad2dc&imgtype=0&src=http%3A%2F%2Fimg3.tbcdn.cn%2Ftfscom%2Fi2%2F101742512%2FTB2x7C0nFXXXXbsXpXXXXXXXXXX_%2521%2521101742512.jpg',
  messageUrl: 'https://www.dingtalk.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI',
  msg: '走，咱们跳详情页去☁️'
})
dd.run(1)

```


#### Demo: (MarkDown类型)，功能：推送MarkDown格式消息

```
import DingdingBot from './dd'

const curDate = new Date()
const dd = new DingdingBot({
  webhookUrl: 'your_webhookUrl',
  secret: 'your_secret',
  msgtype: 'markdown',
  title: '测试标题',
  msg:  `> “<font color=#FF0000>测试</font>环境\n\n` + 
  `> 更新内容为：测试测试测试...” \n` + 
  `> ###### ${curDate.getHours()}点${curDate.getMinutes()}分${curDate.getSeconds()}秒发布 \n`
})
dd.run(1)

```



