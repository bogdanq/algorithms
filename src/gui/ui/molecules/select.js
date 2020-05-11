import React from "react";
import { Select as DefaultSelect, MenuItem } from "@material-ui/core";
import { ceilType } from "../../../config";
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
      <MenuItem value={ceilType.BARIER}>Не проходимый барьер</MenuItem>
      <MenuItem value={ceilType.WATER}>Вода (вес 10)</MenuItem>
      <MenuItem value={ceilType.SAND}>Пеоск (вес 3)</MenuItem>
    </DefaultSelect>
  );
}
