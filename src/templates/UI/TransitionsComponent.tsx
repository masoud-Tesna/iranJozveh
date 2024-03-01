'use client';

import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import React, { FC } from 'react';
import { CompoundedTransitionsComponent, TMotion } from '@/templates/UI/types';

const TransitionsComponent: CompoundedTransitionsComponent = ({ mode = 'wait', children, ...rest }) => {
  return (
    <LazyMotion
      features={ domAnimation }
      strict
    >
      <AnimatePresence
        mode={ mode }
        { ...rest }
        onExitComplete={ () => window.scrollTo(0, 0) }
      >
        { children }
      </AnimatePresence>
    </LazyMotion>
  );
};

const Motion: FC<TMotion> = (props: TMotion) => {
  const {
    id = 'initial',
    coordinates = 'x',
    size = -100,
    duration = .3,
    style,
    ...rest
  } = props;
  
  return (
    <m.div
      initial={ {
        [ coordinates ]: size * -1,
        opacity: 0
      } }
      animate={ {
        [ coordinates ]: 0,
        opacity: 1
      } }
      exit={ {
        [ coordinates ]: size * -1,
        opacity: 0
      } }
      transition={ {
        duration
      } }
      style={ style }
      { ...rest }
      key={ id }
      layoutId={ id?.toString() }
    >
      { props?.children }
    </m.div>
  );
};

TransitionsComponent.Motion = Motion;

export { TransitionsComponent };