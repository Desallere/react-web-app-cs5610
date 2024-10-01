import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
export default function Assignmentontrol() {
  return (
    <>
 
    <div className="d-flex align-items-center justify-content-between mb-3">
      <div className="search-container">
        <div className="search-box d-flex align-items-center">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            style={{ width: '300px' }}
          />
        </div>
      </div>

      <div
        id="wd-assignment-controls"
        className="text-nowrap flex-nowrap d-flex justify-content-end"
      >
        <button
          id="wd-add-group-btn"
          className="btn btn-lg btn-secondary me-1"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Group
        </button>
        <button
          id="wd-add-assignment-btn"
          className="btn btn-lg btn-danger me-1"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </button>
      </div>
    </div>
  </>
  );
}
