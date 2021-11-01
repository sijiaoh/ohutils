import {PropsWithChildren} from 'react';

export const ContainerComponent = ({children}: PropsWithChildren<{}>) => {
  return (
    <div css={{display: 'flex', justifyContent: 'center'}}>
      <div css={{width: '720px'}}>{children}</div>
    </div>
  );
};
