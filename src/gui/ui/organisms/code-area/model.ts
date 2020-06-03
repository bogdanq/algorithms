import { createEvent, restore } from "effector";

export const handleChangeCode = createEvent();
export const $code = restore(handleChangeCode, "");
