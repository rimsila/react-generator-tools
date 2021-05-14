/*

 * @Date: 2020-05-28 17:35:45
 * @LastEditTime: 2020-05-28 17:44:33
 */
import { useState } from 'react';

export default function useConfig() {
  const [initialFetch, setInitialFetch] = useState<string[]>();
  const [submitFetch, setSubmitFetch] = useState<string[]>();

  return {
    initialFetch,
    setInitialFetch,
    submitFetch,
    setSubmitFetch,
  };
}
