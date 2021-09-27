import { useEffect, useState } from "react";
import Length from "./Components/Length";
import 'materialize-css/dist/css/materialize.min.css'



function App() {
  const [displayTime, setDisplayTime] = useState(25*60)
  const [breakTime, setBreakTime] = useState(5*60)
  const [sessionTime, setSessionTime] = useState(25*60)
  const [timerOn, setTimerOn] = useState(false)
  const [onBreak, setOnBreak] = useState(false)
  const [breakAudio, setBreakAudio] = useState(new Audio('https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'))

  useEffect(() => {
    if (displayTime <=0){
      setOnBreak(true)
    }else if (!timerOn && displayTime === breakTime){
      setOnBreak(false)
    }
  }, [displayTime,
    breakTime,
    sessionTime,
    timerOn,
    onBreak])



  const playBreakSound = () =>{
    breakAudio.currentTime = 0
    breakAudio.play()
  }

  const formatTime = (time) => {
    let minutos = Math.floor(time / 60)
    let segundos = time % 60

    return (
      (minutos < 10 ? "0" + minutos : minutos) + 
      ":" + 
      (segundos < 10 ? "0" + segundos : segundos)
    )
  }

  const changeTime = (monto, type) =>{
    if(type=='break'){
      if(breakTime<= 60 && monto < 0){
        return;
      }
      setBreakTime((prev)=>prev+monto)
    }else{
      if(sessionTime<= 60 && monto < 0){
        return;
      }
      setSessionTime((prev)=>prev+monto)
      if(!timerOn){
        setDisplayTime(sessionTime + monto)
      }
    }
  }

  const controlTime = () =>{
    let segundo = 1000
    let fecha = new Date().getTime();
    let nuevaFecha = new Date().getTime() + segundo
    let onBreakVariable = onBreak;
    if (!timerOn) {
      let interval = setInterval(() => {
            fecha = new Date().getTime();
            if (fecha > nuevaFecha) {
              setDisplayTime(prev => {
                if (prev <= 0 && !onBreakVariable) {
                  playBreakSound()
                  onBreakVariable = true;
                  setOnBreak(true)
                  return breakTime;
                } else if (prev <= 0 && onBreakVariable) {
                  playBreakSound()
                  onBreakVariable = false;
                  setOnBreak(false)
                  return sessionTime;
                }
                return prev - 1
              })
              nuevaFecha += segundo
        }
      },30)
      localStorage.clear()
      localStorage.setItem('interval-id', interval)
    }
    if(timerOn){
      clearInterval(localStorage.getItem('interval-id'));
    }
    setTimerOn(!timerOn)
  }
  const resetTime = () =>{
    setDisplayTime(25*60)
    setBreakTime(5*60)
    setSessionTime(25*60)
  }


  return (
    <div className="App container">
        
      <div className="contadores">
        <Length
        titulo={'Break Length'}
        changeTime={changeTime}
        type={'break'}
        time={breakTime}
        formatTime={formatTime}
        />
        <Length
        titulo={'Session Length'}
        changeTime={changeTime}
        type={'session'}
        time={sessionTime}
        formatTime={formatTime}
        />
      </div>
      <div class="contResult">
        <h3>{onBreak? 'Break': 'Session'}</h3>
        <h1>{formatTime(displayTime)}</h1>
        <div class="controlButtons">
          <button className="btn-large indigo darken-4" onClick={controlTime}>
            {timerOn ? (<i className="material-icons">pause_circle_filled</i>)
            :(<i className="material-icons">play_circle_filled</i>)}
          </button>
          <button className="btn-large indigo darken-4" onClick={resetTime}>
            <i className="material-icons">autorenew</i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;


