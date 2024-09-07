import { GetStaticProps, NextPage } from 'next';
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

    const bornYear = 1998;
    const startingYear = 2010;
    const careerStartingYear = 2018;
    const currentYear = new Date().getFullYear();

    const startedYearsAgo = currentYear - startingYear;
    const bornYearsAgo = currentYear - bornYear;
    const careerStartYearsAgo = currentYear - careerStartingYear;

    const _ = (stringToHighlight: string) => <span className={styles.highlightMe}>{stringToHighlight}</span>

    return(
        <div className={styles.GenericContainer}>
            <GenericHead seo={seo} />
            <h1 className={styles.title}>About me</h1>
            <br/>
            <span className={styles.intro}>
                I'm a {_('self-taught')}, highly disciplined, and <i>{_('"technology speedrunner"')}</i> engineer who excels at thinking both inside and outside the box.<br/>
                My journey began {startedYearsAgo} years ago when I discovered that my favorite game at the time, Minecraft, was moddable.

                <br/><br/>

                After creating my first mod using Java, I began exploring different technologies. I was soon captivated by how Facebook (now Meta) operated, which drew me deeply into the world of web development.
                Now at {bornYearsAgo}, with {careerStartYearsAgo} years of professional experience, my career has fully evolved in the web development field.

                <br/><br/>

                You can always reach out to me on the following media
                
                <br/><br/>

                Mail:<br/>
                <TextObfuscator
                    size={18}
                    text={String.fromCharCode.apply(null, CONSTANTS.CONTACT.EMAIL)}
                />

                <br/>

                Discord:<br/>
                <TextObfuscator
                    size={18}
                    text={String.fromCharCode.apply(null, CONSTANTS.CONTACT.DISCORD)}
                />

            </span>
        </div>
    );
};

export default AboutMe;
