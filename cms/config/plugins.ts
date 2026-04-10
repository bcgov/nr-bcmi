export default ({ env }) => ({
    graphql: {
        enabled: true,
        config: {
            defaultLimit: 50,
            maxLimit: 100
        }
    },
    ckeditor5: {
        enabled: true,
    },
    'strapi-plugin-sso': {
        enabled: true,
        config: {
            OIDC_SCOPES: 'openid email profile',
            OIDC_AUTHORIZATION_ENDPOINT: `${env('KEYCLOAK_URL')}/realms/${env('KEYCLOAK_REALM')}/protocol/openid-connect/auth`,
            OIDC_TOKEN_ENDPOINT: `${env('KEYCLOAK_URL')}/realms/${env('KEYCLOAK_REALM')}/protocol/openid-connect/token`,
            OIDC_USER_INFO_ENDPOINT: `${env('KEYCLOAK_URL')}/realms/${env('KEYCLOAK_REALM')}/protocol/openid-connect/userinfo`,
            OIDC_USER_INFO_ENDPOINT_WITH_AUTH_HEADER: true,
            OIDC_GRANT_TYPE: 'authorization_code',
            OIDC_FAMILY_NAME_FIELD: 'family_name',
            OIDC_GIVEN_NAME_FIELD: 'given_name',
            OIDC_CLIENT_SECRET: env('KEYCLOAK_CLIENT_SECRET'),
            OIDC_CLIENT_ID: env('KEYCLOAK_CLIENT_ID'),
            OIDC_REDIRECT_URI: env('HOSTNAME')+'/strapi-plugin-sso/oidc/callback',
        },
    },
});
