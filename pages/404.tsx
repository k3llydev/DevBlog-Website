import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import styles from '../styles/Home.module.scss';
import { GenericHead } from '../components/common/AppHead';
import { CONSTANTS } from '../lib/constants';

export const getStaticProps: GetStaticProps<Page.StaticGenericProps> = () => {
  return {
    props: {
      header: {
        show: true,
        detectBackNavigation: true,
        variant: 'default'
      },
      seo: {
        title: CONSTANTS.NOT_FOUND.TITLE,
        description: CONSTANTS.NOT_FOUND.DESCRIPTION,
        baseName: CONSTANTS.NOT_FOUND.NAME,
        url: new URL('/404', CONSTANTS.APP_HOST).href,
        keywords: CONSTANTS.NOT_FOUND.KEYWORDS
      }
    }
  };
};

const NotFound: NextPage<Page.StaticGenericProps> = ({ seo }) => {
  return (
    <>
      <GenericHead seo={seo} />
      <section className={styles.homeCenteredContainer}>
        <Image className={styles.largeImageBorder} src="/404-image-asset.gif" width={498} height={371} unoptimized alt="Not found" />
        <h1 className={styles.notFoundLabel}>404 <span className={styles.lightText}>|</span> Not found</h1>
      </section>
    </>
  )
}

export default NotFound;
