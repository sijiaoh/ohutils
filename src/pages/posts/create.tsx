import dynamic from 'next/dynamic';

export default dynamic(
  async () =>
    (await import('src/components/posts/PostsCreateComponent'))
      .PostsCreateComponent,
  {ssr: false}
);
