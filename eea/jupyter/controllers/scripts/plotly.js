function onLoadHandler() {
  function handleMessage(event) {
    jupyterWindow = window.frames["jupyter"]
    if (!event.data.type.startsWith('jupyter-ch') || !jupyterWindow) return;
    if (event.data.type === 'jupyter-ch:login' && !event.data.content?.auth) {
      jupyterWindow.location = jupyterWindow.location + '/login'
    }
    if (event.data.type === 'jupyter-ch:getContent') {
      el.contentWindow.postMessage(%s, '*')
    }
  }
  if (window.jupyterCh?.handleMessage) {
    window.removeEventListener('message', window.jupyterCh.handleMessage)
  }
  window.addEventListener('message', handleMessage)
  window.jupyterCh = {
    handleMessage
  }
}