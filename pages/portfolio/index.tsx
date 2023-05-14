import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import styles from '../../styles/Portfolio.module.scss';
import { listPortfolioProjects } from '../../lib/PortfolioHandler';
import InlineTags from '../../components/common/InlineTags';
import { GenericHead } from '../../components/common/AppHead';
import { CONSTANTS } from '../../lib/constants';
import { StaticUrlGenerator } from '../../lib/utils';

export const getStaticProps: GetStaticProps<PortfolioProps> = async () => {
    const portfolioProjects = await listPortfolioProjects();
    return {
        props: {
            header: {
                show: true,
                detectBackNavigation: false,
                variant: 'default'
            },
            seo: {
                title: CONSTANTS.PORTFOLIO.TITLE,
                description: CONSTANTS.PORTFOLIO.DESCRIPTION,
                baseName: CONSTANTS.PORTFOLIO.NAME,
                url: StaticUrlGenerator(__filename),
                keywords: CONSTANTS.PORTFOLIO.KEYWORDS
            },
            elements: portfolioProjects
        }
    };
};

const PortfolioLink = ({ title, description, techStack, links }: ProjectModel) => (
    <div className={styles.linkContainer}>
        <h3 className={styles.title}>{title}</h3>
        { links.map(({ link, label }) => (
            <Link key={`link-to-${label.toLowerCase()}`} href={link} target="_blank" className={styles.linkItem}>
                {label}
            </Link>
        ))}
        <span className={styles.description}>{description}</span>
        <InlineTags tags={ techStack }></InlineTags>
    </div>
);

const PortfolioHome: NextPage<PortfolioProps> = ({ elements, seo }) => {
    return(
        <div className={styles.GenericContainer}>
            <GenericHead seo={seo} />
            <h1 className={styles.portfolioTitle}><i className={`bi bi-briefcase-fill ${styles.highlightedText}`}/> Portfolio</h1>
            { elements.map(element => (<PortfolioLink key={`portfolio-project-${element.title.toLowerCase()}`} {...element}></PortfolioLink>)) }
        </div>
    );
};

export default PortfolioHome;
