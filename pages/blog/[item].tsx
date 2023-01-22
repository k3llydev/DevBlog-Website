import { NextPage } from 'next';
import type { GetStaticProps, GetStaticPropsContext } from 'next';

import {
    POSTS,
    getPostDetail
} from '../../lib/BlogHandler';
import styles from '../../styles/Blog.module.scss';
import InlineTags from '../../components/common/InlineTags/';
import { ArticleHead } from '../../components/common/AppHead';
import { CONSTANTS } from '../../lib/constants';
import { StaticUrlGenerator } from '../../lib/utils';

export const getStaticPaths = async () => {

    const allowedPathBase = (value: string) => ({ params: { item: value }});
    const blogResponse: BlogEntry[] = Array.from(POSTS);

    // Get an array from every post hash
    const allowedHashNames = blogResponse.map(({ hash }) => allowedPathBase(hash));

    return {
        paths: allowedHashNames,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<PostProps> = async ( context: GetStaticPropsContext ) => {

    const item = context.params?.item || '';
    const postDetail = await getPostDetail(item.toString()); // Current workaround to remove string[] to string issue. Using SSG

    return {
        props: {

            header: {
                show: true,
                detectBackNavigation: true,
                variant: 'default'
                //shareShortenedURL: '' // TODO: Implement shortener API and update MongoDB schemas to fit
            },
            seo: {
                title: postDetail.post.title,
                description: postDetail.post.description,
                baseName: CONSTANTS.BLOG.NAME,
                url: StaticUrlGenerator(__filename, { item }),
                keywords: [...CONSTANTS.BLOG.KEYWORDS, ...postDetail.post.tags.map(t => t.abbreviated)],
                author: postDetail.post.author,
                published_date: postDetail.post.date,
                last_modified: postDetail.post.last_modified,
                category: postDetail.post.category
            },
            ...postDetail
        }
    };
};

const PostDetail: NextPage<PostProps> = ({ post: { title, author, date, last_modified, category, tags }, content, seo }) => {

    return (
        <div className={[styles.GenericContainer, 'SpacingTopExtraLarge'].join(' ')}>
            <ArticleHead seo={seo} />

            <InlineTags tags={ tags.map(tag => tag.label) } ></InlineTags>
            <h1 className={styles.postTitle} dangerouslySetInnerHTML={{ __html: title }}></h1>
            <div className={styles.floatingInfoContainer}>
                <div>
                    <span className={styles.floatingInfoLabel}>Category</span>
                    <span className={styles.floatingInfoValue}>{category.label}</span>
                </div>
                <div>
                    <span className={styles.floatingInfoLabel}>Published</span>
                    <span className={styles.floatingInfoValue}>{date}</span>
                </div>
                { last_modified && (
                    <div>
                        <span className={styles.floatingInfoLabel}>Last updated</span>
                        <span className={styles.floatingInfoValue}>{last_modified}</span>
                    </div>
                )}
                <div>
                    <span className={styles.floatingInfoLabel}>Author</span>
                    <span className={styles.floatingInfoValue}>{author}</span>
                </div>
            </div>
            <div className={styles.markdownContentAsHTML} dangerouslySetInnerHTML={{ __html: decodeURI(content) }}></div>
        </div>
    )
};

export default PostDetail;
