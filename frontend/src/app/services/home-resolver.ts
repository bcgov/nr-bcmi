import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, catchError, filter, map, of, take } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Home } from '@app/models/content/home';
import { FastFact} from '@app/models/content/fast-fact'
import { HomeResponse } from '@app/models/content/home-response';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<HomeResponse> {

    constructor(private readonly apollo: Apollo){}

  private readonly defaultResponse = new HomeResponse();

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

    private unwrapEntity<T>(value: any): T | null {
      if (!value) {
        return null;
      }

      if (value.data !== undefined) {
        return this.unwrapEntity<T>(value.data);
      }

      if (value.attributes !== undefined) {
        return this.unwrapEntity<T>(value.attributes);
      }

      return value as T;
    }

    private unwrapCollection<T>(value: any): T[] {
      if (!value) {
        return [];
      }

      if (Array.isArray(value)) {
        return value
          .map((item) => this.unwrapEntity<T>(item))
          .filter((item): item is T => item !== null);
      }

      if (value.data !== undefined) {
        return this.unwrapCollection<T>(value.data);
      }

      return [];
    }

    private buildResponse(data: any): HomeResponse {
      const home = this.unwrapEntity<Home>(data?.home);
      const facts = this.unwrapCollection<FastFact>(data?.fastFacts);

      if (!home) {
        return this.defaultResponse;
      }

      return {
        home,
        facts,
      };
    }

    resolve(): Observable<HomeResponse> {
    // Return an Observable that represents the GraphQL request to execute before the route is activated.
        return this.apollo.watchQuery<any>({
            query: this.getHome(),
        })
        .valueChanges.pipe(
          filter((result) => !result.loading),
          map((result) => this.buildResponse(result.data)),
          take(1),
          catchError((error) => {
            // Failed to fetch content for HomePage from CMS. Fallback to hard coded defaults.
            console.error('HomeResolver GraphQL request failed:', error);
            return of(this.defaultResponse);
          })
        )
    }
}
