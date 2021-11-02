import dynamic from 'next/dynamic';

export default dynamic(
  async () =>
    (await import('src/components/posts/PostsEditComponent'))
      .PostsEditComponent,
  {ssr: false}
);
