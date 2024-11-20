import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { updateAssignment, addAssignment } from "./reducer";
import { IoCalendarSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import * as assignmentsClient from "./client";
import * as coursesClient from "../client";
import { deleteAssignment, setAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { aid, cid } = useParams(); // cid for course ID
  const dispatch = useDispatch();
  const assignments = useSelector(
    (state: any) => state.assignmentReducer.assignments
  );

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(
      cid as string
    );
    dispatch(setAssignment(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  const assignment = assignments.find(
    (assignment: any) => assignment._id === aid
  );

  // Initialize local assignment; if creating a new assignment, include cid as course ID
  const [localAssignment, setLocalAssignment] = useState(
    assignment || {
      _id: aid,
      title: "New Assignment",
      description: "New Assignment Desciption",
      points: 0,
      startdate: null,
      duedate: null,
      course: cid, // set course to current cid when creating a new assignment
      module: "Multiple Modules",
    }
  );

  useEffect(() => {
    // Update course ID if a new assignment is being created
    if (!assignment) {
      setLocalAssignment((prev: any) => ({ ...prev, course: cid }));
    }
  }, [cid, assignment]);

  const handleSave = async () => {
    if (assignment) {
      // Update existing assignment

      await assignmentsClient.updateAssignment(localAssignment);
      dispatch(updateAssignment(localAssignment));
      
    } else {
      // Add new assignment with cid as the course ID
      console.log("new");
      const assignment = await assignmentsClient.createAssignment(
        localAssignment
      );
      dispatch(addAssignment(assignment));
    }

    console.log("Current localAssignment:", localAssignment);
    window.location.href = `#/Kanbas/Courses/${localAssignment.course}/Assignments`;
  };

  const handleCancel = () => {
    window.location.href = `#/Kanbas/Courses/${localAssignment.course}/Assignments`;
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
                  defaultValue={assignment?.duedate}
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
                      defaultValue={assignment?.startdate}
                      value={localAssignment?.startdate || ""}
                      onChange={(e) =>
                        setLocalAssignment({
                          ...localAssignment,
                          startdate: e.target.value,
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
                      defaultValue={assignment?.until}
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
