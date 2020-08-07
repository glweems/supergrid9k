import { Head } from "next/document";
import React from "react";
import packageJson from "../../package.json";

export type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  keywords?: string[];
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  article,
  keywords,
  children,
}) => {
  const seo = {
    title: title || packageJson.name,
    description: description || packageJson.description,
    image,
    url: `${packageJson.homepage}`,
  };

  return (
    <Head>
      <meta name="description" content={seo.description} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {(article ? true : null) && <meta property="og:type" content="article" />}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      {keywords && <meta name="keywords" content={keywords.toString()} />}

      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      {seo.image && <meta name="twitter:image" content={seo.image} />}

      {children}
    </Head>
  );
};

SEO.defaultProps = {
  title: "Super Grid 9K",
  description: packageJson.description,
  image: `/${packageJson.name}.png`,
  article: false,
  keywords: packageJson.keywords,
};

export default SEO;
