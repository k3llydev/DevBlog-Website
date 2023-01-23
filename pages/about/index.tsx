import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { GenericHead } from '../../components/common/AppHead';
import TextObfuscator from '../../components/common/TextObfuscator';
import { CONSTANTS } from '../../lib/constants';
import { StaticUrlGenerator } from '../../lib/utils';

import styles from '../../styles/About.module.scss';

export const getStaticProps: GetStaticProps<Page.StaticGenericProps> = async () => {
    return {
        props: {
            header: {
                show: true,
                detectBackNavigation: true,
                variant: 'default'
            },
            seo: {
                title: CONSTANTS.ABOUT.TITLE,
                description: CONSTANTS.ABOUT.DESCRIPTION,
                baseName: CONSTANTS.ABOUT.NAME,
                url: StaticUrlGenerator(__filename),
                keywords: CONSTANTS.ABOUT.KEYWORDS
            }
        }
    };
};

const AboutMe: NextPage<Page.StaticGenericProps> = ({ seo }) => {

    const yearsAgo = new Date().getFullYear() - 2010;
    const _ = (stringToHighlight: string) => <span className={styles.highlightMe}>{stringToHighlight}</span>

    return(
        <div className={styles.GenericContainer}>
            <GenericHead seo={seo} />
            <h1 className={styles.title}>Who is Kelly?</h1>
            <br/>
            <span className={styles.intro}>
                Kelly is a {_('self-taught')}, highly disciplined and <i>{_('"technology speedrunner"')}</i> Software Engineer who can think both inside and outside the box.<br/>
                With an early start of his career (at 12 years old, {yearsAgo} years ago) his {_('curiosity')} and {_('determination')} led him to the greatest challenges.
                
                <br/><br/>

                Throughout his professional experience, Kelly has led around 100 software development teams under different work methodologies.<br/>
                He also finds happiness in {_('sharing knowledge')} both verbally and written which forces him to stay up-to-date.

                <br/><br/>

                While hunting the opportunity of his dreams, he is ready to fearlessly solve any problem and {_('learn more')} than what is expected from him.<br/>

                <br/><br/>

                <h2 className={styles.subtitle}>Know more</h2>
                <br/>
                <Link href="https://github.com/k3llydev" className={styles.inlineLink} target='_blank'>
                    <i className="bi bi-github"></i>
                </Link>

                <br/><br/>
                
                For any further information such as certifications, courses, diplomas, etc. you will have to prove being a human.
                
                <br/><br/>
                <TextObfuscator text={String.fromCharCode.apply(null, CONSTANTS.CONTACT_EMAIL)} />
            </span>
        </div>
    );
};

export default AboutMe;
