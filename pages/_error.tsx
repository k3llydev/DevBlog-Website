import NotFound from './404';

/**
 * The only purpose of this file is redirecting HTTP 500 Errors to a 404 since there is no server-side processing. 
 */
function Error() { return NotFound; }
Error.getInitialProps = () => ({ statusCode: 404 });
  
export default Error;