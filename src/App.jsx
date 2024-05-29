import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';

function App() {
  const [boardList, setBoardList] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    content: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const createBoard = async () => {
    try{
      const url = `/api/boards`;
      await axios.post(url, formData);
      alert("성공적으로 등록하엿습니다.");
      getBoards();
    }catch{
      alert("등록 실패");
    }
  };
  const getBoards = useCallback(async () => {
    try {
      const url = `/api/boards`;
      const response = await axios.get(url);
      const newBoardList = response.data;

      // 상태가 이전 상태와 동일하지 않을 때만 업데이트
      if (JSON.stringify(boardList) !== JSON.stringify(newBoardList)) {
        setBoardList(newBoardList);
      }
    } catch (e) {
      console.log(e);
    }
  }, [boardList]); // boardList를 의존성 배열에 포함
  const deleteBoard = async (id) => {
    try{
      const url = `/api/boards/${id}`
      await axios.delete(url, id);
      getBoards();
    }catch(e){
      console.log(e);
    }
  };

  useEffect(() => {
    getBoards();
  }, [getBoards]);

  return (
    <div className='container'>
      <input 
        type="text" 
        placeholder='name'
        name="userName"
        value={formData.userName}
        onChange={handleChange}
      />
      <input 
        type="text" 
        placeholder='text'
        name='content'
        value={formData.content}
        onChange={handleChange}
      />
      <button onClick={createBoard}>
        submit
      </button>
      <ul>
        {boardList.map((board, index) => (
          <li className='board'>
            <span>
              {board.userName} : {board.content}
            </span>
            <button onClick={() => deleteBoard(board.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
