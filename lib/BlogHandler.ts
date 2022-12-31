import { readFileSync } from 'fs';
import { join as joinPath } from 'path';

const removeDuplicates = (el: any, index: number, self: any[]) => {
    const firstIndex = self.findIndex(sel => el.id === sel.id);
    return index === firstIndex;
};

const POSTS_LOCAL_FOLDER = joinPath(process.cwd(), `/.tmp/${process.env.GITHUB_BLOG_REPO}-${process.env.GITHUB_BLOG_CONTENTS_BRANCH}`);
export const POSTS: BlogEntry[] = JSON.parse(readFileSync(joinPath(POSTS_LOCAL_FOLDER, 'index.json')).toString());
export const AVAILABLE_TAGS: TagDetail[] = POSTS.map(post => post.tags).flat().filter(removeDuplicates);
export const AVAILABLE_CATEGORIES: CategoryDetail[] = POSTS.map(post => post.category).filter(removeDuplicates);
export const PAGE_SIZE = 5;
export const AVAILABLE_PAGES = Math.ceil(POSTS.length / PAGE_SIZE);

export const paginatePosts = (page: number, posts = POSTS): PaginatedPostsProps => {
    const skip = page - 1;
    const pagination = Array.from(posts).splice(skip * PAGE_SIZE, PAGE_SIZE);
    return {
        page: pagination,
        pages: Math.ceil(posts.length / PAGE_SIZE),
        availableTags: AVAILABLE_TAGS,
        availableCategories: AVAILABLE_CATEGORIES
    };
};

export const getPostsByCategory = (page: number, category: string) => {
    const filteredPosts = POSTS.filter(post => post.category.abbreviated === category);
    return paginatePosts(page, filteredPosts);
};

export const getPostsByLabel = (page: number, label: string) => {
    const filteredPosts = POSTS.filter(post => post.tags.find(tag => tag.abbreviated === label));
    return paginatePosts(page, filteredPosts);
};

export const getPostDetail = async (postHash: string) => {
    const post = POSTS.find(({ hash }) => postHash === hash) || POSTS[0]; // Using POSTS[0] as alternative since the app is using SSG
    return {
        post,
        content: readFileSync(joinPath(POSTS_LOCAL_FOLDER, `${postHash}.${post.storedAs}`)).toString()
    }
};
