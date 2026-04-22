import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, catchError, filter, map, of, take } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Page } from '@app/models/content/page';

@Injectable({
  providedIn: 'root'
})
export class ContentResolver implements Resolve<Page> {

    constructor(private readonly apollo: Apollo){}

    private readonly defaultPage = new Page();

    private getPage = function(route){

        // When adding new properties to the Page class, edit this query
        return gql`
        {
            pageByRoute(route: "${route}") {
                Title,
                Description
                Header_button{
                Text
                Section_id
                }
                Content
                Ongoing_card
                External_card
                Related_card
                Enforcement_Actions_card
                route
                tooltip
            }
        }
        `;
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Page> {
    // Return an Observable that represents the GraphQL request to execute before the route is activated.
        return this.apollo.watchQuery<any>({
            query: this.getPage(route.routeConfig.path),
        })
        .valueChanges.pipe(
          filter((result) => !result.loading),
          map((result) => (result.data?.pageByRoute as Page) || this.defaultPage),
          take(1),
          catchError((error) => {
            console.error('ContentResolver GraphQL request failed:', error);
            return of(this.defaultPage);
          })
        )
    }
}
