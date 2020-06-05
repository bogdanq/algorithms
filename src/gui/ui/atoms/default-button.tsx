import React from "react";
import { Button as DefaultButton, ButtonTypeMap } from "@material-ui/core";

type Props = {
  icon?: React.ComponentType<{ size?: number }>;
  type?: "outline";
  children: React.ReactNode;
  onClick: () => void;
  iconSize?: number;
} & Exclude<ButtonTypeMap["props"], "size">;

export function Button({
  icon: Icon,
  type,
  iconSize = 14,
  children,
  onClick,
  variant = "contained",
  color = "default",
}: Props) {
  return type === "outline" ? (
    <DefaultButton onClick={onClick}>{children}</DefaultButton>
  ) : (
    <DefaultButton
      style={{ fontSize: "11px" }}
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={Icon && <Icon size={iconSize} />}
    >
      {children}
    </DefaultButton>
  );
}
