import TableRow from "./TableRow";

const Table = ({ isExporting, keys, deleteKey, addKey }) => {
  const btnClassName = [`btn btn-primary`, isExporting ? "disabled" : ""];

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
          {keys.map((key) => (
            <TableRow
              rowKey={key}
              key={key}
              isExporting={isExporting}
              deleteRow={deleteKey}
            />
          ))}
        </tbody>
      </table>
      <div
        className="d-flex justify-content-center pv-5"
        style={{ background: `#ffffff` }}
      >
        <button
          className={btnClassName.join(" ")}
          style={{
            width: `40px`,
            height: `40px`,
            borderRadius: `50%`,
          }}
          onClick={addKey}
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
