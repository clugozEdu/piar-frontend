import { useEffect, useCallback, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { getData } from "@/services/api";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import dayjs from "dayjs";
import HeaderMenu from "@/common/components/ui/header-menu";
import BoardTask from "./components/board-task";

const TaskPage = () => {
  const { listId } = useParams();
  const [task, setTask] = useState([]);
  const [statusTask, setStatusTask] = useState([]);
  const [currentView, setCurrentView] = useState("board");
  const [parent] = useAutoAnimate();
  const [stateParent] = useAutoAnimate();

  const fetchTask = useCallback(async () => {
    setTask(
      await getData(`api/clickup/list/${listId}/tasks`).then((data) => data)
    );
    setStatusTask(await getData(`api/status`).then((data) => data));
  }, [listId]);

  useEffect(() => {
    if (listId) {
      fetchTask();
    }
  }, [listId, fetchTask]);

  console.log(task);
  console.log(statusTask);

  const isTaskOverdue = (dueDate, statusTask) => {
    if (statusTask === "Done") {
      return false;
    }

    const today = dayjs();
    const due = dayjs(dueDate);
    return today.isAfter(due, "day");
  };

  const groupedTasks = task
    .map((task) => ({
      ...task,
      overdue: isTaskOverdue(task.end_date, task.status.name),
    }))
    .sort((a, b) => dayjs(a.end_date).diff(dayjs(b.end_date)))
    .reduce((acc, task) => {
      const status = task.status.name;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(task);
      return acc;
    }, {});

  console.log(groupedTasks);

  return (
    <Box sx={{ flexGrow: 1, padding: "0px 0px 0px 0px" }} id="box-task">
      <HeaderMenu onChangeView={setCurrentView} />
      {currentView === "board" && (
        <BoardTask
          groupedTasks={groupedTasks}
          statusTask={statusTask}
          stateParent={stateParent}
          parent={parent}
        />
      )}
    </Box>
  );
};

export default TaskPage;
