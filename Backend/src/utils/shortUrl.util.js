import { nanoid } from "nanoid";

export const createId = (length) => {
    return nanoid(length);
}