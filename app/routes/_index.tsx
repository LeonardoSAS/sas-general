import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {

  await authenticate.admin(request);
  
  return { 
    apiKey: process.env.SHOPIFY_API_KEY || "" 
  };
};

export default function Index() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider embedded apiKey={apiKey}>
      <s-page 
        heading="Smart Age - General Tools"
      >
        <s-banner 
          tone="info" 
          heading="Welcome to Smart Age General Tools"
        >
          Streamline your content creation and product management with our suite of SEO and product tools.
        </s-banner>
        <s-section 
          heading="Available Tools" 
          padding="base"
        >
          <s-grid
            gridTemplateColumns="@container (inline-size <= 400px) 1fr, 1fr auto 1fr auto 1fr"
            gap="small"
          >
            <s-clickable
              href="/app/blog"
              paddingBlock="small-400"
              paddingInline="small-100"
              borderRadius="base"
            >
              <s-grid 
                gap="small-300"
              >
                <s-stack 
                  direction="inline" 
                  gap="small-200" 
                  alignItems="center"
                >
                  <s-icon 
                    type="blog" 
                    size="base"
                    tone="info"
                  />
                  <s-heading>
                    SEO Blog Tool
                  </s-heading>
                </s-stack>
                <s-paragraph 
                  color="subdued"
                >
                  Publish blog posts with our SEO tool
                </s-paragraph>
              </s-grid>
            </s-clickable>
            <s-divider 
              direction="block" 
            />
            <s-clickable
              href="/app/page"
              paddingBlock="small-400"
              paddingInline="small-100"
              borderRadius="base"
            >
              <s-grid 
                gap="small-300"
              >
                <s-stack 
                  direction="inline" 
                  gap="small-200"
                  alignItems="center"
                >
                  <s-icon 
                    type="page" 
                    size="base" 
                    tone="info"
                  />
                  <s-heading>
                    SEO Page Tool
                  </s-heading>
                </s-stack>
                <s-paragraph 
                  color="subdued"
                >
                  Publish page posts with our SEO tool
                </s-paragraph>
              </s-grid>
            </s-clickable>
            <s-divider 
              direction="block" 
            />
            <s-clickable
              href="/app/products"
              paddingBlock="small-400"
              paddingInline="small-100"
              borderRadius="base"
            >
              <s-grid 
                gap="small-300"
              >
                <s-stack 
                  direction="inline" 
                  gap="small-200" 
                  alignItems="center"
                >
                  <s-icon 
                    type="product" 
                    size="base" 
                    tone="info"
                  />
                  <s-heading>
                    Product Tool
                  </s-heading>
                </s-stack>
                <s-paragraph 
                  color="subdued"
                >
                  Update products via CSV
                </s-paragraph>
              </s-grid>
            </s-clickable>
          </s-grid>
        </s-section>      
      </s-page>
    </AppProvider>
  );
}