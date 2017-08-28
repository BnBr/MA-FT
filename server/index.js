// to have access to local or global scripts
require(process.cwd() + '/node_modules/benja').paths();

// simple server example
require('http').createServer(require('tiny-cdn').create({})).listen(8080, '0.0.0.0');
//   will respond to :80 too via iptables

// simple app example
const electron = require('electron');
const  app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

// in case by default WebGL doesn't work ... (rpi or others)
app.commandLine.appendSwitch('--ignore-gpu-blacklist');

// once the app is ready
app.once('ready', () => {

  const area = electron.screen.getPrimaryDisplay().workAreaSize;

  this.window = new BrowserWindow({
    frame: false,
    fullscreen: true,
    x: 0,
    y: 0,
    width: area.width,
    height: area.height
  });
  
  // Open the DevTools.
  this.window .webContents.openDevTools()
  
  // and load the index.html of the app.
  this.window.loadURL(url.format({
    pathname: path.join(__dirname, 'server_code/server.html'),
    protocol: 'file:',
    slashes: true
  }))

    /*
  this.window.once('closed', () => {
      // cleanup the reference
      this.window = null;
    }).loadURL('http://localhost:8080/');
    */
    
  require('fs').watch('reload', () => app.quit());

});