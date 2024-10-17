import { useState, useEffect, useCallback } from "react";
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import useLoading from "@/common/hooks/calllbacks/loading";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { getData } from "@/services/api";
import SpacingDashboard from "./components/spacing-dashboard";
import BoardTask from "../task/components/board-task";
import ListTask from "../task/components/list-view-task";
import HeaderMenu from "@/common/components/ui/header-menu";
import dayjs from "dayjs";
import CreateDialog from "../components/create-dialog";
import SnackbarMessage from "@/common/components/ui/snackbar";
import AddTask from "../task/components/add-task";
import useWebSocket from "@/common/hooks/web-socket";

const SpacingPage = () => {
  const { spacingId } = useParams();
  const [spacings, setSpacing] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [statusTask, setStatusTask] = useState([]);
  const [priorityTask, setPriorityTask] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const { setIsLoading } = useLoading();
  const [filterUsers, setFilterUsers] = useState([]);
  const [currentView, setCurrentView] = useState("dashboard");
  const [statusId, setStatusId] = useState("");
  const [stateParent] = useAutoAnimate();
  const message = useWebSocket();

  const fetchSpacing = useCallback(() => {
    setIsLoading(true);
    // fetch data from api
    getData(`api/clickup/spacing/${spacingId}`).then((data) => {
      setSpacing(data);
    });

    getData("api/clickup/status").then((data) => {
      setStatusTask(data);
    });
    getData("api/clickup/priority").then((data) => setPriorityTask(data));
  }, [spacingId, setIsLoading]);

  useEffect(() => {
    if (spacingId) {
      fetchSpacing();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [spacingId, fetchSpacing, setIsLoading]);

  useEffect(() => {
    if (spacings?.lists?.length > 0) {
      setTasks(spacings.lists.map((list) => list.tasks).flat());
      setFilterUsers(spacings.advisors);
      setLists(spacings.lists);
    }
  }, [spacings]);

  useEffect(() => {
    const event = message?.event;
    console.log("event desde spacingPage", event);
    if (event) {
      fetchSpacing();
      setMessageAlert(event);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [message, fetchSpacing, setIsLoading, spacingId]);

  const isTaskOverdue = (dueDate, status_task) => {
    if (status_task === "Done") {
      return false;
    }

    // validar con dayjs
    const today = dayjs();
    const due = dayjs(dueDate);
    return today.isAfter(due, "day");
  };

  // Agrupar y ordenar tareas por estado y fecha de vencimiento
  const groupedTasks = tasks
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
    setStatusId(idStatus);
  };

  return (
    <div ref={stateParent}>
      <HeaderMenu
        onChangeView={setCurrentView}
        viewSelected={currentView}
        context={"spacing"}
      />

      <Divider sx={{ mb: 2 }} />

      {currentView === "dashboard" ? (
        <SpacingDashboard
          tasks={tasks}
          lists={lists}
          users={filterUsers}
          nameSpacing={spacings.title}
        />
      ) : currentView === "board" ? (
        <BoardTask
          groupedTasks={groupedTasks}
          statusTask={statusTask}
          stateParent={stateParent}
          parent={stateParent}
          handleAddTask={handleAddTask}
          setShowAlert={setShowAlert}
          priorityTask={priorityTask}
        />
      ) : (
        currentView === "list" && (
          <ListTask
            groupedTasks={groupedTasks}
            statusTask={statusTask}
            handleAddTask={handleAddTask}
            setShowAlert={setShowAlert}
            priorityTask={priorityTask}
          />
        )
      )}

      <CreateDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <AddTask
          statusTask={statusTask}
          openDialog={isDialogOpen}
          setShowAlert={setShowAlert}
          setIsDialogOpen={setIsDialogOpen}
          idStatus={statusId}
          lists={lists}
        />
      </CreateDialog>

      {showAlert && (
        <SnackbarMessage
          open={showAlert}
          message={
            messageAlert === "task_created"
              ? "Tarea creada"
              : messageAlert === "task_deleted"
              ? "Tarea eliminada"
              : "Tarea actualizada"
          }
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
    </div>
  );
};

export default SpacingPage;
