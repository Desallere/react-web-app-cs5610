import React, { useEffect, useState } from "react";
import { checkQuestionexist, checkQuizexist, createQuestion, deleteQuestion, findQuestion, updateQuestion, updateQuiz } from "./client";
import { useParams } from "react-router-dom";


interface Choice {
  value: string;
  answer: boolean;
}

interface Question {
  _id: string;
  quizID: string;
  type: string;
  points: number;
  title: string;
  question: string;
  choices: {
    [key: string]: Choice;
  };
  answers: {
    [key: string]: string;
  };
}

const QuizQuestions: React.FC = () => {
  const { qid } = useParams<{ qid: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  );
  const [editedQuestion, setEditedQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (qid) {
          const fetchedQuestions = await findQuestion(qid);
          setQuestions(fetchedQuestions);
        }
      } catch (error) {
        console.error("Failed to fetch questions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [qid]);

  const handleEditClick = (question: Question) => {
    setEditingQuestionId(question._id);
    setEditedQuestion({ ...question });
  };

  const handleSave = async () => {
    if (editedQuestion) {
      try {
        // Check if the question exists in the database
        const existsInDb = await checkQuestionexist(editedQuestion._id);
  
        if (existsInDb) {
          // Update the question in the local state
          setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
              q._id === editedQuestion._id ? editedQuestion : q
            )
          );
  
          // Call the API to update the question in the database
          await updateQuestion(editedQuestion._id, editedQuestion);
        } else {
          // Call the API to create a new question
          const newQuestionData = await createQuestion(editedQuestion);
   
          // Update the local state with the new question
          setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
              q._id === newQuestionData._id ? newQuestionData : q
            )
          );
        }
      } catch (error) {
        console.error("Failed to save quiz:", error);
        // Optionally: provide user feedback about the error
      }
    }
    setEditingQuestionId(null);
    setEditedQuestion(null);
  };

  const handleDeleteChoice = (key: string) => {
    if (editedQuestion && editedQuestion.type === "Multi") {
      const newChoices = { ...editedQuestion.choices };
      delete newChoices[key];
      setEditedQuestion({
        ...editedQuestion,
        choices: newChoices,
      });
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      // Call the deleteQuestion function to remove the question on the server
      await deleteQuestion(questionId);
  
      // Update the local state to reflect the deletion
      setQuestions((prevQuestions) =>
        prevQuestions.filter(q => q._id !== questionId)
      );
    } catch (error) {
      console.error("Failed to delete the question:", error);
      // Optionally, you can add more error handling logic here
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof Question
  ) => {
    if (editedQuestion) {
      const newValue = e.target.value;

      setEditedQuestion({
        ...editedQuestion,
        [field]: newValue,
        ...(field === "type" ? { choices: {} } : {}),
      });

      if (field === "type" && newValue === "TruF") {
        setEditedQuestion({
          ...editedQuestion,
          type: newValue,
          choices: {
            true: { value: "True", answer: false },
            false: { value: "False", answer: false },
          },
        });
      } else if (field === "type" && newValue === "FillB") {
        setEditedQuestion({
          ...editedQuestion,
          type: newValue,
          choices: {},
        });
      }
    }
  };

  const handleChoiceChange = (key: string, value: string) => {
    if (editedQuestion && editedQuestion.type === "Multi") {
      setEditedQuestion({
        ...editedQuestion,
        choices: {
          ...editedQuestion.choices,
          [key]: { ...editedQuestion.choices[key], value },
        },
      });
    }
  };

  const handleCorrectChange = (key: string) => {
    if (editedQuestion && (editedQuestion.type === "Multi" || editedQuestion.type === "TruF")) {
      const updatedChoices = Object.entries(editedQuestion.choices).reduce(
        (acc, [k, choice]) => {
          acc[k] = { ...choice, answer: k === key };
          return acc;
        },
        {} as { [key: string]: Choice }
      );
  
      setEditedQuestion({
        ...editedQuestion,
        choices: updatedChoices,
      });
    }
  };

  const addNewChoice = () => {
    if (editedQuestion) {
      const newKey = `new-${Date.now()}`;
      if (editedQuestion.type === "Multi" || editedQuestion.type === "FillB") {
        setEditedQuestion({
          ...editedQuestion,
          choices: {
            ...editedQuestion.choices,
            [newKey]: {
              value: "",
              answer: editedQuestion.type === "FillB",
            },
          },
        });
      }
    }
  };


  const addNewQuestion = async () => {
    if (!qid) {
      alert("Quiz ID is not available.");
      return;
    }
    
    const quizExists = await checkQuizexist(qid);
    if (!quizExists) {
      alert("Please save the quiz before adding questions.");
      return;
    }
  
    const newId = `question${Date.now()}`;
    const newQuestion: Question = {
      _id: newId,
      quizID: qid,
      type: "Multi",
      points: 0,
      title: "New Question",
      question: "",
      choices: {},
      answers:{},
    };
  
    setQuestions([...questions, newQuestion]);
    setEditingQuestionId(newId);
    setEditedQuestion(newQuestion);
  };
  return (
    <div className="container mt-4">
      <h5 className="mb-3">Edit Quiz Questions</h5>

      {loading ? (
        <p className="text-muted">Loading questions...</p>
      ) : (
        questions.map((question) => (
          <div className="card mb-3" key={question._id}>
            <div className="card-body">
              {editingQuestionId === question._id ? (
                <div>
                  <div className="d-flex justify-content-between mb-2">
                    <input
                      className="form-control me-2"
                      style={{ flex: 3 }}
                      value={editedQuestion?.title}
                      onChange={(e) => handleChange(e, "title")}
                    />
                    <select
                      className="form-select me-2"
                      style={{ flex: 2 }}
                      value={editedQuestion?.type}
                      onChange={(e) => handleChange(e, "type")}
                    >
                      <option value="Multi">Multiple Choices</option>
                      <option value="TruF">True/False</option>
                      <option value="FillB">Fill in the Blank</option>
                    </select>
                    <input
                      type="number"
                      className="form-control"
                      style={{ flex: 1 }}
                      value={editedQuestion?.points}
                      onChange={(e) => handleChange(e, "points")}
                    />
                  </div>
                  <textarea
                    className="form-control mb-2"
                    value={editedQuestion?.question}
                    onChange={(e) => handleChange(e, "question")}
                  />
                  {["Multi", "TruF", "FillB"].includes(
                    editedQuestion?.type || ""
                  ) && (
                    <div>
                      <ul className="list-group list-group-flush mb-2">
                        {Object.entries(editedQuestion?.choices || {}).map(
                          ([key, choice]) => (
                            <li
                              className="list-group-item d-flex align-items-center"
                              key={key}
                            >
                              <input
                                type="text"
                                className="form-control"
                                style={{ flex: 1, marginRight: "8px" }}
                                value={choice.value}
                                onChange={(e) =>
                                  handleChoiceChange(key, e.target.value)
                                }
                                disabled={editedQuestion?.type === "TruF"}
                              />
                              {editedQuestion &&
                                ["Multi", "TruF"].includes(
                                  editedQuestion.type
                                ) && (
                                  <button
                                    className={`btn btn-sm ${
                                      choice.answer
                                        ? "btn-success"
                                        : "btn-outline-secondary"
                                    }`}
                                    onClick={() => handleCorrectChange(key)}
                                  >
                                    Correct
                                  </button>
                                )}
                              {editedQuestion &&
                                editedQuestion.type === "Multi" && (
                                                                    <button
                                    className="btn btn-sm btn-danger ms-2"
                                    onClick={() => handleDeleteChoice(key)}
                                  >
                                    Delete
                                  </button>
                                )}
                            </li>
                          )
                        )}
                      </ul>
                      {editedQuestion && editedQuestion.type !== "TruF" && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={addNewChoice}
                        >
                          Add New Choice
                        </button>
                      )}
                    </div>
                  )}
                  <button className="btn btn-success mt-3" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="btn btn-secondary mt-3 ms-2"
                    onClick={() => {
                      setEditingQuestionId(null);
                      setEditedQuestion(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      backgroundColor: "#f8f9fa",
                      padding: "10px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  >
                    <h6 className="card-title mb-1">
                      {question.title}
                      <span className="float-end">
                        {question.points} points
                      </span>
                      <button
                        className="btn btn-link btn-sm ms-2"
                        onClick={() => handleEditClick(question)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-link btn-sm text-danger ms-2"
                        onClick={() => handleDeleteQuestion(question._id)}
                      >
                        Delete
                      </button>
                    </h6>
                  </div>
                  <p className="card-text">{question.question}</p>
                  {question.type === "Multi" || question.type === "TruF" ? (
                    <ul className="list-group list-group-flush">
                      {Object.entries(question.choices).map(([key, choice]) => (
                        <li className="list-group-item" key={key}>
                          <label>
                            <input
                              type="radio"
                              name={`question-${question._id}`}
                              className="me-2"
                              disabled
                            />
                            {choice.value}
                            {choice.answer && (
                              <span className="badge bg-success ms-1">
                                Correct
                              </span>
                            )}
                          </label>
                        </li>
                      ))}
                    </ul>
                  ) : question.type === "FillB" ? (
                    <div>
                      {Object.entries(question.choices).map(([key, choice]) => (
                        <p key={key} className="form-control text-muted">
                          {choice.value}
                          <span className="badge bg-success ms-1">Correct</span>
                        </p>
                      ))}
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Type your answer here"
                        disabled
                      />
                    </div>
                  ) : (
                    <p>Unknown question type</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
      
      {/* Button to add a new question */}
      <button className="btn btn-primary mt-3" onClick={addNewQuestion}>
        Add New Question
      </button>
    </div>
  );
};

export default QuizQuestions;