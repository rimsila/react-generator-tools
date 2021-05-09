import { useLockFn, useRequest, useCreation } from 'ahooks/es';

export const useLove = () => {
  const { data: dataApiGetLove, loading: loadingGetLove, run: runApiGetLove } = useRequest(API.getLove, {
    manual: true,
  });

  const runGetLove = useLockFn(async (v?: API.getLove) => {
    await runApiGetLove(v);
  });

  // * ------------ DeleteLove --------------
  const { loading: loadingDeleteLove, run: runApiDeleteLove } = useRequest(API.deleteLove, {
    manual: true,
  });
  // * ------------ runDeleteLove --------------
  const runDeleteLove = useLockFn(async (v?: API.deleteLove) => {
    await runApiDeleteLove(v);
  });

  // * ------------ CreateLove --------------
  const { loading: loadingCreateLove, run: runApiCreateLove } = useRequest(API.createLove, {
    manual: true,
  });
  // * ------------ runCreateLove --------------
  const runCreateLove = useLockFn(async (v?: API.createLove) => {
    await runApiCreateLove(v);
  });

  // * ------------ UpdateLove --------------
  const { loading: loadingUpdateLove, run: runApiUpdateLove } = useRequest(API.updateLove, {
    manual: true,
  });
  // * ------------ runUpdateLove --------------
  const runUpdateLove = useLockFn(async (v?: API.updateLove) => {
    await runApiUpdateLove(v);
  });

  // * ------------ return data --------------
  const dataLove = useCreation(() => dataApiGetLove, [dataApiGetLove]);
  const recordLove = useCreation(() => dataApiGetLove?.record, [dataApiGetLove?.record]);

  return {
    dataLove,
    recordLove,
    runCreateLove,
    runGetLove,
    runUpdateLove,
    runDeleteLove,
    loadingCreateLove,
    loadingGetLove,
    loadingUpdateLove,
    loadingDeleteLove,
  };
};
