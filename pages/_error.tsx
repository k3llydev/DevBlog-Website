import NotFoundPage from './404';

export const getInitialProps = ({ res, err }: any) => ({
    statusCode: 404
});

export default NotFoundPage;