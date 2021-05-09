import capitalize from 'lodash/capitalize'

export interface Payload {
  pageName: string;

}

export default ({ pageName }: Payload) => {
   const pageNameCapitalize = capitalize(pageName);
   const updatePageName = "update"+pageNameCapitalize;
   const deletePageName = "delete"+pageNameCapitalize;
   const getPageName = "delete"+pageNameCapitalize;
   const createPageName = "create"+pageNameCapitalize;

    return `
    import { graphRequest } from '@/utils/request';

    export const ${pageNameCapitalize}Api = () => {

      // * ------ getCompaniesList ------
      ${getPageName}: async (filter: IProductSupplierAPI.IProductSupplierFilter = {}) => {
        return await graphRequest({
          hasParamData: true,
          fullTip: false,
          data: {
            variables: {
              filter,
            },
            query: ${`
            query GetProductSuppliers($accessKey: String!,$filter: ProductSupplierFilter!){
              getProductSuppliers(accessKey:$accessKey, filter: $filter){
                records{
                  id
                  userId
                  companyId
                  title
                  description
                  status
                  createdBy
                  createdAt
                  updatedBy
                  updatedAt
                }
                metadata{
                  total
                  limit
                  page
                }
              }
            }`
          },
          },
        });
      }

    }
    `;
}
