import { useState } from "react";

const TableRow = ({ idx, deleteRow }) => {
  const [no, setNo] = useState("");
  const [paragraph, setParagraph] = useState("");

  return (
    <tr className="border-bottom">
      <td>
        <input
          style={{ width: `80px` }}
          value={no}
          onChange={(e) => setNo(e.target.value)}
        />
      </td>
      <td>
        <textarea
          className="w-100"
          onChange={(e) => setParagraph(e.target.value)}
          value={paragraph}
        />
      </td>
      <td className="d-flex justify-content-center">
        <button
          className="btn btn-danger btn-sm"
          style={{
            background: `#dc3545`,
            margin: `0px 5px 0px`,
          }}
          onClick={() => deleteRow(idx)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
