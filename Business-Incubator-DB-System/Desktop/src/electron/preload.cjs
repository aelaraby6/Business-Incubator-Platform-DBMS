const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
    send: (channel, data) => {
        console.log(`Preload sending: ${channel} with data:`, data);
        electron.ipcRenderer.send(channel, data);
    },
    on: (channel, callback) => {
        console.log(`Preload listening on: ${channel}`);
        electron.ipcRenderer.on(channel, (event, data) => {
            console.log(`Preload received on ${channel}:`, data);
            callback(data);
        });
    },
    invoke: (channel, ...args) => {
        console.log(`Preload invoking: ${channel} with args:`, args);
        return electron.ipcRenderer.invoke(channel, ...args);
    }
} );