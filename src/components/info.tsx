import styles from "./info.module.css";

export function Info({ children }: { children: React.ReactNode }) {
  return <li className={styles.info}>{children}</li>;
}
