import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Link, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import registerValidationsSchema from "../../../helpers/registerFormValidation";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";

const RegisterContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  paddingBottom: "20px",
}));

const FormContainer = styled("div")(({ theme }) => ({
  width: "50%",
  margin: "0 auto",
  minHeight: "calc(100vh - 100px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "65%",
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
}));

export const RegisterPage = () => {
  const { StartRegister } = useAuthStore();
  const userForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerValidationsSchema,
    onSubmit: (values, { resetForm }) => {
      StartRegister(values);
      resetForm();
      navigate("/login", {
        replace: true,
      });
    },
  });
  const navigate = useNavigate();

  const renderForm = () => (
    <Form onSubmit={userForm.handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        value={userForm.values.name}
        onChange={userForm.handleChange}
        name="name"
        error={userForm.touched.name && !!userForm.errors.name}
        helperText={userForm.touched.name && userForm.errors.name}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={userForm.values.email}
        onChange={userForm.handleChange}
        name="email"
        error={userForm.touched.email && !!userForm.errors.email}
        helperText={userForm.touched.email && userForm.errors.email}
      />
      <TextField
        label="Password"
        variant="outlined"
        value={userForm.values.password}
        onChange={userForm.handleChange}
        name="password"
        type="password"
        error={userForm.touched.password && !!userForm.errors.password}
        helperText={userForm.touched.password && userForm.errors.password}
      />
      <Button
        variant="contained"
        type="submit"
        size="large"
        sx={{
          width: "min-content",
          margin: "0 auto",
          backgroundColor: "#e73213",
          "&:hover": {
            backgroundColor: "#be371f",
          },
        }}
      >
        Register
      </Button>
    </Form>
  );

  return (
    <RegisterContainer>
      <FormContainer>
        <Box
          sx={{
            width: "300px",
            height: "300px",
          }}
          component="img"
          src="https://res.cloudinary.com/the-kings-company/image/upload/v1674366078/task%20manager%20API/81361657-icono-del-administrador-de-tareas_rkrat8.png"
          alt="task manger logo"
        />
        {renderForm()}
      </FormContainer>
      <Grid
        container
        sx={{
          width: "80%",
          margin: "0 auto",
          justifyContent: {
            xs: "center",
            sm: "flex-end",
          },
        }}
      >
        <Grid item>
          <Typography>
            Already have an account{" "}
            <Link
              component="button"
              onClick={() => {
                navigate("/login");
              }}
              sx={{
                fontSize: "16px",
                color: "#000",
                fontWeight: "600",
              }}
            >
              Login
            </Link>{" "}
            🚀
          </Typography>
        </Grid>
      </Grid>
    </RegisterContainer>
  );
};
