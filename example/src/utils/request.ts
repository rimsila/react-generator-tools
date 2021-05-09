import { getToken } from '@next-dev/core/es/authority';
import type { IRequestOption } from '@next-dev/core/es/nextRequest';
import {
  addRequestInterceptor,
  addResponseInterceptor,
  axios,
  commonRequestInterceptor,
  commonResponseWithRefreshTokenInterceptor,
  configGlobalHeader,
  configInstance,
  configRefreshToken,
  request,
} from '@next-dev/core/es/nextRequest';
import isEmpty from 'lodash/isEmpty';
import { getOnlyValue } from './arrObj';
import { handlerGlobalErr } from './globalHttpError';

const BASE_API_Graph_URL = 'https://graphqlzero.almansi.me/api';
const AUTH = 'https://graphqlzero.almansi.me/api';

export async function graphRequest<TResult = any>(opt?: IRequestOption & { isFormData?: boolean }) {
  const { hasParamData, isFormData } = opt || {};
  const dfPramData = hasParamData ? { accessKey: getToken()?.accessKey } : {};
  // console.log('!isEmpty(dfPramData)');

  const defaultHeader = {
    Authorization: `Bearer ${getToken()?.refreshToken}`,
  };

  const variables =
    !isEmpty(getOnlyValue(dfPramData)) || opt?.data?.variables
      ? {
          variables: {
            ...dfPramData,
            ...opt?.data?.variables,
          },
        }
      : {};
  /**
   * @configInstance
   */
  configRefreshToken(async () => {
    const res = await axios.post(BASE_API_Graph_URL, {
      data: {
        query: `
            mutation AuthToken{
              authToken(authKey: "${AUTH.authKey}")
            }`,
      },
    });
    console.log('rss', res);
    return res;
  });

  configInstance({
    baseURL: BASE_API_Graph_URL,
  });

  /**
   * @configGlobalHeader set header default id Bearer auth
   */

  configGlobalHeader(() => {
    return {
      ...defaultHeader,
    };
  });

  /**
   * @axiosInterceptor handle global res and req
   */
  addRequestInterceptor(...commonRequestInterceptor);
  addResponseInterceptor(...commonResponseWithRefreshTokenInterceptor);

  /**
   * @return_data to client ui
   */
  try {
    const parm = isFormData
      ? {
          fullTip: true,
          ...opt,
          formData: opt?.data,
          method: 'POST',
        }
      : {
          fullTip: false,
          ...opt,
          data: {
            ...opt?.data,
            ...variables,
          }, // has default data
          method: 'POST',
        };

    const response: any = await request<TResult>({ ...(parm as any) });

    // const res = await instance.post(url, data, config);
    /**
     * @handlerGlobalError show msg success/err/redirect
     */

    //* set success
    handlerGlobalErr({ ...response });
    return response?.data;
  } catch (catchAxiosError) {
    //* catchError error
    handlerGlobalErr({
      ...catchAxiosError,
      isErr: true,
    });
    return catchAxiosError;
  }
}
