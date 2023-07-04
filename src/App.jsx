// import axios from "axios";
import api from "./axios/api";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: "",
  });
  const [targetId, setTargetId] = useState("");
  const [contents, setContents] = useState("");

  // 조회 함수
  const fetchTodos = async () => {
    // const { data } = await axios.get("http://localhost:4000/todos");
    const { data } = await api.get("/todos");
    setTodos(data);
  };

  // 추가 함수
  const onSubmitHandler = async () => {
    api.post("/todos", inputValue);
    // setTodos([...todos, inputValue]);
    fetchTodos();
  };

  // 삭제 함수
  const onDeleteButtonClickHandler = async (todoId) => {
    await api.delete(`/todos/${todoId}`);
    // console.log("id", id);
    setTodos(
      todos.filter((item) => {
        return item.id !== todoId;
      })
    );
  };

  // 수정 함수
  const onUpdateButtonHandler = async () => {
    await api.patch(`/todos/${targetId}`, {
      title: contents,
    });
    setTodos(
      todos.map((item) => {
        if (item.id == targetId) {
          return { ...item, title: contents };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    // db로부터 값을 가져올 것이다.
    fetchTodos();
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="수정할 아이디"
          value={targetId}
          onChange={(e) => {
            setTargetId(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="수정할 내용"
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
        <button onClick={onUpdateButtonHandler}>수정</button>
        <br />
        <br />
      </div>
      <div>
        <form
          onSubmit={(e) => {
            // onSubmit은 새로고침이 기본세팅 되어있어서 막아주는 역할
            e.preventDefault();

            // 버튼 클릭시, input에 들어있는 값(state)를 이용해 DB에 저장(post 요청)
            onSubmitHandler();
          }}
        >
          <input
            type="text"
            value={inputValue.title}
            onChange={(e) => {
              setInputValue({
                title: e.target.value,
              });
            }}
          />
          <button>추가</button>
        </form>
      </div>
      <div>
        {todos?.map((item) => {
          return (
            <div key={item.id}>
              {item.id} : {item.title}
              &nbsp;
              <button onClick={() => onDeleteButtonClickHandler(item.id)}>
                삭제
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
