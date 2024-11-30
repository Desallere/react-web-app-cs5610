import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addQuiz, updateQuiz } from "./reducer"; // Adjust the import path if necessary
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as quizzesClient from "./client";

export default function QuizDetails() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const [quizDetails, setQuizDetails] = useState({
    _id: qid,
    title: "",
    description: "",
    course: cid,
    is_published: false,
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      if (qid) {
        try {
          const _qid: string = qid ?? "defaultQuizId";
          const quizExists = await quizzesClient.checkQuizexist(_qid);
          if (quizExists) {
            const quiz = await quizzesClient.findQuiz(qid);

            setQuizDetails(quiz);
          }
        } catch (error) {
          console.error("Error fetching quiz details:", error);
        }
      }
    };

    fetchQuizDetails();
  }, [qid]); // Use qid as dependency

  const handleSave = async () => {
    const _qid: string = qid ?? "defaultQuizId";

    // Check if the quiz exists
    const quizExists = await quizzesClient.checkQuizexist(_qid);

    if (quizExists) {
      // If quiz exists, update it
      const quiz = await quizzesClient.updateQuiz(_qid, quizDetails);
      dispatch(updateQuiz({ ...quiz, _id: qid }));
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)
    } else {
      // If quiz doesn't exist, create a new quiz
      const newQuiz = await quizzesClient.createQuiz(quizDetails);
      console.log(quizDetails);
      dispatch(addQuiz({ newQuiz })); // Assuming newQuiz comes with an 'id'
      navigate(`/Kanbas/Courses/${cid}/Quizzes`)
    }


  };

  const handleSaveAndPublish = async () => {
    const _qid: string = qid ?? "defaultQuizId";
  
    // Check if the quiz exists
    const quizExists = await quizzesClient.checkQuizexist(_qid);
  
    // Create updated quiz details once
    const updatedDetails = { ...quizDetails, is_published: true };
    setQuizDetails(updatedDetails);
    console.log(updatedDetails);
  
    if (quizExists) {
      // If quiz exists, update it
      quizzesClient.updateQuiz(_qid, updatedDetails).then((quiz) => {
        dispatch(updateQuiz({ ...quiz, _id: qid }));
        navigate(`/Kanbas/Courses/${updatedDetails.course}/Quizzes/${qid}`);
      });
    } else {
      // If quiz doesn't exist, create a new quiz
      quizzesClient.createQuiz(updatedDetails).then((newQuiz) => {
        dispatch(addQuiz({ newQuiz })); // Assuming newQuiz comes with an 'id'
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const actualValue =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;
    setQuizDetails({ ...quizDetails, [name]: actualValue });
  };

  const navigateTo = (screen: string) => {
    console.log("Navigating to", screen);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${quizDetails.course}/Quizzes/${qid}`);
  };

  return (
    <div>
      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={quizDetails.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={quizDetails.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 row">
          <div className="col-md-6">
            <label className="form-label">Quiz Type</label>
            <select
              className="form-select"
              name="quizType"
              value={quizDetails.quizType}
              onChange={handleInputChange}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Assignment Group</label>
            <select
              className="form-select"
              name="assignmentGroup"
              value={quizDetails.assignmentGroup}
              onChange={handleInputChange}
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col-md-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="shuffleAnswers"
                  checked={quizDetails.shuffleAnswers}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Shuffle Answers</label>
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Time Limit</label>
              <input
                type="number"
                className="form-control"
                name="timeLimit"
                value={quizDetails.timeLimit}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="multipleAttempts"
                  checked={quizDetails.multipleAttempts}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Multiple Attempts</label>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="showCorrectAnswers"
                  checked={quizDetails.showCorrectAnswers}
                  onChange={handleInputChange}
                />
                <label className="form-check-label ms-2">
                  Show Correct Answers
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Access Code</label>
          <input
            type="text"
            className="form-control"
            name="accessCode"
            value={quizDetails.accessCode}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 row">
          <div className="col-md-4">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="oneQuestionAtATime"
                checked={quizDetails.oneQuestionAtATime}
                onChange={handleInputChange}
              />
              <label className="form-check-label">One Question at a Time</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="webcamRequired"
                checked={quizDetails.webcamRequired}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Webcam Required</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="lockQuestionsAfterAnswering"
                checked={quizDetails.lockQuestionsAfterAnswering}
                onChange={handleInputChange}
              />
              <label className="form-check-label">
                Lock Questions After Answering
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="datetime-local"
            className="form-control"
            name="dueDate"
            value={quizDetails.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 row">
          <div className="col-md-6">
            <label className="form-label">Available Date</label>
            <input
              type="datetime-local"
              className="form-control"
              name="availableDate"
              value={quizDetails.availableDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Until Date</label>
            <input
              type="datetime-local"
              className="form-control"
              name="untilDate"
              value={quizDetails.untilDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary me-2" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-success me-2" onClick={handleSaveAndPublish}>
          Save and Publish
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
