import {
  AppBar,
  Avatar,
  Container,
  Toolbar,
  Tooltip,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import Task from "./Task";
import React from "react";
import { useEffect } from "react";
import useTaskManger from "../../../hooks/useTaskManager";
import { useAuthStore } from "../../../hooks/useAuthStore";
import useTaskForm from "../../../hooks/useTaskForm";

export const HomePage = () => {
  const { tasks, createNewTask, getAllTasks } = useTaskManger();
  const { StartLogout } = useAuthStore();
  const { name } = useAuthStore();
  const formik = useTaskForm(async ({ title, body }, { resetForm }) => {
    createNewTask(title, body);
    resetForm();
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    StartLogout();
    handleClose();
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  const renderAddTaskForm = () => (
    <Grid container justifyContent={"center"}>
      <Grid>
        <Typography variant="h6" fontWeight="bold">
          Add Task
        </Typography>
        <Grid
          component="form"
          onSubmit={formik.handleSubmit}
          container
          spacing={2}
          alignItems="center"
          mt="5px"
        >
          <Grid item>
            <TextField
              label="Title"
              name="title"
              id="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && !!formik.errors.title}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Body"
              name="body"
              value={formik.values.body}
              onChange={formik.handleChange}
              error={formik.touched.body && !!formik.errors.body}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              elevation={0}
              type="submit"
              sx={{
                height: "50px",
                backgroundColor: "#121212",
                color: "#fff",
                ":hover": {
                  backgroundColor: "#121212",
                },
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const renderTaskHeader = () => (
    <Grid container gap={5} display={"flex"} sx={{ justifyContent: "center" }}>
      <Grid item xs={3}>
        Title
      </Grid>
      <Grid item xs={3}>
        Body
      </Grid>
      <Grid item xs={1}>
        Finish
      </Grid>
      <Grid item xs={1}>
        Delete
      </Grid>
      <Grid item xs={1}>
        Update
      </Grid>
    </Grid>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "none", color: "#000", paddingY: 1 }}
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Hi! {name[0].toUpperCase() + name.slice(1)} 👋
          </Typography>
          <Tooltip title="profile">
            <IconButton
              onClick={handleMenu}
              aria-controls={open ? "menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar>{name[0].toUpperCase()}</Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          id="menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </AppBar>
      <Toolbar>{renderAddTaskForm()}</Toolbar>
      <Toolbar>
        <Container
          sx={{
            marginTop: "30px",
            maxHeight: "350px",
            overflowY: "auto",
            flexGrow: 1,
          }}
        >
          <Grid
            display={"flex"}
            gap={3}
            flexDirection="column"
            alignItems={"center"}
          >
            {renderTaskHeader()}

            {tasks.map((task) => (
              <Task key={task._id} {...task} />
            ))}
          </Grid>
        </Container>
      </Toolbar>
    </Box>
  );
};
