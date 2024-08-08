import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://fnshop-graphql.fnshop-services.workers.dev/graphql",
	cache: new InMemoryCache(),
});
