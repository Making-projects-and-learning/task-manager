/** Libraries */
import * as Yup from "yup";

const registerValidationsSchema = Yup.object({
  name: Yup.string()
    .max(15, "name must be 15 characters or less")
    .required("this field is required"),
  email: Yup.string()
    .email("Invalid email address!")
    .required("This field is required"),
  password: Yup.string()
    .min(6, "Password should contain at least 6 characters")
    .required("this field is required"),
});

export default registerValidationsSchema;
