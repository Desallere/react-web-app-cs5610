import { FaPlus } from "react-icons/fa";
import { IoCalendarSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <div id="wd-css-responsive-forms-1">
        <div className="mb-3 row">
          <label htmlFor="wd-name" className="col-sm-12 col-form-label">
            Assignment Name{" "}
          </label>
          <div className="col-sm-12">
            <input
              type="text"
              className="form-control"
              id="wd-name"
              value="A1"
            />
          </div>{" "}
        </div>
        <div className="mb-3 row">
          <div className="col-sm-12">
            <div id="wd-description" className="form-control">
              <p>
                {" "}
                The assignment is{" "}
                <span style={{ color: "red" }}>available online </span>{" "}
              </p>
              <p>
                Submit a link to the landing page of your Web application
                running on Netlify
              </p>
              <p>The landing page should include the following:</p>
              <ul>
                <li>Your full name and section</li>
                <li>Link to each of the lab assignments</li>
                <li>Link to the Kanbas application</li>
                <li>Links to all relevant source code repositories</li>
              </ul>
              <p>
                The Kanbas application should include a link to navigate back to
                the landing page
              </p>
            </div>
          </div>{" "}
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="wd-points"
            className="col-sm-4 col-form-label text-end"
          >
            Points{" "}
          </label>
          <div className="col-sm-8">
            <input className="form-control" id="wd-points" value="100"></input>
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="wd-group"
            className="col-sm-4 col-form-label text-end"
          >
            Assignment Group{" "}
          </label>
          <div className="col-sm-8">
            <select id="wd-group" className="form-control form-select">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option selected value="ASSIGNMENTS">
                ASSIGNMENTS
              </option>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="wd-display-grade-as"
            className="col-sm-4 col-form-label text-end"
          >
            Display Grade as{" "}
          </label>
          <div className="col-sm-8">
            <select
              id="wd-display-grade-as"
              className="form-control form-select"
            >
              <option selected value="Percentage">
                Percentage
              </option>
              <option value="Points">Points</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="wd-submission-type"
            className="col-sm-4 col-form-label text-end"
          >
            Submission Type{" "}
          </label>
          <div className="col-sm-8">
            <div className="form-control">
              <select
                id="wd-submission-type"
                className="form-control mb-4 form-select"
              >
                <option selected value="Online">
                  Online
                </option>
                <option value="inperson">In person</option>
              </select>
              <p className="mb-3">
                <strong>Online Entry Options</strong>
              </p>
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  name="check-genre"
                  id="wd-text-entry"
                  className="form-check-input"
                />
                <label htmlFor="wd-text-entry">Text Entry</label>
              </div>
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  name="check-genre"
                  id="wd-website-url"
                  className="form-check-input"
                  checked
                />
                <label htmlFor="wd-website-url">Website URL</label>
              </div>
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  name="check-genre"
                  id="wd-media-recordings"
                  className="form-check-input"
                />
                <label htmlFor="wd-media-recordings">Media Recordings</label>
              </div>
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  name="check-genre"
                  id="wd-student-annotation"
                  className="form-check-input"
                />
                <label htmlFor="wd-student-annotation">
                  Student Annotation
                </label>
              </div>
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  name="check-genre"
                  id="wd-file-upload"
                  className="form-check-input"
                />
                <label htmlFor="wd-file-upload">File Uploads</label>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5 row">
          <label
            htmlFor="wd-assign"
            className="col-sm-4 col-form-label text-end"
          >
            Assign{" "}
          </label>
          <div className="col-sm-8">
            <div className="form-control">
              <p className="col-sm-12 mb-1">
                {" "}
                <strong>Assign to</strong>
              </p>
              <div className="col-sm-12 form-control mb-4">
                <button
                  id="wd-assign-to"
                  className="btn btn-light btn-sm px-4 d-flex justify-content-between align-items-center"
                  style={{ width: "33%" }}
                >
                  <span className="">Everyone </span>
                  <RxCross1 className="" />
                </button>
              </div>
              <p className="col-sm-12 mb-1">
                {" "}
                <strong>
                  {" "}
                  <label htmlFor="wd-due-date">Due</label>
                </strong>
              </p>
              <div className="col-sm-12 d-flex mb-4">
                <input
                  id="wd-due-date"
                  value="May 13, 2024, 11:59 PM"
                  className="form-control rounded-0 flex-grow-1"
                />
                <button className="btn btn-light rounded-0">
                  <IoCalendarSharp />
                </button>
              </div>
              <div className="row mb-4">
                <div className="col-6">
                  <p className="col-sm-12 mb-1">
                    {" "}
                    <strong>
                      {" "}
                      <label htmlFor="wd-available-from">Available from</label>
                    </strong>
                  </p>
                  <div className="col-sm-12 d-flex">
                    <input
                      id="wd-available-from"
                      value="May 6, 2024, 11:59 PM"
                      className="form-control rounded-0 flex-grow-1"
                    />
                    <button className="btn btn-light rounded-0">
                      <IoCalendarSharp />
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <p className="col-sm-12 mb-1">
                    {" "}
                    <strong>
                      {" "}
                      <label htmlFor="wd-available-until">Until</label>
                    </strong>
                  </p>
                  <div className="col-sm-12 d-flex">
                    <input
                      id="wd-available-until"
                      value=""
                      className="form-control rounded-0 flex-grow-1"
                    />
                    <button className="btn btn-light rounded-0">
                      <IoCalendarSharp />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="text-end">
          <button className="btn btn-light ">Cancel</button>
          <button className="btn btn-danger ms-1">Save</button>
        </div>
      </div>
    </div>
  );
}
