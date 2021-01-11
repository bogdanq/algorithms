import { createEvent, restore } from "effector";

import { code } from "./code-string";

export const handleChangeCode = createEvent<string>();
export const $code = restore(handleChangeCode, code);

export const $trimmedEditorCode = $code.map((it) => it.trim());
