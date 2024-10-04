import * as Yup from "yup";

const validationTravel = () => {
  return Yup.object({
    idAdvisor: Yup.string().required("El asesor es obligatorio"),
    advisorsShared: Yup.array()
      .required()
      .test(
        "advisors-shared-conditional",
        "Debe seleccionar al menos un asesor",
        function (value) {
          const { sharedTravel } = this.parent;
          if (sharedTravel) {
            return value && value.length > 0;
          } else {
            return value && value.length === 0;
          }
        }
      ),
    sharedTravel: Yup.boolean().notRequired(),
    date: Yup.date()
      .max(
        new Date(),
        "No se puede crear un viaje con una fecha que no sea de hoy o anterior"
      )
      .required("La fecha de la visita es obligatoria"),
    // validate time is not greater than departureTime
    entryTime: Yup.string()
      .required("La hora de entrada es obligatoria")
      .test(
        "is-less-than-departureTime",
        "La hora de entrada debe ser menor que la hora de salida",
        function (value) {
          const { departureTime } = this.parent;
          return departureTime ? value < departureTime : true;
        }
      ),
    // validate time is not less than entryTime
    departureTime: Yup.string()
      .required("La hora de salida es obligatoria")
      .test(
        "is-greater-than-entryTime",
        "La hora de salida debe ser mayor que la hora de entrada",
        function (value) {
          const { entryTime } = this.parent;
          return entryTime ? value > entryTime : true;
        }
      ),
    // validate selected one or more schools
    idSchool: Yup.array()
      .min(1, "Debe agregar al menos una escuela")
      .required("Required"),
  });
};

export default validationTravel;
