import { FaSearch } from "react-icons/fa";
import Assignmentontrol from "./AssignmentControl";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import ModulesControlButtons from "../Modules/ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import AssignmentTitle from "./AssignmentTitle";
import AssignmentControlButton from "./AssignmentControlButton";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { MdOutlineAssignment } from "react-icons/md";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  return (
    <div id="wd-assignments">
      <Assignmentontrol />
      <ul id="wd-assignments" className="list-group rounded-0 ">
        <li className="wd-module list-group-item p-0 mb-5 ms-3 fs-5 assignment-table">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <TbTriangleInvertedFilled className="me-2 fs-3" size={10} />
            <strong>ASSIGNMENTS</strong>
            <AssignmentTitle />{" "}
          </div>

          <div className="table-responsive">
            <table className="table wd-lesson ">
              <tbody style={{ verticalAlign: "middle" }}>
                {assignments
                  .filter((assignment: any) => assignment.course === cid)
                  .map((assignment: any) => (
                    <tr>
                      <th style={{ padding: "0", margin: "0", width: "50px" }}>
                        {" "}
                        <BsGripVertical className="me-1 fs-3" />
                      </th>
                      <th style={{ padding: "0", margin: "0", width: "50px" }}>
                        {" "}
                        <MdOutlineAssignment className="me-1 fs-3" />
                      </th>
                      <th>
                        <h4>
                          <a
                            className=""
                            style={{ color: "black", textDecoration: "none" }}
                            href={`#/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`}
                          >
                            <strong>{assignment.title}</strong>
                          </a>
                        </h4>

                        <span style={{ color: "red" }}> {assignment.module} </span>
                        <span>
                          {" "}
                          | <strong>Not available until </strong> {assignment.startdate} | <br /> <strong>Due </strong> {assignment.duedate} |
                          {assignment.points} pts
                        </span>
                      </th>

                      <th style={{ textAlign: "right" }}>
                        {" "}
                        <div className="d-flex float-end">
                          <GreenCheckmark />
                          <BsThreeDotsVertical className="ms-4 me-2 fs-3" />
                        </div>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </li>
      </ul>{" "}
    </div>
  );
}
