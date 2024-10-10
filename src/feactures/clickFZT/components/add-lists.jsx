import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import * as Yup from "yup";
import { getData, postData } from "@/services/api";
import PropTypes from "prop-types";
import FormInit from "@/common/components/form/form-init";
import CardsForms from "@/common/components/ui/cards";
import ListForm from "../forms/list-form";

const AddList = ({
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FormInit
      initialValues={initValues}
      validationSchema={validateSchemaList}
      onSubmit={async (values) => {
        console.log(values);
        await postData("api/clickup/list", values);
        setOpenDialog(false);
        setShowAlert(true);
      }}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Grid container spacing={2} id="spacing-init-form-grid">
          <Grid size={12} id="spacing-init-form">
            <CardsForms
              title={
                context === "createList"
                  ? `Creando Lista en ${nameSpacing}`
                  : "Formulario de Edición de Listas"
              }
              formComponent={
                <ListForm
                  isSubmitting={isSubmitting}
                  idSpacing={idSpacing}
                  setNameSpacing={setNameSpacing}
                />
              }
              hcolor={"#1d2e3d"}
              height={"380px"}
            />
          </Grid>
        </Grid>
      )}
    </FormInit>
  );
};

AddList.propTypes = {
  setOpenDialog: PropTypes.func,
  setShowAlert: PropTypes.func,
  context: PropTypes.string,
  idSpacing: PropTypes.string,
  idList: PropTypes.string,
};

export default AddList;
