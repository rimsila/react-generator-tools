import { Button, Modal } from 'antd';
import classNames from 'classnames';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material-palenight.css';
import React, { useContext, useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Context from '../../Context';
import styles from './index.module.less';

export default ({
  visible,
  setVisible,
  onSubmit,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (code: string) => void;
}) => {
  const { constantConfig } = useContext(Context);
  const [editorValue, setEditorValue] = useState('');

  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        className={classNames(styles.bubble, styles.fixed)}
      >
        constant
      </Button>
      <Modal
        title="Constant editing"
        forceRender
        width={990}
        visible={visible}
        onOk={() => onSubmit(editorValue)}
        onCancel={() => setVisible(false)}
        bodyStyle={{ maxHeight: 768, overflowY: 'auto' }}
      >
        <CodeMirror
          value={constantConfig}
          options={{
            smartIndent: true,
            tabSize: 2,
            indentUnit: 2,
            lineNumbers: true,
          }}
          editorDidMount={editor => {
            editor.setSize('100%', 600);
          }}
          onChange={(editor, data, value) => {
            setEditorValue(value);
          }}
        />
      </Modal>
    </>
  );
};
