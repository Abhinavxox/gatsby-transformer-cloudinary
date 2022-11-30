import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import { GatsbyImage } from 'gatsby-plugin-image';

const GifDefault = () => {
  const data = useStaticQuery(graphql`
    query {
      image: file(name: { eq: "victory" }) {
        cloudinary: childCloudinaryAsset {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          fluid {
            ...CloudinaryAssetFluid
          }
        }
      }
    }
  `);

  // Duplicate the query so we can display it on the page.
  const query = `
    query {
      image: file(name: { eq: "victory" }) {
        cloudinary: childCloudinaryAsset {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          fluid {
            ...CloudinaryAssetFluid
          }
        }
      }
    }
  `
    .replace(/^ {4}/gm, '') // Remove the leading indentation (this is a hack).
    .trim();

  return (
    <div className="image-example">
      <h2>Lazy-loaded animated GIFs!</h2>

      <h3>gatsby-plugin-image</h3>
      <GatsbyImage
        image={data.image.cloudinary.gatsbyImageData}
        alt="Jason, victorious."
      />

      <h3>gatsby-image</h3>
      <Image fluid={data.image.cloudinary.fluid} alt="Jason, victorious." />

      <h3>Query</h3>
      <pre>{query}</pre>
    </div>
  );
};

export default GifDefault;