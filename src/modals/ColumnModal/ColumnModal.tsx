import { SyntheticEvent, useContext, useState } from 'react';
import Button from '../../components/ui/Button/Button';
import InputText from '../../components/ui/InputText/InputText';
import styles from './ColumnModal.module.css';
import useBoardsMutation, { Action } from '../../hooks/useBoardsMutation';
import { Board } from '../../models/board';
import { Column } from '../../models/column';
import { v4 as generateId } from 'uuid';
import { UiContext } from '../../context/uiContext';
import { useQueryClient } from '@tanstack/react-query';

const ColumnModal = () => {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();
  const editBoard = useBoardsMutation(Action.EditBoard);
  const { activeBoardIndex } = useContext(UiContext);

  const handleChangeName = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setName(input.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // get boards array from cache for further mutation
    const boardsList: Board[] = queryClient.getQueryData(['boards']) || [];

    if (name.length !== 0) {
      const newColumn: Column = {
        id: generateId(),
        name: name,
        tasks: [],
      };

      const newBoardsList = [...boardsList];

      // if current board doesn't have columns, than add empty array
      if (!newBoardsList[activeBoardIndex].columns) {
        newBoardsList[activeBoardIndex].columns = [];
      }

      // add new column
      newBoardsList[activeBoardIndex].columns.push(newColumn);

      editBoard.mutate(newBoardsList);
    }
  };

  return (
    <form
      className={styles.columnModal}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h1 className='heading--xl'>Add New Column</h1>
      <InputText
        type='text'
        id='name'
        value={name}
        label='Column Name'
        placeholder='e.g. TODO'
        onChange={(e) => {
          handleChangeName(e);
        }}
      />
      <Button
        text='+Add New Column'
        submit={true}
        disabled={editBoard.isPending || editBoard.isPending}
      />
    </form>
  );
};

export default ColumnModal;
