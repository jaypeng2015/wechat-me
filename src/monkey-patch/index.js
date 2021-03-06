/* eslint-disable */
(function(xhr) {
  const { ipcRenderer } = require('electron');
  const triggerKeyDown = (element, keyCode) => {
    const e = new window.KeyboardEvent('keydown', {
      bubbles: true,
    });
    delete e.keyCode;
    Object.defineProperty(e, 'keyCode', { value: keyCode });
    element.dispatchEvent(e);
  };
  ipcRenderer.on('reply text', (event, message) => {
    const { user, speech } = message;
    const tab = document.querySelectorAll('a[ng-dblclick=\"dblclickChat()\"]')[0]; /* prettier-ignore */
    tab.click();
    setTimeout(() => {
      const element = document.querySelectorAll(`[data-username=\"${user}\"]`)[0];
      element.click();
      const editArea = document.getElementById('editArea');
      editArea.innerHTML = speech.replace(/\\n/g, '<br />');
      angular.element(editArea).scope().editAreaCtn = editArea.innerHTML;
      triggerKeyDown(editArea, 13); /* send the message */
    }, 1000);
  });
  const findMe = () => {
    const header = document.querySelectorAll('div[class=\"header\"]')[0]; /* prettier-ignore */
    if (!header) {
      return null;
    }

    const tmp = header.innerHTML.substring(header.innerHTML.indexOf('username=') + 9);
    const tmp2 = header.innerHTML.substring(header.innerHTML.indexOf('display_name ng-binding') + 25);
    return {
      name: tmp.substring(0, tmp.indexOf('&')),
      nickname: tmp2.substring(0, tmp2.indexOf('<')),
    };
  };
  const isMessageTypeSupported = message =>
    message.MsgType === 1 /* text message */ ||
    message.MsgType === 3 /* images */ ||
    message.MsgType === 34 /* voice message */ ||
    message.MsgType === 4 /* sharing */;
  const isDirectMessage = (message, me) => message.ToUserName === me.name && !message.FromUserName.startsWith('@@');
  const isGroupMention = (message, me) =>
    message.FromUserName.startsWith('@@') && message.Content.includes(me.nickname);
  const incomingMessage = (xhrInstance, events) => {
    if (xhrInstance.readyState == 4 && xhrInstance.status === 200 && events[0].target.responseText) {
      const response = JSON.parse(events[0].target.responseText);
      const me = findMe();
      if (response.BaseResponse.Ret === 0 && response.AddMsgCount > 0) {
        const messages = response.AddMsgList.filter(
          message => (isDirectMessage(message, me) || isGroupMention(message, me)) && isMessageTypeSupported(message)
        );
        console.log('messages', messages);
        if (messages.length > 0) {
          ipcRenderer.send('wechatMessage', messages);
        }
      }
    }
  };
  const loadingContacts = (xhrInstance, events) => {
    if (xhrInstance.readyState == 4 && xhrInstance.status === 200 && events[0].target.responseText) {
      const response = JSON.parse(events[0].target.responseText);
      ipcRenderer.send('get contact', response);
    }
  };
  const open = xhr.open;
  xhr.open = function(method, url, async) {
    const send = this.send;
    this.send = function() {
      const rsc = this.onreadystatechange;
      if (rsc) {
        this.onreadystatechange = function() {
          if (url.startsWith('/cgi-bin/mmwebwx-bin/webwxsync?')) {
            incomingMessage(this, arguments);
          } else if (url.startsWith('/cgi-bin/mmwebwx-bin/webwxgetcontact?')) {
            loadingContacts(this, arguments);
          }
          return rsc.apply(this, arguments);
        };
      }
      return send.apply(this, arguments);
    };
    return open.apply(this, arguments);
  };
})(XMLHttpRequest.prototype);
/* eslint-enable */
