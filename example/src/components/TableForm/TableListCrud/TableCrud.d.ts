import type { ProSchemaComponentTypes } from '@ant-design/pro-utils';

declare type ICrudState = Partial<{
  isDelete: boolean;
  add: boolean;
  edit: boolean;
  view: boolean;
  record: Record<string, any>[];
  type: ProSchemaComponentTypes;
  mutationId: string;
  loadingRefetch: boolean;
}>;
