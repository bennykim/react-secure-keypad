import styles from './stack.module.css';

type StackProps = {
  children: React.ReactNode;
};

export const Stack = ({ children }: StackProps) => {
  return <div className={styles.stack}>{children}</div>;
};
