import { SyntheticEvent, useState } from "react";
import Button from "../../components/ui/Button/Button";
import InputText from "../../components/ui/InputText/InputText";
import styles from "./BoardModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewBoard } from "../../database/api";
import { Board } from "../../models/board";

type BoardModalProps = {
  type: "newBoard" | "editBoard";
  board?: Board | null;
};
const BoardModal = ({ type }: BoardModalProps) => {
  const title = type === "newBoard" ? "Add New Board" : "Edit Board";
  const buttonText = type === "newBoard" ? "Create New Board" : "Save Changes";

  const [name, setName] = useState("");

  const queryClient = useQueryClient();

  const boardMutation = useMutation({
    mutationFn: addNewBoard,
    retry: 1,
    onSuccess: (result, variables) => {
      console.log(result, variables);

      // refetch list of boards by setting initial query as invalid
      queryClient.invalidateQueries({
        queryKey: ["getBoardsList"],
      });

      // TODO
      // 1) обновить кэш
      // 2) установить активной новую доску
      // 3) закрыть модальное окно
    },
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const newBoard = { id: 3, name: name, columns: null } as Board;

    boardMutation.mutate(newBoard);

    // const form = e.target as HTMLFormElement;
    // const title = form.elements.namedItem("name") as HTMLInputElement;

    // console.log(title.value);
  };

  const handleChangeName = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    const { value } = input;
    setName(value);
  };

  return (
    <form className={styles.boardModal} onSubmit={(e) => handleSubmit(e)}>
      <h1 className="heading--xl">{title}</h1>
      <InputText
        type="text"
        id="name"
        value={name}
        label="Board Name"
        placeholder="e.g. Web Design"
        onChange={(e) => handleChangeName(e)}
      />
      <Button
        text={buttonText}
        submit={true}
        disabled={boardMutation.isPending}
      />
      {/* TODO */}
      {boardMutation.isError && (
        <p className="text">{boardMutation.error.message}</p>
      )}
    </form>
  );
};

export default BoardModal;
