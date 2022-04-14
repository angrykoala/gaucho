
// This file has access to both, renderer and main (window & document globals)
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: any, text: any) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

export {}
