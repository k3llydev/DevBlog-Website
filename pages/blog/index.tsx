import { NextPage, GetStaticProps } from 'next';

import { CONSTANTS } from '../../lib/constants';
import { paginatePosts } from '../../lib/BlogHandler';
import styles from '../../styles/Blog.module.scss';
import PostCard from '../../components/common/PostCard';
import DynamicPagination from '../../components/common/DynamicPagination';
import FilterView from '../../components/common/FilterView';
import { GenericHead } from '../../components/common/AppHead';
import { StaticUrlGenerator } from '../../lib/utils';

export const getStaticProps: GetStaticProps<BlogProps> = async () => {

    const currentPage = 1;
    const postItems = paginatePosts(currentPage);

    return {
        props: {
            header: {
                show: true,
                detectBackNavigation: true,
                variant: 'default'
            },
            seo: {
                title: CONSTANTS.BLOG.TITLE,
                description: CONSTANTS.BLOG.DESCRIPTION,
                baseName: CONSTANTS.BLOG.NAME,
                url: StaticUrlGenerator(__filename),
                keywords: CONSTANTS.BLOG.KEYWORDS
            },
            currentPage,
            availablePagesAmount: postItems.pages,
            entries: postItems.page,
            availableTags: postItems.availableTags,
            availableCategories: postItems.availableCategories
        }
    };
};

const BlogHome: NextPage<BlogProps> = ({
    seo,
    currentPage,
    entries,
    availablePagesAmount,
    availableTags, 
    availableCategories,
    currentCategory,
    currentLabel
}) => {

    const isBlogIndex = currentPage === 1 && !currentCategory && !currentLabel;

    const generateBaseLink = (endWith: string = '') => {
        let baseUrl = '/blog/';
        if(currentCategory) baseUrl += `category/${currentCategory}/`;
        if(currentLabel) baseUrl += `label/${currentLabel}/`;
        baseUrl += endWith;
        return baseUrl;
    };

    return (
        <div className={styles.GenericContainer}>
            <GenericHead seo={seo} />
            {
                isBlogIndex && (
                    <>
                        <h1><i className={`bi bi-person-lines-fill ${styles.highlightedText}`} /> DevBlog</h1>
                        <p className={styles.welcomeDescription}>I love sharing what I&apos;ve learnt not only by mentoring others but by creating these kind of references for developers under my guidance and hopefully might help someone else around the globe someday.</p>
                    </>
                )
            }
            <FilterView
                currentCategory={currentCategory}
                currentLabel={currentLabel}
                availableTags={availableTags}
                availableCategories={availableCategories}
            ></FilterView>
            <div className={styles.blogCardsContainer}>
                { entries.map(postProps => <PostCard key={`post-entry-${postProps.hash}`} {...postProps} />) }
            </div>
            <DynamicPagination
                mainPage={generateBaseLink()}
                baseLink={generateBaseLink('page/')}
                pages={availablePagesAmount}
                currentPage={currentPage}
            ></DynamicPagination>
        </div>
    );
}

export default BlogHome;
