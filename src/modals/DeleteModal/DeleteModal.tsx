import { useContext } from "react";
import Button from "../../components/ui/Button/Button";
import { Board } from "../../models/board";
import styles from "./DeleteModal.module.css";
import { UiContext } from "../../context/uiContext";
import { useQueryClient } from "@tanstack/react-query";
import useBoardsMutation, { Action } from "../../hooks/useBoardsMutation";
import { Column } from "../../models/column";
import { Card } from "../../models/card";

type DeleteModalProps = {
  target: "board" | "column" | "task";
  object: Board | Column | Card;
};

const DeleteModal = ({ target, object }: DeleteModalProps) => {
  const { closeModal } = useContext(UiContext);
  const queryClient = useQueryClient();
  const deleteBoard = useBoardsMutation(Action.DeleteBoard);

  let text = "";
  switch (target) {
    case "board":
      text = `Are you sure you want to delete the ‘${
        (object as Board).name
      }’ board? This action will remove all columns and tasks and cannot be reversed.`;
      break;
    case "column":
      text = `Are you sure you want to delete the ‘${
        (object as Column).name
      }’ column? This action will remove all tasks and cannot be reversed.`;
      break;
    case "task":
      text = `Are you sure you want to delete the ‘${
        (object as Card).title
      }’ task and its subtasks? This action cannot be reversed`;
      break;
    default:
      break;
  }

  const handleDelete = () => {
    const boardsList = queryClient.getQueryData(["getBoardsList"]) as Board[];
    const newBoardsList = boardsList.filter(
      (board) => board.id !== (object as Board).id
    );
    deleteBoard.mutate(newBoardsList);
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };
  return (
    <div className={styles.container}>
      <h1 className={`heading--l ${styles.heading}`}>Delete this {target}?</h1>
      <p className="text">{text}</p>
      <div className={styles.buttonsContainer}>
        <Button
          type="negative"
          stretched
          text="Delete"
          onClick={handleDelete}
        />
        <Button
          type="secondary"
          stretched
          text="Cancel"
          onClick={handleCancel}
        />
      </div>
    </div>
  );
};

export default DeleteModal;
