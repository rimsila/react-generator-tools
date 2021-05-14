import React, { useContext } from 'react';
import { Button, message } from 'antd';
import classNames from 'classnames';
import styles from './index.module.less';
import Context from '../../Context';

export default ({ onClick }: { onClick: () => void }) => {
  const { templateType } = useContext(Context);

  return (
    <Button
      type="primary"
      onClick={() => {
        if (templateType) {
          onClick();
        } else {
          message.warning('Please select a template first');
        }
      }}
      className={classNames(styles.bubble, styles.fixed)}
    >
      Export
    </Button>
  );
};
