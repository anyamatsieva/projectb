import { useState } from "react";
import styles from "../styles/components.module.css";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const AddWork = () => {
  const [contentHash, setContentHash] = useState("");

  const { writeContractAsync } = useScaffoldWriteContract("IntellectualPropertyRegistry");

  const handleRegister = async () => {
    if (!contentHash) {
      alert("Хеш контента не может быть пустым");
      return;
    }
    try {
      await writeContractAsync({
        functionName: "addWork",
        args: [contentHash],
      });
      alert("Контент успешно зарегистрирован!");
    } catch (error) {
      console.error(error);
      alert("Регистрация не удалась!");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Регистрация контента</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Введите хеш контента"
        value={contentHash}
        onChange={e => setContentHash(e.target.value)}
      />
      <button className={styles.button} onClick={handleRegister}>
        Зарегистрировать
      </button>
    </div>
  );
};

export default AddWork;
