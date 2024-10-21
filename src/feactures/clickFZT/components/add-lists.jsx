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
import { getData, postData, putData } from "@/services/api";
import FormInit from "@/common/components/form/form-init";
import useLoading from "@/common/hooks/calllbacks/loading";
import CreateDialog from "./create-dialog";
import ListForm from "../forms/list-form";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

const AddList = ({
  openDialog,
  setOpenDialog,
  // setShowAlert,
  context,
  idSpacing,
  idList,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { setIsLoading } = useLoading();
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

  useEffect(() => {
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
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        });
      }
    }
  }, [context, idList, idSpacing, enqueueSnackbar]);

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
              // setShowAlert(true);
            } catch (error) {
              enqueueSnackbar(error.message, {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
              });
            } finally {
              actions.setSubmitting(false);
              setIsLoading(false);
            }
          }}
          enableReinitialize={true}
        >
          {({ isSubmitting, handleSubmit, validateForm, setTouched }) => (
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
                  onClick={async () => {
                    const formErrors = await validateForm();
                    if (Object.keys(formErrors).length === 0) {
                      handleSubmit();
                    } else {
                      // Marcar todos los campos con errores como tocados
                      const touchedFields = Object.keys(formErrors).reduce(
                        (acc, field) => {
                          acc[field] = true;
                          return acc;
                        },
                        {}
                      );
                      setTouched(touchedFields);

                      Object.values(formErrors).forEach((error) => {
                        enqueueSnackbar(error, {
                          variant: "error",
                          autoHideDuration: 3000,
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                        });
                      });
                    }
                  }}
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
  // setShowAlert: PropTypes.func,
  context: PropTypes.string,
  idSpacing: PropTypes.string,
  idList: PropTypes.string,
};

export default AddList;
