import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import DateFormField from "@/common/components/shares/DateFormField";
import TimeFormField from "@/common/components/shares/TimeFormField";
import SelectFormField from "@/common/components/shares/SelectFormField";
import AutoCompleteFormField from "@/common/components/shares/AutoCompleteField";
import SharedAdvisors from "@/common/components/form/shared-advisors";

// data school testing for the autocomplete
const schools = [
  { id: 1, name: "Escuela Primaria A", department: "Cochabamba" },
  { id: 2, name: "Escuela Secundaria B", department: "La Paz" },
  { id: 3, name: "Instituto Tecnológico C", department: "Santa Cruz" },
];

const departments = [
  {
    id: 1,
    name: "Cochabamba",
  },
  {
    id: 2,
    name: "La Paz",
  },
  {
    id: 3,
    name: "Santa Cruz",
  },
];

const GeneralSectionTravel = () => {
  const { advisor } = useSelector((state) => state.loginAdvisor);
  const { values, setFieldValue } = useFormikContext();
  const [filteredSchools, setFilteredSchools] = useState([]);

  // useEffect for set advisors for the same area of the advisor login
  useEffect(() => {
    setFieldValue("idAdvisor", advisor.id);
  }, [advisor, setFieldValue]);

  console.log("ejecutandose");

  // useEffect for filtering schools based on department
  useEffect(() => {
    if (values.department) {
      const newFilteredSchools = schools.filter(
        (school) => school.department === values.department
      );
      if (
        JSON.stringify(newFilteredSchools) !== JSON.stringify(filteredSchools)
      ) {
        setFilteredSchools(newFilteredSchools);
      }
    } else {
      if (filteredSchools.length !== 0) {
        setFilteredSchools([]);
      }
    }
  }, [values.department, filteredSchools]);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Box display="flex" alignItems="center" flexDirection={"column"}>
          <Typography
            variant="h5"
            component="h5"
            gutterBottom
            fontWeight={"bold"}
          >
            Datos del viaje
          </Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <SharedAdvisors />
        </Box>
      </Grid>

      <SelectFormField
        name="department"
        label="Departamentos"
        catalog={departments || []}
        menuItemValue="name"
        value={values.department || ""}
        optionValue="name"
        xs={12}
        sm={12}
        md={4}
        lg={4}
      />

      <AutoCompleteFormField
        name="idSchool"
        label="Escoger escuelas"
        options={filteredSchools}
        limitTags={5}
        getOptionLabel={(option) => option.name}
        getOptionSelectedValue={(option) => option.id}
        xs={12}
        sm={12}
        md={8}
        lg={8}
        icon={<SchoolIcon />}
      />

      <DateFormField
        name="date" // key name for formik
        label="Fecha del viaje"
        xs={12}
        sm={12}
        md={4}
        lg={4}
      />

      <TimeFormField
        name="entryTime" // key name for formik
        label="Llegada del viaje"
        xs={12}
        sm={12}
        md={4}
        lg={4}
      />

      <TimeFormField
        name="departureTime" // key name for formik
        label="Regreso del viaje"
        xs={12}
        sm={12}
        md={4}
        lg={4}
      />

      {/* <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <SharedAdvisors />
        </Box>
      </Grid> */}
    </Grid>
  );
};

export default GeneralSectionTravel;
