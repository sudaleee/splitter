import { nanoid } from "nanoid";
import { useState } from "react";
import TableRow from "./TableRow";

const Table = () => {
  const [contents, setContents] = useState([
    {
      no: null,
      paragraph: null,
    },
  ]);

  return (
    <>
      <table
        className="table table-borderless mb-0"
        style={{ background: `#FFFFFF` }}
      >
        <thead className="border-bottom">
          <tr>
            <th style={{ width: `100px` }}>No.</th>
            <th className="w-auto">paragraph</th>
            <th style={{ width: `100px` }}></th>
          </tr>
        </thead>
        <tbody>
          {contents.map((content, idx) => (
            <TableRow
              idx={idx}
              key={nanoid()}
              deleteRow={(index) => {
                setContents([
                  ...contents.slice(0, index),
                  ...contents.slice(index + 1),
                ]);
              }}
            />
          ))}
        </tbody>
      </table>
      <div
        className="d-flex justify-content-center pv-5"
        style={{ background: `#ffffff` }}
      >
        <button
          className="btn btn-primary"
          style={{
            width: `40px`,
            height: `40px`,
            borderRadius: `50%`,
          }}
          onClick={() => {
            setContents([...contents, {}]);
          }}
        >
          <span className="align-self-start pv-0" style={{ fontSize: 20 }}>
            +
          </span>
        </button>
      </div>
    </>
  );
};

export default Table;
