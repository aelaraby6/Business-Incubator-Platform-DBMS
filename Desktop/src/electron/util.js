import { getUIPath } from './pathResolver.js';
import { pathToFileURL } from 'url';
import { app } from 'electron';

export function isDevelopmentMode(){
    return !app.isPackaged;
}

export function validateEventFrame(frame) {
  if (isDevelopmentMode() && new URL(frame.url).host === 'localhost:5173') {
    return;
  }
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error('Malicious event');
  }
}