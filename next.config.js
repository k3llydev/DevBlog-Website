/** @type {import('next').NextConfig} */

/**
 * Handles configuration for Next.js
 * @param {*} phase 
 * @param {*} config 
 * @returns NextJS configuration object
 */
module.exports = () => ({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  env: {
    GITHUB_BLOG_USERNAME: 'k3llydev',
    GITHUB_BLOG_REPO: 'DevBlog-Archive',
    GITHUB_BLOG_ASSETS_BRANCH: 'resources',
    GITHUB_BLOG_CONTENTS_BRANCH: 'archive'
  }
});
