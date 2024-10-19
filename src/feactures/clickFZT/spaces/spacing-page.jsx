import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import useLoading from "@/common/hooks/calllbacks/loading";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { groupedTask } from "@/utilities/helpers";
import SpacingDashboard from "./components/spacing-dashboard";
import BoardTask from "../task/components/board-task";
import ListTask from "../task/components/list-view-task";
import HeaderMenu from "@/common/components/ui/header-menu";
import CreateDialog from "../components/create-dialog";
import SnackbarMessage from "@/common/components/ui/snackbar";
import AddTask from "../task/components/add-task";
import useWebSocket from "@/common/hooks/web-socket";

// redux
import { useSelector, useDispatch } from "react-redux";
import { fetchSpaces } from "@/redux/slices/clickFZT/spaces-slices";
import { fetchStatusTask } from "@/redux/slices/clickFZT/status-slice";
import { fetchPriorityTask } from "@/redux/slices/clickFZT/priority-slice";

const SpacingPage = () => {
  const { spacingId } = useParams();
  const [spacings, setSpacing] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);
  const [taskPriorirty, setTaskPriority] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const { setIsLoading } = useLoading();
  const [filterUsers, setFilterUsers] = useState([]);
  const [currentView, setCurrentView] = useState("dashboard");
  const [statusId, setStatusId] = useState("");
  const [stateParent] = useAutoAnimate();
  const message = useWebSocket();

  const dispatch = useDispatch();
  const { spaces } = useSelector((state) => state.spaces);
  const { advisor } = useSelector((state) => state.loginAdvisor);
  const { statusTask } = useSelector((state) => state.statusTask);
  const { priorityTask } = useSelector((state) => state.priorityTask);

  // useEffect to get the data from the API
  useEffect(() => {
    // fetchRedux
    dispatch(fetchStatusTask());
    dispatch(fetchPriorityTask());
  }, [dispatch, setIsLoading]);

  // load data from the API
  useEffect(() => {
    if (spacingId && spaces.length > 0) {
      setIsLoading(true);
      const spacing = spaces.find((space) => space.id === spacingId);
      setSpacing(spacing);

      // set tasks
      const tasks = spacing.lists.reduce(
        (acc, list) => [...acc, ...list.tasks],
        []
      );
      setTasks(tasks);

      // set lists
      const list = spacing.lists.map((list) => ({
        ...list,
        tasks: list.tasks,
      }));

      setLists(list);

      // set users
      const users = spacing.advisors.map((user) => user);

      setFilterUsers(users);
      setTaskStatus(statusTask);
      setTaskPriority(priorityTask);
      setIsLoading(false);
    }
  }, [spaces, spacingId, statusTask, priorityTask, setIsLoading]);

  // get message from websocket getSpaces
  useEffect(() => {
    if (message) {
      dispatch(fetchSpaces(advisor.id));
      setMessageAlert(message);
    }
  }, [message, dispatch, advisor]);

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
          groupedTasks={groupedTask(tasks)}
          statusTask={taskStatus}
          stateParent={stateParent}
          parent={stateParent}
          handleAddTask={handleAddTask}
          setShowAlert={setShowAlert}
          priorityTask={taskPriorirty}
        />
      ) : (
        currentView === "list" && (
          <ListTask
            groupedTasks={groupedTask(tasks)}
            statusTask={taskStatus}
            handleAddTask={handleAddTask}
            setShowAlert={setShowAlert}
            priorityTask={taskPriorirty}
          />
        )
      )}

      <CreateDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <AddTask
          statusTask={taskStatus}
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
