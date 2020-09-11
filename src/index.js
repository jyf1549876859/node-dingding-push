"use strict";

const request = require("request");
const fs = require("fs");
const log4js = require("log4js");
const crypto = require("crypto");

// promise封装
function promisify(func) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      func(...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

// 生成logs
async function generateLogs() {
  try {
    await promisify(fs.stat)('logs')
  } catch (error) {
    if (error) {
      // 没有logs目录，创建该目录
      await promisify(fs.mkdir)('logs')
      await promisify(fs.writeFile)('./logs/error.log', '', 'utf8')
      await promisify(fs.writeFile)('./logs/info.log', '', 'utf8')
      console.log('😊创建日志目录成功');
    }
  }
}

export default class DingdingBot {
  constructor({
    webhookUrl, // 机器人webhookUrl
    secret, // 机器人secret
    msg, // 推送内容
    msgtype = 'text', // text- 纯文本， markdown- .md格式， link- 链接
    title = '', // 消息标题
    picUrl = '', // 图片URL
    messageUrl = '', // 点击消息跳转的URL
    atMobiles = [], // at的指定员工手机号List
  }) {
    this._webhookUrl = webhookUrl
    this.secret = secret
    this.msg = msg
    this.msgtype = msgtype
    this.title = title
    this.picUrl = picUrl
    this.messageUrl = messageUrl
    this.atMobiles = atMobiles
  } 
  pushMsg(isAll) {
    try {
      const textExtraOptions = {
        "text": {
          "content": this.msg
        }
      }
      const linkExtraOptions = {
        "link": {
          "text": this.msg,
          "title": this.title, 
          "picUrl": this.picUrl, 
          "messageUrl": this.messageUrl
        }
      }
      const markdownExtraOptions = {
        "markdown": {
          "title": this.title, 
          "text": this.msg
        },
      }
      const OPTION_ENUM = {
        text: textExtraOptions,
        link: linkExtraOptions,
        markdown: markdownExtraOptions,
      }
      const options = {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        json: {
          "msgtype": this.msgtype,
          "at": {
            "atMobiles": this.atMobiles instanceof Array ? this.atMobiles : [],
            "isAtAll": !!isAll
          },
          ...OPTION_ENUM[this.msgtype]
        }
      };
      request.post(this.url, options, (err, response, body) => {
        if (err) {
          this.logger.error("\n ---- 错误日志 ---- \n err");
        }
        else {
          this.logger.info("\n ---- 成功日志 ---- \n 推送的消息内容为: \n " + this.msg + ", 返回值为: " + JSON.stringify(body));
        }
      });
    }
    catch (err) {
      console.error(err);
      return false;
    }
  }
  // 推送但不at任何人
  pushMsgNotAt() {
    this.pushMsg();
  };
  // 推送并且at全体群员
  pushMsgAndAtAll() {
    this.pushMsg(true);
  };
  // 推送并且at指定群员工
  pushMsgAndAtSomePerson() {
    this.pushMsg();
  };

  // 0- 推送但不at任何人, 1- 推送并且at全体群员, 2- 推送并且at指定群员工
  async run(type) {
    await generateLogs()
    //钉钉推送加密
    const sign = function (secret, content) {
      const str = crypto.createHmac('sha256',secret).update(content)
        .digest()
        .toString('base64');
      return encodeURIComponent(str);
    };
    // 日志配置
    this.logger = log4js.getLogger("DingdingBot");
    log4js.configure({
      appenders: {
        stdout: {
          type: 'stdout'
        },
        info: {
          type: 'file',
          filename: './logs/info.log'
        },
        error: {
          type: 'file',
          filename: './logs/error.log'
        }
      },
      categories: {
        "default": {
          appenders: ['stdout', 'info'],
          level: 'info'
        },
        error: {
          appenders: ['stdout', 'error'],
          level: 'error'
        }
      }
    })
    const timestamp = Date.now();
    const signs = sign(this.secret, timestamp + '\n' + this.secret);
    this.url = this._webhookUrl + "&timestamp=" + timestamp + "&sign=" + signs
    
    if(type === 0) {
      this.pushMsgNotAt()
    } else if(type === 1) {
      this.pushMsgAndAtAll()
    } else {
      this.pushMsgAndAtSomePerson()
    }
  }
}