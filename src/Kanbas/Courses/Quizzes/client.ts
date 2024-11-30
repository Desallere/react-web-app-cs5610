import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const updateQuizState = async (quizId: string) => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}/updateState`);
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}/update`, quiz);
  return response.data;
};

export const findQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/find`);
  return response.data;
};

export const createQuiz = async (quiz: any) => {
  const response = await axios.post(`${QUIZZES_API}/create`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}/delete`);
  return response.data;
};

export const checkQuizexist = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/Quizexist`);
  return response.data;
};

export const findQuestion = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions/find`);
  return response.data;
};

export const updateQuestion = async (questionId: string, question: any) => {
  const response = await axios.put(
    `${QUIZZES_API}/${questionId}/updateQuestion`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(
    `${QUIZZES_API}/${questionId}/deleteQuestion`
  );
  return response.data;
};

export const createQuestion = async (question: any) => {
  const response = await axios.post(`${QUIZZES_API}/createQuestion`, question);
  return response.data;
};

export const checkQuestionexist = async (questionId: string) => {
  const response = await axios.get(
    `${QUIZZES_API}/${questionId}/Questionexist`
  );
  return response.data;
};

export const updateQuestionAnswer = async (
  questionId: string,
  userId: string,
  answerId: string
) => {
  try {
    const response = await axios.post(
      `${QUIZZES_API}/${questionId}/updateanswer`,
      {
        userId,
        answerId,
      }
    );
    console.error("uploadanswer");
    return response.data;
  } catch (error) {
    console.error("Error updating question answer:", error);
    throw error;
  }
};

export const getQuestionAnswer = async (questionId: string, userId: string) => {
  try {
    const response = await axios.get(
      `${QUIZZES_API}/${questionId}/answer/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching question answer:", error);
    throw error;
  }
};

export const updateUserQuizData = async (
  quizId: string,
  userId: string,
  score: number,
  startTime: string,
  attemptNum: number
) => {
 
  try {
    const response = await axios.put(
      `${QUIZZES_API}/${quizId}/user/${userId}`,
      {
        score,
        startTime,
        attemptNum,
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error updating quiz data:", error);
    throw error;
  }
};
