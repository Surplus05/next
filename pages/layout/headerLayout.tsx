import React, { ReactElement } from "react";
import Header from "../component/header";
import Login from "../component/login";

export default function HeaderLayout({ children }: { children: ReactElement }) {
  return (
    <>
      <Login />
      <Header />
      {children}
    </>
  );
}
