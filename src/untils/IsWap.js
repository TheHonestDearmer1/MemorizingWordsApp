export const isWap = () => {
    var userAgentInfo = navigator.userAgent
    var Agents = [
      'Android',
      'iPhone',
      'SymbianOS',
      'Windows Phone',
      'iPad',
      'iPod'
    ]
    var flag = true
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
  
    if (flag) {
      let width =
        document.documentElement.clientWidth || document.body.clientWidth
      if (width < 840) {
        //小于840px的屏幕，判定为手机
        flag = false
      }
    }
    return !flag
  }
  
  export const Url = "45.40.228.46:5000"
  export const appid = "20231108001873712"
  export const MIYAO = "lCWGFBifFeEfKF55N8KS"
  export const FANYIAPI = "https://fanyi-api.baidu.com/api/trans/vip/translate"
