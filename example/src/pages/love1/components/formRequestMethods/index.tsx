import { useLockFn, useRequest, useCreation } from 'ahooks/es';

export const useLove1 = () => {
  const { data: dataApiGetLove1, loading: loadingGetLove1, run: runApiGetLove1 } = useRequest(API.getLove1, {
    manual: true,
  });

  const runGetLove1 = useLockFn(async (v?: API.getLove1) => {
    await runApiGetLove1(v);
  });

  // * ------------ DeleteLove1 --------------
  const { loading: loadingDeleteLove1, run: runApiDeleteLove1 } = useRequest(API.deleteLove1, {
    manual: true,
  });
  // * ------------ runDeleteLove1 --------------
  const runDeleteLove1 = useLockFn(async (v?: API.deleteLove1) => {
    await runApiDeleteLove1(v);
  });

  // * ------------ CreateLove1 --------------
  const { loading: loadingCreateLove1, run: runApiCreateLove1 } = useRequest(API.createLove1, {
    manual: true,
  });
  // * ------------ runCreateLove1 --------------
  const runCreateLove1 = useLockFn(async (v?: API.createLove1) => {
    await runApiCreateLove1(v);
  });

  // * ------------ UpdateLove1 --------------
  const { loading: loadingUpdateLove1, run: runApiUpdateLove1 } = useRequest(API.updateLove1, {
    manual: true,
  });
  // * ------------ runUpdateLove1 --------------
  const runUpdateLove1 = useLockFn(async (v?: API.updateLove1) => {
    await runApiUpdateLove1(v);
  });

  // * ------------ return data --------------
  const dataLove1 = useCreation(() => dataApiGetLove1, [dataApiGetLove1]);
  const recordLove1 = useCreation(() => dataApiGetLove1?.record, [dataApiGetLove1?.record]);

  return {
    dataLove1,
    recordLove1,
    runCreateLove1,
    runGetLove1,
    runUpdateLove1,
    runDeleteLove1,
    loadingCreateLove1,
    loadingGetLove1,
    loadingUpdateLove1,
    loadingDeleteLove1,
  };
};
