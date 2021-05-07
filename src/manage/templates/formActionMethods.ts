/*
 * @File description: Generate some method components (non-modal type) connecting table and form
 * @Date: 2020-10-10 16:15:04
 * @LastEditTime: 2020-10-27 14:08:34
 */

export interface Payload {
  initialFetch?: string[];
  pageName: string;
  generateDetail: boolean;
}

export default ({ pageName, initialFetch = [], generateDetail }: Payload) => {
    const apiStr = initialFetch.length === 3?
      `API.${initialFetch[0]}.${initialFetch[1]}`:'API.recruitment.person';
    return `
      import React, {forwardRef} from'react';
      import {Store} from'antd/es/form/interface';
      import {history} from'umi';
      import {useRequest} from'ahooks';
      import {message} from'antd';

      export interface FormActionMethodsInstance {
        onAdd?: () => void;
        onDelete?: (row: Store) => void;
        onEdit?: (row: Store) => void;
        onPreview?: (row: Store) => void;
        onDeleteBatch?: (ids: number[]) => void;
      }

      export default forwardRef<FormActionMethodsInstance, {reload?: () => void }>(({ reload }, ref) => {
        const formActionRef = ref as React.MutableRefObject<FormActionMethodsInstance>;
        const {run: handleDelete} = useRequest(${apiStr}.remove.fetch, {
          manual: true,
          onSuccess: () => {
            message.success('Delete successfully');
            reload && reload();
          },
        });
        const {run: handleDeleteBatch} = useRequest(${apiStr}.deleteBatch, {
          manual: true,
          onSuccess: () => {
            message.success('Batch delete success');
            reload && reload();
          },
        });

        /** Add */
        formActionRef.current.onAdd = () => history.push('/${pageName}/edit');

        /** Delete */
        formActionRef.current.onDelete = (row: Store) => handleDelete(row.id);

        /** Edit */
        formActionRef.current.onEdit = (row: Store) => history.push(\`/${pageName}/edit?id=\${row.id}\`);

        ${generateDetail? `/** View */
        formActionRef.current.onPreview = (row: Store) => history.push(\`/${pageName}/detail?id=\${row.id}\`);`:''}

        /** batch deletion */
        formActionRef.current.onDeleteBatch = (ids: number[]) => handleDeleteBatch(ids);

        return <></>;
      });
    `;
}
