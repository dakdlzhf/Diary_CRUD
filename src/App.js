import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import New from "./Pages/New";
import Edit from "./Pages/Edit";
import Diary from "./Pages/Diary";

//component
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

const reducer = (state, action) => {
  let NewState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      NewState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      NewState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      NewState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diary',JSON.stringify(NewState));
  return NewState;
};
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  console.log(new Date().getTime())
  
  useEffect(()=>{
    const localData = localStorage.getItem('diary');
    if(localData){
      const diaryList = JSON.parse(localData).sort((a,b)=>parseInt(b.id)-parseInt(a.id))
      dataId.current = parseInt(diaryList[0].id) + 1
      console.log(diaryList);
      console.log(dataId);
      dispatch({type:'INIT',data:diaryList});
    }
  },[])
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: { id: targetId, date: new Date(date).getTime(), content, emotion },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            {/* <MyHeader
              headText={"App"}
              leftChild={
                <MyButton text={"왼쪽버튼"} onClick={() => alert("뒤로가기")} />
              }
              rightChild={
                <MyButton
                  text={"오른쪽버튼"}
                  onClick={() => alert("앞으로가기")}
                />
              }
            />
            <h2>App.js</h2>
            <MyButton
              text={"버튼"}
              type={"positive"}
              onClick={() => alert("버튼클릭")}
            />
            <MyButton
              text={"버튼"}
              type={"negative"}
              onClick={() => alert("버튼클릭")}
            />
            <MyButton text={"버튼"} onClick={() => alert("버튼클릭")} /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
