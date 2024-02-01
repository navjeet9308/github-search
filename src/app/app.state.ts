// app.state.ts
import { createAction, props } from '@ngrx/store';

export interface AppState {
  github: GithubState;
}

export interface GithubState {
  searchResult: any;
  searchHistory: any[];
}
