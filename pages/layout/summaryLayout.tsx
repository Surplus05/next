import styles from "@/styles/manage.module.scss";
import { Session, getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import Summary from "../component/summary";

export default function SummaryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Summary />
      {children}
    </>
  );
}
