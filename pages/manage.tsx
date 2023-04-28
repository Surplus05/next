import styles from "@/styles/manage.module.scss";
import HeaderLayout from "./layout/headerLayout";
import { ReactElement, useEffect, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { Session, getServerSession } from "next-auth";
import SideLayout from "./layout/sideLayout";
import SummaryLayout from "./layout/summaryLayout";
import { useRouter } from "next/router";

interface Exercise {
  order: number;
  name: string;
  set: number;
}

interface Routine {
  _id: string;
  user: string;
  routineName: string;
  routines: Array<Exercise>;
}

export default function Manage({ session }: { session: Session }) {
  const [routines, setRoutines] = useState<Array<Routine>>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      let e = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/routineList`
      );
      let data = await e.json();
      setRoutines(data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ margin: "auto", display: "flex", justifyContent: "center" }}>
      <div className={styles.box}>
        <div className={styles.list}>
          <span className={styles.title}>나의 루틴 관리</span>

          {routines.map((r: Routine) => {
            return (
              <div
                key={r._id}
                className={styles.routine}
                onClick={() => {
                  router.push("/manage/" + r._id);
                }}
              >
                <img className={styles.logo} src="/file.svg" alt="routine" />
                <span className={styles.routineTitle}>{r.routineName}</span>
              </div>
            );
          })}

          <div
            className={styles.routine}
            onClick={() => {
              router.push("/manage/add");
            }}
          >
            <img className={styles.logo} src="/plus.svg" alt="routine" />
            <span className={styles.routineTitle}>새 루틴 추가</span>
          </div>
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

Manage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeaderLayout>
      <SideLayout>
        <SummaryLayout>{page}</SummaryLayout>
      </SideLayout>
    </HeaderLayout>
  );
};
