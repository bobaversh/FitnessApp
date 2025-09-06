import styles from "./PlusButton.module.css"

export default function PlusButton({onClick}) {
  return (
    <button onClick = {onClick} className={styles.buttonAdd}>
      <i
        className="fa fa-plus-square"
        aria-hidden="true"
        style={{
          color: "#ffffff80",
          fontSize: "30px",
        }}
      />
    </button>
  );
}
