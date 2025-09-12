interface Props {
  name: string;
}

function Goodbye(props: Props) {
  //   const name = "Bob";
  const { name } = props;
  return <p>It was nice to see you, {name}!</p>;
}

export default Goodbye;

// props - properties - свойства
// component
