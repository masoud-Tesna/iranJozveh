import {TTabsItem} from './tabs-item';

export type TTabs = {
  items: Omit<TTabsItem, 'component'>[],
  className?: string;
  current: number,
  onChange?: (current: number) => void;
}
