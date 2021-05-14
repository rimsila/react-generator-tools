/*
 * @File Description: Encapsulate the operation of the Card in the form or detail page. Including move up, move down, copy

 * @Author: Chen Jie
 * @Date: 2020-05-11 11:07:24

 * @LastEditTime: 2020-05-14 18:28:44
 */
import { useState } from 'react';
import { CardItemProps, FormItemProps, FormItemType } from '../../interfaces/common';
import { Store } from 'antd/lib/form/interface';
import produce from 'immer';
import faker from 'faker';

export default function useCard() {
  const [cards, setCards] = useState<CardItemProps[]>([{ title: 'Custom Card0', formItems: [] }]);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<CardItemProps>();
  const [itemIndex, setItemIndex] = useState<number>();
  const [currentItem, setCurrentItem] = useState<FormItemProps>();

  /**
   * Move Card up
   * @param index
   */
  const moveCardUp = (index: number) => () => {
    if (index === 0) return;

    setCards(
      produce(cards, draft => {
        const card = draft.splice(index, 1);
        draft.splice(index - 1, 0, ...card);
      }),
    );
  };

  /**
   * Move Card down
   * @param index
   */
  const moveCardDown = (index: number) => () => {
    if (index === cards.length - 1) return;

    setCards(
      produce(cards, draft => {
        const card = draft.splice(index, 1);
        draft.splice(index + 1, 0, ...card);
      }),
    );
  };

  /**
   * Configure Card
   * @param values
   */
  const configCard = (values: Store) => {
    setCards(
      produce(cards, draft => {
        draft[cardIndex].title = values.title;
      }),
    );
  };

  /** Add form items to Card */
  const addFormItemsToCard = (checkedComponents: FormItemType[]) => {
    const newFormItems = checkedComponents.map(type => ({
      type,
      name: faker.name.lastName(),
      label: faker.name.title(),
    }));
    setCards(
      produce(cards, draft => {
        draft[cardIndex].formItems.push(...newFormItems);
      }),
    );
  };

  /**
   * deleteCard
   * @param index
   */
  const deleteCard = (index: number) => () => {
    setCards(
      produce(cards, draft => {
        draft.splice(index, 1);
      }),
    );
  };

  /**
   * Copy card
   * @param index
   */
  const copyCard = (index: number) => () => {
    setCards(
      produce(cards, draft => {
        draft.splice(index + 1, 0, draft[index]);
      }),
    );
  };

  /**
   * Move up a form configuration item in the card
   * @param cardIndex
   * @param itemIndex
   */
  const moveItemUp = (itemIndex: number, cardIndex: number) => () => {
    setCards(
      produce(cards, draft => {
        const card = draft[cardIndex];
        const { formItems = [] } = card;
        if (itemIndex === 0) return;
        const items = formItems.splice(itemIndex, 1);
        formItems.splice(itemIndex - 1, 0, ...items);
      }),
    );
  };

  /**
   * Move down a form configuration item in the card
   * @param cardIndex
   * @param itemIndex
   */
  const moveItemDown = (itemIndex: number, cardIndex: number) => () => {
    setCards(
      produce(cards, draft => {
        const card = draft[cardIndex];
        const { formItems = [] } = card;
        if (itemIndex === formItems.length - 1) return;
        const items = formItems.splice(itemIndex, 1);
        formItems.splice(itemIndex + 1, 0, ...items);
      }),
    );
  };

  /**
   * Configure a certain form item of a certain Card
   * @param itemIndex
   * @param formItem
   */
  const configItem = (itemIndex: number, formItem: FormItemProps) => {
    setCards(
      produce(cards, draft => {
        const { formItems = [] } = draft[cardIndex];
        formItems[itemIndex] = formItem;
      }),
    );
  };

  /**
   * delete a certain form item of a certain Card
   * @param cardIndex
   * @param itemIndex
   */
  const deleteItem = (itemIndex: number, cardIndex: number) => () => {
    setCards(
      produce(cards, draft => {
        const card = draft[cardIndex];
        const { formItems = [] } = card;
        formItems.splice(itemIndex, 1);
      }),
    );
  };

  /**
   * Copy a certain form item of a certain card
   * @param cardIndex
   * @param itemIndex
   */
  const copyItem = (itemIndex: number, cardIndex: number) => () => {
    setCards(
      produce(cards, draft => {
        const card = draft[cardIndex];
        const { formItems = [] } = card;
        const formItem = {
          ...formItems[itemIndex],
          name: faker.name.lastName(),
        };
        formItems.splice(itemIndex + 1, 0, formItem);
      }),
    );
  };

  return {
    cards,
    setCards,
    moveCardUp,
    moveCardDown,
    configCard,
    deleteCard,
    copyCard,
    moveItemUp,
    moveItemDown,
    configItem,
    deleteItem,
    copyItem,
    cardIndex,
    setCardIndex,
    currentCard,
    addFormItemsToCard,
    currentItem,
    setCurrentItem,
    itemIndex,
    setItemIndex,
  };
}
