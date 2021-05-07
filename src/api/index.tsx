import {IApi} from'umi';
import {existsSync} from'fs';
import {ApiJSON} from'../../interfaces/api';

/**
 * According to the services/api-lock.json in the root directory of the project, generate an associated file for the interface and declaration.
 * Select an interface on the UI side,
 */
export default function(api: IApi) {
  const jsonPath = api.paths.absSrcPath +'/services/api-lock.json';
  if (!existsSync(jsonPath)) {
    return {
      databases: null,
      // mods: null,
      baseClasses: null,
    };
  }
  const apiJson: ApiJSON[] = require(jsonPath);

  const databases = apiJson.map(db => ({
    label: db.name,
    value: db.name,
    children: db.mods.map(mod => ({
      label: mod.description,
      value: mod.name,
      children: mod.interfaces.map(({ name, response, description, method, parameters }) => {
        // DTO when submitting form data
        const paramsName = parameters.find(param => param.in ==='body')?.dataType.typeName;
        // DTO when getting data
        let responseName;
        if (response.typeArgs.length> 0) {
          responseName = response.typeArgs.find(arg => arg.isDefsType)?.typeName;
        } else {
          if (response.isDefsType) {
            responseName = response.typeName;
          }
        }
        const value = `${name}-${paramsName}-${responseName}`;
        return {
          label: `${description}(${method})`,
          value,
        };
      }),
    })),
  }));

  const mods = apiJson.reduce(
    (accu, curr) =>
      accu.concat(
        curr.mods.map(mod => ({
          name: mod.name,
          description: mod.description,
          dbId: curr.name,
        })) as [],
      ),
    [],
  );

  const baseClasses = apiJson.reduce(
    (accu, curr) =>
      accu.concat(
        curr.baseClasses.map(mod => ({
          name: mod.name,
          dbId: curr.name,
          description: mod.description ||'',
          properties: mod.properties.map(prop => ({
            label: prop.description,
            value: prop.name,
            required: prop.required,
          })),
        })) as [],
      ),
    [],
  );

  return {
    databases,
    // mods,
    baseClasses,
  };
}
