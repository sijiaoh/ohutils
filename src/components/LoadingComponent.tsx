import Spinner from 'react-bootstrap/Spinner';
import type {DefaultProps} from 'src/utils/DefaultProps';

export const LoadingComponent = ({className}: DefaultProps) => {
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
      <Spinner animation="border" />
    </div>
  );
};
