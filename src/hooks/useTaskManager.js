import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  updateTask,
  removeTask,
  allTasks,
} from "../store/slices/taskSlice";
import taskManagerApi from "../api/taskManagerApi";
const useTaskManger = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const createNewTask = async (title, body) => {
    const resp = await taskManagerApi.post("/task", {
      title: title,
      body: body,
    });
    if (resp.status === 200) {
      dispatch(addTask(resp.data.task));
    } else {
      // Error message
      console.log("task isn't created try again");
    }
  };

  const getAllTasks = async () => {
    const resp = await taskManagerApi.get("/task");
    if (resp.status == 200) {
      dispatch(allTasks(resp.data.tasks));
    } else console.log("please try again later");
  };

  const updateCurrentTask = async (id, title, body) => {
    const resp = await taskManagerApi.put(`/task/${id}`, {
      title,
      body,
    });
    if (resp.status === 200) {
      dispatch(updateTask(resp.data.task));
    }
  };

  const deleteTask = async (id) => {
    const resp = await taskManagerApi.delete(`/task/${id}`);
    if (resp.status === 200) {
      dispatch(removeTask({ id }));
    }
  };

  const finishTask = async (id) => {
    const resp = await taskManagerApi.patch(`/task/${id}`);
    if (resp.status === 200) {
      dispatch(updateTask(resp.data.task));
    } else {
      console.log("invalid task");
    }
  };
  return {
    tasks,
    createNewTask,
    getAllTasks,
    updateCurrentTask,
    deleteTask,
    finishTask,
  };
};

export default useTaskManger;
