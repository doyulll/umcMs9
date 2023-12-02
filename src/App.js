import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function LoadingModal({ show }) {
  if (!show) {
    return null;
  }
  return (
    <div className="loading-modal">
      <div className="loading-content">Loading...</div>
    </div>
  );
}

export default function App() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "id":
        setId(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();

    if (id === "" || password === "") {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        id: id,
        pw: password,
      });

      console.log("로그인 성공");
      console.log(response.data);

      // 토큰과 ID를 받아와서 로컬 스토리지에 저장
      const { token, data } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", data.id);

    } catch (error) {
      console.error("로그인 에러");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div>
        <div className="input-container">
          <label htmlFor="id">아이디</label>
          <input name="id" value={id} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="password">비밀번호</label>
          <input
            name="password"
            value={password}
            type="password"
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value={"로그인"}
          onClick={handleClick}
          disabled={isLoading}
        />
        <LoadingModal show={isLoading} />
      </div>
    </div>
  );
}