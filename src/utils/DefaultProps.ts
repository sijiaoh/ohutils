import type {PropsWithChildren} from 'react';

export type DefaultProps<T = {}> = PropsWithChildren<{className?: string} & T>;
