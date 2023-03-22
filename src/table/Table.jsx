const Table = () => {
  return (
    <table className="table table-bordered">
      <thead>
        <th>number</th>
        <th className="container-fluid">paragraph</th>
        <th className="w-100"></th>
      </thead>
      <tbody>
        <td>1</td>
        <td>"heelo world"</td>
        <td>
          <button> 삭제 </button>
        </td>
      </tbody>
    </table>
  );
};

export default Table;
