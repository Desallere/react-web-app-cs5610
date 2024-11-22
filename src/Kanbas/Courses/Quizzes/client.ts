import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const updateQuizState = async (quizId: string) => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}/updateState`);
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}/update`,quiz);
  return response.data;
};

export const findQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/find`);
  return response.data;
};


