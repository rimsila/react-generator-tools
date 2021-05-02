import { writeFileSync, existsSync, readFileSync } from 'fs';
import * as types from '@babel/types';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import prettier from 'prettier';

interface Resource {
  menu: string;
  path: string;
}

export function writeNewMenu(resource: Resource, mockPath: string) {
  const code = getNewMenuCode(resource, mockPath);
  writeFileSync(mockPath, code, 'utf-8');
}

/**
 * Generate mock data of authority resources to facilitate the system to build menus
 * @param resource
 * @param mockPath
 */
function getNewMenuCode(resource: Resource, mockPath: string) {
  const { menu, path } = resource;
  if (existsSync(mockPath)) {
    // parse the content of the file and construct the ast
    const ast: types.File = parser.parse(readFileSync(mockPath, 'utf-8'), {
      sourceType: 'module',
      plugins: ['typescript'],
    });

    // Process the ast node and insert a new node at the specified position
    traverse(ast, {
      ObjectExpression({ node, parent }) {
        if (types.isArrayExpression(parent)) {
          return;
        }
        const { properties } = node;
        const property = properties.find(
          p => types.isObjectProperty(p) && types.isIdentifier(p.key) && p.key.name === 'data',
        );
        if (property) {
          // data: []
          const { elements = [] } = (property as types.ObjectProperty)
            .value as types.ArrayExpression;

          if (!menu.includes('/') && !path.substr(1).includes('/') && path.startsWith('/')) {
            // Only a first level directory
            const newNode = (parser.parse(
              `(${JSON.stringify({
                key: path,
                apiUrl: path,
                description: menu,
                children: [],
              })})`,
            ).program.body[0] as any).expression;
            elements.push(newNode);
          } else {
            // There is a secondary directory
            const menus = menu.split('/').filter(item => item);
            const _paths = path.split('/').filter(item => item);
            const paths = ['/' + _paths[0], !path.startsWith('/') ? '/' + path : path];

            /**
             * The logic here is more complicated, please note:
             * 1. First determine whether the first-level directory exists:
             * a). If it does not exist, save the entire object directly
             * b). If it exists, proceed to the second step of judgment
             * 2. Does the secondary directory exist:
             * a). If it does not exist, insert at the end of children
             */
            const submenu = {
              key: paths[0],
              apiUrl: paths[0],
              description: menus[0],
              children: [
                {
                  key: paths[1],
                  apiUrl: paths[1],
                  description: menus.length === 2 ? menus[1] : menus[0],
                  children: [],
                },
              ],
            };
            const menuItem = {
              key: paths[1],
              apiUrl: paths[1],
              description: menus.length === 2 ? menus[1] : menus[0],
              children: [],
            };

            /**
             * Traverse the elements of data (that is, the objects under data (key/apiUrl/description/children)),
             * There are properties in elements, which are an object. This object is the key-value pair of element
             * Find key.name === submenu.key in this key-value pair
             * If it is found, it means that the first-level directory exists. If it is not found, it means that the directory does not exist.
             * If the first level directory exists, then look for key.name ==='children' from the key-value pair of this element, which is also an element, and then repeat the above steps to determine whether the second level directory exists
             */
            let node = null;
            let childrenNode = null;
            for (const ele of elements) {
              const { properties } = ele as types.ObjectExpression;
              node = properties.find(
                p =>
                  ((p as types.ObjectProperty).value as types.StringLiteral).value === submenu.key,
              );
              if (node) {
                childrenNode = properties.find(
                  p => (p as types.ObjectProperty).key.name === 'children',
                );
              }
            }
            if (!node) {
              // If the parent menu does not exist, add the entire structure directly
              elements.push(
                (parser.parse(`(${JSON.stringify(submenu)})`).program.body[0] as any).expression,
              );
            } else if (childrenNode) {
              const { elements: childrenElements } = (childrenNode as types.ObjectProperty)
                .value as types.ArrayExpression;
              if (childrenElements.length === 0) {
                childrenElements.push(
                  (parser.parse(`(${JSON.stringify(menuItem)})`).program.body[0] as any).expression,
                );
              } else {
                // Determine whether the menu to be added already exists, if it already exists, do not add it
                let existed = false;
                for (const ele of childrenElements) {
                  const { properties } = ele as types.ObjectExpression;
                  node = properties.find(
                    p =>
                      ((p as types.ObjectProperty).value as types.StringLiteral).value ===
                      menuItem.key,
                  );
                  if (node) {
                    existed = true;
                    break;
                  }
                }
                !existed &&
                  childrenElements.unshift(
                    (parser.parse(`(${JSON.stringify(menuItem)})`).program.body[0] as any)
                      .expression,
                  );
              }
            }
          }
        }
      },
    });

    // Generate the final code according to the processed ast
    const code = generate(ast, {}).code;
    return prettier.format(code, {
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 100,
      parser: 'typescript',
    });
  }
  return '';
}
