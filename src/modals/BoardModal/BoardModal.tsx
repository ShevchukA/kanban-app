import { SyntheticEvent, useEffect, useState } from 'react';
import Button from '../../components/ui/Button/Button';
import InputText from '../../components/ui/InputText/InputText';
import styles from './BoardModal.module.css';
import { useQueryClient } from '@tanstack/react-query';
import { Board } from '../../models/board';
import { Column } from '../../models/column';
import InputMultipleFields from '../../components/ui/InputMultipleFields/InputMultipleFields';
import { v4 as generateId } from 'uuid';
import useBoardsMutation, { Action } from '../../hooks/useBoardsMutation';
import { addBoard, editBoard } from '../../helpers/operations';

interface BoardModalProps {
  type: 'newBoard' | 'editBoard';
  board?: Board | null;
}

const BoardModal = ({ type, board }: BoardModalProps) => {
  const [name, setName] = useState('');
  const [columns, setColumns] = useState<Column[]>([]);
  const title = type === 'newBoard' ? 'Add New Board' : 'Edit Board';
  const buttonText = type === 'newBoard' ? 'Create New Board' : 'Save Changes';

  useEffect(() => {
    if (board) {
      setName(board.name);
      setColumns(board.columns);
    }
  }, [board]);

  const queryClient = useQueryClient();
  const updateBoardsWithAdd = useBoardsMutation(Action.AddBoard);
  const updateBoardsWithEdit = useBoardsMutation(Action.UpdateBoard);

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
      { name: '', id: generateId(), tasks: [] } as Column,
    ];
    setColumns(newColumnsSet);
  };

  const handleDeleteColumn = (id: string) => {
    const newColumnsSet = columns.filter((column) => column.id !== id);
    setColumns(newColumnsSet);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // get boards array from cache for further mutation
    const boards: Board[] = queryClient.getQueryData(['boards']) ?? [];

    if (type === 'newBoard' && name.length !== 0) {
      const newBoard: Board = {
        id: generateId(),
        name,
        columns,
      };

      const newBoards = addBoard(boards, newBoard);

      updateBoardsWithAdd.mutate(newBoards);
    }

    if (type === 'editBoard' && board) {
      const editedBoard: Board = {
        ...board,
        name,
        columns,
      };

      const newBoards = editBoard(boards, editedBoard);

      updateBoardsWithEdit.mutate(newBoards);
    }
  };

  return (
    <form
      className={styles.boardModal}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h1 className='heading--xl'>{title}</h1>
      <InputText
        type='text'
        id='name'
        value={name}
        label='Board Name'
        placeholder='e.g. Web Design'
        onChange={(e) => {
          handleChangeName(e);
        }}
      />
      <InputMultipleFields
        label='Board Columns'
        value={columns}
        onChange={handleChangeColumns}
        onAdd={handleAddNewColumn}
        onDelete={handleDeleteColumn}
      />
      <Button
        text={buttonText}
        submit={true}
        disabled={
          updateBoardsWithAdd.isPending ||
          updateBoardsWithEdit.isPending ||
          name.length === 0
        }
      />
    </form>
  );
};

export default BoardModal;
