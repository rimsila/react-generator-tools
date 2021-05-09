import { useLockFn, useRequest, useCreation } from 'ahooks/es';

export const useHook = () => {
  const { data: dataApiGetHook, loading: loadingGetHook, run: runApiGetHook } = useRequest(API.getHook, {
    manual: true,
  });

  const runGetHook = useLockFn(async (v?: API.User) => {
    await runApiGetHook(v);
  });

  // * ------------ DeleteHook --------------
  const { loading: loadingDeleteHook, run: runApiDeleteHook } = useRequest(API.deleteHook, {
    manual: true,
  });
  // * ------------ runDeleteHook --------------
  const runDeleteHook = useLockFn(async (v?: API.MutationDeletePostArgs) => {
    await runApiDeleteHook(v);
  });

  // * ------------ CreateHook --------------
  const { loading: loadingCreateHook, run: runApiCreateHook } = useRequest(API.createHook, {
    manual: true,
  });
  // * ------------ runCreateHook --------------
  const runCreateHook = useLockFn(async (v?: API.CacheControlScope) => {
    await runApiCreateHook(v);
  });

  // * ------------ UpdateHook --------------
  const { loading: loadingUpdateHook, run: runApiUpdateHook } = useRequest(API.updateHook, {
    manual: true,
  });
  // * ------------ runUpdateHook --------------
  const runUpdateHook = useLockFn(async (v?: API.updateHook) => {
    await runApiUpdateHook(v);
  });

  // * ------------ return data --------------
  const dataHook = useCreation(() => dataApiGetHook, [dataApiGetHook]);
  const recordHook = useCreation(() => dataApiGetHook?.record, [dataApiGetHook?.record]);

  return {
    dataHook,
    recordHook,
    runCreateHook,
    runGetHook,
    runUpdateHook,
    runDeleteHook,
    loadingCreateHook,
    loadingGetHook,
    loadingUpdateHook,
    loadingDeleteHook,
  };
};
