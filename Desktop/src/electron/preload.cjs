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
    invoke: (channel, data) => {
        console.log(`Preload invoking: ${channel} with data:`, data);
        return electron.ipcRenderer.invoke(channel, data);
    }
} );