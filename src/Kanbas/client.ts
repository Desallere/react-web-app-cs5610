import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const Enroll_API = `${REMOTE_SERVER}/api/enroll`;

export const addEnroll = async (
  Id: string,
  userID: string,
  courseID: string
) => {
  const { data } = await axiosWithCredentials.post(
    `${Enroll_API}/${Id}/${userID}/${courseID}`
  );
  console.log(`${Enroll_API}/${Id}/${userID}/${courseID}`);
  return data;
};

export const deleteEnroll = async (enrollID: string) => {
  const { data } = await axios.delete(`${Enroll_API}/delete/${enrollID}`);
  console.log(`${Enroll_API}/delete/${enrollID}}`);
  return data;
};

export async function checkEnrollment(
  userId: string,
  courseId: string
): Promise<boolean> {
  const {data} = await axios.get(`${Enroll_API}/check-enrollment/${userId}/${courseId}`);

  return data.isEnrolled;
}
