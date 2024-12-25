import { useState } from "react";
import styles from "../styles/components.module.css";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const CheckWork = () => {
  const [contentHash, setContentHash] = useState("");

  const { data: contentData } = useScaffoldReadContract({
    contractName: "IntellectualPropertyRegistry",
    functionName: "checkWork",
    args: [contentHash],
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Проверка контента</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Введите хеш контента"
        value={contentHash}
        onChange={e => setContentHash(e.target.value)}
      />
      {contentData && (
        <div className={styles.result}>
          <p>Автор: {contentData[0]}</p>
          <p>Дата регистрации: {new Date(Number(contentData[1]) * 1000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default CheckWork;
