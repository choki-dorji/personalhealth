"use client";
import store from "./store";
import { Provider } from "react-redux";

export function Provider1({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

console.log(store.getState());
