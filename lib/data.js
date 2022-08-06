import { gql, GraphQLClient } from "graphql-request";

const endpoint = "https://api-ap-northeast-1.hygraph.com/v2/cl63tp35j7a8p01t7cmnheovx/master";

const graphQLClient = new GraphQLClient(endpoint);

export const getAll = async () => {
    const query = gql`
    {
        posts {
          title
          slug
          date
          description    
          tags    
          authors {
            name
          }
        }
        projects {
          title
          slug    
          tags
          image {
            url
            width
            height
          }        
        } 
      }
    `;
  
    return await graphQLClient.request(query);
  };

  export const getPosts = async () => {
    const query = gql`
    {
      posts {
        title
        slug
        date
        description    
        tags    
        authors {
          name
        }
    }
    `;

    return await graphQLClient.request(query);
  };

  export const getProjects = async () => {
    const query = gql`
    {
      projects {
        title
        slug    
        tags
        image {
          url
          width
          height
        }        
      } 
    }
    `;

    return await graphQLClient.request(query);
  };

  export const getProjectItem = async (slug) => {
    const query = gql`
    query getProject($slug: String!){
      projects (where: {slug: $slug}) {
        title
        slug    
        tags
        content
        image {
          url
          width
          height
        }              
      }
    }
    `;
    const variables = {
      slug,
    };

    return await graphQLClient.request(query, variables);
  };

  export const getProjectSlugs = async () => {
    const query = gql`
      {
        projects {
          slug
        }
      }      
    `;
  
    return await graphQLClient.request(query);
  };

  export const getPostSlugs = async () => {
    const query = gql`
      {
        posts {
          slug
        }
      }      
    `;
  
    return await graphQLClient.request(query);
  };

  export const getPostItem = async (slug) => {
    const query = gql`
    query getPost($slug: String!){
      posts (where: {slug: $slug}) {
        title
        description
        slug    
        tags
        content
        date
        coverImage {
          url
          width
          height
        }
        authors {
          name
        }              
      }
    }
    `;
    const variables = {
      slug,
    };

    return await graphQLClient.request(query, variables);
  };