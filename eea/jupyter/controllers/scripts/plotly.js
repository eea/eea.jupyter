function onLoadHandler() {
  if (window.jupyter_ch) return;
  function emitPostMessage(event) {
    if (event.data.type !== 'jupyter-ch:getContent') return;
    el = document.getElementById('jupyter-ch')
    if (el) {
      el.contentWindow.postMessage(%s, '*')
    }
  }
  window.addEventListener('message', emitPostMessage)
  window.jupyter_ch = true
}