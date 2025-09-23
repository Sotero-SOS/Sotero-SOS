import { type User } from "./model/types";
import { login, logout } from "./model/utils";
import { getUserFromLocalStorage } from "./lib/userLocalStorageActions";

export type { User, login, logout };
export { getUserFromLocalStorage };
