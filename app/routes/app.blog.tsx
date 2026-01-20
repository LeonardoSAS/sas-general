import { useLoaderData, useActionData, Form } from "react-router";
import { ImageUpload } from "../src/components/image/ImageUpload";
import { BackHome } from "../src/components/backhome";
import { seoLoader } from "app/src/hooks/seo/seoLoader";
import type { BlogLoaderType } from "app/type/seo/seoType";
export { loader, action } from "../adapters/controllers/routes/blog.route";

export default function Index() {
  const loader = useLoaderData();
  const data = useActionData();

  const { 
    isSubmitting, 
    errors, 
    attemptSubmit, 
    handleSubmit, 
    isMobile
  } = seoLoader();

  return (
    <>
      <BackHome />
      <s-page 
        heading="General Tools"
      >
      <Form 
        method="post"
        encType="multipart/form-data" 
        onSubmit={handleSubmit}
      >
        {data && !data.userErrors?.length && (
          <s-box 
            inlineSize="100%"
          >
            <s-banner 
              heading="Blog Created"
              tone="success"
            >
            </s-banner>
            <s-box 
              padding="small"
            >
              <s-stack 
                direction="inline" 
                justifyContent="end" 
                alignItems="center" 
              >
                <s-button href= { 
                  `https://admin.shopify.com/store/${data.shopName}/articles/${data.idBlog}`
                }
                  target="_blank"
                >
                  Admin View
                </s-button>
                {data.status === "publish" && (data.blog?.handle || data.blogHandle) && (
                  <s-button href= {
                    `https://${data.shopUrl}/blogs/${data.blogHandle}/${data.blogName}`
                  }
                    target="_blank"
                  >
                    View
                  </s-button>
                )}
              </s-stack>
            </s-box>
          </s-box>
        )}
        <s-grid 
          gridTemplateColumns= {
            isMobile ? "1fr" : "70% 30%"
          }
          gap="small" 
          justifyContent="center"
        >
          <s-grid-item 
            gridColumn= { 
              isMobile ? "span 1" : "span 2"
            }
          >
          </s-grid-item>
          <s-grid-item 
            gridColumn="span 1"
          >
            <s-stack 
              gap="base"
            >
              <s-box 
                padding="base"
                background="base"
                borderRadius="base"
                borderWidth="base"
                borderColor="base"
              >
                <s-stack 
                  gap="base"
                >
                  <s-text-field
                    label="Title" 
                    name="title" 
                    placeholder="title of this blog" 
                    error= { attemptSubmit ? errors.title || undefined : undefined }
                  />
                  <s-text-field 
                    label="Blog URL" 
                    name="url" 
                    placeholder="https://..." 
                    error= { attemptSubmit ? errors.url || undefined : undefined }
                    />
                </s-stack>
              </s-box>
              <s-box 
                padding="large" 
                background="base" 
                borderRadius="base" 
                borderWidth="base" 
                borderColor="base"
              >
                <s-stack 
                  gap="base"
                >
                  <s-heading>
                    Listing in search engines
                  </s-heading>
                  <s-text>
                    Add a title and description to see how this blog post might appear in a search engine listing.
                  </s-text>
                  <s-text-field 
                    label="Page title" 
                    name="meta_title"
                  />
                  <s-text-field 
                    label="Meta description" 
                    name="meta_description"
                  />
                </s-stack>
              </s-box>
            </s-stack>   
          </s-grid-item>
          <s-grid-item 
            gridColumn="auto" 
            inlineSize= { 
                isMobile ? undefined : "320px"
            }
          >
            <s-stack 
              gap="base"
            >
              <s-box 
                padding="base" 
                background="base" 
                borderRadius="base" 
                borderWidth="base" 
                borderColor="base"
              >
                <s-stack 
                  gap="base"
                >
                  <s-heading>
                    Visibility
                  </s-heading>
                  <s-choice-list 
                    label="" 
                    name="status"
                  >
                    <s-choice 
                      value="publish"
                    >
                      Visible
                    </s-choice>
                    <s-choice 
                      value="draft" 
                      selected
                    >
                      Hidden
                    </s-choice>
                  </s-choice-list>
                </s-stack>
              </s-box>
              <ImageUpload />
              <s-box 
                padding="base" 
                background="base"
                borderRadius="base" 
                borderWidth="base" 
                borderColor="base"
              >
                <s-stack 
                  gap="large"
                >
                  <s-heading>
                    Organization
                  </s-heading>
                  <s-stack 
                    gap="base"
                  >
                    <s-select 
                      label="Author" 
                      name="author"
                    >
                      {loader.authors.map((
                        author: string, 
                        index: number
                      ) => (
                        <s-option 
                          key={author}
                          value={author} 
                          selected={index === 0}
                        >
                          {author}
                        </s-option>
                      ))}
                    </s-select>
                    <s-select 
                      label="Blog" 
                      name="blog_id"
                    >
                      {loader.blogs.map((
                        blog: BlogLoaderType
                      ) => (
                        <s-option 
                          key={blog.id} 
                          value={blog.handle}
                        >
                          {blog.title}
                        </s-option>
                      ))}
                    </s-select>
                  </s-stack>
                </s-stack>
              </s-box>
              <s-stack 
                direction="inline" 
                justifyContent="end" 
                alignItems="center" 
                gap="small"
              >
                <s-button 
                  type="submit" 
                  variant="primary" 
                  disabled= { isSubmitting }>
                    { isSubmitting ? "Saving..." : "Save" } 
                </s-button>
                {isSubmitting && (
                  <s-spinner 
                    accessibilityLabel="Loading" 
                  />
                )}
              </s-stack>
            </s-stack>   
          </s-grid-item>
        </s-grid>
      </Form>
    </s-page>
    </>
  );
}