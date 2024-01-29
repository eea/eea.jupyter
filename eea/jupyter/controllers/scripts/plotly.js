function onLoadHandler() {
  function emitPostMessage(event) {
      if (event.data.type !== 'jupyter-ch:getContent') return;
      el = document.getElementById('jupyter-ch')
      if (el) {
        if (event.data.content?.auth === false) {
          window.frames["jupyter"].location = 'http://localhost:3000/en/login?return_url=' + window.frames["jupyter"].pathname
        }
        el.contentWindow.postMessage(%s, '*')
      }
  }
  if (window.jupyterCh?.emitPostMessage) {
      window.removeEventListener('message', window.jupyterCh.emitPostMessage)
  }
  window.addEventListener('message', emitPostMessage)
  window.jupyterCh = {
      emitPostMessage
  }
}