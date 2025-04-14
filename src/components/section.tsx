import styles from "./section.module.css";

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <hr />
      {children}
    </div>
  );
}
