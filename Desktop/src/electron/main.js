import { app, BrowserWindow, ipcMain } from 'electron';
import { isDevelopmentMode } from './util.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    frame: true,
  });
  if (isDevelopmentMode()) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(getUIPath());
  }
  
  // Send test event after window is ready
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Window loaded, sending test event');
    mainWindow.webContents.send('test-event', {
      message: 'Hello from Main Process!',
      timestamp: new Date().toISOString()
    });
  });
  
  // Listen for events from renderer
  ipcMain.on('test-channel', (event, data) => {
    console.log('Main received:', data);
    event.reply('test-response', {
      message: 'Main process received your message!',
      receivedData: data
    });
  });
  
  handleCloseEvents(mainWindow);
});

function handleCloseEvents(mainWindow) {
  let willClose = false;
  mainWindow.on('close', (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on('before-quit', () => {
    willClose = true;
  });

  mainWindow.on('show', () => {
    willClose = false;
  });
}