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

interface BoardModalProps {
  type: 'newBoard' | 'editBoard';
  board?: Board | null;
}

const BoardModal = ({ type, board }: BoardModalProps) => {
  const [name, setName] = useState('');
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    if (board) {
      setName(board.name);
      setColumns(board.columns);
    }
  }, [board]);

  const queryClient = useQueryClient();
  const addBoard = useBoardsMutation(Action.AddBoard);
  const editBoard = useBoardsMutation(Action.EditBoard);

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
    // TODO check if column is not empty than show delete modal
    const newColumnsSet = columns.filter((column) => column.id !== id);
    setColumns(newColumnsSet);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // get boards array from cache for further mutation
    const boards: Board[] = queryClient.getQueryData(['boards']) ?? [];

    switch (type) {
      case 'newBoard':
        if (name.length !== 0) {
          const newBoard: Board = {
            id: generateId(),
            name,
            columns,
          };

          const newBoards = [...boards, newBoard];

          addBoard.mutate(newBoards);
        }
        break;

      case 'editBoard':
        if (board) {
          const updatedBoard: Board = {
            ...board,
            name,
            columns,
          };
          const newBoards = boards.map((board) => {
            if (board.id === updatedBoard.id) {
              return updatedBoard;
            } else {
              return board;
            }
          });

          editBoard.mutate(newBoards);
        }
        break;
      default:
        break;
    }
  };

  const title = type === 'newBoard' ? 'Add New Board' : 'Edit Board';
  const buttonText = type === 'newBoard' ? 'Create New Board' : 'Save Changes';

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
        disabled={addBoard.isPending || editBoard.isPending}
      />
      {/* TODO Error modal */}
    </form>
  );
};

export default BoardModal;
