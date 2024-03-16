import { SyntheticEvent, useState } from "react";
import Button from "../../components/ui/Button/Button";
import InputMultipleFields from "../../components/ui/InputMultipleFields/InputMultipleFields";
import InputText from "../../components/ui/InputText/InputText";
import { Card } from "../../models/card";
import { Column } from "../../models/column";
import styles from "./CardModal.module.css";
import { Subtask } from "../../models/subtask";
import { v4 as generateId } from "uuid";
import useBoardsMutation, { Action } from "../../hooks/useBoardsMutation";

type CardModalProps = {
  type: "newCard" | "editCard";
  column?: Column;
  card?: Card;
};

const CardModal = ({ type, column, card }: CardModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const editBoard = useBoardsMutation(Action.EditBoard);

  const handleChangeName = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setName(input.value);
  };

  const handleChangeDescription = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setName(input.value);
  };

  const handleChangeSubtasks = (e: SyntheticEvent, index: number) => {
    const input = e.target as HTMLInputElement;
    const newSubtasksSet = [...subtasks];
    newSubtasksSet[index] = { ...newSubtasksSet[index], name: input.value };
    setSubtasks(newSubtasksSet);
  };

  const handleAddNewSubtask = () => {
    const newSubtasksSet = [
      ...subtasks,
      { id: generateId(), name: "", isCompleted: false },
    ];
    setSubtasks(newSubtasksSet);
  };

  const handleDeleteSubtask = (id: string) => {
    const newSubtasksSet = subtasks.filter((subtask) => subtask.id !== id);
    setSubtasks(newSubtasksSet);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const title = type === "newCard" ? "Add New Card" : "Edit Card";
  const buttonText = type === "newCard" ? "Create New Card" : "Save Changes";

  return (
    <form className={styles.cardModal} onSubmit={(e) => handleSubmit(e)}>
      <h1 className="heading--xl">{title}</h1>
      <InputText
        type="text"
        id="name"
        value={name}
        label="Title"
        placeholder="e.g. Take coffee break"
        onChange={(e) => handleChangeName(e)}
      />
      <InputText
        type="text"
        id="name"
        value={description}
        label="Description"
        placeholder="e.g. It’s always good to take a break. This 15 minute break will 
        recharge the batteries a little."
        onChange={(e) => handleChangeDescription(e)}
      />
      <InputMultipleFields
        label="Subtasks"
        value={subtasks}
        onChange={handleChangeSubtasks}
        onAdd={handleAddNewSubtask}
        onDelete={handleDeleteSubtask}
      />
      <Button text={buttonText} submit={true} disabled={editBoard.isPending} />
    </form>
  );
};

export default CardModal;
