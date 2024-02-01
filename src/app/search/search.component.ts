import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';
import * as fromGithubActions from '../github.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchName: string = '';
  searchHistory: any[] = [];

  // Add ! to indicate that the property will be initialized
  searchResult$!: Observable<any>;

  constructor(
    private githubService: GithubService,
    private store: Store<AppState>
  ) {
    // Subscribe to state slices
    this.searchResult$ = this.store.pipe(select('github', 'searchResult'));
  }

  ngOnInit(): void {
    // Load initial state or dispatch initial actions if needed
  }

  searchUsers() {
    if (this.searchName.trim() !== '') {
      // Use NgRx action to trigger state change
      this.githubService.searchUsersByName(this.searchName).subscribe(
        () => {
          // Optionally, you can dispatch additional actions or perform other actions after a successful search.
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
    }
  }

  clearSearchHistory() {
    // Use NgRx action to trigger state change
    this.githubService.clearSearchHistory();
  }
}
