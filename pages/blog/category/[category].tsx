import { GetStaticProps, GetStaticPropsContext } from 'next';

import BlogHome from '../index';

import {
    AVAILABLE_CATEGORIES,
    getPostsByCategory
} from '../../../lib/BlogHandler';
import { CONSTANTS } from '../../../lib/constants';
import { StaticUrlGenerator } from '../../../lib/utils';

export const getStaticPaths = async () => {

    const allowedPathBase = (value: string) => ({ params: { category: value }});
    const allowedPageCategories = AVAILABLE_CATEGORIES.map((category) => allowedPathBase(category.abbreviated));

    return {
        paths: [ ...allowedPageCategories ],
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<BlogProps> = async ( context: GetStaticPropsContext ) => {

    const category = context.params?.category || '';

    const currentPage = 1;
    const currentPosts = getPostsByCategory(currentPage, category.toString());
    const currentSearchCategory = currentPosts.page[0].category;

    return {
        props: {
            header: {
                show: true,
                detectBackNavigation: true,
                variant: 'default'
            },
            seo: {
                title: `Results for ${currentSearchCategory.label}`,
                description: CONSTANTS.BLOG.DESCRIPTION,
                baseName: CONSTANTS.BLOG.NAME,
                url: StaticUrlGenerator(__filename, { category }),
                keywords: CONSTANTS.BLOG.KEYWORDS
            },
            currentPage: 1,
            currentCategory: category.toString(),
            availablePagesAmount: currentPosts.pages,
            entries: currentPosts.page,
            availableTags: currentPosts.availableTags,
            availableCategories: currentPosts.availableCategories
        }
    };
};

export default BlogHome;
