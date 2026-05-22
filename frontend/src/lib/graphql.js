import { GraphQLClient } from "graphql-request";

const graphqlUrl = new URL(
	"/graphql",
	globalThis.location?.origin ?? "http://localhost:4321"
).toString();

export const client = new GraphQLClient(graphqlUrl);
