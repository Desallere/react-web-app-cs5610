import { FaPlus } from "react-icons/fa";
import { IoCalendarSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const assignments = db.assignments;
  const assignment = assignments.find((assignment) => assignment._id === aid);

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
              value={assignment?.title}
            />
          </div>{" "}
        </div>
        <div className="mb-3 row">
          <div className="col-sm-12">
            <div id="wd-description" className="form-control">
              <div
                dangerouslySetInnerHTML={{
                  __html: assignment?.description || "",
                }}
              />
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
                  value={assignment?.duedate}
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
                      value={assignment?.startdate}
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
          <button
            className="btn btn-light"
            onClick={() =>
              (window.location.href =
               `#/Kanbas/Courses/${assignment?.course}/Assignments`)
            }
          >
            Cancel
          </button>
          <button
            className="btn btn-danger ms-1"
            onClick={() =>
              (window.location.href =
                `#/Kanbas/Courses/${assignment?.course}/Assignments`)
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
