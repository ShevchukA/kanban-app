import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UiContext } from '../context/uiContext';
import { updateBoards } from '../database/api';
import { Board } from '../models/board';

export enum Action {
  AddBoard = 'AddBoard',
  EditBoard = 'EditBoard',
  DeleteBoard = 'DeleteBoard',
}

const useBoardsMutation = (action: Action) => {
  const { closeModal, selectBoard } = useContext(UiContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const boardsMutation = useMutation({
    mutationFn: updateBoards,

    // when mutate is called:
    onMutate: async (newBoardsList: Board[]) => {
      // cancel any outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ['boards'] });

      // snapshot the previous value
      const previousState = queryClient.getQueryData(['boards']);

      // optimistically update to the new value
      queryClient.setQueryData(['boards'], () => newBoardsList);

      // navigate to the last board in the list if new board added
      if (action === Action.AddBoard) {
        navigate(`/boards/${newBoardsList[newBoardsList.length - 1].id}`);
        selectBoard(newBoardsList.length - 1);
      }

      // TODO fix logic?
      if (action === Action.DeleteBoard) {
        navigate(`/boards/${newBoardsList[newBoardsList.length - 1].id}`);
        selectBoard(newBoardsList.length - 1);
      }

      closeModal();

      // Return a context object with the snapshotted value
      return { previousState };
    },

    // If the mutation fails, the context returned from onMutate to roll back
    onError: (_, __, context) => {
      queryClient.setQueryData(['boards'], context?.previousState);
    },

    onSettled: () => {
      // refetch list of boards by setting initial query as invalid
      void queryClient.invalidateQueries({
        queryKey: ['boards'],
      });
    },

    // onSuccess: (data) => {},
  });

  return boardsMutation;
};

export default useBoardsMutation;
