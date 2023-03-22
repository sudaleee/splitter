import "bootstrap/dist/css/bootstrap.css";
// import { runAppleScript } from "run-applescript";
import "./App.css";
import Extractor from "./extract/Extractor";
import Table from "./table/Table";

function App() {
  // const { spawn } = require("child_process");

  return (
    <div className="App">
      <div className="leftSide">
        <div className="container">
          <b className="withMax" style={{ fontSize: 20 }}>
            Paragraph
          </b>
          <button
            className="btn btn-primary"
            id="btn"
            onClick={async () => {
              // const result = await runAppleScript('return "unicorn"');
              // alert(result);
              // let spawn = require("child_process").spawn;
              // console.log(spawn);
              // var sh = require("execSync");
              // var code = sh.run("echo $USER; echo some_err 1>&2; exit 1");
              // console.log("return code " + code);
              const ipcRenderer = window.require("electron").ipcRenderer;
              const result = await ipcRenderer.invoke("appleScript");

              console.log(result);
            }}
          >
            {" "}
            추가{" "}
          </button>
        </div>
        <div className="scroll mt-5">
          <Table />
        </div>
      </div>
      <div className="rightSide">
        <Extractor />
      </div>
    </div>
  );
}

export default App;
