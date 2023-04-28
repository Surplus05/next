import React, { ReactElement } from "react";
import SideMenu from "../component/sidemenu";
import styles from "@/styles/sidelayout.module.scss";

export default function SideLayout({ children }: { children: ReactElement }) {
  return (
    <div className={styles.sidelayout}>
      <SideMenu />
      <div className={styles.contents}>{children}</div>
    </div>
  );
}
