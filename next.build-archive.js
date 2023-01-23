const { join } = require('path');
const https = require('https');
const unzipper = require('unzipper');
const { createReadStream, createWriteStream, unlinkSync, existsSync, mkdirSync } = require('fs');
const Log = require('next/dist/build/output/log');
const NextConfig = require('./next.config');

const githubDownload = (name, assetsDownloadUrl, moveToPublic = false) => {

    // Ensure clean installation
    const localFolder = join(process.cwd(), '/.tmp/');
    // If folder doesn't exist, create it
    if (!existsSync(localFolder)) mkdirSync(localFolder);

    const downloadPath = join(localFolder, `/github.${name}.zip`);
    // If file exists, delete it first
    if (existsSync(downloadPath)) unlinkSync(downloadPath);
    const downloadStream = createWriteStream(downloadPath);

    Log.wait(`Downloading GitHub ${name}...`);
    return new Promise((resolve, reject) => {
        https.get(assetsDownloadUrl, (response) => {
            response.pipe(downloadStream);
            downloadStream.on('finish', () => {
                Log.event(`GitHub DevBlog-Archive ${name} downloaded`);
                // File is done downloading, close stream and unzip
                downloadStream.close();

                Log.wait('Decompressing downloaded file...');
                // Unzip file
                const finalPath = moveToPublic ? '/public/' : '/.tmp/';
                createReadStream(downloadPath).pipe(unzipper.Extract({ path: join(process.cwd(), finalPath) }));
                Log.event(`Extracted GitHub ${name}`);

                resolve();
            });
        }).on('error', () => {
            unlinkSync(localFolder);
            reject();
        });
    });

};

(async () => {
    const {
        GITHUB_BLOG_USERNAME,
        GITHUB_BLOG_REPO,
        GITHUB_BLOG_CONTENTS_BRANCH,
        GITHUB_BLOG_ASSETS_BRANCH
    } = NextConfig().env;
    Log.event('Downloading from another GitHub project (DevBlog-Archive)');
    await Promise.allSettled([
        await githubDownload('assets', `https://codeload.github.com/${GITHUB_BLOG_USERNAME}/${GITHUB_BLOG_REPO}/zip/${GITHUB_BLOG_ASSETS_BRANCH}`, true),
        await githubDownload('contents', `https://codeload.github.com/${GITHUB_BLOG_USERNAME}/${GITHUB_BLOG_REPO}/zip/${GITHUB_BLOG_CONTENTS_BRANCH}`)
    ]).then(() => {
        Log.ready('DevBlog-Archive was successfully downloaded.');
    });
})();
