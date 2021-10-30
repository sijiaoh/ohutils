import type {NextPage} from 'next';
import {HeadComponent} from './HeadComponent';

export const HomeComponent: NextPage = () => {
  return (
    <div>
      <HeadComponent subTitle={'Home'} />

      <h1>
        Welcome to <a href="https://github.com/sijiaoh/ohutils">ohutils.com!</a>
      </h1>
    </div>
  );
};
