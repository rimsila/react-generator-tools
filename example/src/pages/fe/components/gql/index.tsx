import { useLockFn, useRequest, useCreation } from 'ahooks/es';

export const useFe = () => {
  const { data: dataApiGetFe, loading: loadingGetFe, run: runApiGetFe } = useRequest(API.GetFe, {
    manual: true,
  });

  const runGetFe = useLockFn(async (v?: API.getFe) => {
    await runApiGetFe(v);
  });

  // * ------------ DeleteFe --------------
  const { loading: loadingDeleteFe, run: runApiDeleteFe } = useRequest(API.DeleteFe, {
    manual: true,
  });
  // * ------------ runDeleteFe --------------
  const runDeleteFe = useLockFn(async (v?: API.deleteFe) => {
    await runApiDeleteFe(v);
  });

  // * ------------ CreateFe --------------
  const { loading: loadingCreateFe, run: runApiCreateFe } = useRequest(API.CreateFe, {
    manual: true,
  });
  // * ------------ runCreateFe --------------
  const runCreateFe = useLockFn(async (v?: API.createFe) => {
    await runApiCreateFe(v);
  });

  // * ------------ UpdateFe --------------
  const { loading: loadingUpdateFe, run: runApiUpdateFe } = useRequest(API.UpdateFe, {
    manual: true,
  });
  // * ------------ runUpdateFe --------------
  const runUpdateFe = useLockFn(async (v?: API.updateFe) => {
    await runApiUpdateFe(v);
  });

  // * ------------ return data --------------
  const dataFe = useCreation(() => dataApiGetFe, [dataApiGetFe]);
  const recordFe = useCreation(() => dataApiGetFe?.record, [dataApiGetFe?.record]);

  return {
    dataFe,
    recordFe,
    runCreateFe,
    runGetFe,
    runUpdateFe,
    runDeleteFe,
    loadingCreateFe,
    loadingGetFe,
    loadingUpdateFe,
    loadingDeleteFe,
  };
};
