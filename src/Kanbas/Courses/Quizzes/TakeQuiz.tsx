import React, { useEffect, useState } from "react";
import {
  findQuestion,
  findQuiz,
  updateQuestionAnswer,
  getQuestionAnswer,
  updateUserQuizData,
} from "./client";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  _id: string;
  title: string;
  course: string;
  points: number;
  is_published: boolean;
  description: string;
  quizType: string;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: boolean;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  numberofQuestion: number;
  score: Record<string, number>;
  starttime: Record<string, string>;
  attemptnum: Record<string, number>;
}

const QuizQuestions: React.FC = () => {
  const { cid } = useParams<{ cid: string }>();
  const { qid } = useParams<{ qid: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);
  const [loadingQuiz, setLoadingQuiz] = useState<boolean>(true);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      try {
        if (qid) {
          const fetchedQuiz = await findQuiz(qid);
          setQuiz(fetchedQuiz);

          const fetchedQuestions = await findQuestion(qid);
          setQuestions(fetchedQuestions);

          // Fetch each question's initial answer for the current user
          const initialResponses: { [key: string]: string } = {};
          for (const question of fetchedQuestions) {
            const answer = await getQuestionAnswer(
              question._id,
              currentUser._id
            );
            initialResponses[question._id] = answer.answer;
          }

          setResponses(initialResponses);
        }
      } catch (error) {
        console.error("Failed to fetch quiz or questions", error);
      } finally {
        setLoadingQuiz(false);
        setLoadingQuestions(false);
      }
    };
    console.log(currentUser._id);
    fetchQuizAndQuestions();
  }, [qid, currentUser._id]);

  const handleResponseChange = async (questionId: string, choiceKey: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: choiceKey,
    }));
    try {
      await updateQuestionAnswer(questionId, currentUser._id, choiceKey);
    } catch (error) {
      console.error("Failed to update answer", error);
    }
  };

  const handleTextChange = async (questionId: string, text: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: text,
    }));
    try {
      await updateQuestionAnswer(questionId, currentUser._id, text);
    } catch (error) {
      console.error("Failed to update answer", error);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!quiz || !questions) return;
    let score = 0;

    questions.forEach((question) => {
      const userResponse = responses[question._id];
      if (question.type === "Multi" || question.type === "TruF") {
        const correctChoiceKey = Object.keys(question.choices).find(
          (key) => question.choices[key].answer === true
        );
        if (userResponse === correctChoiceKey) {
          score += question.points;
        }
      } else if (question.type === "FillB") {
        const correctValues = Object.values(question.choices).map((choice) =>
          choice.value.toLowerCase()
        );
        if (correctValues.includes(userResponse?.toLowerCase())) {
          score += question.points;
        }
      }
    });

    const attemptNum = (quiz.attemptnum[currentUser._id] || 0) + 1;
    const currentTime = new Date().toISOString();

    try {
      await updateUserQuizData(
        qid!,
        currentUser._id,
        score,
        currentTime,
        attemptNum
      );
      alert("Quiz submitted successfully!");
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Failed to submit quiz", error);
    }
  };

  const userAttempts = quiz?.attemptnum[currentUser._id] ?? 0;
  const cannotEdit = currentUser.role === "STUDENT" &&
    ((!quiz?.multipleAttempts && userAttempts >= 1) || 
     (quiz?.multipleAttempts && userAttempts >= quiz.howManyAttempts));

  const userStartTime = quiz?.starttime[currentUser._id] ?? "None";
  const userScore = quiz?.score[currentUser._id]?.toString() ?? "None";
  
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
              <strong>Attempts:</strong> {userAttempts}
            </div>
            <div className="col-md-4 mb-2">
              <strong>Last Attempt:</strong> {userStartTime}
            </div>
            <div className="col-md-4 mb-2">
              <strong>Last Score:</strong> {userScore}
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
                          disabled={cannotEdit}
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
                  disabled={cannotEdit}
                />
              ) : (
                <p>Unknown question type</p>
              )}
            </div>
          </div>
        ))
      )}

      {cannotEdit ? (
        <p className="text-danger">You cannot edit your answers now.</p>
      ) : (
        <button className="btn btn-primary mt-3" onClick={handleSubmitQuiz}>
          Submit Quiz
        </button>
      )}
    </div>
  );
};

export default QuizQuestions;