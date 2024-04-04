import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  handleClose: () => void;
  deleteMessage: string;
  handleDelete: () => Promise<void>;
}

function DeleteConfirmModal({
  isOpen,
  handleClose,
  deleteMessage,
  handleDelete,
}: DeleteConfirmModalProps): JSX.Element {
  const handleDeleteClick = (): void => {
    handleDelete()
      .then(() => {})
      .catch(() => {});
  };
  const handleCloseClick = (): void => {
    handleClose();
  };
  return (
    <Modal className="modal__container" open={isOpen}>
      <Box className="modal-content__container">
        <header className="modal__header">Delete Confirmation</header>
        <section className="modal__summary">
          <article className="modal__instructions">
            <summary>{deleteMessage}</summary>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </article>
        </section>
        <footer>
          <Button
            variant="text"
            color="info"
            style={{ color: "grey" }}
            onClick={handleCloseClick}
          >
            Close
          </Button>
        </footer>
      </Box>
    </Modal>
  );
}

export default DeleteConfirmModal;
