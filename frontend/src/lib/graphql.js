import { GraphQLClient } from "graphql-request";

const graphqlUrl =
  import.meta.env.DEV
    ? "/graphql" // Astro proxy in dev
    : import.meta.env.PUBLIC_API_URL; // Real backend in production

export const client = new GraphQLClient(graphqlUrl);
