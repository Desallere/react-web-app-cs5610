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
import { deleteQuiz, setQuizzes } from "./reducer";
import * as coursesClient from "../client";
import QuizzesControl from "./QuizzesControl";
import * as quizzesClient from "./client";
import { BiRocket } from "react-icons/bi";

interface QuizDetails {
  totalPoints: number;
  questionCount: number;
}

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    index: number | null;
  }>({ top: 0, left: 0, index: null });
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [quizDetails, setQuizDetails] = useState<{
    [quizId: string]: { totalPoints: number; questionCount: number };
  }>({});

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const togglePublishedStatus = async (quizId: string) => {
    const updatedQuizzes = quizzes.map((quiz: any) => {
      try {
        if (quiz._id === quizId) {
          return { ...quiz, is_published: !quiz.is_published };
        }
      } catch {}
      return quiz;
    });

    await quizzesClient.updateQuizState(quizId);
    dispatch(setQuizzes(updatedQuizzes));
    setDropdownPosition({ ...dropdownPosition, index: null });
  };

  const handleDelete = async (quizId: string) => {
    try {
      setDropdownPosition({ ...dropdownPosition, index: null });
      await quizzesClient.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
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
        dropdownRefs.current.forEach((ref) => {
          if (ref && !ref.contains(event.target as Node)) {
            setDropdownPosition({ ...dropdownPosition, index: null });
          }
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownPosition]);

  const handleDropdownToggle = (event: React.MouseEvent, index: number) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    let left = rect.left;

    // Check if the dropdown goes out of the right edge
    const dropdownWidth = 150; // Estimated dropdown width
    if (left + dropdownWidth > window.innerWidth) {
      left = window.innerWidth - dropdownWidth - 10; // Adjust to fit within the viewport, leaving a margin
    }

    setDropdownPosition({
      top: rect.bottom,
      left: left,
      index: dropdownPosition.index === index ? null : index,
    });
  };
  const fetchQuestionsForQuizzes = async (quizzes: any) => {
    const details: { [quizId: string]: QuizDetails } = {};
    await Promise.all(
      quizzes.map(async (quiz: any) => {
        try {
          const questions = await quizzesClient.findQuestion(quiz._id);
          const totalPoints = questions.reduce(
            (acc: any, question: any) => acc +  Number(question.points),
            0
          );
          details[quiz._id] = {
            totalPoints,
            questionCount: questions.length,
          };
        } catch (error) {
          console.error(
            `Failed to fetch questions for quiz ${quiz._id}:`,
            error
          );
          details[quiz._id] = { totalPoints: 0, questionCount: 0 };
        }
      })
    );
    setQuizDetails(details);
  };
  useEffect(() => {
    const loadQuizzesAndDetails = async () => {
      await fetchQuizzes();
      fetchQuestionsForQuizzes(quizzes);
    };
    loadQuizzesAndDetails();
  }, [cid, quizzes]);

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
                      <a
                        href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        <BiRocket className="me-1 fs-3" />
                      </a>
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
                      <span>{getQuizStatus(quiz)}</span>| Due {quiz.dueDate} |{" "}
                      {quizDetails[quiz._id]?.totalPoints || 0} pts |{" "}
                      {quizDetails[quiz._id]?.questionCount || 0} questions
                    </th>

                    <th style={{ textAlign: "right", position: "relative" }}>
                      <div className="d-flex float-end position-relative">
                        <div style={{ opacity: quiz.is_published ? 1 : 0.5 }}>
                          <GreenCheckmark />
                        </div>
                        <button
                          className="btn btn-link ms-4 me-2 p-0"
                          onClick={(event) =>
                            handleDropdownToggle(event, index)
                          }
                        >
                          <BsThreeDotsVertical className="fs-3" />
                        </button>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </li>
      </ul>

      {dropdownPosition.index !== null && (
        <div
          ref={(el) => (dropdownRefs.current[dropdownPosition.index!] = el)}
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            zIndex: 1000,
          }}
        >
          <button
            className="dropdown-item"
            onClick={() =>
              (window.location.href = `#/Kanbas/Courses/${
                quizzes[dropdownPosition.index!].course
              }/Quizzes/${quizzes[dropdownPosition.index!]._id}`)
            }
          >
            Edit
          </button>
          <button
            className="dropdown-item"
            onClick={() => handleDelete(quizzes[dropdownPosition.index!]._id)}
          >
            Delete
          </button>
          <button
            className="dropdown-item"
            onClick={() =>
              togglePublishedStatus(quizzes[dropdownPosition.index!]._id)
            }
          >
            {quizzes[dropdownPosition.index!].is_published
              ? "Unpublish"
              : "Publish"}
          </button>
        </div>
      )}
    </div>
  );
}
