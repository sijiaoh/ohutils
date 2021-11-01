import dynamic from 'next/dynamic';

export default dynamic(
  async () => (await import('src/components/MeComponent')).MeComponent,
  {ssr: false}
);
