import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import * as fromGithubActions from './github.actions';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  private searchHistoryKey = 'githubSearchHistory';

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    
  }

  searchUsersByName(name: string): Observable<any> {
    console.log("Entered :: Search User")
    const url = `${this.apiUrl}/search/users?q=${name}+in:fullname&per_page=1`;
    return this.http.get(url).pipe(
      tap((result: any) => {
        console.log("ddd", result)
        this.store.dispatch(fromGithubActions.searchSuccess({ searchResult: result.items[0] }));
        this.saveToSearchHistory(name, result.items[0]);
      }),
      catchError((error) => {
        console.error('Error fetching search results:', error);
        return throwError(error);
      })
    );
  }

  getUserProfile(username: string): Observable<any> {
    const url = `${this.apiUrl}/users/${username}`;
    return this.http.get(url);
  }

  getSearchHistory(): any[] {
    const historyJson = localStorage.getItem(this.searchHistoryKey);
    return historyJson ? JSON.parse(historyJson) : [];
  }

  private saveToSearchHistory(name: string, result: any): void {
    const history = this.getSearchHistory();
    const existingIndex = history.findIndex((item) => item.name === name);
  
    if (existingIndex !== -1) {
      // Update the existing entry with the new search result
      history[existingIndex].result = result;
    } else {
      // Add a new entry to the search history
      history.push({ name, result });
    }
  
    localStorage.setItem(this.searchHistoryKey, JSON.stringify(history));
    this.store.dispatch(fromGithubActions.saveToHistory({ searchHistory: history }));
  }

  clearSearchHistory(): void {
    localStorage.removeItem(this.searchHistoryKey);
    this.store.dispatch(fromGithubActions.clearHistory());
  }
}
