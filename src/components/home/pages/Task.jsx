import {
  Grid,
  Tooltip,
  IconButton,
  Checkbox,
  Modal,
  Typography,
  Toolbar,
  TextField,
  Button,
} from "@mui/material";
import { CloseOutlined, DeleteRounded, Edit } from "@mui/icons-material";
import { useState } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/system";
import useTaskManger from "../../../hooks/useTaskManager";
import useTaskForm from "../../../hooks/useTaskForm";

const ModalBox = styled(Box)({
  width: "50%",
  height: "50vh",
  position: "absolute",
  backgroundColor: "#fff",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const Task = ({ _id, title, body, status }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateCurrentTask, deleteTask, finishTask } = useTaskManger();
  const formik = useTaskForm(
    async ({ title, body }) => {
      await updateCurrentTask(_id, title, body);
      handleClose();
    },
    title,
    body
  );

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRemove = () => {
    deleteTask(_id);
  };

  const handleFinish = (e) => {
    if (status) {
      finishTask(_id);
    }
  };

  const renderModal = () => (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalBox>
        <Toolbar>
          <Typography fontWeight="bold" sx={{ flexGrow: 1 }}>
            Edit Task
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Toolbar>
        <Grid
          container
          justifyContent={"center"}
          display="flex"
          gap="5px"
          marginTop="15px"
        >
          <Grid
            item
            container
            component={"form"}
            onSubmit={formik.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid>
              <TextField
                name="title"
                id="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={Boolean(formik.errors.title)}
              />
            </Grid>
            <Grid>
              <TextField
                name="body"
                error={Boolean(formik.errors.body)}
                value={formik.values.body}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid>
              <Button
                type="submit"
                variant="contained"
                color="info"
                size="large"
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </ModalBox>
    </Modal>
  );
  return (
    <>
      <Grid
        container
        display={"flex"}
        gap={5}
        sx={{ justifyContent: "center" }}
      >
        <Grid item xs={3}>
          {title}
        </Grid>
        <Grid item xs={3}>
          {body}
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="is Finish">
            <Checkbox checked={!status} onChange={handleFinish} />
          </Tooltip>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="to delete">
            <IconButton onClick={handleRemove}>
              <DeleteRounded color="error" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="to edit">
            <IconButton onClick={handleOpen}>
              <Edit color="warning" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {renderModal()}
    </>
  );
};

export default Task;
