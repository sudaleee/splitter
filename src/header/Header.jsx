const Header = () => {
  const clickExportBtn = async () => {
    const ipcRenderer = window.require("electron").ipcRenderer;
    const result = await ipcRenderer.invoke("appleScript");

    console.log(result);
  };
  return (
    <div className="header">
      <div className="border-bottom header-top">
        <b style={{ fontSize: 30 }}>Paragraph Cutter</b>
      </div>
      <div className="header-bottom">
        <input
          placeholder="slide title"
          className="align-middle"
          style={{ height: `35px`, marginRight: `10px` }}
        />
        <button className="btn btn-primary" onClick={clickExportBtn}>
          export keynote
        </button>
      </div>
    </div>
  );
};

export default Header;
