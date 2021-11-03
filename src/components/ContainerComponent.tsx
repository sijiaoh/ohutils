import {PropsWithChildren} from 'react';

export const ContainerComponent = ({children}: PropsWithChildren<{}>) => {
  return (
    <div css={{display: 'flex', justifyContent: 'center'}}>
      <div
        css={{
          '@media (min-width: 720px)': {
            minWidth: '720px',
          },
          minWidth: '90vw',
        }}
      >
        {children}
      </div>
    </div>
  );
};
