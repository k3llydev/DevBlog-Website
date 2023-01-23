import Link from 'next/link';

import styles from './PostCard.module.scss';

import InlineTags from '../InlineTags/';

const PostCard = ({ hash, title, description, illustration, date, tags, category }: BlogEntry) => {
    const tagLabels = tags.map(tag => tag.label);
    return(
        <Link href={`/blog/${hash}`}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: title }}></h2>
                    <span className={styles.date}>{date}</span>
                </div>
                <div className={styles.footer}>
                    <span className={styles.categoryLabel}>{category.label}</span>
                    <InlineTags tags={ tagLabels } ></InlineTags>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
