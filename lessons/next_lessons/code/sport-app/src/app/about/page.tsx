export default async function About() {
  const BASE_URL = process.env.BASE_URL;
  const res = await fetch(BASE_URL + '/api/hello');
  const { message } = await res.json();

  return (
    <div className='px-28 py-20'>
      <h2>{message}</h2>
      <h2>About the Project</h2>
      <p>
        We created this platform to make quality sports education accessible to
        everyone. Our goal is to help people of all ages and skill levels unlock
        their potential through professional training.
      </p>
      <h3>Advantages:</h3>
      <ul>
        <li>Access to world-class experts</li>
        <li>Flexible learning schedule</li>
        <li>Individual approach to each student</li>
        <li>Modern training methods</li>
        <li>Progress tracking and feedback</li>
      </ul>
    </div>
  );
}
