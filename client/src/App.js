import {useEffect} from 'react'
import './App.css';

function App() {

  useEffect(() => {
   
    fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: "gaga",
        password: "gaga"
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log('tok',json));

   }, [])

  return (
    <div className="App">
     HELLO!
    </div>
  );
}

export default App;
