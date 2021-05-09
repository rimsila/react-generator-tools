import { useLockFn, useRequest, useCreation } from 'ahooks/es';

export const useTest1 = () => {
  const { data: dataApiGetTest1, loading: loadingGetTest1, run: runApiGetTest1 } = useRequest(API.getTest1, {
    manual: true,
  });

  const runGetTest1 = useLockFn(async (v?: API.getTest1) => {
    await runApiGetTest1(v);
  });

  // * ------------ DeleteTest1 --------------
  const { loading: loadingDeleteTest1, run: runApiDeleteTest1 } = useRequest(API.deleteTest1, {
    manual: true,
  });
  // * ------------ runDeleteTest1 --------------
  const runDeleteTest1 = useLockFn(async (v?: API.deleteTest1) => {
    await runApiDeleteTest1(v);
  });

  // * ------------ CreateTest1 --------------
  const { loading: loadingCreateTest1, run: runApiCreateTest1 } = useRequest(API.createTest1, {
    manual: true,
  });
  // * ------------ runCreateTest1 --------------
  const runCreateTest1 = useLockFn(async (v?: API.createTest1) => {
    await runApiCreateTest1(v);
  });

  // * ------------ UpdateTest1 --------------
  const { loading: loadingUpdateTest1, run: runApiUpdateTest1 } = useRequest(API.updateTest1, {
    manual: true,
  });
  // * ------------ runUpdateTest1 --------------
  const runUpdateTest1 = useLockFn(async (v?: API.updateTest1) => {
    await runApiUpdateTest1(v);
  });

  // * ------------ return data --------------
  const dataTest1 = useCreation(() => dataApiGetTest1, [dataApiGetTest1]);
  const recordTest1 = useCreation(() => dataApiGetTest1?.record, [dataApiGetTest1?.record]);

  return {
    dataTest1,
    recordTest1,
    runCreateTest1,
    runGetTest1,
    runUpdateTest1,
    runDeleteTest1,
    loadingCreateTest1,
    loadingGetTest1,
    loadingUpdateTest1,
    loadingDeleteTest1,
  };
};
