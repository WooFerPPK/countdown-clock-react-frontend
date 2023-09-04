import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode,
  hideBackButton?: boolean
  backRoute?: string
}