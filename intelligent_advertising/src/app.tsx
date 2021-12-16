import React from 'react';
import './global.less';
import RightHeader from './layout/header/index';

export const layout = (): object => {
  return {
    rightContentRender: () => <RightHeader />
  };
};