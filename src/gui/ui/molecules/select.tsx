import React from "react";
import { Select as DefaultSelect, MenuItem } from "@material-ui/core";
import { BarrierType } from "../../../config";
import { setBarrierType, $barrierType } from "../../../graph";
import { useStore } from "effector-react";

export function SelectBarrierType() {
  const barrierType = useStore($barrierType);

  const handleChange = React.useCallback((event) => {
    setBarrierType(event.target.value);
  }, []);

  return (
    <DefaultSelect
      style={{ width: "100%" }}
      value={barrierType}
      onChange={handleChange}
    >
      <MenuItem value={BarrierType.BARIER}>Не проходимый барьер</MenuItem>
      <MenuItem value={BarrierType.WATER}>Вода (вес 10)</MenuItem>
      <MenuItem value={BarrierType.SAND}>Песок (вес 3)</MenuItem>
    </DefaultSelect>
  );
}
