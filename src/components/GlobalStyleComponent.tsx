import {Global} from '@emotion/react';

export const GlobalStyleComponent = () => {
  return (
    <Global
      styles={{
        ul: {
          padding: 0,
          margin: 0,
          listStyle: 'none',
        },
        textarea: {
          resize: 'none',
        },
      }}
    />
  );
};
