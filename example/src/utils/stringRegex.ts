export const toCapitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * getLastUrl will get the last sub url
 * @param url
 * const url ='/abc/xyz:id';
 * output: /xyz
 */
export const getLastUrl = (url: string) => {
  const lastUrl = (l = 1) => url.substring(url?.lastIndexOf('/') + l);
  const lastUrlLength = lastUrl().length;
  const lastDynamicUrl = (l = 0) => url.substring(url?.lastIndexOf(':') + l);
  const lastDmUrlLength = lastDynamicUrl().length;
  const lastUrlName = lastUrl().substring(0, lastDmUrlLength);
  const getName = lastUrlName.substring(lastUrlName?.lastIndexOf('-') + 1);
  const finalRouteName = `${toCapitalize(
    lastUrlName.substring(0, lastUrlName.length - getName.length - 1),
  )} ${toCapitalize(getName)}`;

  return {
    lastUrl,
    lastUrlLength,
    lastDynamicUrl,
    lastDmUrlLength,
    lastUrlName,
    finalRouteName,
  };
};
