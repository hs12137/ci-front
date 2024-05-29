import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

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
      const url = `http://${window.location.host}:8080/api/boards`;
      await axios.post(url, formData);
      alert("성공적으로 등록하엿습니다.");
      getBoards();
    }catch{
      alert("등록 실패");
    }
  };
  const getBoards = async () => {
    try {
      const url = `http://${window.location.host}:8080/api/boards`;
      const response = await axios.get(url);
      setBoardList(response.data);
    }catch(e) {
      console.log(e)
    }
  };
  const deleteBoard = async (id) => {
    try{
      const url = `http://${window.location.host}:8080/api/boards/${id}`
      await axios.delete(url, id);
      getBoards();
    }catch(e){
      console.log(e);
    }
  };

  useEffect(() => {
    getBoards();
  })
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
