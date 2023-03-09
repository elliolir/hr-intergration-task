import { AxiosResponse } from 'axios';

/**
 * Common axios handler that return either response body or null
 */
const handleAxiosResponse = (resp: Promise<AxiosResponse>) =>
  resp.catch(() => ({ data: null })).then(({ data }) => data);

export { handleAxiosResponse };
