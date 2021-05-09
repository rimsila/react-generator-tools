import { configIconUrl } from './IconFont';
export var initComponent = function initComponent(props) {
  configIconUrl(props.iconFontUrl);
};
export { ProfileCard } from './NextCard/ProfileCard';
export { default as IconFont } from './IconFont';
export { default as NextButton } from './NextButton';
export { default as MapItem } from './mapItem';
export { default as NextRow } from './NextRow';
export { default as NextFooter } from './NextFooter';
export { InjectMassage } from './utils/IntlMessages';
export { default as ForgotPassword } from './Auth/ForgotPassword';
export { default as NextSignIn } from './Auth/SignIn';
export { default as ResetPassword } from './Auth/ResetPassword';
export { default as NextSignUp } from './Auth/SignUp';
export { default as NextLockScreen } from './Auth/LockScreen';