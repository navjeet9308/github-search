import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';
import * as fromGithubActions from '../github.actions';
import { Observable } from 'rxjs';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  searchHistory$: Observable<any[]>;

  constructor(private store: Store<AppState>,     private githubService: GithubService,
    ) {
    this.searchHistory$ = this.store.pipe(select('github', 'searchHistory'));
  }

  ngOnInit(): void {
    // Optionally, you can dispatch an action to load initial state or perform other actions.
    this.loadSearchHistory();
  }

  clearSearchHistory() {
    // Dispatch an action to clear the search history
    this.githubService.clearSearchHistory();
  }
  private loadSearchHistory() {
    const storedSearchHistory = this.githubService.getSearchHistory();
    this.store.dispatch(fromGithubActions.saveToHistory({ searchHistory: storedSearchHistory }));
  }
}
