import capitalize from 'lodash/capitalize'
import camelCase from 'lodash/camelCase'

export interface Payload {
  pageName: string;

}

export default ({ pageName }: Payload) => {
   const pageNameCapitalize = capitalize(pageName);

    return `
  import { useLockFn, useRequest, useCreation } from 'ahooks/es';

    export const use${pageNameCapitalize} = () => {
      const { data: dataApiGet${pageNameCapitalize}, loading: loadingGet${pageNameCapitalize}, run: runApiGet${pageNameCapitalize} } = useRequest(API.Get${pageNameCapitalize}, {
        manual: true,
      });

      const runGet${pageNameCapitalize} = useLockFn(async (v?: API.get${pageNameCapitalize}) => {
        await runApiGet${pageNameCapitalize}(v);
      });

      // * ------------ Delete${pageNameCapitalize} --------------
      const { loading: loadingDelete${pageNameCapitalize}, run: runApiDelete${pageNameCapitalize} } = useRequest(API.Delete${pageNameCapitalize}, {
        manual: true,
      });
      // * ------------ runDelete${pageNameCapitalize} --------------
      const runDelete${pageNameCapitalize} = useLockFn(async (v?: API.delete${pageNameCapitalize}) => {
        await runApiDelete${pageNameCapitalize}(v);
      });

      // * ------------ Create${pageNameCapitalize} --------------
      const { loading: loadingCreate${pageNameCapitalize}, run: runApiCreate${pageNameCapitalize} } = useRequest(API.Create${pageNameCapitalize}, {
        manual: true,
      });
      // * ------------ runCreate${pageNameCapitalize} --------------
      const runCreate${pageNameCapitalize} = useLockFn(async (v?: API.create${pageNameCapitalize}) => {
        await runApiCreate${pageNameCapitalize}(v);
      });

      // * ------------ Update${pageNameCapitalize} --------------
      const { loading: loadingUpdate${pageNameCapitalize}, run: runApiUpdate${pageNameCapitalize} } = useRequest(API.Update${pageNameCapitalize}, {
        manual: true,
      });
      // * ------------ runUpdate${pageNameCapitalize} --------------
      const runUpdate${pageNameCapitalize} = useLockFn(async (v?: API.update${pageNameCapitalize}) => {
        await runApiUpdate${pageNameCapitalize}(v);
      });

      // * ------------ return data --------------
      const data${pageNameCapitalize} = useCreation(() => dataApiGet${pageNameCapitalize}, [dataApiGet${pageNameCapitalize}]);
      const record${pageNameCapitalize} = useCreation(() => dataApiGet${pageNameCapitalize}?.record, [dataApiGet${pageNameCapitalize}?.record]);

      return {
        data${pageNameCapitalize},
        record${pageNameCapitalize},
        runCreate${pageNameCapitalize},
        runGet${pageNameCapitalize},
        runUpdate${pageNameCapitalize},
        runDelete${pageNameCapitalize},
        loadingCreate${pageNameCapitalize},
        loadingGet${pageNameCapitalize},
        loadingUpdate${pageNameCapitalize},
        loadingDelete${pageNameCapitalize},
      };
    };
    `;
}
