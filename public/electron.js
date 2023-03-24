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
    icon: path.join(__dirname, `public/icon.png`),
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

//event
const OPEN_KEYNOTE = `open_keynote.scpt`;
const CREATE_SLIDE = `create_slide.scpt`;
const DELETE_FIRST_SLIDE = `delete_first_slide.scpt`;

const ipcMain = require("electron").ipcMain;

ipcMain.handle("openKeynote", (_, args) => {
  const { execSync } = require("child_process");
  return runScript(execSync, getScriptPath(OPEN_KEYNOTE));
});

const removeSpecialChar = (str) => {
  return str.toString().replace(/[^\w\s.!?()]/g, "");
};

const split = (str) => {
  const result = str.toString().match(/[^.!?]+[.!?]+/g);
  console.log(`spliited `, result);
  return result === null ? [str.toString()] : result;
};

const splitTextBySentence = (text) => {
  if (/^\d+$/.test(text)) {
    return [text];
  }

  const regex = /(".*?"|\(.*?\)|[^.?!]+[.?!]?)/g;
  const sentences = text.match(regex);

  return sentences
    .map((sentence) => sentence.trim())
    .filter((s) => s !== null)
    .filter((s) => s.length !== 0)
    .map((s) => s.replace(/\n/g, " "));
};

ipcMain.handle("createSlide", (_, title, no, paragraph) => {
  if (!paragraph || paragraph.length === 0) {
    return true;
  }

  const { execSync } = require("child_process");

  const slideTitle = `\"${title} ${no}번\"`;

  const sentences = splitTextBySentence(paragraph);

  if (sentences === null || sentences.length === 0) {
    return true;
  }

  let result = true;

  sentences.forEach(
    (sentence) =>
      (result =
        result &&
        runScript(
          execSync,
          getScriptPath(CREATE_SLIDE),
          slideTitle,
          `\"${sentence}\"`
        ))
  );

  return result;
});

ipcMain.handle("deleteFirstSlide", (_, args) => {
  const { execSync } = require("child_process");
  return runScript(
    execSync,
    getScriptPath(DELETE_FIRST_SLIDE),
    `\"${!args ? "reuslt" : args}\"`
  );
});

const getScriptPath = (fileName) => {
  return isDev
    ? path.join(__dirname, "/script/" + fileName)
    : path.join(process.resourcesPath, fileName);
};

const runScript = (execSync, script, param1, param2) => {
  try {
    execSync(`osascript ${script} ${param1} ${param2}`);
    return true;
  } catch (err) {
    console.log("fail!!!!!!!!!!!!!!!!!!!!!!!!", err);
    console.log("sdterr", err.stderr.toString());
    return false;
  }
};

const Store = require("electron-store");

const schema = {
  no: {
    type: "string",
    default: "0",
  },
  paragraph: {
    type: "string",
  },
};

const store = new Store({ schema });

ipcMain.handle("getStoreValue", (event, key) => {
  return store.get(key);
});

ipcMain.handle("saveStoreValue", (event, rowKey, data) => {
  store.set(rowKey, data);
});

ipcMain.handle("deleteStoreValue", (event, rowKey) => {
  store.delete(rowKey);
});
