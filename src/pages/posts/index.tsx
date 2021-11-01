import dynamic from 'next/dynamic';

export default dynamic(
  async () =>
    (await import('src/components/posts/PostsComponent')).PostsComponent,
  {ssr: false}
);
