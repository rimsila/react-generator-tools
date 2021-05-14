import { useLockFn, useRequest, useCreation } from 'ahooks/es';

export const useFf = () => {
  const { data: dataApiGetFf, loading: loadingGetFf, run: runApiGetFf } = useRequest(API.GetFf, {
    manual: true,
  });

  const runGetFf = useLockFn(async (v?: API.getFf) => {
    await runApiGetFf(v);
  });

  // * ------------ DeleteFf --------------
  const { loading: loadingDeleteFf, run: runApiDeleteFf } = useRequest(API.DeleteFf, {
    manual: true,
  });
  // * ------------ runDeleteFf --------------
  const runDeleteFf = useLockFn(async (v?: API.deleteFf) => {
    await runApiDeleteFf(v);
  });

  // * ------------ CreateFf --------------
  const { loading: loadingCreateFf, run: runApiCreateFf } = useRequest(API.CreateFf, {
    manual: true,
  });
  // * ------------ runCreateFf --------------
  const runCreateFf = useLockFn(async (v?: API.createFf) => {
    await runApiCreateFf(v);
  });

  // * ------------ UpdateFf --------------
  const { loading: loadingUpdateFf, run: runApiUpdateFf } = useRequest(API.UpdateFf, {
    manual: true,
  });
  // * ------------ runUpdateFf --------------
  const runUpdateFf = useLockFn(async (v?: API.updateFf) => {
    await runApiUpdateFf(v);
  });

  // * ------------ return data --------------
  const dataFf = useCreation(() => dataApiGetFf, [dataApiGetFf]);
  const recordFf = useCreation(() => dataApiGetFf?.record, [dataApiGetFf?.record]);

  return {
    dataFf,
    recordFf,
    runCreateFf,
    runGetFf,
    runUpdateFf,
    runDeleteFf,
    loadingCreateFf,
    loadingGetFf,
    loadingUpdateFf,
    loadingDeleteFf,
  };
};
