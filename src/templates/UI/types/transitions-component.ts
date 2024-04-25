import {AnimatePresenceProps, MotionProps} from 'framer-motion';
import {FC, Key, PropsWithChildren} from 'react';

export interface TMotion
  extends MotionProps {
  id: Key,
  coordinates?: 'x' | 'y';
  size?: number,
  duration?: number
}

export interface CompoundedTransitionsComponent
  extends FC<PropsWithChildren<AnimatePresenceProps>> {
  Motion: FC<TMotion>;
}
