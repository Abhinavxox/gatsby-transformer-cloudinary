const { createImageNode } = require('./create-image-node');

exports.createCloudinaryAssetNode = ({
  cloudName,
  createContentDigest,
  createNode,
  createNodeId,
  originalHeight,
  originalWidth,
  parentNode,
  publicId,
  relationshipName,
  reporter,
  version,
}) => {
  if (!reporter) {
    reporter.panic(
      '`reporter` is a required argument.',
    );
  }
  if (!cloudName) {
    reporter.panic(
      '`cloudName` is a required argument. Pass the name of the Cloudinary cloud where the image is stored.',
    );
  }
  if (!createContentDigest) {
    reporter.panic('`createContentDigest` is a required argument.');
  }
  if (!createNode) {
    reporter.panic('`createNode` is a required argument.');
  }
  if (!createNodeId) {
    reporter.panic('`createNodeId` is a required argument.');
  }
  if (!originalHeight) {
    reporter.panic(
      '`originalHeight` is a required argument. Pass the original height of the image stored on Cloudinary.',
    );
  }
  if (!originalWidth) {
    reporter.panic(
      '`originalWidth` is a required argument. Pass the original width of the image stored on Cloudinary.',
    );
  }
  if (!parentNode) {
    reporter.panic(
      '`parentNode` is a required argument. Pass the parent node that this Cloudinary image should be a child of.',
    );
  }
  if (!publicId) {
    reporter.panic(
      '`publicId` is a required argument. Pass the Cloudinary public_id under which the image is stored.',
    );
  }
  if (!relationshipName) {
    reporter.panic(
      '`relationshipName` is a required argument. Pass a name for how this image is related to its parent (e.g. "coverPhoto").',
    );
  }

  const cloudinaryUploadResult = {
    public_id: publicId,
    height: originalHeight,
    width: originalWidth,
    version,
  };

  const imageNode = createImageNode({
    cloudinaryUploadResult,
    parentNode,
    createContentDigest,
    createNodeId,
    cloudName,
  });

  // Add the new node to Gatsby’s data layer.
  createNode(imageNode, { name: 'gatsby-transformer-cloudinary' });

  // Tell Gatsby to add `${relationshipName}` to the parent node.
  const relationshipKey = `${relationshipName}___NODE`;
  parentNode[relationshipKey] = imageNode.id;
  return imageNode;
};
