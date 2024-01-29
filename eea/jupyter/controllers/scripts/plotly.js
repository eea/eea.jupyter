function onLoadHandler() {
  const self = %s
  const data = %s
  function handleMessage(event) {
    jupyterWindow = window.frames["jupyter"]
    if (!event.data.type?.startsWith('jupyter-ch') || !jupyterWindow) return;
    if (event.data.type === 'jupyter-ch:login' && !event.data.content?.auth) {
      const location = event.data.content.location || {}
      jupyterWindow.location = self.host + '/login?return_url=' + location.pathname + location.search
    }
    if (event.data.type === 'jupyter-ch:getContent') {
      jupyterWindow.postMessage(data, '*')
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