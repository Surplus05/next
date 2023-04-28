import { signIn } from "next-auth/react";
import styles from "@/styles/login.module.scss";

interface SNS {
  color: string;
  url: string;
}

const sns: SNS[] = [
  { color: "#ff0", url: "kakao" },
  { color: "#333", url: "github" },
  { color: "#2db400", url: "naver" },
];

export default function Login() {
  function onClickClose(event: React.BaseSyntheticEvent) {
    let modal = document.getElementById("loginModal") as HTMLElement;
    let main = document.getElementById("main") as HTMLElement;
    modal.style.cssText = "display:none";
    main.style.cssText = "overflow:auto";
  }

  return (
    <div tabIndex={-1} id="loginModal" className={styles.background}>
      <div className={styles.modalInner}>
        <div className={styles.header}>
          <div onClick={onClickClose} className={styles.close}>
            <div className={styles.left}></div>
            <div className={styles.right}></div>
          </div>
        </div>
        <div className={styles.loginModal}>
          <div className={styles.text}>
            <span style={{ fontSize: "32px" }}>환영합니다!</span>
            <span>기존 계정으로 로그인하세요. 아직은 깃허브만 지원해요.</span>
          </div>
          <ul className={styles.social}>
            {sns.map((corp: SNS) => {
              return (
                <li key={corp.url} className={styles.iconBox}>
                  <div
                    onClick={() => {
                      signIn(corp.url);
                    }}
                    className={styles.icon}
                    style={{
                      display: "flex",
                      borderRadius: "6px",
                      backgroundColor: corp.color,
                      boxShadow: "0 5px 25px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <img
                      style={{
                        width: "inherit",
                        height: "inherit",
                        userSelect: "none",
                      }}
                      src={"/sns/" + corp.url + ".svg"}
                      alt={corp.url}
                    />
                  </div>
                  <span className={styles.sns}>
                    {corp.url.toUpperCase() + "로 로그인하기"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
