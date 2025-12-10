const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 352,
    height: 406,
    resizable: false
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})