import { GetStaticProps, GetStaticPropsContext } from 'next';

import BlogHome from '../../../index';

import {
    AVAILABLE_CATEGORIES,
    getPostsByCategory
} from '../../../../../lib/BlogHandler';
import { CONSTANTS } from '../../../../../lib/constants';
import { StaticUrlGenerator } from '../../../../../lib/utils';

export const getStaticPaths = async () => {

    const allowedPaths = [];
    const allowedPathBase = (category: string, index: string) => ({ params: { category, index }});
    for(let i = 0; i < AVAILABLE_CATEGORIES.length; i++) {
        const categoryId = AVAILABLE_CATEGORIES[i].abbreviated;
        const currentPosts = getPostsByCategory(1, categoryId);
        for(let j = 0; j < currentPosts.pages; j++) {
            const pageNumber = j + 1;
            allowedPaths.push(allowedPathBase(categoryId, pageNumber.toString()));
        }
    }

    return {
        paths: allowedPaths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<BlogProps> = async ( context: GetStaticPropsContext ) => {

    const category = context.params?.category || '';
    const index = context.params?.index || 0;

    const currentPage = +index;
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
                title: `Page ${index} of ${currentSearchCategory.label}`,
                description: CONSTANTS.BLOG.DESCRIPTION,
                baseName: CONSTANTS.BLOG.NAME,
                url: StaticUrlGenerator(__filename, { index, category }),
                keywords: CONSTANTS.BLOG.KEYWORDS
            },
            currentPage,
            currentCategory: category.toString(),
            availablePagesAmount: currentPosts.pages,
            entries: currentPosts.page,
            availableTags: currentPosts.availableTags,
            availableCategories: currentPosts.availableCategories
        }
    };
};

export default BlogHome;
