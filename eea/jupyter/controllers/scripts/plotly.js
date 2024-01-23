function onLoadHandler() {
  function emitPostMessage(event) {
      if (event.data.type !== 'jupyter-ch:getContent') return;
      el = document.getElementById('jupyter-ch')
      if (el) {
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