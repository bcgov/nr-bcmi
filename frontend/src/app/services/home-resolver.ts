import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Home } from '@app/models/content/home';
import { FastFact} from '@app/models/content/fast-fact'
import { HomeResponse } from '@app/models/content/home-response';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<HomeResponse> {

    constructor(private readonly apollo: Apollo){}

    private getHome = function(){

      // When adding new properties to the Page class, edit this query
      return gql`
      {
        home {
          Title,
          Description,
          About,
          Mining_blocks {
            Title,
            Description,
            page {
              route
            }
          }
          Processes_blocks {
            Title,
            Description,
            page {
              route
            }
          }
        }
        fastFacts{
          description,
          value
        }
      }`;
    }

    resolve(): Observable<HomeResponse> {
    // Return an Observable that represents the GraphQL request to execute before the route is activated.
        return this.apollo.watchQuery<any>({
            query: this.getHome()
        })
        .valueChanges.pipe(map(result => { 
          return {
            home: result.data?.home as Home,
            facts: result.data?.fastFacts as FastFact[]
          }
        }),
        catchError(error => {
          //Failed to fetch content for HomePage from CMS. Fallback to hard coded defaults.
          console.error(error);
          return of(new HomeResponse());
        }))
    }
}
