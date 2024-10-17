import { useEffect, useState } from "react";
import {
  Typography,
  DialogActions,
  CircularProgress,
  Button,
} from "@mui/material";
import { Save } from "lucide-react";

import * as Yup from "yup";
import { getData, postData, putData } from "@/services/api";
import PropTypes from "prop-types";
import FormInit from "@/common/components/form/form-init";
import CreateDialog from "./create-dialog";
import ListForm from "../forms/list-form";

const AddList = ({
  openDialog,
  setOpenDialog,
  setShowAlert,
  context,
  idSpacing,
  idList,
}) => {
  const [nameSpacing, setNameSpacing] = useState("");

  const [initValues, setInitValues] = useState({
    title: "",
    description: "",
    spacing_id: idSpacing,
    advisor_ids: [],
  });
  const [isLoading, setIsLoading] = useState(context === "editList");

  useEffect(() => {
    if (context === "editList") {
      getData(`api/clickup/list/${idList}`).then((data) => {
        const list = data;
        setInitValues({
          title: list.title,
          description: list.description,
          spacing_id: idSpacing,
          advisor_ids: list.advisors.map((advisor) => advisor.id),
        });
        setIsLoading(false);
      });
    }
  }, [context, idList, idSpacing]);

  const validateSchemaList = () =>
    Yup.object().shape({
      title: Yup.string().required("El título es requerido"),
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Creando Lista en {nameSpacing}
            </Typography>
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              Una lista representa los principales departamentos u
              organizaciones.
            </Typography>
          </>
        ) : (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Editando Lista en {nameSpacing}
          </Typography>
        )
      }
      open={openDialog}
      onClose={handleClose}
      isLoading={isLoading}
    >
      {!isLoading && initValues && (
        <FormInit
          initialValues={initValues}
          validationSchema={validateSchemaList}
          onSubmit={async (values, actions) => {
            try {
              if (context == "editList") {
                await putData(`api/clickup/list/${idList}`, values);
              } else {
                await postData("api/clickup/list", values);
              }
              setOpenDialog(false);
              setShowAlert(true);
            } catch (error) {
              console.error(error);
            } finally {
              actions.setSubmitting(false);
            }
          }}
          enableReinitialize={true}
        >
          {({ isSubmitting, handleSubmit }) => (
            <>
              <ListForm idSpacing={idSpacing} setNameSpacing={setNameSpacing} />
              <DialogActions
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
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
                      <Save size={20} />
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
  setShowAlert: PropTypes.func,
  context: PropTypes.string,
  idSpacing: PropTypes.string,
  idList: PropTypes.string,
};

export default AddList;
