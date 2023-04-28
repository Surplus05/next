import styles from "@/styles/manage.module.scss";
import { ChangeEvent, FormEvent, ReactElement, useRef, useState } from "react";
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

export default function Manage({ session }: { session: Session }) {
  const [exercise, setExercise] = useState<Array<Exercise>>([]);
  let routineRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function onClickAdd() {
    let newOrder =
      exercise.length > 0 ? exercise[exercise.length - 1].order + 1 : 1;
    let newExercise: Array<Exercise> = JSON.parse(JSON.stringify(exercise));
    newExercise.push({ order: newOrder, name: "", set: 0 });
    setExercise(newExercise);
  }

  function onClickRemove(index: number) {
    let newExercise: Array<Exercise> = JSON.parse(JSON.stringify(exercise));
    newExercise.splice(index, 1);
    setExercise(newExercise);
  }

  async function onClickPost() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/routineList`, {
        method: "POST",
        body: JSON.stringify({
          routineName: routineRef.current!.value,
          exercises: exercise,
        }),
      });
      router.push("/manage");
    } catch (e) {
      alert("전송 실패");
    }
  }

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
          <span className={styles.title}>새 루틴을 추가합니다.</span>
          <form className={styles.form}>
            <input
              style={{ width: "100%" }}
              ref={routineRef}
              type="text"
              name="type"
              id="type"
              placeholder="루틴 종류"
            />
            {exercise.map((e: Exercise, i: number) => {
              return (
                <div key={e.order} className={styles.exerciseBox}>
                  <input
                    className={styles.name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      e.name = event.currentTarget.value;
                    }}
                    type="text"
                    name={`order${e.order}ExerName`}
                    placeholder="운동 명"
                  />
                  <input
                    className={styles.set}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      e.set = Number(event.currentTarget.value);
                    }}
                    key={e.order}
                    type="number"
                    name={`order${e.order}ExerSet`}
                    placeholder="세트 수"
                  />
                  <span
                    style={{ width: "10%", margin: "auto", cursor: "pointer" }}
                    onClick={() => {
                      onClickRemove(i);
                    }}
                  >
                    삭제
                  </span>
                </div>
              );
            })}
          </form>
          <div style={{ display: "flex" }}>
            <button className={styles.formButton} onClick={onClickAdd}>
              새 운동 추가
            </button>
            <button className={styles.formButton} onClick={onClickPost}>
              저장
            </button>
          </div>
          <button
            className={styles.formButton}
            onClick={() => {
              router.push("/manage");
            }}
          >
            돌아가기
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

Manage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeaderLayout>
      <SideLayout>
        <SummaryLayout>{page}</SummaryLayout>
      </SideLayout>
    </HeaderLayout>
  );
};
