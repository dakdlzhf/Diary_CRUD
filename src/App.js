import React, { useReducer, useRef } from "react";
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
  return NewState;
};
const dummyData =[
  {
    id:1,
    emotion:1,
    content:"오늘의일기 1번",
    date:1642393042817
  },
  {
    id:2,
    emotion:2,
    content:"오늘의일기 2번",
    date:1642393042818
  },
  {
    id:3,
    emotion:3,
    content:"오늘의일기 3번",
    date:1642393042819
  },
  {
    id:4,
    emotion:4,
    content:"오늘의일기 4번",
    date:1642393042820
  },
  {
    id:5,
    emotion:5,
    content:"오늘의일기 5번",
    date:1642393042821
  },
]

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(6);
  console.log(new Date().getTime())

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
