export const STAGED_UPLOAD_MUTATION = `
  mutation StagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters { name value }
      }
      userErrors { field message }
    }
  }
`;
export const FILE_CREATE_MUTATION = `
  mutation FileCreate($files: [FileCreateInput!]!) {
    fileCreate(files: $files) {
      files { id }
      userErrors { field message }
    }
  }
`;
export const CREATE_PAGE_MUTATION = `
  mutation CreatePage($page: PageCreateInput!) {
    pageCreate(page: $page) {
      page {
        id
        title
        handle
        metafields(first: 5) {
          edges {
            node {
              namespace
              key
              value
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;
export const CREATE_BLOG_MUTATION = `
  mutation CreateArticle($article: ArticleCreateInput!){
    articleCreate(article: $article) {
      article {
        id
        title
        body
        handle
        author {
          name
        }
        image{
          originalSrc
        }
        metafields(first: 5) {
          edges{
            node {
              namespace
              key
              value
            }
          }
        }
      }        
      userErrors {
        field
        message        
      } 
    }
  }        
`;
export const UPDATE_PRODUCT_MUTATION = `
  mutation productUpdate($product: ProductUpdateInput!) {
    productUpdate(product: $product) {
      product {
          id
          title
      }
      userErrors {
        field
        message
      }
    }
  }
`;
export const UPDATE_METAFIELD_MUTATION = `
  mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        id
        namespace
        key
        value
      }
      userErrors {
        field
        message
      }
    }
  }
`;
export const UPDATE_PRODUCT_VARIANTS_MUTATION = `
  mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkUpdate(productId: $productId, variants: $variants) {
      productVariants {
        id
        price
      }
      userErrors {
        field
        message
      }
    }
  }
`;