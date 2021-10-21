import {ReactiveClass} from '@reactive-class/react';

export class Counter extends ReactiveClass {
  count = 0;

  increment = () => {
    this.count++;
  };
}
