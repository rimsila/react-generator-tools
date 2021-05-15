import { appendFileSync, existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { capitalize } from 'lodash';
import prettier from 'prettier';
import { IApi } from 'umi';
import { TableVerificationRuleList } from '../../interfaces/common';
import { removeUnusedImport } from '../utils/removeUnusedImport';
import { writeNewMenu } from '../utils/writeNewMenu';
import { writeNewRoute } from '../utils/writeNewRoute';
import {
  generateFormActionMethodsCode,
  generateFormActionMethodsModalCode,
  generateLongDetailCode,
  generateLongDetailModalCode,
  generateLongFormCode,
  generateLongFormModalCode,
  generateShortDetailCode,
  generateShortDetailModalCode,
  generateShortFormCode,
  generateShortFormModalCode,
  generateTableCode,
  generateTableCode1,
  generateUseTable1,
} from './templates';
import generateUseTable1GQL from './templates/useTable1GQL';

export default function(payload: any, type: string, api: IApi) {
  let code = '';
  const pageName = getPageNameByPath(payload.path || payload.formPath);
  switch (type) {
    case 'org.umi-plugin-page-creator.shortForm':
    default:
      generateValidatorFile(api, pageName, []);
      if (!payload.generateDetail) {
        code = generateShortFormCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          initialFetch: payload.initialFetch,
          submitFetch: payload.submitFetch,
          menu: payload.menu,
          path: payload.path,
        });
        const formattedCode = prettify(removeUnusedImport(code));
        generateFile(
          formattedCode,
          {
            path: payload.path,
            menu: payload.menu,
          },
          api,
        );
      } else {
        const formCode = generateShortFormCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          initialFetch: payload.initialFetch,
          submitFetch: payload.submitFetch,
          menu: payload.formMenu,
          path: payload.formPath,
        });
        const formattedFormCode = prettify(removeUnusedImport(formCode));
        generateFile(
          formattedFormCode,
          {
            path: payload.formPath,
            menu: payload.formMenu,
          },
          api,
        );

        const detailCode = generateShortDetailCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          initialFetch: payload.initialFetch,
          menu: payload.detailMenu,
        });
        const formattedDetailCode = prettify(removeUnusedImport(detailCode));
        generateFile(
          formattedDetailCode,
          {
            path: payload.detailPath,
            menu: payload.detailMenu,
          },
          api,
          false,
        );
      }
      // Generate intermediate components for table use
      pageName &&
        generateComponent(
          `/${pageName}`,
          'FormActionMethods',
          prettify(
            generateFormActionMethodsCode({
              pageName,
              initialFetch: payload.initialFetch,
              generateDetail: payload.generateDetail,
            }),
          ),
          api,
        );
      return true;

    case 'org.umi-plugin-page-creator.shortFormModal':
      generateValidatorFile(api, pageName, []);
      if (!payload.generateDetail) {
        code = generateShortFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
          fromTable: payload.fromTable,
          path: payload.path,
        });
        const formattedCode = prettify(removeUnusedImport(code));
        generateFile(
          formattedCode,
          {
            path: payload.path,
            dirName: payload.dirName,
          },
          api,
        );
      } else {
        const formCode = generateShortFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
          fromTable: payload.fromTable,
          path: payload.formPath,
        });
        const formattedFormCode = prettify(removeUnusedImport(formCode));
        generateFile(
          formattedFormCode,
          {
            path: payload.formPath,
            dirName: payload.formDirName,
          },
          api,
        );

        const detailCode = generateShortDetailModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
        });
        const formattedDetailCode = prettify(removeUnusedImport(detailCode));
        generateFile(
          formattedDetailCode,
          {
            path: payload.detailPath,
            dirName: payload.detailDirName,
          },
          api,
        );
      }

      // Generate intermediate components for table use
      pageName &&
        generateComponent(
          `/${pageName}`,
          'FormActionMethods',
          prettify(
            generateFormActionMethodsModalCode({
              initialFetch: payload.initialFetch,
              generateDetail: payload.generateDetail,
            }),
          ),
          api,
        );
      return true;

    case 'org.umi-plugin-page-creator.longForm':
      generateValidatorFile(api, pageName, []);
      if (!payload.generateDetail) {
        code = generateLongFormCode({
          cards: payload.cards,
          initialFetch: payload.initialFetch,
          submitFetch: payload.submitFetch,
          menu: payload.menu,
          path: payload.path,
        });
        const formattedCode = prettify(removeUnusedImport(code));
        generateFile(
          formattedCode,
          {
            path: payload.path,
            menu: payload.menu,
          },
          api,
        );
      } else {
        const formCode = generateLongFormCode({
          cards: payload.cards,
          initialFetch: payload.initialFetch,
          submitFetch: payload.submitFetch,
          menu: payload.formMenu,
          path: payload.path,
        });
        const formattedFormCode = prettify(removeUnusedImport(formCode));
        generateFile(
          formattedFormCode,
          {
            path: payload.formPath,
            menu: payload.formMenu,
          },
          api,
        );

        const detailCode = generateLongDetailCode({
          cards: payload.cards,
          initialFetch: payload.initialFetch,
          menu: payload.detailMenu,
        });
        const formattedDetailCode = prettify(removeUnusedImport(detailCode));
        generateFile(
          formattedDetailCode,
          {
            path: payload.detailPath,
            menu: payload.detailMenu,
          },
          api,
          false,
        );
      }
      // Generate intermediate components for table use

      pageName &&
        generateComponent(
          `/${pageName}`,
          'FormActionMethods',
          prettify(
            generateFormActionMethodsCode({
              pageName,
              initialFetch: payload.initialFetch,
              generateDetail: payload.generateDetail,
            }),
          ),
          api,
        );
      return true;

    case 'org.umi-plugin-page-creator.longFormModal':
      generateValidatorFile(api, pageName, []);
      if (!payload.generateDetail) {
        code = generateLongFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
          fromTable: payload.fromTable,
          path: payload.path,
        });
        const formattedCode = prettify(removeUnusedImport(code));
        generateFile(
          formattedCode,
          {
            path: payload.path,
            dirName: payload.dirName,
          },
          api,
        );
      } else {
        const formCode = generateLongFormModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
          submitFetch: payload.submitFetch,
          fromTable: payload.fromTable,
          path: payload.formPath,
        });
        const formattedFormCode = prettify(removeUnusedImport(formCode));
        generateFile(
          formattedFormCode,
          {
            path: payload.formPath,
            dirName: payload.formDirName,
          },
          api,
        );

        const detailCode = generateLongDetailModalCode({
          formConfig: payload.formConfig,
          formItems: payload.formItems,
        });
        const formattedDetailCode = prettify(removeUnusedImport(detailCode));
        generateFile(
          formattedDetailCode,
          {
            path: payload.detailPath,
            dirName: payload.detailDirName,
          },
          api,
        );
      }
      // Generate intermediate components for table use
      pageName &&
        generateComponent(
          `/${pageName}`,
          'FormActionMethods',
          prettify(
            generateFormActionMethodsModalCode({
              initialFetch: payload.initialFetch,
              generateDetail: payload.generateDetail,
            }),
          ),
          api,
        );
      return true;

    case 'org.umi-plugin-page-creator.shortDetail':
      code = generateShortDetailCode(payload);
      generateFile(code, payload, api, false);
      return true;
    case 'org.umi-plugin-page-creator.shortDetailModal':
      code = generateShortDetailModalCode(payload);
      break;
    case 'org.umi-plugin-page-creator.longDetail':
      code = generateLongDetailCode(payload);
      generateFile(code, payload, api, false);
      return true;
    case 'org.umi-plugin-page-creator.longDetailModal':
      code = generateLongDetailModalCode(payload);
      break;
    case 'org.umi-plugin-page-creator.table':
      // Generate intermediate components for table use, only generated when the file does not exist, mainly generated through form configuration, here in order to prevent table page references from reporting errors
      pageName &&
        !existsSync(`${api.paths.absPagesPath}/${pageName}/components/FormActionMethods`) &&
        generateComponent(
          `/${pageName}`,
          'FormActionMethods',
          prettify(
            generateFormActionMethodsCode({
              pageName,
              initialFetch: payload.initialFetch,
              generateDetail: payload.generateDetail,
            }),
          ),
          api,
        );
      code = generateTableCode({ ...payload, pageName });
      break;
    case 'org.umi-plugin-page-creator.table1':
      // Generate intermediate components for table use, only generated when the file does not exist, mainly generated through form configuration, here in order to prevent table page references from reporting errors

      pageName && mkdirSync(`${api.paths.absPagesPath}/${pageName}`, { recursive: true });
      writeFileSync(
        `${api.paths.absPagesPath}/${pageName}/${pageName}.gql`,
        generateUseTable1GQL({
          submitFetch: payload.submitFetch,
        }),
        'utf-8',
      );
      writeFileSync(
        `${api.paths.absPagesPath}/${pageName}/use${capitalize(pageName)}.tsx`,
        prettify(generateUseTable1({ pageName })),
        'utf-8',
      );

      // pageName &&
      //   !existsSync(`${api.paths.absPagesPath}/${pageName}`) &&
      //   generateComponent(
      //     `/${pageName}`,
      //     `useHook`,
      //     prettify(generateUseTable1({ pageName })),
      //     api,
      //   );

      code = generateTableCode1({ ...payload, pageName });
      break;
  }
  const prettifyCode = prettify(removeUnusedImport(code));
  generateFile(prettifyCode, payload, api);
  return true;
}
/**
 * Generate file
 * @param code
 * @param payload
 */
