import { html, useState } from "preact";

export const Counter = ({ initial }: { initial: number }) => {
  const [value, setValue] = useState(initial);

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  const onInput = (e: any) => {
    const { value } = e.target;
    setValue(+value);
  };

  return (
    html`
      <div>
        Value ${value}:
      </div>
      <form onSubmit=${onSubmit}>
        <div class="control">
          <input class="input" type="number" value=${value} onInput=${onInput} />
        </div>
        <p>You typed this value: ${value}</p>
        <button type="submit">Submit</button>
      </form>`
  );
};
