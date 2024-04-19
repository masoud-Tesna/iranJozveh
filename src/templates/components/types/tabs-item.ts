import {Dispatch, JSX, Key, ReactNode, SetStateAction} from 'react';

export type TTabItemComponentProps = {
  currentTab: number,
  setCurrentTab: Dispatch<SetStateAction<number>>,
}

export type TTabsItem<T = ({ currentTab, setCurrentTab }: TTabItemComponentProps) => JSX.Element> = {
  key: Key,
  tabIndex: number,
  title: string,
  component: T,
  extra?: ReactNode,
  hidden?: boolean
}
