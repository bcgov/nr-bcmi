export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.service("plugin::graphql.extension");
    extensionService.use(({ strapi }) => ({
      typeDefs: `
        type Query {
          pageByRoute(route: String!): Page
        }
      `,
      resolvers: {
        Query: {
          pageByRoute: {
            resolve: async (parent, args, context) => {
              const data = await strapi.documents("api::page.page").findMany({
                status: "published",
                filters: {route: args.route},
              });
              return data[0] || null;
            }
          }
        }
      },
      resolversConfig: {
        "Query.pageByRoute": {
          auth: false,
        }
      }
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
