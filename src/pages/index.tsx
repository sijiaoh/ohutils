import dynamic from 'next/dynamic';

export default dynamic(async () => (await import('src/components/Home')).Home, {
  ssr: false,
});
