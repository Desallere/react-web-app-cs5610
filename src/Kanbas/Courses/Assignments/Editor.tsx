import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { updateAssignment } from "./reducer";
import { IoCalendarSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const dispatch = useDispatch();
  const assignments = useSelector(
    (state: any) => state.assignmentReducer.assignments
  );
  const assignment = assignments.find(
    (assignment: any) => assignment._id === aid
  );

  // Local state to handle temporary assignment changes
  const [localAssignment, setLocalAssignment] = useState(assignment);

  const handleSave = () => {
    dispatch(updateAssignment(localAssignment));
    window.location.href = `#/Kanbas/Courses/${localAssignment?.course}/Assignments`;
  };

  const handleCancel = () => {
    window.location.href = `#/Kanbas/Courses/${localAssignment?.course}/Assignments`;
  };

  return (
    <div id="wd-assignments-editor">
      <div id="wd-css-responsive-forms-1">
        <div className="mb-3 row">
          <label htmlFor="wd-name" className="col-sm-12 col-form-label">
            Assignment Name
          </label>
          <div className="col-sm-12">
            <input
              type="text"
              className="form-control"
              id="wd-name"
              value={localAssignment?.title || ""}
              onChange={(e) =>
                setLocalAssignment({
                  ...localAssignment,
                  title: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="wd-description" className="col-sm-12 col-form-label">
            Assignment Description
          </label>
          <div className="col-sm-12">
            <textarea
              id="wd-description"
              className="form-control"
              value={localAssignment?.description || ""}
              onChange={(e) =>
                setLocalAssignment({
                  ...localAssignment,
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="wd-points"
            className="col-sm-4 col-form-label text-end"
          >
            Points{" "}
          </label>
          <div className="col-sm-8">
            <input
              type="number"
              className="form-control"
              id="wd-points"
              value={localAssignment?.points || ""}
              onChange={(e) =>
                setLocalAssignment({
                  ...localAssignment,
                  points: e.target.value,
                })
              }
            />
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
                  type="date"
                  className="form-control"
                  id="wd-due-date"
                  defaultValue={assignment.duedate}
                  value={localAssignment?.duedate || ""}
                  onChange={(e) =>
                    setLocalAssignment({
                      ...localAssignment,
                      duedate: e.target.value,
                    })
                  }
                />
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
                      type="date"
                      className="form-control"
                      id="wd-available-until"
                      defaultValue={assignment.startdate}
                      value={localAssignment?.until || ""}
                      onChange={(e) =>
                        setLocalAssignment({
                          ...localAssignment,
                          until: e.target.value,
                        })
                      }
                    />
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
                      type="date"
                      className="form-control"
                      id="wd-available-until"
                      value={localAssignment?.until || ""}
                      onChange={(e) =>
                        setLocalAssignment({
                          ...localAssignment,
                          until: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="text-end">
          <button className="btn btn-light" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-danger ms-1" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
