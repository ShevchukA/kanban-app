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
import { addColumn } from '../../helpers/operations';

const ColumnModal = () => {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();
  const updateBoards = useBoardsMutation(Action.UpdateBoard);
  const { activeBoardIndex } = useContext(UiContext);

  const handleChangeName = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setName(input.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // get boards array from cache for further mutation
    const boards: Board[] = queryClient.getQueryData(['boards']) ?? [];

    const newColumn: Column = {
      id: generateId(),
      name: name,
      tasks: [],
    };

    const newBoards = addColumn(boards, activeBoardIndex, newColumn);

    updateBoards.mutate(newBoards);
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
        disabled={updateBoards.isPending || name.length === 0}
      />
    </form>
  );
};

export default ColumnModal;
