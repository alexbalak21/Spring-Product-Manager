import { GraphQLClient } from "graphql-request";

const graphqlUrl =
	typeof window !== "undefined"
		? new URL("/graphql", window.location.origin).toString()
		: import.meta.env.PUBLIC_API_URL ?? "http://localhost:8080/graphql";

export const client = new GraphQLClient(graphqlUrl);
