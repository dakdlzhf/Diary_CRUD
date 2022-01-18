import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emtion";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(()=>{
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  },[])

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      console.log(targetDiary);
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);
  if (!data) {
    return <div className="Diarypage">로딩중입니다 . .</div>;
  } else {
    const curEmotionDate =emotionList.find((it)=>parseInt(it.emotion_id)===data.emotion);
    console.log(curEmotionDate);
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={<MyButton text={"수정하기"} onClick={()=>navigate(`/edit/${data.id}`)}/>}
        />
        <article>
            <section>
                <h4>오늘의 감정</h4>
                <div className={["diary_img_wrapper",`diary_img_wrapper_${data.emotion}`].join(" ")}>
                    <img src={curEmotionDate.emotion_img}/>
                    <div className="emotion_descript">
                        {curEmotionDate.emotion_descript}
                    </div>
                </div>
            </section>
        </article>
        <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
                <p>{data.content}</p>
            </div>
        </section>
      </div>
    );
  }
  return (
    <div>
      <h1>Diary</h1>
      <p> Diary 페이지입니다</p>
    </div>
  );
};

export default Diary;
