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
    console.log(`init`);
    setStatus({ isExporting: false, isKeynoteOpend: false });
  };

  const createSlide = (ipcRenderer) => {
    //data 가져옴 => slide 생성 => key 삭제
    const firstKey = keys.at(0);
    console.log(keys);

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

  const deleteKey = (ipcRenderer) => (rowKey) => {
    ipcRenderer
      .invoke("deleteStoreValue", rowKey)
      .then((result) => setKeys((list) => list.filter((k) => k !== rowKey)));
  };

  useEffect(() => {
    if (!status.isExporting) {
      return;
    }

    console.log("exporting");

    const ipcRenderer = window.require("electron").ipcRenderer;

    if (!status.isKeynoteOpend) {
      console.log("open keynote");
      openKeynote(ipcRenderer);
      return;
    }

    if (keys.length === 0) {
      console.log("finished");
      ipcRenderer
        .invoke("deleteFirstSlide", slideTitleRef.current.value)
        .then(initStatus);
      return;
    }

    console.log("create slide");
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
