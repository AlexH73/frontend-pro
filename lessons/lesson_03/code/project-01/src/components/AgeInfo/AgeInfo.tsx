interface Props {
  age: number;
  name: string;
}

function AgeInfo(props: Props) {
  const { age, name } = props;
  return (
    <div>
      <p>I'm {age} years old, my name is {name}</p>
    </div>
  );
}

export default AgeInfo;
