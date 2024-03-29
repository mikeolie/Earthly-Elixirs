import React from "react";
import Snackbar, { type SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { type SNACKBAR_STATUSES } from "../@types";

interface DefaultSnackbarProps {
  setSnackbar: (bool: boolean) => void;
  severity: SNACKBAR_STATUSES;
  isOpen: boolean;
  snackbarMessage: string;
  positioning?: SnackbarOrigin;
}

function DefaultSnackbar({
  setSnackbar,
  severity,
  isOpen,
  snackbarMessage,
  positioning = {
    vertical: "bottom",
    horizontal: "left",
  },
}: DefaultSnackbarProps): JSX.Element {
  const handleSnackbarClose = (
    _e?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };
  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={positioning}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}

DefaultSnackbar.defaultProps = {
  positioning: {
    vertical: "bottom",
    horizontal: "left",
  },
};

export default DefaultSnackbar;
