export default function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="heading">this is the heading</h1>
      </div>
      <div></div>
    </header>
  );
}

const mixed = <p>this return true 123 "hello" don't // comment &amp; 😀 {name} after</p>;
const nested = <><span>Hello <b>world</b>!</span><br />Done</>;
const multiline = <div
  title="a > b"
  data-value={getValue({ nested: true })}
>
  const this true 123
  {items.map((item) => <span>{item.name} text</span>)}
  after expression
</div>;
const after = true;
