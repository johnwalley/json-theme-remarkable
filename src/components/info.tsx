import styles from "./info.module.css";

export function Info({ children }: { children: React.ReactNode }) {
  return <div className={styles.info}>{children}</div>;
}
