import dynamic from 'next/dynamic';

export default dynamic(
  async () =>
    (await import('src/components/posts/PostComponent')).PostComponent,
  {ssr: false}
);
