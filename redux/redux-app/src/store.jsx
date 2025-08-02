import {createStore} from "redux";

const initalState={
  count:0
}
 function counterReducer(state=initalState, action){
  switch(action.type){
    case "Increment":
      return {count:state.count+1};
    case "Decrement":
      return {count:state.count-1}
    default:
      return state
  }
 }

 const store=createStore(counterReducer);
 export default store;