import styles from "@/styles/Home.module.scss";
import { ReactElement } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import HeaderLayout from "./layout/headerLayout";

export default function Home() {
  function onClickShow() {
    let modal = document.getElementById("loginModal") as HTMLElement;
    let main = document.getElementById("main") as HTMLElement;
    modal.style.cssText = "display:flex";
    main.style.cssText = "overflow:hidden";
  }

  return (
    <div id="main" className={styles.body}>
      <div className={styles.box}>
        <div className={styles.contents}>
          <div className={styles.title}>
            건강한 삶을 이끄는 첫걸음 개인 맞춤형 운동 관리
          </div>
          <div className={styles.desc}>
            쉽고 간편하게 나만의 운동루틴을 설정하고 기록하세요. 개인 맞춤형
            루틴부터 1RM, 체성분까지 다양한 항목을 지원해요.
          </div>
          <div className={styles.buttons}>
            <button onClick={onClickShow} className={styles.button}>
              <span>시작하기</span>
            </button>
            <button
              style={{ backgroundColor: "var(--gray)", color: "var(--black)" }}
              className={styles.button}
            >
              <span>자세히 알아보기</span>
            </button>
          </div>
        </div>
        <img className={styles.intro} src={`/intro.png`} alt="main" />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/manage",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <HeaderLayout>{page}</HeaderLayout>;
};
