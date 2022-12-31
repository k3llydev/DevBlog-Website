import styles from './InlineTags.module.scss';

interface TagProps {
    tags: string[];
}

const TagCard = ({ tags }: TagProps) => (
    <div className={styles.tagItemsContainer}>
        {tags.map(tag => (
            <span key={`tag-item-${tag}`} className={styles.tagItem}>{tag}</span>
        ))}
    </div>
);

export default TagCard;
