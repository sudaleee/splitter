import "bootstrap/dist/css/bootstrap.css";
import { useRef, useState } from "react";
import "./App.css";
import Header from "./header/Header";
import Table from "./table/Table";

const App = () => {
  const tableRef = useRef();

  return (
    <div className="App">
      <Header />
      <div className="body">
        {/* //tODO : row 삭제 메서드 내려야함 */}
        <Table ref={tableRef} />
      </div>
    </div>
  );
};

export default App;
