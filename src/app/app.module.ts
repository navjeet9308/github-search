import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { HistoryComponent } from './history/history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { githubReducer } from './github.reducer'; // Create github.reducer.ts


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SearchComponent,
    HistoryComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ github: githubReducer })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
