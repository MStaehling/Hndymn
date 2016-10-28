import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HomeComponent }   from './home.component';
import { SearchComponent }   from './search.component';
import { SubmitComponent }   from './submit.component';
import { StopsComponent }   from './stops.component';
import { RouterModule }   from '@angular/router';
@NgModule({
    imports: [BrowserModule,
        RouterModule.forRoot([
            { path: 'stops/:id', component: StopsComponent },
            { path: 'stops', component: StopsComponent },
            { path: 'submit', component: SubmitComponent },
            { path: 'search', component: SearchComponent },
            { path: '**', component: HomeComponent }
        ])],
    declarations: [AppComponent, StopsComponent, SearchComponent, SubmitComponent, HomeComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
