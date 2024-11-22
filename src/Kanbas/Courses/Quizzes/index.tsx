import { useState, useEffect, useRef } from "react";
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
import QuizzesControl from "./QuizzesControl";
import * as quizzesClient from "./client";
import { BiRocket } from "react-icons/bi";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const togglePublishedStatus = async (quizId: string) => {
    const updatedQuizzes = quizzes.map((quiz: any) => {
      if (quiz._id === quizId) {
        // Toggle the published status
        return { ...quiz, is_published: !quiz.is_published };
      }
      setOpenDropdownIndex(null);
      return quiz;
    });

    await quizzesClient.updateQuizState(quizId);
    // Update the quizzes state in the Redux store
    dispatch(setQuizzes(updatedQuizzes));
  };

  const getQuizStatus = (quiz: any) => {
    const now = new Date();
    const untilDate = new Date(quiz.untilDate);
    const dueDate = new Date(quiz.dueDate);

    if (now > dueDate) {
      return "Closed";
    } else if (now < untilDate) {
      return `Not available until ${quiz.untilDate}`;
    } else {
      return "Available";
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRefs.current) {
        dropdownRefs.current.forEach((ref, i) => {
          if (ref && !ref.contains(event.target as Node)) {
            setOpenDropdownIndex(null);
          }
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const adjustDropdownPosition = (index: number) => {
      const dropdown = dropdownRefs.current[index];
      if (dropdown) {
        const rect = dropdown.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Adjust horizontal position if it overflows
        if (rect.right > viewportWidth) {
          dropdown.style.left = `-${rect.right - viewportWidth}px`;
        } else {
          dropdown.style.left = "initial"; // Reset if not overflowing
        }

        // Adjust vertical position if it overflows
        if (rect.bottom > viewportHeight) {
          dropdown.style.top = `-${rect.bottom - viewportHeight}px`;
        } else {
          dropdown.style.top = "initial"; // Reset if not overflowing
        }
      }
    };

    if (openDropdownIndex !== null) {
      adjustDropdownPosition(openDropdownIndex);
    }
  }, [openDropdownIndex]);

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
                      <BiRocket className="me-1 fs-3" />
                    </th>
                    <th>
                      <h4>
                        <a
                          style={{ color: "black", textDecoration: "none" }}
                          href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                        >
                          <strong>{quiz.title}</strong>
                        </a>
                      </h4>
                      <span> {getQuizStatus(quiz)}</span> | Due {quiz.dueDate} |{" "}
                      {quiz.points} pts | 11 questions
                    </th>

                    <th style={{ textAlign: "right", position: "relative" }}>
                      <div className="d-flex float-end position-relative">
                        <div style={{ opacity: quiz.is_published ? 1 : 0.5 }}>
                          <GreenCheckmark />
                        </div>
                        <button
                          className="btn btn-link ms-4 me-2 p-0"
                          onClick={() =>
                            setOpenDropdownIndex(
                              index === openDropdownIndex ? null : index
                            )
                          }
                        >
                          <BsThreeDotsVertical className="fs-3" />
                        </button>
                      </div>
                      {openDropdownIndex === index && (
                        <div
                          ref={(el) => (dropdownRefs.current[index] = el)}
                          className="dropdown-menu show"
                          style={{
                            position: "absolute", // Ensure it's positioned relative to the parent
                            right: 0, // Align to the right side of the button
                            top: "100%", // Align right below the button
                            zIndex: 1000,
                          }}
                        >
                          <button
                            className="dropdown-item"
                            onClick={() => console.log("Edit clicked")}
                          >
                            Edit
                          </button>
                          <button
                            className="dropdown-item"
                            onClick={() => console.log("Delete clicked")}
                          >
                            Delete
                          </button>
                          <button
                            className="dropdown-item"
                            onClick={() => togglePublishedStatus(quiz._id)}
                          >
                            {quiz.is_published ? "Unpublish" : "Publish"}
                          </button>
                        </div>
                      )}
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
