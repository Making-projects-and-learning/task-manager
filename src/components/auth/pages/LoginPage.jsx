/** Libraries */
import React from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";

import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import { useFormik } from "formik";

/** Custom hooks */
import { useAuthStore } from "../../../hooks";

/** Helpers */
import { YupLoginValidations } from "../../../helpers";

/** Material UI - Custom components */
const LoginContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  minHeight: "650px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const SecondContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "flex-start",
    marginTop: '10vh',
  },
}));

const ImageContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "35vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mb: 1,
  [theme.breakpoints.down("sm")]: {
    minHeight: "30vh",
    mb: 0,
  },
}));

const Image = styled("img")(({ theme }) => ({
  maxWidth: "30ch",
  objectFit: "cover",
  objectPosition: "20% 10%",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "70%",
    maxHeight: "25ch",
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  mb: 2,
  mt: 1,
  backgroundColor: "#e73213",
  ":hover": {
    backgroundColor: "#be371f",
  },
}));

export const LoginPage = () => {
  const navigate = useNavigate();

  const { StartLogin } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      email: "test1@test.com",
      password: "123456",
    },

    validationSchema: YupLoginValidations,
    onSubmit: async (values, { resetForm }) => {
      StartLogin(values);
      resetForm();
    },
  });

  return (
    <LoginContainer>
      <SecondContainer>
        <ImageContainer>
          <Image
            src="https://res.cloudinary.com/the-kings-company/image/upload/v1674366078/task%20manager%20API/81361657-icono-del-administrador-de-tareas_rkrat8.png"
            alt=""
          />
        </ImageContainer>
        <Box
          component="form"
          sx={{ mt: 3, width: "90%" }}
          onSubmit={formik.handleSubmit}
        >
          <Grid
            container
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Grid item sx={{ width: { xs: "100%", sm: "50%", md: "30%" } }}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item sx={{ width: { xs: "100%", sm: "50%", md: "30%" } }}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LoginButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
              >
                Login
              </LoginButton>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" mt={3}>
            <Grid item>
              <Link as={LinkRouter} to="/register" variant="body2">
                <Typography variant="p" color="#1976D2">
                  You do not have an account?
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </SecondContainer>
    </LoginContainer>
  );
};
