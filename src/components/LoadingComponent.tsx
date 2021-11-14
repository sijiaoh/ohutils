import Loader from 'react-loader-spinner';

export const LoadingComponent = () => {
  return (
    <div
      css={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Loader type="ThreeDots" color="gray" />
    </div>
  );
};
