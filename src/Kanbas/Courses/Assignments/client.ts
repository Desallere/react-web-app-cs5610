import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};
export const updateAssignment = async (assignment: any) => {
  console.log(assignment);
  console.log(`${ASSIGNMENTS_API}/${assignment._id}`);
  const { data } = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};


export const createAssignment = async (assignment: any) => {
  console.log(assignment);
  console.log(`${ASSIGNMENTS_API}/create`);
  const { data } = await axios.post(`${ASSIGNMENTS_API}/create`, assignment);
  return data;
};
