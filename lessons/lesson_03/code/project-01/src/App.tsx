import "./App.css";
import AgeInfo from "./components/AgeInfo/AgeInfo";
import Counter from "./components/Counter/Counter";
import DogCard from "./components/DogCard/DogCard";
import Goodbye from "./components/Goodbye/Goodbye";
import Greeting from "./components/Greeting/Greeting";
import PersonalGreeting from "./components/PersonalGreeting/PersonalGreeting";
import ProfileCard from "./components/ProfileCard/ProfileCard";

function App() {
  return (
    <div>
      <PersonalGreeting />
      <Greeting />
      <Counter />
      <DogCard />
      <ProfileCard
        name="Anna Metzer"
        description="Your personal assistent"
        // avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
      />

      <Goodbye name={"Bob"} />
      <Goodbye name={"John"} />
      <AgeInfo age={23} name={"Andrey"} />
      <AgeInfo age={26} name={"Fred"} />
    </div>
  );
}

export default App;
// Создайте компонент, который выводит на экран фразу
// It was nice to see you!
// назовите компонент Goodbye
// 1. Создать папку под компонент
// 2. Создать в ней файл tsx с таким же имменем
// 3. Написать компонент - функиция
// 4. Воспользоваться компоенетом - в другом месте программы

// Создать компонент AgeInfo, который бы отображал
// следующий текст:
// I'm <number> years old
