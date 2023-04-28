import styles from "@/styles/summary.module.scss";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

interface Daily {
  lastExercise: number;
  continuous: number;
}

export default function Summary() {
  const [session, setSession] = useState<Session | null>(null);
  const [daily, setDaily] = useState<Daily | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      setSession(session);
      const daily = await (
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/daily`)
      ).json();
      setDaily(daily);
    };

    fetchData();
  }, []);

  const postData = useCallback(() => {
    const postData = async () => {
      let newDaily = await (
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/daily`, {
          method: "POST",
        })
      ).json();

      setDaily(newDaily);
    };

    if (Date.now() - daily?.lastExercise > 43200000) postData();
  }, [session]);

  if (!session) return <>loading..</>;

  let buttonText = "오운완";
  if (Date.now() - daily?.lastExercise < 43200000) {
    buttonText = "수고했어요!";
  }
  return (
    <div
      style={{
        flexGrow: "1",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className={styles.manageBox}>
        <div className={styles.summary}>
          <div className={styles.profile}>
            <img src={session.user?.image as string} alt="" />
            <div className={styles.metadata}>
              <span className={styles.userName}>{session.user?.name}</span>
              <div className={styles.banner}>
                {daily?.continuous}일 째 연속 운동중
              </div>
              <div onClick={postData} className={styles.exercise}>
                {buttonText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
