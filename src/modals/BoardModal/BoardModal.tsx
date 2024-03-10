import { SyntheticEvent } from "react";
import Button from "../../components/ui/Button/Button";
import InputText from "../../components/ui/InputText/InputText";
import styles from "./BoardModal.module.css";

type BoardModalProps = {
  type: "newBoard" | "editBoard";
};
const BoardModal = ({ type }: BoardModalProps) => {
  const title = type === "newBoard" ? "Add New Board" : "Edit Board";
  const buttonText = type === "newBoard" ? "Create New Board" : "Save Changes";

  // TODO state of fields

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = form.elements.namedItem("title") as HTMLInputElement;

    console.log(title.value);
  };

  return (
    <form className={styles.boardModal} onSubmit={(e) => handleSubmit(e)}>
      <h1 className="heading--xl">{title}</h1>
      <InputText
        type="text"
        id="title"
        label="Board Name"
        placeholder="e.g. Web Design"
      />
      <Button text={buttonText} submit={true} />
    </form>
  );
};

export default BoardModal;