export function generateFile(
  code: string,
  payload: { path: string; menu?: string; dirName?: string },
  api: IApi,
  createMenu = true,
) {
  if (payload && payload.path && code) {
    const { path, dirName, menu } = payload;

    if (dirName) {
      generateComponent(path, dirName, code, api);
    } else {
      generatePage(path, code, api, menu, createMenu);
    }
  }
}

/**
 * Generate page and route
 * @param absPagesPath
 * @param path
 * @param code
 */
export function generatePage(path: string, code: string, api: IApi, menu = '', createMenu = true) {
  const absPagesPath = api.paths.absPagesPath;
  if (!existsSync(absPagesPath + path)) {
    // Create the corresponding folder and index.tsx file according to the passed path
    mkdirSync(absPagesPath + path, { recursive: true });
    writeFileSync(absPagesPath + `${path}/index.tsx`, code, 'utf-8');

    const title = menu.includes('/') ? menu.split('/').pop() : menu;
    writeNewRoute(
      {
        path,
        component: `.${path}`,
        exact: true,
        title,
      },
      api.paths.cwd + '/config/config.ts',
      api.paths.absSrcPath!,
    );

    if (createMenu && menu) {
      if (!existsSync(api.paths.cwd + '/mock')) {
        mkdirSync(api.paths.cwd + '/mock');
      }
      writeNewMenu({ path, menu }, api.paths.cwd + '/mock/route.ts');
    }
  } else {
    // If the page file already exists, rewrite
    const filePath = absPagesPath + `${path}/index.tsx`;
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
    writeFileSync(filePath, code, 'utf-8');
  }
}

