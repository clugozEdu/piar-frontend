import { useEffect, useCallback, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { getData } from "@/services/api";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useLoading from "@/common/hooks/calllbacks/loading";
import dayjs from "dayjs";
import HeaderMenu from "@/common/components/ui/header-menu";
import SnackbarMessage from "@/common/components/ui/snackbar";
import BoardTask from "./components/board-task";
import ListTask from "./components/list-view-task";
import CreateDialog from "../components/create-dialog";
import AddTask from "./components/add-task";
import useWebSocket from "@/common/hooks/web-socket";

const TaskPage = () => {
  const { listId } = useParams();
  const [task, setTask] = useState([]);
  const [statusTask, setStatusTask] = useState([]);
  const [currentView, setCurrentView] = useState("board");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idStatus, setIdStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [parent] = useAutoAnimate();
  const [stateParent] = useAutoAnimate();
  const { setIsLoading } = useLoading();
  const message = useWebSocket();

  const fetchTask = useCallback(() => {
    setIsLoading(true);
    getData(`api/clickup/list/${listId}/tasks`).then((data) => setTask(data));
    getData(`api/clickup/status`).then((data) => setStatusTask(data));
  }, [listId, setIsLoading]);

  useEffect(() => {
    if (listId) {
      fetchTask();

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [listId, fetchTask, setIsLoading]);

  useEffect(() => {
    const event = message[0]?.event;
    console.log(event);

    if (event == "task_created") {
      fetchTask();
      setTimeout(() => {
        setIsLoading(false);
        setShowAlert(true);
      }, 2000);
    }
  }, [message, fetchTask, setIsLoading]);

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

  const handleAddTask = (idStatus) => {
    setIsDialogOpen(true);
    setIdStatus(idStatus);
  };

  return (
    <Box
      sx={{ flexGrow: 1, padding: "0px 0px 0px 0px" }}
      id="box-task"
      ref={stateParent}
    >
      <HeaderMenu
        onChangeView={setCurrentView}
        viewSelected={currentView}
        context={"task"}
      />
      {currentView === "board" && (
        <BoardTask
          groupedTasks={groupedTasks}
          statusTask={statusTask}
          stateParent={stateParent}
          parent={parent}
          handleAddTask={handleAddTask}
        />
      )}

      {currentView === "list" && (
        <ListTask
          groupedTasks={groupedTasks}
          statusTask={statusTask}
          handleAddTask={handleAddTask}
        />
      )}

      {/* Dialog Create Task */}
      <CreateDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <AddTask
          openDialog={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          idStatus={idStatus}
          idList={listId}
        />
      </CreateDialog>

      {showAlert && (
        <SnackbarMessage
          open={showAlert}
          message="Tarea creada correctamente"
          title={"Completado"}
          onCloseHandler={() => {
            setShowAlert(false);
          }}
          duration={3000}
          severity="success"
          vertical="bottom"
          horizontal="right"
        />
      )}
    </Box>
  );
};

export default TaskPage;
