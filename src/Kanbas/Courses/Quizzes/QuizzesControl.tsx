import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function QuizzesControl() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
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
              style={{ width: "300px" }}
            />
          </div>
        </div>

        <div
          id="wd-assignment-controls"
          className="text-nowrap flex-nowrap d-flex justify-content-end"
        >
         

          {currentUser.role == "FACULTY" && (
          <button
            id="wd-add-assignment-btn"
            className="btn btn-lg btn-danger me-1"
            onClick={() => {
              const currentHash = window.location.hash; 
              const newId = Date.now().toString(); 
              window.location.href = `${currentHash}/${newId}`;
            }}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quizzes
          </button>)}

        </div>
      </div>
    </>
  );
}
