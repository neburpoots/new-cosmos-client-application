import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';

const uri = 'http://localhost:8080/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {


  const authMiddleware = new ApolloLink
  (
    (operation, forward) => 
    {
      const jwtToken = localStorage.getItem('jwtToken');					
      //console.log('jwtToken...', 'jwtToken');
      //const jwtToken = "abc";
      //operation.setContext({headers: { Authorization: '' }});
      if (jwtToken) 
      {					
        operation.setContext({headers: { Authorization: `Bearer ${jwtToken}` }});
      } 
      
      return forward(operation);
    }
  );	


  return {
    link: ApolloLink.from([authMiddleware, httpLink.create({ uri })]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
