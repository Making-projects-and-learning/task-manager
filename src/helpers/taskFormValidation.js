import * as Yup from "yup";

const taskFormValidationSchema = Yup.object({
  title: Yup.string().required("title is important!"),
  body: Yup.string().required("body is important!"),
});

export default taskFormValidationSchema;
