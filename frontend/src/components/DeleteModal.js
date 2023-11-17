import { Box, Button, Modal } from "@mui/material";
import { DELETE_DATA } from "./Constant";

function DeleteModal({ open, onClose, dispatch, id }) {
  const handleClick = () => {
    dispatch({ type: DELETE_DATA, payload: id });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          width: "300px",
          height: "200px",
          padding: "16px",
          maxWidth: "80vw",
          maxHeight: "80vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <p className="text-lg"> Are you sure you want to delete? </p>
          <div className="mt-8 ml-20">
            <Button onClick={handleClick}> Yes </Button>
            <Button onClick={onClose}> Cancel </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
