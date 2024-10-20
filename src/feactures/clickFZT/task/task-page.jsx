import { useEffect, useState, useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import useLoading from "@/common/hooks/calllbacks/loading";
import HeaderMenu from "@/common/components/ui/header-menu";
import BoardTask from "./components/board-task";
import ListTask from "./components/list-view-task";
import AddTask from "./components/add-task";
import { groupedTask } from "@/utilities/helpers";
// redux
import { fetchStatusTask } from "@/redux/slices/clickFZT/status-slice";
import { fetchPriorityTask } from "@/redux/slices/clickFZT/priority-slice";
import { useSelector, useDispatch } from "react-redux";

const TaskPage = () => {
  const { listId } = useParams();
  const [task, setTask] = useState([]);
  const [currentView, setCurrentView] = useState("board");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idStatus, setIdStatus] = useState("");
  const { setIsLoading } = useLoading();

  // store redux
  const dispatch = useDispatch();
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
    }
  }, [listId, spaces, setIsLoading, statusTask, priorityTask]);

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
          priorityTask={priorityTask}
        />
      )}

      {currentView === "list" && (
        <ListTask
          groupedTasks={groupedTasks}
          statusTask={statusTask}
          handleAddTask={handleAddTask}
          priorityTask={priorityTask}
        />
      )}

      {/* Dialog Create Task */}
      <AddTask
        statusTask={statusTask}
        openDialog={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        idStatus={idStatus}
        idList={listId}
      />
    </Box>
  );
};

export default TaskPage;
