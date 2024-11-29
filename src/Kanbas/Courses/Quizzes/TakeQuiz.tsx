import React, { useEffect, useState } from "react";
import { findQuestion, findQuiz } from "./client"; // Ensure findQuiz is imported
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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

interface Quiz {
  _id: string; // MongoDB ObjectId represented as a string
  title: string; // Title of the quiz
  course: string; // Reference to the course (could be a string ID or name)
  points: number; // Total points available for the quiz
  is_published: boolean; // Whether the quiz is published
  description: string; // Textual description of the quiz
  quizType: string; // Type of quiz, default can be set but here is a string
  assignmentGroup: string; // Grouping category for assignments
  shuffleAnswers: boolean; // Whether to shuffle answers (default true)
  timeLimit: number; // Time limit in minutes
  multipleAttempts: boolean; // If multiple attempts are allowed (default false)
  howManyAttempts: number; // Number of attempts allowed (default 1)
  showCorrectAnswers: boolean; // Show correct answers after completion
  accessCode: string; // Access code, an empty string by default
  oneQuestionAtATime: boolean; // Display one question at a time (default true)
  webcamRequired: boolean; // If a webcam is required (default false)
  lockQuestionsAfterAnswering: boolean; // Lock questions after answering (default false)
  dueDate: string; // Due date in ISO string format
  availableDate: string; // Start availability date in ISO string format
  untilDate: string; // End availability date in ISO string format
  numberofQuestion: number; // Number of questions in the quiz
  score: Record<string, number>; // Scores keyed by userId (or studentId)
  starttime: Record<string, string>; // Start times keyed by userId in ISO string format
  attemptnum: Record<string, number>; // Attempt numbers keyed by userId
  // Add other quiz fields you need
}

const QuizQuestions: React.FC = () => {
  const { qid } = useParams<{ qid: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null); // State for the quiz
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);
  const [loadingQuiz, setLoadingQuiz] = useState<boolean>(true); // Loading state for the quiz
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      try {
        if (qid) {
          const fetchedQuiz = await findQuiz(qid); // Fetch the quiz
          setQuiz(fetchedQuiz);

          const fetchedQuestions = await findQuestion(qid); // Fetch the questions
          setQuestions(fetchedQuestions);
        }
      } catch (error) {
        console.error("Failed to fetch quiz or questions", error);
      } finally {
        setLoadingQuiz(false);
        setLoadingQuestions(false);
      }
    };

    fetchQuizAndQuestions();
  }, [qid]);

  const handleResponseChange = (questionId: string, choiceKey: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: choiceKey,
    }));
  };

  const handleTextChange = (questionId: string, text: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: text,
    }));
  };

  // Get user-specific data or default to "None" if not present
  const userStartTime = quiz?.starttime[currentUser._id] ?? "None";
  const userScore = quiz?.score[currentUser._id]?.toString() ?? "None";
  const userAttempts = quiz?.attemptnum[currentUser._id]?.toString() ?? "None";

  return (
    <div className="container mt-4">
      {loadingQuiz ? (
        <p className="text-muted">Loading quiz...</p>
      ) : quiz ? (
        <div className="mb-3">
          <h4>{quiz.title}</h4>
          <p>{quiz.description}</p>
          <div className="row">
            <div className="col-md-4 mb-2">
              <span>
                <strong>Attempts:</strong> {userAttempts}
              </span>
            </div>
            <div className="col-md-4 mb-2">
              <span>
                <strong>Last Attempt:</strong> {userStartTime}
              </span>
            </div>
            <div className="col-md-4 mb-2">
              <span>
                <strong>Last Score:</strong> {userScore}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-muted">Quiz not found</p>
      )}

      <h5 className="mb-3">Quiz Questions</h5>
      {loadingQuestions ? (
        <p className="text-muted">Loading questions...</p>
      ) : (
        questions.map((question) => (
          <div className="card mb-3" key={question._id}>
            <div className="card-body">
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
                  <span className="float-end">{question.points} points</span>
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
                          checked={responses[question._id] === key}
                          onChange={() =>
                            handleResponseChange(question._id, key)
                          }
                        />
                        {choice.value}
                      </label>
                    </li>
                  ))}
                </ul>
              ) : question.type === "FillB" ? (
                <input
                  type="text"
                  className="form-control mt-2"
                  value={responses[question._id] || ""}
                  onChange={(e) =>
                    handleTextChange(question._id, e.target.value)
                  }
                  placeholder="Type your answer here"
                />
              ) : (
                <p>Unknown question type</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default QuizQuestions;
