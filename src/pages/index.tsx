import {NextPage} from 'next';
import dynamic from 'next/dynamic';

const Component = dynamic(
  async () => (await import('src/components/Home')).Home,
  {ssr: false}
);

const Hello: NextPage = () => {
  return <Component />;
};

export default Hello;
