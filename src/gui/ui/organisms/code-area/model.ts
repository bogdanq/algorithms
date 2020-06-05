import { createEvent, restore } from "effector";

export const handleChangeCode = createEvent<string>();
export const $code = restore(handleChangeCode, "");
