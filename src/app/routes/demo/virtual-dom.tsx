import { useState } from 'react';

export const VirtualDom = () => {
  const [count, setCount] = useState(0);

  counter = 0;

  return (
    <div>
      <h1>Virtual DOM</h1>
      <p>
        This is a demo of how React's Virtual DOM works. When you click the
        button below, the count will increment and the text will update
        accordingly.
      </p>
      <p>counter : {counter}</p>
      <button
        onClick={() => {
          counter++;
          console.log(counter);
        }}
      >
        new counter
      </button>

      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
