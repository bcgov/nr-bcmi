import { catchError, map, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloError } from '@apollo/client/errors';

@Injectable()
export class ContentService {

  constructor(private readonly apollo: Apollo) {}

  async getRoutes(): Promise<any> {
    return this.apollo.query<any>({
          query: gql`
          {
            pages{
              Title,
              route
              tooltip
            }
          }
          `
      }).pipe(map(response => response.data.pages),
      catchError( (err: ApolloError) => {
        console.error(err.cause); 
        return of([]);
      })).toPromise();
    }

    async getGlobalContent(): Promise<any> {
      return this.apollo.query<any>({
            query: gql`
            {
              footer {
                About_title,
                About_description,
                Connect_description,
                Connect_title,
              }
              navigations(sort: "Heading") {
                Heading,
                Short_heading,
                pages(sort: "Title") {
                  tooltip,
                  route,
                  Title,
                }
              }
            }
            `
        }).pipe(map(response => response.data),
        catchError( (err: ApolloError) => {
          console.error(err.cause); 
          return of([]);
        })).toPromise();
      }
}

