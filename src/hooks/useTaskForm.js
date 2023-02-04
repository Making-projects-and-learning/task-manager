import { useFormik } from "formik";
import taskFormValidationSchema from "../helpers/taskFormValidation";
const useTaskForm = (handleSubmit, title, body) => {
  const formik = useFormik({
    initialValues: {
      title: title || "",
      body: body || "",
    },
    onSubmit: handleSubmit,
    validationSchema: taskFormValidationSchema,
  });
  return formik;
};

export default useTaskForm;
