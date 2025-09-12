import { useState } from "react";
import styles from "./PersonalGreeting.module.css";

export default function PersonalGreeting() {
  const [name, setName] = useState("John Dowson");
  return (
    <div className={styles.container}>
      <h2>It is nice to meet you, {name}</h2>
      {/* контролируемый инпут */}
      <input
        type="text"
        placeholder="enter your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </div>
  );
}

// John Dowson = Max Musterman
