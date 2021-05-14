import { useLockFn, useRequest, useCreation } from 'ahooks/es';

export const useSila = () => {
  const { data: dataApiGetSila, loading: loadingGetSila, run: runApiGetSila } = useRequest(API.GetSila, {
    manual: true,
  });

  const runGetSila = useLockFn(async (v?: API.getSila) => {
    await runApiGetSila(v);
  });

  // * ------------ DeleteSila --------------
  const { loading: loadingDeleteSila, run: runApiDeleteSila } = useRequest(API.DeleteSila, {
    manual: true,
  });
  // * ------------ runDeleteSila --------------
  const runDeleteSila = useLockFn(async (v?: API.deleteSila) => {
    await runApiDeleteSila(v);
  });

  // * ------------ CreateSila --------------
  const { loading: loadingCreateSila, run: runApiCreateSila } = useRequest(API.CreateSila, {
    manual: true,
  });
  // * ------------ runCreateSila --------------
  const runCreateSila = useLockFn(async (v?: API.createSila) => {
    await runApiCreateSila(v);
  });

  // * ------------ UpdateSila --------------
  const { loading: loadingUpdateSila, run: runApiUpdateSila } = useRequest(API.UpdateSila, {
    manual: true,
  });
  // * ------------ runUpdateSila --------------
  const runUpdateSila = useLockFn(async (v?: API.updateSila) => {
    await runApiUpdateSila(v);
  });

  // * ------------ return data --------------
  const dataSila = useCreation(() => dataApiGetSila, [dataApiGetSila]);
  const recordSila = useCreation(() => dataApiGetSila?.record, [dataApiGetSila?.record]);

  return {
    dataSila,
    recordSila,
    runCreateSila,
    runGetSila,
    runUpdateSila,
    runDeleteSila,
    loadingCreateSila,
    loadingGetSila,
    loadingUpdateSila,
    loadingDeleteSila,
  };
};
