const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minHeight: 720,
    minWidth: 1280,
    maxHeight: 1080,
    maxWidth: 1920,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: isDev,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.setResizable(true);
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.focus();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const OPEN_KEYNOTE = `open_keynote.scpt`;
const CREATE_SLIDE = `create_slide.scpt`;
const DELETE_FIRST_SLIDE = `delete_first_slide.scpt`;

const ipcMain = require("electron").ipcMain;

const runAppleScript = (fileName, param1, param2) => {
  const { execSync } = require("child_process");

  const dataPath = isDev
    ? path.join(__dirname, "/script/" + fileName)
    : path.join(process.resourcesPath, fileName);

  // const scriptPath = path.join(__dirname, "/script/" + fileName);
  // const scriptPath = path.join(process.resourcesPath, fileName);

  console.log(dataPath);
  execSync(`osascript ${dataPath} ${param1} ${param2}`);
};

ipcMain.handle("appleScript", async (_, args) => {
  runAppleScript(OPEN_KEYNOTE);
  runAppleScript(CREATE_SLIDE, "test", "hello1");
  runAppleScript(CREATE_SLIDE, "test", "hello2");
  runAppleScript(DELETE_FIRST_SLIDE, "test", "hello2");
  return "result";
});
