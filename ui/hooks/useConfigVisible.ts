import { useState } from 'react';

export default function useConfigVisible() {
  const [formItemsDrawerVisible, setFormItemsDrawerVisible] = useState(false);
  const [pathModalVisible, setPathModalVisible] = useState(false);
  const [formConfigDrawerVisible, setFormConfigDrawerVisible] = useState(false);
  const [cardDrawerVisible, setCardDrawerVisible] = useState(false);
  const [formItemConfigDrawerVisible, setFormItemConfigDrawerVisible] = useState(false);
  const [tableConfigDrawerVisible, setTableConfigDrawerVisible] = useState(false);
  const [columnConfigDrawerVisible, setColumnConfigDrawerVisible] = useState(false);
  const [apiConfigDrawerVisible, setApiConfigDrawerVisible] = useState(false);

  return {
    formItemsDrawerVisible,
    pathModalVisible,
    formConfigDrawerVisible,
    cardDrawerVisible,
    formItemConfigDrawerVisible,
    tableConfigDrawerVisible,
    columnConfigDrawerVisible,
    apiConfigDrawerVisible,
    setFormItemsDrawerVisible,
    setPathModalVisible,
    setFormConfigDrawerVisible,
    setCardDrawerVisible,
    setFormItemConfigDrawerVisible,
    setTableConfigDrawerVisible,
    setColumnConfigDrawerVisible,
    setApiConfigDrawerVisible,
  };
}
