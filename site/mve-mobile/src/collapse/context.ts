import { createContext } from 'mve-core';
import { CollapseContext } from './type';

export const collapseContext = createContext<CollapseContext | undefined>(undefined);
