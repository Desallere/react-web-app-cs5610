import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes } from "./reducer";
import * as coursesClient from "../client";

export default function QuizzesDetail() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const { qid, cid } = useParams();
  const dispatch = useDispatch();

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  return (
    <div className="container">
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn ${
            currentUser.role === "STUDENT" ? "btn-danger" : "btn-primary"
          }`}
          onClick={() => {
            const currentHash = window.location.hash;
            window.location.href = `${currentHash}/take`;
          }}
        >
          {currentUser.role === "STUDENT" ? "Take Quiz" : "Preview"}
        </button>
        {currentUser.role !== "STUDENT" && (
          <button
            className="btn btn-secondary ms-2"
            onClick={() => {
              const currentHash = window.location.hash;
              window.location.href = `${currentHash}/edit`;
            }}
          >
            Edit
          </button>
        )}
      </div>
      <hr />
      <h1>{quiz.title}</h1>
      <ul className="">
     
        <ul className="">
          <li className="list-group-item d-flex">
            <div className="col-4 font-weight-bold text-end">
              <strong>Quiz Type</strong>
            </div>
            <div className="col-8 ms-3">{quiz.quizType}</div>
          </li>
          <li className="list-group-item d-flex">
            <div className="col-4 font-weight-bold text-end">
              <strong>Points</strong>
            </div>
            <div className="col-8 ms-3">{quiz.points}</div>
          </li>
          <li className="list-group-item d-flex">
            <div className="col-4 font-weight-bold text-end">
              <strong>Assignment Group</strong>
            </div>
            <div className="col-8 ms-3">{quiz.assignmentGroup}</div>
          </li>
          <li className="list-group-item d-flex">
            <div className="col-4 font-weight-bold text-end">
              <strong>Shuffle Answers</strong>
            </div>
            <div className="col-8 ms-3">
              {quiz.shuffleAnswers ? "Yes" : "No"}
            </div>
          </li>
          <li className="list-group-item d-flex">
            <div className="col-4 font-weight-bold text-end">
              <strong>Time Limit</strong>
            </div>
            <div className="col-8 ms-3">{quiz.timeLimit} minutes</div>
          </li>
          <li className="list-group-item d-flex">
            <div className="col-4 font-weight-bold text-end">
              <strong>Multiple Attempts</strong>
            </div>
            <div className="col-8 ms-3">
              {quiz.multipleAttempts ? "Yes" : "No"}{" "}
            </div>
          </li>
          <li className="list-group-item d-flex">
            <div className="col-4 font-weight-bold text-end">
              <strong>How Many Attempts</strong>
            </div>
            <div className="col-8 ms-3">{quiz.howManyAttempts} </div>
          </li>
          <li className="list-group-item d-flex">
            <div className="col-4 font-weight-bold text-end">
              <strong>Show Correct Answers</strong>
            </div>
            <div className="col-8 ms-3">
              {quiz.showCorrectAnswers ? "Yes" : "No"}{" "}
            </div>
          </li>
          <li className="list-group-item d-flex">
            <div className="col-4 font-weight-bold text-end">
              <strong>Access Code</strong>
            </div>
            <div className="col-8 ms-3">{quiz.accessCode}</div>
          </li>
          <li className="list-group-item d-flex">
            <div className="col-4 font-weight-bold text-end">
              <strong>One Question at a Time</strong>
            </div>
            <div className="col-8 ms-3">
              {quiz.oneQuestionAtATime ? "Yes" : "No"}
            </div>
          </li>
          <li className="list-group-item d-flex">
            <div className="col-4 font-weight-bold text-end">
              <strong>Webcam Required</strong>
            </div>
            <div className="col-8 ms-3">
              {quiz.webcamRequired ? "Yes" : "No"}
            </div>
          </li>
          <li className="list-group-item d-flex">
            <div className="col-4 font-weight-bold text-end">
              <strong>Lock Questions After Answering</strong>
            </div>
            <div className="col-8 ms-3">
              {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}{" "}
            </div>
          </li>
        </ul>
      </ul>
      <table className="table">
        <thead>
          <tr>
            <th className="font-weight-bold">Due</th>
            <th className="font-weight-bold">For</th>
            <th className="font-weight-bold">Available</th>
            <th className="font-weight-bold">Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quiz.dueDate}</td>
            <td>Everyone</td>
            <td>{quiz.availableDate}</td>
            <td>{quiz.untilDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
