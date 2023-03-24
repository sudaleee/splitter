import { useEffect, useState } from "react";

const TableRow = ({ deleteRow, rowKey, isExporting }) => {
  const [no, setNo] = useState("");
  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    const ipcRenderer = window.require("electron").ipcRenderer;
    ipcRenderer.invoke("saveStoreValue", rowKey, { no, paragraph });
  }, [no, paragraph, rowKey]);

  const btnClassName = [`btn btn-danger btn-sm`, isExporting ? "disabled" : ""];

  return (
    <tr className="border-bottom">
      <td>
        <input
          style={{ width: `80px` }}
          value={no}
          onChange={(e) => setNo(e.target.value)}
          disabled={isExporting}
        />
      </td>
      <td>
        <textarea
          className="w-100"
          onChange={(e) => setParagraph(e.target.value)}
          value={paragraph}
          disabled={isExporting}
        />
      </td>
      <td className="d-flex justify-content-center">
        <button
          className={btnClassName.join(" ")}
          style={{
            background: `#dc3545`,
            margin: `0px 5px 0px`,
          }}
          onClick={() => deleteRow(rowKey)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
