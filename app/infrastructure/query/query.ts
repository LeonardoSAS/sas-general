export const GET_IMAGE_CDN_QUERY = `
  query ImageCDN($id: ID!) {
    node(id: $id) {
      ... on MediaImage { image { url } }
      ... on GenericFile { url }
      ... on Video { preview { image { url } } }
    }
  }
`;
export const GET_THEMES_QUERY = `
  query Themes {
    themes(first: 1, roles: MAIN) {
      nodes {
        id
      }
    }
  }
`;
export const GET_THEME_FILE_QUERY = `
  query GetThemeFile($id: ID!) {
    theme(id: $id) {
      files(filenames: ["layout/theme.liquid"], first: 1) {
        nodes {
          body {
            ... on OnlineStoreThemeFileBodyText {
              content
            }
          }
        }
      }
    }
  }
`;
export const GET_AUTHORS_QUERY = `
  query GetAuthors {
    articles(first: 250) {
      nodes {
        author {
          name
        }
      }  
    }
  }
`;
export const GET_BLOGS_NAME_QUERY = `
  query GetBlogs {
    blogs(first: 50) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;
export const GET_PRODUCT_BY_SKU_QUERY = `
  query getProductBySku($query: String!) {
    products(first: 1, query: $query) {
      edges {
        node {
          id
          variants(first: 250) {
            edges {
              node {
                id
                sku
              }
            }
          }
        }
      }
    }
  }
`;