const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
    // Create the browser window.
    const preloadFilePath = path.join(process.resourcesPath, "electronPreload.js");

    win = new BrowserWindow({
        title: "Go To IT",
        fullscreen: true,
        webPreferences: {
            preload: preloadFilePath
        }
    });
    win.maximize();

    //win.webContents.openDevTools();

    // and load the index.html of the app.
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        })
    );
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    app.quit();
});
