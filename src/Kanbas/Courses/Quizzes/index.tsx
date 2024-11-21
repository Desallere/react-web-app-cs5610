import { FaSearch, FaTrash } from "react-icons/fa";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import ModulesControlButtons from "../Modules/ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { MdOutlineAssignment } from "react-icons/md";
import { useParams } from "react-router";
import * as db from "../../Database";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes } from "./reducer";
import * as coursesClient from "../client";
import { useEffect } from "react";
import QuizzesControl from "./QuizzesControl";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const getQuizStatus = (quiz: any) => {
    const now = new Date();
    const untilDate = new Date(quiz.untilDate);
    const dueDate = new Date(quiz.dueDate);

    if (now > dueDate) {
      return 'Closed';
    } else if (now < untilDate) {
      return `Not available until ${quiz.untilDate}`;
    } else {
      return 'Available';
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  return (
    <div id="wd-quizzes">
      <QuizzesControl />

      <ul id="wd-quizzes" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 ms-3 fs-5 assignment-table">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <TbTriangleInvertedFilled className="me-2 fs-3" size={10} />
            <strong>QUIZZES</strong>
          </div>

          <div className="table-responsive">
            <table className="table wd-lesson">
              <tbody style={{ verticalAlign: "middle" }}>
                {quizzes.map((quiz: any, index: number) => (
                  <tr key={index}>
                    <th style={{ padding: "0", margin: "0", width: "50px" }}>
                      <BsGripVertical className="me-1 fs-3" />
                    </th>
                    <th style={{ padding: "0", margin: "0", width: "50px" }}>
                      <MdOutlineAssignment className="me-1 fs-3" />
                    </th>
                    <th>
                      <h4>
                        {currentUser.role === "FACULTY" ? (
                          <a
                            style={{ color: "black", textDecoration: "none" }}
                            href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                          >
                            <strong>{quiz.title}</strong>
                          </a>
                        ) : (
                          <strong>{quiz.title}</strong>
                        )}
                      </h4>
                      <span> {getQuizStatus(quiz)}</span> |
                        Due {quiz.dueDate} | {quiz.points} pts | 11 questions
                    </th>

                    <th style={{ textAlign: "right" }}>
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
      </ul>
    </div>
  );
}