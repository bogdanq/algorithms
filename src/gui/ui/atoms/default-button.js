import React from "react";
import { Button as DefaultButton } from "@material-ui/core";

export function Button({
  icon: Icon,
  type,
  size = 14,
  children,
  onClick,
  variant = "contained",
  color = "default",
}) {
  return type === "outline" ? (
    <DefaultButton onClick={onClick}>{children}</DefaultButton>
  ) : (
    <DefaultButton
      style={{ fontSize: "11px" }}
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={Icon && <Icon size={size} />}
    >
      {children}
    </DefaultButton>
  );
}
