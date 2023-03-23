import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import "./App.css";
import Header from "./header/Header";
import Table from "./table/Table";

const App = () => {
  const [keys, setKeys] = useState([nanoid()]);
  const [status, setStatus] = useState({
    isExporting: false,
    isKeynoteOpend: false,
  });

  const clickExportBtn = async () => {
    //todo status change

    const ipcRenderer = window.require("electron").ipcRenderer;
    // const result = await ipcRenderer.invoke("appleScript");

    keys.forEach(async (key) => {
      const result = await ipcRenderer.invoke("getStoreValue", key);
      console.log(result);
    });
  };

  const openKeynote = async () => {
    const ipcRenderer = window.require("electron").ipcRenderer;

    if (await ipcRenderer.invoke("openKeynote")) {
      setStatus({ isExporting: true, isKeynoteOpend: true });
    } else {
      setStatus({ isExporting: false, isKeynoteOpend: false });
    }
  };

  const createSlide = async () => {
    const ipcRenderer = window.require("electron").ipcRenderer;

    if (await ipcRenderer.invoke("openKeynote")) {
      setStatus({ isExporting: true, isKeynoteOpend: true });
    } else {
      setStatus({ isExporting: false, isKeynoteOpend: false });
    }
  };

  useEffect(() => {
    if (!status.isExporting) {
      return;
    }

    if (!status.isKeynoteOpend) {
      openKeynote();
      return;
    }

    //TODO : Create Slide
  }, [status]);

  return (
    <div className="App">
      <Header
        isExporting={status.isExporting}
        start={() => {
          setStatus({ isExporting: true, isKeynoteOpend: false });
        }}
      />
      <div className="body">
        <Table isExporting={status.isExporting} keys={keys} setKeys={setKeys} />
      </div>
    </div>
  );
};

export default App;
