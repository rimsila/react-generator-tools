import { useLockFn, useRequest, useCreation } from 'ahooks/es';

export const useTt = () => {
  const { data: dataApiGetTt, loading: loadingGetTt, run: runApiGetTt } = useRequest(API.getTt, {
    manual: true,
  });

  const runGetTt = useLockFn(async (v?: API.getTt) => {
    await runApiGetTt(v);
  });

  // * ------------ DeleteTt --------------
  const { loading: loadingDeleteTt, run: runApiDeleteTt } = useRequest(API.deleteTt, {
    manual: true,
  });
  // * ------------ runDeleteTt --------------
  const runDeleteTt = useLockFn(async (v?: API.deleteTt) => {
    await runApiDeleteTt(v);
  });

  // * ------------ CreateTt --------------
  const { loading: loadingCreateTt, run: runApiCreateTt } = useRequest(API.createTt, {
    manual: true,
  });
  // * ------------ runCreateTt --------------
  const runCreateTt = useLockFn(async (v?: API.createTt) => {
    await runApiCreateTt(v);
  });

  // * ------------ UpdateTt --------------
  const { loading: loadingUpdateTt, run: runApiUpdateTt } = useRequest(API.updateTt, {
    manual: true,
  });
  // * ------------ runUpdateTt --------------
  const runUpdateTt = useLockFn(async (v?: API.updateTt) => {
    await runApiUpdateTt(v);
  });

  // * ------------ return data --------------
  const dataTt = useCreation(() => dataApiGetTt, [dataApiGetTt]);
  const recordTt = useCreation(() => dataApiGetTt?.record, [dataApiGetTt?.record]);

  return {
    dataTt,
    recordTt,
    runCreateTt,
    runGetTt,
    runUpdateTt,
    runDeleteTt,
    loadingCreateTt,
    loadingGetTt,
    loadingUpdateTt,
    loadingDeleteTt,
  };
};
