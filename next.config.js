/** @type {import('next').NextConfig} */
require('dotenv').config();
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');
const { join } = require('path');
const https = require('https');
const unzipper = require('unzipper');
const { createReadStream, createWriteStream, unlinkSync, existsSync, mkdirSync } = require('fs');
const Log = require('next/dist/build/output/log');

const githubDownload = async (name, assetsDownloadUrl, moveToPublic = false) => {

  // Ensure clean installation
  const localFolder = join(process.cwd(), '/.tmp/');
  // If folder doesn't exist, create it
  if(!existsSync(localFolder)) mkdirSync(localFolder);

  const downloadPath = join(localFolder, `/github.${name}.zip`);
  // If file exists, delete it first
  if(existsSync(downloadPath)) unlinkSync(downloadPath);
  const downloadStream = createWriteStream(downloadPath);
  
  Log.wait(`Downloading GitHub ${name}...`);
  await new Promise((resolve, reject) => {
    https.get(assetsDownloadUrl, (response) => {
      response.pipe(downloadStream);
      downloadStream.on('finish', () => {
        Log.event(`GitHub ${name} downloaded`);
        // File is done downloading, close stream and unzip
        downloadStream.close();
        resolve();
      });
    }).on('error', (error) => {
        unlinkSync(localFolder);
        throw new Error('A problem ocurred while syncing with GitHub.\n' + error);
    });
  });

  Log.wait('Decompressing downloaded file...');
  // Unzip file
  const finalPath = moveToPublic ? '/public/' : '/.tmp/';
  createReadStream(downloadPath).pipe(unzipper.Extract({ path: join(process.cwd(), finalPath) }));
  Log.event(`Extracted GitHub ${name}`);
};

/**
 * Handles configuration for Next.js
 * @param {*} phase 
 * @param {*} config 
 * @returns NextJS configuration object
 */
module.exports = async (phase) => {

  const GITHUB_BLOG_USERNAME = 'k3llydev';
  const GITHUB_BLOG_REPO = 'DevBlog-Archive';
  const GITHUB_BLOG_ASSETS_BRANCH = 'resources';
  const GITHUB_BLOG_CONTENTS_BRANCH = 'archive';

  if(phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    await githubDownload('assets', `https://codeload.github.com/${GITHUB_BLOG_USERNAME}/${GITHUB_BLOG_REPO}/zip/${GITHUB_BLOG_ASSETS_BRANCH}`, true);
    await githubDownload('contents', `https://codeload.github.com/${GITHUB_BLOG_USERNAME}/${GITHUB_BLOG_REPO}/zip/${GITHUB_BLOG_CONTENTS_BRANCH}`)
  }

  return {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      GITHUB_BLOG_USERNAME,
      GITHUB_BLOG_REPO,
      GITHUB_BLOG_ASSETS_BRANCH,
      GITHUB_BLOG_CONTENTS_BRANCH
    }
  };
};
