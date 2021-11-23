import Spinner from 'react-bootstrap/Spinner';
import type {DefaultProps} from 'src/utils/DefaultProps';

export const LoadingComponent = ({
  className,
  width,
  height,
}: DefaultProps<{width?: string; height?: string}>) => {
  return (
    <div
      className={className}
      css={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner animation="border" css={{width, height}} />
    </div>
  );
};
