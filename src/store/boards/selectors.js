import { createSelector } from 'reselect';

export const getBoards = state => state.boards;

export const isFetching = createSelector(
  getBoards,
  boards => boards.boardsFetchingState === 'requested',
);

export const getBoardsMap = createSelector(
  getBoards,
  boards => boards.boardsById,
);

export const getBoardsList = createSelector(
  getBoardsMap,
  boardsMap => Object.values(boardsMap),
);
