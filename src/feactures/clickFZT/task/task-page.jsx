import { useEffect, useState, useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import useLoading from "@/common/hooks/calllbacks/loading";
import HeaderMenu from "@/common/components/ui/header-menu";
import SnackbarMessage from "@/common/components/ui/snackbar";
import BoardTask from "./components/board-task";
import ListTask from "./components/list-view-task";
import AddTask from "./components/add-task";
import useWebSocket from "@/common/hooks/web-socket";
import { groupedTask } from "@/utilities/helpers";
// redux
import { fetchSpaces } from "@/redux/slices/clickFZT/spaces-slices";
import { fetchStatusTask } from "@/redux/slices/clickFZT/status-slice";
import { fetchPriorityTask } from "@/redux/slices/clickFZT/priority-slice";
import { useSelector, useDispatch } from "react-redux";

const TaskPage = () => {
  const { listId } = useParams();
  const [task, setTask] = useState([]);
  const [currentView, setCurrentView] = useState("board");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idStatus, setIdStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const { setIsLoading } = useLoading();

  const message = useWebSocket();

  // store redux
  const dispatch = useDispatch();
  const { advisor } = useSelector((state) => state.loginAdvisor);
  const { spaces } = useSelector((state) => state.spaces);
  const { statusTask } = useSelector((state) => state.statusTask);
  const { priorityTask } = useSelector((state) => state.priorityTask);

  // useEffect to get the data from the API
  useEffect(() => {
    // fetchRedux
    dispatch(fetchStatusTask());
    dispatch(fetchPriorityTask());
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    if (listId && spaces.length > 0) {
      setIsLoading(true);
      // found space
      const space =
        spaces
          .flatMap((space) => space.lists)
          .find((list) => list.id === listId) || null;

      // get tasks
      setTask(space.tasks);
      setIsLoading(false);
      setMessageAlert("");
    }
  }, [listId, spaces, setIsLoading, statusTask, priorityTask]);

  useEffect(() => {
    if (message) {
      console.log("Mensaje recibido", message);
      dispatch(fetchSpaces(advisor.id));

      // Actualiza el mensaje de alerta y muestra la alerta
      setMessageAlert(message.event);
      setShowAlert(true); // Activa la alerta cada vez que llega un nuevo mensaje
    }
  }, [message, dispatch, advisor]);

  const handleAddTask = useCallback((idStatus) => {
    setIsDialogOpen(true);
    setIdStatus(idStatus);
  }, []);

  const groupedTasks = useMemo(() => groupedTask(task), [task]);

  return (
    <Box sx={{ flexGrow: 1, padding: "0px 0px 0px 0px" }} id="box-task">
      <HeaderMenu
        onChangeView={setCurrentView}
        viewSelected={currentView}
        context={"task"}
      />

      {currentView === "board" && (
        <BoardTask
          groupedTasks={groupedTasks}
          statusTask={statusTask}
          handleAddTask={handleAddTask}
          setShowAlert={setShowAlert}
          priorityTask={priorityTask}
        />
      )}

      {currentView === "list" && (
        <ListTask
          groupedTasks={groupedTasks}
          statusTask={statusTask}
          handleAddTask={handleAddTask}
          setShowAlert={setShowAlert}
          priorityTask={priorityTask}
        />
      )}

      {/* Dialog Create Task */}
      <AddTask
        statusTask={statusTask}
        openDialog={isDialogOpen}
        setShowAlert={setShowAlert}
        setIsDialogOpen={setIsDialogOpen}
        idStatus={idStatus}
        idList={listId}
      />

      {/* Snackbar de alerta */}
      <SnackbarMessage
        open={showAlert}
        message={
          messageAlert === "task_created"
            ? "Tarea creada"
            : messageAlert === "task_deleted"
            ? "Tarea eliminada"
            : messageAlert === "task_updated"
            ? "Tarea actualizada"
            : "Acción realizada"
        }
        title={"Completado"}
        onCloseHandler={() => {
          setShowAlert(false); // Cerrar la alerta cuando termine
        }}
        duration={3000}
        severity="success"
        vertical="bottom"
        horizontal="right"
      />
    </Box>
  );
};

export default TaskPage;
