import styles from "@/styles/manage.module.scss";
import { ReactElement, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import HeaderLayout from "../layout/headerLayout";
import SideLayout from "../layout/sideLayout";
import SummaryLayout from "../layout/summaryLayout";
import { useRouter } from "next/router";

interface Exercise {
  order: number;
  name: string;
  set: number;
}

export default function DetailView({ session }: { session: Session }) {
  const [routine, setRoutine] = useState<Exercise[]>([]);
  const [routineName, setRoutineName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      let result = await (
        await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/api/routine?id=${router.asPath.replace("/manage/", "")}`
        )
      ).json();
      setRoutine(result.exercises);
      setRoutineName(result.routineName);
    };

    fetchData();
  }, []);

  async function onClickDelete() {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/routine`, {
      method: "DELETE",
      headers: { id: `${router.asPath.replace("/manage/", "")}` },
    });
    router.push("/manage");
  }

  if (!routine) return <>404 Not Found</>;

  return (
    <div
      style={{
        maxWidth: "100vw",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className={styles.box}>
        <div className={styles.list}>
          <span className={styles.title}>{routineName} 루틴</span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {routine.map((r: Exercise) => {
              return (
                <span
                  className={styles.exercise}
                  key={r.order}
                >{`${r.name} ${r.set}세트`}</span>
              );
            })}
          </div>
          <div style={{ display: "flex" }}>
            <button
              className={styles.formButton}
              onClick={() => {
                router.push(router.asPath + "/edit");
              }}
            >
              루틴 수정
            </button>
            <button className={styles.formButton} onClick={onClickDelete}>
              루틴 삭제
            </button>
          </div>
          <button
            className={styles.formButton}
            onClick={() => {
              router.push("/manage");
            }}
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

DetailView.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeaderLayout>
      <SideLayout>
        <SummaryLayout>{page}</SummaryLayout>
      </SideLayout>
    </HeaderLayout>
  );
};
