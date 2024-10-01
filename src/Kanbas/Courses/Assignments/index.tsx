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

export default function Assignments() {
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
                        href="#/Kanbas/Courses/1234/Assignments/123"
                      >
                        <strong>A1</strong>
                      </a>
                    </h4>

                    <span style={{ color: "red" }}> Multiple Modules </span>
                    <span>
                      {" "}
                      | <strong>Not available until </strong> May 6 at 12:00 am
                      | <br /> <strong>Due </strong>May 12 at 11:59pm | 100 pts
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

                <tr>
                  <th style={{ padding: "0", margin: "0" }}>
                    {" "}
                    <BsGripVertical className="me-1 fs-3" />
                  </th>
                  <th style={{ padding: "0", margin: "0" }}>
                    {" "}
                    <MdOutlineAssignment className="me-1 fs-3" />
                  </th>
                  <th>
                    <h4>
                      <a
                        className=""
                        style={{ color: "black", textDecoration: "none" }}
                        href="#/Kanbas/Courses/1234/Assignments/123"
                      >
                        <strong>A2</strong>
                      </a>
                    </h4>

                    <span style={{ color: "red" }}> Multiple Modules </span>
                    <span>
                      {" "}
                      | <strong>Not available until </strong> May 13 at 12:00 am
                      | <br />
                      <strong>Due </strong>May 20 at 11:59pm | 100 pts
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
                <tr>
                  <th style={{ padding: "0", margin: "0" }}>
                    {" "}
                    <BsGripVertical className="me-1 fs-3" />
                  </th>
                  <th style={{ padding: "0", margin: "0" }}>
                    {" "}
                    <MdOutlineAssignment className="me-1 fs-3" />
                  </th>
                  <th>
                    <h4>
                      <a
                        className=""
                        style={{ color: "black", textDecoration: "none" }}
                        href="#/Kanbas/Courses/1234/Assignments/123"
                      >
                        <strong>A3</strong>
                      </a>
                    </h4>
                    <span style={{ color: "red" }}> Multiple Modules </span>
                    <span>
                      {" "}
                      | <strong>Not available until </strong> May 20 at 12:00 am
                      | <br />
                      <strong>Due </strong>May 27 at 11:59pm | 100 pts
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
              </tbody>
            </table>
          </div>
        </li>
      </ul>{" "}
    </div>
  );
}
