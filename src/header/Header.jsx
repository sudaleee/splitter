import { forwardRef, useState } from "react";

const Header = ({ isExporting, start }, ref) => {
  const [title, setTitle] = useState("");

  const btnClassName = [`btn btn-primary`, isExporting ? "disabled" : ""];

  return (
    <div className="header">
      <div className="border-bottom header-top">
        <b style={{ fontSize: 30 }}>Paragraph Cutter</b>
      </div>
      <div className="header-bottom">
        <input
          placeholder="slide title"
          className={`align-middle`}
          style={{ height: `35px`, marginRight: `10px` }}
          disabled={isExporting}
          onChange={(e) => setTitle(e.target.value)}
          ref={ref}
          value={title}
        />
        <button className={btnClassName.join(" ")} onClick={start}>
          export keynote
        </button>
      </div>
    </div>
  );
};

export default forwardRef(Header);
