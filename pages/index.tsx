import type { GetStaticProps, NextPage } from 'next'

import CanvasMatrix from '../components/common/CanvasMatrix';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../lib/redux/hooks';
import { homeUpdateAnimaiton } from '../lib/redux/actions/homePageActions';
import { hideHeader, showHeader } from '../lib/redux/actions/headerComponentActions';
import { GenericHead } from '../components/common/AppHead';
import { CONSTANTS } from '../lib/constants';

export const getStaticProps: GetStaticProps<Page.StaticGenericProps> = async () => {

  return {
    props: {
      header: {
        show: false,
        detectBackNavigation: false,
        variant: 'centered'
      },
      seo: {
        title: CONSTANTS.GENERAL.TITLE,
        description: CONSTANTS.GENERAL.DESCRIPTION,
        baseName: CONSTANTS.GENERAL.NAME,
        url: CONSTANTS.APP_HOST,
        keywords: CONSTANTS.GENERAL.KEYWORDS
      }
    }
  };
};

const Home: NextPage<Page.StaticGenericProps> = ({ seo }) => {

  const dispatch = useAppDispatch();
  const [bgAnimationDone, setBgAnimationDone] = useState(false);

  useEffect(() => {
    if(!bgAnimationDone) {
      dispatch(hideHeader());
      dispatch(homeUpdateAnimaiton('firstLabel', false));
      dispatch(homeUpdateAnimaiton('secondLabel', false));
      return;
    }
    dispatch(showHeader());
  }, [bgAnimationDone])

  return (
    <div>
      <GenericHead seo={seo} />
      <CanvasMatrix
        variant="fullscreen"
        onAnimationDone={() => setBgAnimationDone(true)}
      />
    </div>
  )
}

export default Home;
