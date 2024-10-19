import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  DialogActions,
  CircularProgress,
  Button,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { Save, ListPlus, Pencil } from "lucide-react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { getData, postData, putData } from "@/services/api";
import FormInit from "@/common/components/form/form-init";
import SnackbarMessage from "@/common/components/ui/snackbar";
import useLoading from "@/common/hooks/calllbacks/loading";
import CreateDialog from "./create-dialog";
import ListForm from "../forms/list-form";
import PropTypes from "prop-types";

const AddList = ({
  openDialog,
  setOpenDialog,
  setShowAlert,
  context,
  idSpacing,
  idList,
}) => {
  const theme = useTheme();
  const [nameSpacing, setNameSpacing] = useState("");

  const [initValues, setInitValues] = useState({
    title: "",
    description: "",
    spacing_id: idSpacing,
    advisor_ids: [],
  });
  const [isLoadingDialog, setisLoadingDialog] = useState(
    context === "editList"
  );
  const { setIsLoading } = useLoading();

  useEffect(() => {
    console.log("AddList -> useEffect -> context", context);
    if (context === "editList") {
      try {
        getData(`api/clickfzt/list/${idList}`).then((data) => {
          const list = data;
          console.log("AddList -> useEffect -> list", list);
          setInitValues({
            title: list.title,
            description: list.description,
            spacing_id: idSpacing,
            advisor_ids: list.advisors.map((advisor) => advisor.id),
          });
          setisLoadingDialog(false);
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al obtener la lista",
          text: error.message,
        });
      }
    }
  }, [context, idList, idSpacing]);

  const validateSchemaList = () =>
    Yup.object().shape({
      title: Yup.string().required("El título de la lista es requerido"),
      description: Yup.string().notRequired(),
      spacing_id: Yup.string().required("El id del espacio es requerido"),
      advisor_ids: Yup.array().notRequired(),
    });

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <CreateDialog
      title={
        context === "createList" ? (
          <>
            <Box display={"flex"} alignItems={"center"}>
              <ListPlus size={24} color={theme.palette.primary.main} />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, padding: 0.5 }}
              >
                Creando Lista en: {nameSpacing}
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Typography variant="body2" sx={{ flexGrow: 1, padding: 0.5 }}>
                Una lista representa los principales departamentos u
                organizaciones.
              </Typography>
            </Box>
          </>
        ) : (
          <Box display={"flex"} alignItems={"center"}>
            <Pencil size={24} color={theme.palette.primary.main} />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, padding: 0.5 }}
            >
              Editando la Lista: {initValues.title}
            </Typography>
          </Box>
        )
      }
      open={openDialog}
      onClose={handleClose}
      isLoading={isLoadingDialog}
    >
      {!isLoadingDialog && initValues && (
        <FormInit
          initialValues={initValues}
          validationSchema={validateSchemaList}
          onSubmit={async (values, actions) => {
            console.log("AddList -> onSubmit -> values", values);
            setIsLoading(true);
            try {
              if (context == "editList") {
                await putData(`api/clickfzt/list/${idList}`, values);
              } else {
                await postData("api/clickfzt/list", values);
              }
              setOpenDialog(false);
              setShowAlert(true);
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Error al guardar el espacio",
                text: error.message,
              });
            } finally {
              actions.setSubmitting(false);
              setIsLoading(false);
            }
          }}
          enableReinitialize={true}
        >
          {({ isSubmitting, handleSubmit, errors }) => (
            <>
              <ListForm idSpacing={idSpacing} setNameSpacing={setNameSpacing} />
              <DialogActions
                sx={{
                  pt: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  type="button"
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Save size={24} />
                    )
                  }
                  sx={{
                    backgroundColor: "#0dac3a",
                    "&:hover": {
                      backgroundColor: "#075f20",
                    },
                  }}
                >
                  {isSubmitting ? "Guardando..." : "Guardar Lista"}
                </Button>
              </DialogActions>
              {errors &&
                Object.values(errors).length > 0 &&
                Object.keys(errors).map((errorKey, index) => (
                  <SnackbarMessage
                    key={index}
                    open={true}
                    message={errors[errorKey].toString()}
                    severity="error"
                    onCloseHandler={() => {
                      return false;
                    }}
                    duration={3000}
                    vertical="bottom"
                    horizontal="right"
                  />
                ))}
            </>
          )}
        </FormInit>
      )}
    </CreateDialog>
  );
};

AddList.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  setShowAlert: PropTypes.func,
  context: PropTypes.string,
  idSpacing: PropTypes.string,
  idList: PropTypes.string,
};

export default AddList;
