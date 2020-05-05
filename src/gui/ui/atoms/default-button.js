import React from "react";
import { Button as DefaultButton } from "@material-ui/core";

export function Button({
  icon: Icon,
  // type,
  size = 15,
  children,
  onClick,
  variant = "contained",
  color = "default",
}) {
  return (
    <DefaultButton
      style={{ fontSize: "12px" }}
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={<Icon size={size} />}
    >
      {children}
    </DefaultButton>
  );
}