/**
 * Generate components under the page. The created component should be automatically under the components folder of a page
 * 1. First judge whether the components folder under /path exists, if it exists, add it directly, if it does not exist, create it first
 * @param absPagesPath
 * @param path
 * @param dirName
 * @param code
 */
export function generateComponent(path: string, dirName: string, code: string, api: IApi) {
  const absPagesPath = api.paths.absPagesPath;
  if (!existsSync(absPagesPath + path + '/components')) {
    mkdirSync(absPagesPath + path + '/components', { recursive: true });
  }
  const prefixPath = absPagesPath + path + '/components/';
  if (!existsSync(prefixPath + dirName)) {
    mkdirSync(prefixPath + dirName, { recursive: true });
    writeFileSync(prefixPath + `${dirName}/index.tsx`, code, 'utf-8');
  } else {
    // If the component file already exists, rewrite
    const filePath = prefixPath + `${dirName}/index.tsx`;
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
    writeFileSync(filePath, code, 'utf-8');
  }
}

export function prettify(code: string) {
  if (code) {
    return prettier.format(code.replace(/console\.log\(\'emptyline\'\)\;/g, ''), {
      semi: true,
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 120,
      tabWidth: 2,
      parser: 'typescript',
    });
  }
  return '';
}

/**
 * Generate form verification file
 * @param api
 * @param pageName
 * @param tableVerificationRuleList
 */
export function generateValidatorFile(
  api: IApi,
  pageName: string,
  tableVerificationRuleList: TableVerificationRuleList[],
) {
  if (!pageName) {
    return;
  }
  const pagePath = `${api.paths.absPagesPath}/${pageName}`;
  const generatePath = `${pagePath}/validators.ts`;
  const getMaxLengthValidator = (maxLength: number = 0) =>
    maxLength > 0
      ? `{
          validator: (_: unknown, value: string, callback: (message?: string) => void) => {
            if (value && value.length> ${maxLength}) {
              callback('Exceeding the maximum length limit');

            } else {
              callback();
            }
        },`
      : '';
  const getMinLengthValidator = (minLength: number = 0) =>
    minLength > 0
      ? `{
          validator: (_: unknown, value: string, callback: (message?: string) => void) => {
            if (value && value.length < ${minLength}) {
              callback('Less than the minimum length limit');
            } else {
              callback();
            }
        },`
      : '';
  const code = `
  import { Rule } from 'antd/es/form';

  /**
   * Rules for form configuration
   */
  export const VERIFICATION_RULE = {
    ${tableVerificationRuleList
      .map(
        ({
          fieldName,
          isRequired = false,
          requiredMaxLength,
          requiredMinLength,
          pattern,
        }) => `${fieldName}: {
          required: ${isRequired},${
          requiredMaxLength ? `requiredMaxLength: ${requiredMaxLength},` : ''
        }
      rules: [
        {
          required: ${isRequired},
        },${pattern ? `{ pattern: new RegExp(${pattern})},` : ''}${getMaxLengthValidator(
          requiredMaxLength,
        )}${getMinLengthValidator(requiredMinLength)}
      ],
    },`,
      )
      .join('\n')}
  }
  /**
   * Obtain the corresponding verification content according to the field
   */
  export const getVerificationRules = (fileName: string) =>
    (VERIFICATION_RULE[fileName] || {
      rules: [],
    }) as {
      required?: boolean;
      requiredMaxLength?: number;
      rules: Rule[];
    };
  `;
  // If the page file has not been generated yet, generate a folder first
  if (!existsSync(pagePath)) {
    mkdirSync(pagePath);
  }
  reWriteFile(generatePath, prettify(code));
}

/**
 * Rewrite file
 * @param path
 * @param content
 */
export function reWriteFile(path: string, content: string) {
  if (existsSync(path)) {
    writeFileSync(path, content, 'utf8');
  } else {
    appendFileSync(path, content, 'utf8');
  }
}

/**
 * Get pageName according to the path
 * @param path
 */
export function getPageNameByPath(path: string = '') {
  const paths = path.split('/');
  return paths[0] || paths[1];
}
