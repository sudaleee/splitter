const TableRow = () => {
  return (
    <tr>
      <td>
        <input style={{ width: `80px` }}></input>
      </td>
      <td>
        <textarea className="w-100"></textarea>
      </td>
      <td className="d-flex justify-content-center">
        <button
          className="btn btn-danger btn-sm"
          style={{
            background: `#dc3545`,
            margin: `5px`,
          }}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
