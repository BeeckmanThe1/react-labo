import {createContext} from "react";

export const SharedContext = createContext<{message: string}>(null)
