import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Table from "./table/Table";

function App() {
  // const { spawn } = require("child_process");

  const clickExportBtn = async () => {
    const ipcRenderer = window.require("electron").ipcRenderer;
    const result = await ipcRenderer.invoke("appleScript");

    console.log(result);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="border-bottom header-top">
          <b style={{ fontSize: 30 }}>Paragraph Cutter</b>
        </div>
        <div className="header-bottom">
          <input
            placeholder="slide title"
            className="align-middle"
            style={{ height: `35px`, marginRight: `10px` }}
          />
          <button className="btn btn-primary" onClick={clickExportBtn}>
            export keynote
          </button>
        </div>
      </div>
      <div className="body">
        <Table />
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            style={{
              width: `40px`,
              height: `40px`,
              borderRadius: `50%`,
              paddingBottom: `15px`,
            }}
          >
            <b style={{ fontSize: 20 }}>+</b>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
