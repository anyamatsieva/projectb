import { useState } from "react";
import styles from "../styles/components.module.css";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const TransferRights = () => {
  const [contentHash, setContentHash] = useState("");
  const [newOwner, setNewOwner] = useState("");

  const { writeContractAsync, isMining } = useScaffoldWriteContract("IntellectualPropertyRegistry");

  const handleTransfer = async () => {
    if (!contentHash || !newOwner) {
      alert("Хеш контента и адрес нового владельца не могут быть пустыми");
      return;
    }

    try {
      await writeContractAsync({
        functionName: "transferRights",
        args: [contentHash, newOwner],
      });
      alert("Права собственности успешно переданы!");
    } catch (error) {
      console.error("Ошибка при передаче прав собственности:", error);
      alert("Передача не удалась!");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Передача прав собственности</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Введите хеш контента"
        value={contentHash}
        onChange={e => setContentHash(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Введите адрес нового владельца"
        value={newOwner}
        onChange={e => setNewOwner(e.target.value)}
      />
      <button className={styles.button} onClick={handleTransfer} disabled={isMining}>
        {isMining ? "Передача..." : "Передать"}
      </button>
    </div>
  );
};

export default TransferRights;
