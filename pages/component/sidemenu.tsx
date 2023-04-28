import styles from "../../styles/sidemenu.module.scss";

export default function SideMenu() {
  return (
    <div id="sideMenu" className={`${styles.box} + inActive`}>
      <div className={styles.title}>메뉴</div>
      <ul>
        <li className={styles.menu}>루틴</li>
        <li className={styles.menu}>1rm</li>
        <li className={styles.menu}>체성분</li>
      </ul>
    </div>
  );
}
