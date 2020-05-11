import React from "react";
import { FormControlLabel, Switch as DefaultSwitch } from "@material-ui/core";
import { FlexContainer, Left } from "../templates";

export function Switch({ label, name = "gilad", ...rest }) {
  return (
    <label style={{ cursor: "pointer" }}>
      <FlexContainer>
        <Left>
          <FormControlLabel control={<DefaultSwitch {...rest} name={name} />} />
        </Left>
        <h3>{label}</h3>
      </FlexContainer>
    </label>
  );
}
