import { useLockFn, useRequest, useCreation } from 'ahooks/es';

export const useTest = () => {
  const { data: dataApiGetTest, loading: loadingGetTest, run: runApiGetTest } = useRequest(API.getTest, {
    manual: true,
  });

  const runGetTest = useLockFn(async (v?: API.getTest) => {
    await runApiGetTest(v);
  });

  // * ------------ DeleteTest --------------
  const { loading: loadingDeleteTest, run: runApiDeleteTest } = useRequest(API.deleteTest, {
    manual: true,
  });
  // * ------------ runDeleteTest --------------
  const runDeleteTest = useLockFn(async (v?: API.deleteTest) => {
    await runApiDeleteTest(v);
  });

  // * ------------ CreateTest --------------
  const { loading: loadingCreateTest, run: runApiCreateTest } = useRequest(API.createTest, {
    manual: true,
  });
  // * ------------ runCreateTest --------------
  const runCreateTest = useLockFn(async (v?: API.createTest) => {
    await runApiCreateTest(v);
  });

  // * ------------ UpdateTest --------------
  const { loading: loadingUpdateTest, run: runApiUpdateTest } = useRequest(API.updateTest, {
    manual: true,
  });
  // * ------------ runUpdateTest --------------
  const runUpdateTest = useLockFn(async (v?: API.updateTest) => {
    await runApiUpdateTest(v);
  });

  // * ------------ return data --------------
  const dataTest = useCreation(() => dataApiGetTest, [dataApiGetTest]);
  const recordTest = useCreation(() => dataApiGetTest?.record, [dataApiGetTest?.record]);

  return {
    dataTest,
    recordTest,
    runCreateTest,
    runGetTest,
    runUpdateTest,
    runDeleteTest,
    loadingCreateTest,
    loadingGetTest,
    loadingUpdateTest,
    loadingDeleteTest,
  };
};
