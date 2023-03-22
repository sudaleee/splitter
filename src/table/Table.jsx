import TableRow from "./TableRow";

const Table = () => {
  return (
    <table className="table table-borderless" style={{ background: `#FFFFFF` }}>
      <thead>
        <tr>
          <th style={{ width: `100px` }}>number</th>
          <th className="w-auto">paragraph</th>
          <th style={{ width: `100px` }}></th>
        </tr>
      </thead>
      <tbody>
        <TableRow />
      </tbody>
    </table>
  );
};

export default Table;
