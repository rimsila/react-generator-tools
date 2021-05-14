/*

 * @Date: 2020-05-01 18:11:49

 * @LastEditTime: 2020-05-06 16:34:22
 */
import fs from 'fs';
import { join } from 'path';
import { utils } from 'umi';

const { winPath } = utils;

export interface TreeData {
  title: string;
  value: string;
  key: string;
  children?: TreeData[];
}

/**
 * Traverse the file address
 * @param path
 */
export const getFolderTreeData = (
  path: string,
  parentPath: string = '/',
  depth: number = 0,
): TreeData[] => {
  const files = fs.readdirSync(winPath(path));
  return files
    .map((fileName: string) => {
      const status = fs.statSync(join(path, fileName));
      // It is a folder and is endless. Beginning, and the deepest three levels
      if (status.isDirectory() && fileName.indexOf('.') !== 0 && depth < 3) {
        const absPath = winPath(join(path, fileName));
        const absPagePath = winPath(join(parentPath, fileName));
        const children = getFolderTreeData(absPath, absPagePath, depth + 1);
        if (children && children.length > 0) {
          return {
            key: absPagePath,
            title: fileName,
            value: absPagePath,
            children,
          } as TreeData;
        }
        return {
          title: fileName,
          value: absPagePath,
          key: absPagePath,
        } as TreeData;
      }
      return undefined;
    })
    .filter(item => item !== undefined) as TreeData[];
};

/**
 * Traverse the file address
 * Include files
 * @param path
 */
export const getFilesTreeData = (
  path: string,
  parentPath: string = '/',
  depth: number = 0,
): TreeData[] => {
  const files = fs.readdirSync(winPath(path));
  return files
    .map((fileName: string) => {
      const status = fs.statSync(join(path, fileName));
      const isDirectory = status.isDirectory();
      // It's a folder and it's endless. At the beginning, and the deepest five levels
      if (fileName.indexOf('.') !== 0 && depth < 5) {
        if (
          !isDirectory &&
          !fileName.includes('.tsx') &&
          !fileName.includes('.jsx') &&
          !fileName.includes('.js') &&
          !fileName.includes('.ts')
        ) {
          return undefined;
        }
        const absPath = winPath(join(path, fileName));
        const absPagePath = winPath(join(parentPath, fileName));
        const children = isDirectory ? getFilesTreeData(absPath, absPagePath, depth + 1) : [];
        return {
          selectable: !isDirectory,
          key: absPagePath,
          title: fileName,
          value: absPagePath,
          children,
        };
      }
      return undefined;
    })
    .filter(obj => obj) as TreeData[];
};
