import "./App.css";
import Extractor from "./extract/Extractor";
import Table from "./table/Table";

function App() {
  return (
    <div className="App">
      <div className="leftSide">
        <b style={{ fontSize: 20 }}>Paragraph</b>
        <Table />
      </div>
      <div className="rightSide">
        <Extractor />
      </div>
    </div>
  );
}

export default App;
