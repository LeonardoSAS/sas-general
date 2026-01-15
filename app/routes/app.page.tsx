import { Form, useActionData } from "react-router";
import { seoLoader } from "app/src/hooks/seo/seoLoader";
export { loader, action } from "../adapters/controllers/routes/page.route";

export default function Index() {
  const data = useActionData();
  const { 
    isSubmitting, 
    errors, 
    attemptSubmit, 
    handleSubmit, 
    isMobile
  } = seoLoader();

  return (
    <s-page 
      heading="Smart Tools - Page SEO"
    >
      <Form 
        method="post" 
        onSubmit={handleSubmit}
      >
        {data && !data.userErrors?.length && (
          <s-box>
            <s-banner 
              heading="Page Created"
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
                  `https://admin.shopify.com/store/${data.shopName}/pages/${data.idPage}`
                }
                  target="_blank"
                >
                  Admin View
                </s-button>
                {data.status === "publish" && (data.page?.handle || data.pageHandle) && (
                  <s-button href= { 
                    `https://${data.shopUrl}/pages/${data.pageHandle || data.page?.handle}`
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
                    placeholder="title of this page" 
                    error={attemptSubmit ? errors.title || undefined : undefined}
                  />
                  <s-text-field 
                    label="Page URL" 
                    name="url" 
                    placeholder="https://..." 
                    error={attemptSubmit ? errors.url || undefined : undefined}
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
                    Add a title and description to see how this page post might appear in a search engine listing.
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
            inlineSize={isMobile ? undefined : "320px"}
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
              <s-stack
                direction="inline"
                justifyContent="end"
                alignItems="center"
                gap="small"
              >
                <s-button 
                  type="submit" 
                  variant="primary" 
                  disabled={isSubmitting}>
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
  );
}