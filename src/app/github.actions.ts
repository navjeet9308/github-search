// github.actions.ts
import { createAction, props } from '@ngrx/store';

export const searchSuccess = createAction(
  '[Github] Search Success',
  props<{ searchResult: any }>()
);

export const saveToHistory = createAction(
  '[Github] Save To History',
  props<{ searchHistory: any[] }>()
);

export const clearHistory = createAction(
  '[Github] Clear History'
);