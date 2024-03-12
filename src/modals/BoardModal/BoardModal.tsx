import { SyntheticEvent, useContext, useState } from "react";
import Button from "../../components/ui/Button/Button";
import InputText from "../../components/ui/InputText/InputText";
import styles from "./BoardModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewBoard } from "../../database/api";
import { Board } from "../../models/board";
import { Column } from "../../models/column";
import { UiContext } from "../../context/uiContext";
import { useNavigate } from "react-router-dom";
import InputMultipleFields from "../../components/ui/InputMultipleFields/InputMultipleFields";
import { v4 as generateId } from "uuid";

type BoardModalProps = {
  type: "newBoard" | "editBoard";
  board?: Board | null;
};
const BoardModal = ({ type }: BoardModalProps) => {
  const { closeModal, selectBoard } = useContext(UiContext);

  const [name, setName] = useState("");
  const [columns, setColumns] = useState<Column[]>([]);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const boardMutation = useMutation({
    mutationFn: addNewBoard,
    onSettled: () => {
      // refetch list of boards by setting initial query as invalid
      queryClient.invalidateQueries({
        queryKey: ["getBoardsList"],
      });
      // TODO update cache
    },
    onSuccess: (_, variables) => {
      navigate(`/boards/${variables.name.toLowerCase()}`);
      // TODO
      selectBoard(variables.id);

      closeModal();
    },
  });

  const handleChangeName = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setName(input.value);
  };

  const handleChangeColumns = (e: SyntheticEvent, index: number) => {
    const input = e.target as HTMLInputElement;
    const newColumnsSet = [...columns];
    newColumnsSet[index] = { ...newColumnsSet[index], name: input.value };
    setColumns(newColumnsSet);
  };

  const handleAddNewColumn = () => {
    const newColumnsSet = [
      ...columns,
      { name: "", id: generateId(), tasks: [] } as Column,
    ];
    setColumns(newColumnsSet);
  };

  const handleDeleteColumn = (id: string) => {
    const newColumnsSet = columns.filter((column) => column.id !== id);
    setColumns(newColumnsSet);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (name.length !== 0) {
      const newBoard = {
        id: generateId(),
        name: name,
        columns: columns,
      } as Board;

      boardMutation.mutate(newBoard);

      // const form = e.target as HTMLFormElement;
      // const title = form.elements.namedItem("name") as HTMLInputElement;

      // console.log(title.value);
    }
  };

  const title = type === "newBoard" ? "Add New Board" : "Edit Board";
  const buttonText = type === "newBoard" ? "Create New Board" : "Save Changes";

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
      <InputMultipleFields
        label="Board Columns"
        value={columns}
        onChange={handleChangeColumns}
        onAdd={handleAddNewColumn}
        onDelete={handleDeleteColumn}
      />
      <Button
        text={buttonText}
        submit={true}
        disabled={boardMutation.isPending}
      />
      {/* TODO Error modal */}
      {boardMutation.isError && (
        <p className="text">{boardMutation.error.message}</p>
      )}
    </form>
  );
};

export default BoardModal;
