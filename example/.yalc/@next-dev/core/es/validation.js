function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var validateMessages = {
  default: 'Verification failed',
  required: "Can't be empty",
  enum: 'Must be one of [${enum}]',
  whitespace: 'cannot be empty',
  date: {
    format: 'Not a valid date format',
    parse: 'Cannot be converted to date format',
    invalid: 'Invalid date format'
  },
  types: {
    string: 'Only input string type',
    method: 'Only enter "${type}" type',
    array: 'Only enter "${type}" type',
    object: 'Only enter "${type}" type',
    number: 'Only enter numbers',
    date: 'Only enter the date',
    boolean: 'Only enter "${type}" type',
    integer: 'Only input integers',
    float: 'Only enter values',
    regexp: 'The input does not match to go',
    email: 'Incorrect email format',
    url: 'The url format is incorrect',
    hex: 'Only enter "${type}" type'
  },
  string: {
    len: 'Must be ${len} characters',
    min: 'Cannot be less than ${min} characters',
    max: '${name} Cannot be more than ${max} characters',
    range: 'The number of characters is between ${min}-${max}'
  },
  number: {
    len: 'The value can only be ${len}',
    min: 'Cannot be less than ${min}',
    max: '${name} Cannot be greater than ${max}',
    range: 'Only between ${min}-${max}'
  },
  array: {
    len: 'You must select the ${len} item',
    min: 'No less than ${min} items',
    max: '${name} Cannot be more than ${max} items',
    range: 'Must choose between ${min}-${max} items'
  },
  pattern: {
    mismatch: 'The content entered does not meet the requirements'
  }
};
export default validateMessages;
export var configValidateMessage = function configValidateMessage(messages) {
  validateMessages = _objectSpread(_objectSpread({}, validateMessages), messages);
};