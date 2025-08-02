import React from "react";
import {useSelector,useDispatch} from "react-redux"

function App(){
  const count=useSelector(state=>state.count)
  const dispatch=useDispatch();

  return(
    <div>
      <h1>counter:{count}</h1>
      <button onClick={()=>dispatch({type:"Increment"})}>Increment</button>
      <button onClick={()=>dispatch({type:"Decrement"})}>Decrement</button>
    </div>
  )
}
export default App;