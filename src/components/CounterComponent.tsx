import {useListen} from '@reactive-class/react';
import {useRef} from 'react';
import {Counter} from 'src/classes/Counter';

export const CounterComponent = ({className}: {className?: string}) => {
  const counter = useRef(new Counter()).current;
  const {count} = useListen(counter);

  return (
    <div className={className}>
      <button onClick={counter.increment}>Increment</button>
      <div css={{marginLeft: '1em'}}>Count: {count}</div>
    </div>
  );
};
