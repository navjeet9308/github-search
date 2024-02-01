import { createReducer, on, Action } from '@ngrx/store';
import * as fromGithubActions from './github.actions';

// Define the types for the state
export interface GithubState {
  searchResult: any | null;
  searchHistory: any[];
}

export const initialState: GithubState = {
  searchResult: null,
  searchHistory: []
};

// Define the action types
interface SearchSuccessAction extends Action {
  searchResult: any;
}

interface SaveToHistoryAction extends Action {
  searchHistory: any[];
}

export const githubReducer = createReducer(
  initialState,
  on(fromGithubActions.searchSuccess, (state, { searchResult }: SearchSuccessAction) => ({
    ...state,
    searchResult
  })),
  on(fromGithubActions.saveToHistory, (state, { searchHistory }: SaveToHistoryAction) => ({
    ...state,
    searchHistory
  })),
  on(fromGithubActions.clearHistory, (state) => ({
    ...state,
    searchHistory: []
  }))
);
