# Portfolio Website

This is a personal project I started not only to stay up-to-date 

## Built with

- TypeScript
- React
- Redux
- Next.js
- MongoDB
- Mongoose

## Environment variables

`MONGODB_URI`: The configured path where the application should consume MongoDB.\
`GITHUB_TOKEN`: A private token from GitHub to authenticate against GitHub's API and retrieve assets on build time.

## Configuration

The file `next.config.js` contains a few environment variables used to clone the DevBlog repository containing all the articles. This file should be modified based on the environment.

## Pending tasks

- [ ] Implement shortener API (sharing)
- [ ] Refactor `<AppHeader/>` component
- [ ] Unify `.scss` files (not critic)
- [ ] Cleanse `/components/` folder
