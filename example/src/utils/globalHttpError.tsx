import type { IRequestOption } from '@next-dev/core/es/nextRequest';
import { message, notification } from 'antd';
import Text from 'antd/lib/typography/Text';
import isEmpty from 'lodash/isEmpty';
import { history } from 'umi';
import { clearToken } from '@next-dev/core/es/authority';
import React from 'react';

export const handlerGlobalErr = (configMsg: any) => {
  const { data, config, response, status, fullTip, newMsg } = configMsg || {};
  const { errorTip = false, debug } = (config as IRequestOption) || {};
  console.log('err', !isEmpty(data?.errors));
  const isErr = data?.errors;

  // console.log('data', data);
  const errStatus = !isEmpty(data?.errors) && data?.errors[0]?.statusCode;

  const invalidUser = errStatus === 403;

  const codeStatus =
    data?.message?.code || response?.data?.message?.code || status || response?.status;

  const dfError = isErr
    ? 'It seem the connection it not working! or something went wrong!'
    : 'operation succeed!';

  const showFinalMsg = dfError;

  const showFullTipFunc = () => {
    const newMsgParam = newMsg || showFinalMsg;
    if ((fullTip && isErr) || (errorTip && isErr)) {
      message.error(newMsgParam);
    }
    // console.log('terst', fullTip);

    if (fullTip && !isErr && !errorTip) {
      // console.log('555');

      message.success(newMsgParam);
    }
  };

  /* *
   * @General //* handler base on response data
   */

  if (debug) {
    console.log(`debug ${isErr ? 'err' : 'succ'}`, codeStatus);
  }

  if (data) {
    // * ---------- invalid token ----------------
    if (invalidUser) {
      if (history?.location?.pathname !== '/auth/login') {
        clearToken();
        history.replace('/auth/login');
      }
      notification.error({
        message: 'Invalid User Account',
        description: (
          <>
            <Text>Your Account is invalid or has been removed authorization ! </Text>
            <br />
            <Text type="danger">Please try to login it again! </Text>
          </>
        ),
      });
    }

    /* *
     * @Method diff GET will handler here
     */
    if (!invalidUser) {
      showFullTipFunc();
    }
  }

  /* *
   * @Method for GET
   */

  return null;
};
