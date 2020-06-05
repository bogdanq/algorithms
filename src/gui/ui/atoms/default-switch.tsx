import { Event } from "effector";
import React from "react";
import { FormControlLabel, Switch as DefaultSwitch } from "@material-ui/core";
import { FlexContainer, Left } from "../templates";

type Props = {
  label: string;
  name?: string;
  onChange: Event<void>;
  checked: boolean;
};

export function Switch({ label, name = "gilad", ...rest }: Props) {
  return (
    <label style={{ cursor: "pointer" }}>
      <FlexContainer>
        <Left>
          <FormControlLabel
            label=""
            control={<DefaultSwitch {...(rest as any)} name={name} />}
          />
        </Left>
        <h3>{label}</h3>
      </FlexContainer>
    </label>
  );
}
