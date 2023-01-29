import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

export default function AlertNotification({ status, message }) {
  if (status === "success") {
    return (
      <Alert status="success" variant="left-accent" borderRadius={"md"}>
        <AlertIcon />
        {message}
      </Alert>
    );
  } else if (status === "error") {
    return (
      <Alert status="error" variant="left-accent" borderRadius={"md"}>
        <AlertIcon />
        {message}
      </Alert>
    );
  }
}
