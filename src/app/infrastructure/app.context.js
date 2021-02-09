import React from "react";
import { createStoreHook, createDispatchHook, createSelectorHook } from "react-redux";

export const context = React.createContext();
export const useStore = createStoreHook(context);
export const useDispatch = createDispatchHook(context);
export const useSelector = createSelectorHook(context);