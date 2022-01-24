import React, {useState} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import init from './components/init'
import back from './components/yellow.png';

const nr=4
const cards = init(nr)

function App() {
  console.log(cards)
  const [flipped,setFlipped] = useState([]) //2-nél többet ne lehessen megfordítani
  const [solved,setSolved] = useState([]) //tároljuk a sikeresen megoldottakat
  const [disabled,setDisabled] = useState(false) //ne tudjon kétszer ugyanarra kattintani

  const handleClick=(id)=>{
    setDisabled(true)
    if(flipped.length===0){
      setFlipped([parseInt(id)])
      setDisabled(false)
    }else{
      if(flipped.includes(id))
        return
      setFlipped([...flipped,id])
      if(isMatch(id)){
        setSolved([...solved,flipped[0],id])
        resetCards()
      }else
        setTimeout(resetCards,1000)
    }
  }

  const isMatch =(id)=>{
    const clickedCard=cards.find(obj=>obj.id==id)
    const flippedCard=cards.find(obj=>obj.id==flipped[0])
    return clickedCard.url===flippedCard.url
  }

  const resetCards=()=>{
    setFlipped([])
    setDisabled(false)
  }

  return (
    <div className="container bg-info">
      <h1 className="text-center text-white">Memory Game</h1>
      <div className="row p-1 m-2">
        {cards.map(obj=>
          <div className={`col-${Math.floor(12/nr)} border border-info myCol gx-0`} key={obj.id}>
            <img className="img-fluid" 
              src={flipped.includes(obj.id) || solved.includes(obj.id) ? obj.url : back}
              disabled = {disabled || solved.includes(obj.id)}
              onClick={()=>disabled ? null : handleClick(obj.id)} 
              alt="random photo"/>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
