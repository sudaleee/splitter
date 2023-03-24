import "bootstrap/dist/css/bootstrap.css";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";

import "./App.css";
import Header from "./header/Header";
import Table from "./table/Table";

const App = () => {
  const [keys, setKeys] = useState([nanoid()]);
  const [status, setStatus] = useState({
    isExporting: false,
    isKeynoteOpend: false,
  });

  const slideTitleRef = useRef();
  const initStatus = () => {
    setStatus({ isExporting: false, isKeynoteOpend: false });
  };

  const createSlide = (ipcRenderer) => {
    //data 가져옴 => slide 생성 => key 삭제
    const firstKey = keys.at(0);

    ipcRenderer
      .invoke("getStoreValue", firstKey)
      .then((value) => {
        console.log("value in stroe", value);
        return ipcRenderer.invoke(
          "createSlide",
          slideTitleRef.current.value,
          value.no,
          value.paragraph
        );
      })
      .then((result) => {
        console.log(`create slide result `, result);
        if (result) {
          deleteKey(ipcRenderer)(firstKey);
          return;
        }
        initStatus();
      });
  };

  const openKeynote = (ipcRenderer) => {
    ipcRenderer.invoke("openKeynote").then((result) => {
      if (result) {
        setStatus({ isExporting: true, isKeynoteOpend: true });
        return;
      }
      initStatus();
    });
  };

  const finish = (ipcRenderer) => {
    ipcRenderer.invoke("deleteFirstSlide").then(initStatus);
  };

  const deleteKey = (ipcRenderer) => (rowKey) => {
    ipcRenderer
      .invoke("deleteStoreValue", rowKey)
      .then((result) => setKeys((list) => list.filter((k) => k !== rowKey)));
  };

  useEffect(() => {
    if (!status.isExporting) {
      return;
    }

    const ipcRenderer = window.require("electron").ipcRenderer;

    if (!status.isKeynoteOpend) {
      openKeynote(ipcRenderer);
      return;
    }

    if (keys.length === 0) {
      finish(ipcRenderer);
      return;
    }

    createSlide(ipcRenderer);
  }, [status, keys]);

  return (
    <div className="App">
      <Header
        isExporting={status.isExporting}
        ref={slideTitleRef}
        start={() => {
          setStatus({ isExporting: true, isKeynoteOpend: false });
        }}
      />
      <div className="body">
        <Table
          isExporting={status.isExporting}
          keys={keys}
          addKey={() => {
            setKeys((list) => [...list, nanoid()]);
          }}
          deleteKey={(rowKey) => {
            const ipcRenderer = window.require("electron").ipcRenderer;
            deleteKey(ipcRenderer)(rowKey);
          }}
        />
      </div>
    </div>
  );
};

export default App;
