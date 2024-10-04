import { useState } from "react";
import Grid from "@mui/material/Grid2";
import FormInit from "@/common/components/form/form-init";
import CardsForms from "@/common/components/ui/cards";
import validationTravel from "./forms/validate-schemas";
import TravelDetail from "./components/detail-travel";
import TravelForm from "./forms/travel-form";
import TableTravel from "./components/table-travel";
import { Divider } from "@mui/material";

/**
 * Component to initialize the travel form
 * This component is controlled by formik
 *
 * @return {*}
 */

const TravelInit = () => {
  const [submitStatus, setSubmitStatus] = useState("idle");

  const initialValues = {
    idAdvisor: "",
    advisorsShared: [],
    sharedTravel: false,
    date: null,
    entryTime: "",
    departureTime: "",
    department: "",
    idSchool: [],
  };

  return (
    <FormInit
      initialValues={initialValues}
      validationSchema={validationTravel}
      onSubmit={(values) => (
        console.log(values),
        setSubmitStatus("success"),
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 3000)
      )}
    >
      {({ isSubmitting, errors, values }) => (
        <Grid container spacing={2} id="form-travel-grid-container">
          <Grid size={8} id="form-travel-grid-item">
            <CardsForms
              title="Formulario de viajes a escuelas"
              formComponent={
                <TravelForm
                  isSubmitting={isSubmitting}
                  submitStatus={submitStatus}
                  errors={errors}
                />
              }
              hcolor={"#1d2e3d"}
              height={"380px"}
            />
          </Grid>
          <Grid size={4}>
            <CardsForms
              title="Detalle del viaje"
              hcolor={"#1d2e3d"}
              formComponent={<TravelDetail data={values} />}
              height={"380px"}
            />
          </Grid>

          <Divider
            sx={{
              width: "100%",

              height: "2px",
              marginBottom: "2px",
              marginTop: "2px",
            }}
          />
          <Grid size={12}>
            <CardsForms
              title="Listado de viajes"
              hcolor={"#1d2e3d"}
              formComponent={<TableTravel />}
            />
          </Grid>
        </Grid>
      )}
    </FormInit>
  );
};

export default TravelInit;
