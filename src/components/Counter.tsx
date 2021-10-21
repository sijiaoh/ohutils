import {useListen} from '@reactive-class/react';
import {useRef} from 'react';
import {Counter as CounterClass} from 'src/classes/Counter';

export const Counter = ({className}: {className: string}) => {
  const counter = useRef(new CounterClass()).current;
  const {count} = useListen(counter);

  return (
    <div className={className}>
      <button onClick={counter.increment}>Increment</button>
      <div css={{marginLeft: '1em'}}>Count: {count}</div>
    </div>
  );
};
