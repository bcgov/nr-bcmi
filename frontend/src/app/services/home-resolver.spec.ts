import { of, throwError } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { HomeResolver } from './home-resolver';

describe('HomeResolver', () => {
  const createResolver = (valueChanges: any) => {
    const apollo = {
      watchQuery: jest.fn().mockReturnValue({ valueChanges }),
    } as unknown as Apollo;

    return {
      apollo,
      resolver: new HomeResolver(apollo),
    };
  };

  it('returns fallback content when home data is missing', (done) => {
    const { resolver } = createResolver(of({ data: { home: null, fastFacts: [] } }));

    resolver.resolve().subscribe((response) => {
      expect(response.home.Title).toBe('British Columbia Mine Information');
      expect(response.facts).toEqual([]);
      done();
    });
  });

  it('unwraps wrapped graphql payloads', (done) => {
    const { resolver } = createResolver(of({
      data: {
        home: {
          data: {
            attributes: {
              Title: 'Wrapped Home',
              Description: 'Desc',
              About: 'About',
              Mining_blocks: [],
              Processes_blocks: [],
            },
          },
        },
        fastFacts: {
          data: [
            {
              attributes: {
                value: '10',
                description: 'facts',
              },
            },
          ],
        },
      },
    }));

    resolver.resolve().subscribe((response) => {
      expect(response.home.Title).toBe('Wrapped Home');
      expect(response.facts).toEqual([{ value: '10', description: 'facts' }]);
      done();
    });
  });

  it('returns fallback content when the query errors', (done) => {
    const { resolver } = createResolver(throwError(() => new Error('boom')));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    resolver.resolve().subscribe((response) => {
      expect(response.home.Title).toBe('British Columbia Mine Information');
      consoleErrorSpy.mockRestore();
      done();
    });
  });
});