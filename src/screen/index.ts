import { IApi } from 'umi';
import { existsSync, mkdirSync } from 'fs';
import { ScreenConfigPayload } from '../../interfaces/screen';
import generateScreen from './templates/generateScreen';
import generateLayout from './templates/generateLayout';
import generateRow from './templates/generateRow';
import generateCol from './templates/generateCol';

/**
 * Generate a series of files for the big screen
 * @param payload
 * @param api
 */
export default function(payload: ScreenConfigPayload, api: IApi) {
  const componentsPath = api.paths.absPagesPath + '/components';
  if (!existsSync(componentsPath)) {
    mkdirSync(componentsPath);
  }

  // Generate large screen configuration
  generateScreen(api.paths.absPagesPath!, payload);

  const { gutter, layout } = payload;

  // Generate layout components (Left/Center/Right)
  layout.forEach(item => {
    const { name: layoutName, rows } = item;

    const layoutPath = componentsPath + '/' + layoutName;
    if (!existsSync(layoutPath)) {
      mkdirSync(layoutPath); // <- Create layout folder
    }
    generateLayout(layoutPath, item);

    rows.forEach(row => {
      const { name: rowName, cols } = row;

      const rowPath = layoutPath + '/' + rowName;
      if (!existsSync(rowPath)) {
        mkdirSync(rowPath); // <- create the folder of the row
      }
      generateRow(rowPath, gutter, row);

      cols.forEach(col => {
        const { name: colName } = col;

        const colPath = rowPath + '/' + colName;
        if (!existsSync(colPath)) {
          mkdirSync(colPath);
        }
        generateCol(colPath, col);
      });
    });
  });

  return true;
}
