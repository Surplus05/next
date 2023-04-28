import { Session } from "next-auth";
import styles from "../../styles/header.module.scss";
import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then(setSession).catch(console.log);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("load", handleResize, false);
    window.addEventListener("resize", handleResize, false);

    return () => {
      window.removeEventListener("load", handleResize, false);
      window.removeEventListener("resize", handleResize, false);
    };
  }, []);

  function onClickShow() {
    let modal = document.getElementById("loginModal") as HTMLElement;
    let main = document.getElementById("main") as HTMLElement;
    modal.style.cssText = "display:flex";
    main.style.cssText = "overflow:hidden";
  }

  function onClickClose(event: React.BaseSyntheticEvent) {
    let modal = document.getElementById("loginModal") as HTMLElement;
    let main = document.getElementById("main") as HTMLElement;
    modal.style.cssText = "display:none";
    signOut();
  }

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        {router.pathname.includes("manage") ? (
          <div
            onClick={() => {
              let sideMenu = document.getElementById("sideMenu") as HTMLElement;
              sideMenu.classList.toggle("inActive");
            }}
            className={styles.menuBtn}
          >
            <img src={`/menu.svg`} alt="menu" />
          </div>
        ) : (
          <></>
        )}
        <div className={styles.logo}>
          <img src={`/logo.svg`} alt="logo" />
          <span className={styles.logoSpan}>오운완</span>
        </div>
        <div className={styles.menu}>
          {session == null ? (
            <button onClick={onClickShow}>
              <span>로그인</span>
            </button>
          ) : (
            <button onClick={onClickClose}>
              <span>로그아웃</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
