import { app, BrowserWindow, ipcMain } from 'electron';
import { isDevelopmentMode } from './util.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import loginRequest from './backend/auth/login.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
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
  ipcMain.handle('auth:login', async (_event, credentials) => {
    return await loginRequest(credentials);
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