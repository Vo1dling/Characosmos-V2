import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header.components";
import HomePage from "./pages/HomePage/HomePage.pages";
import FlashPage from "./pages/FlashCardsPage/FlashCardsPage.pages";
import CreateEditPage from "./pages/CreateEditPage/CreateEditPage.pages";
import CharacterPage from "./pages/CharacterPage/CharacterPage.pages";
import LoginPage from "./pages/LoginPage/LoginPage.pages";
import SignUpPage from "./pages/SignUpPage/SignUpPage.pages";
import api from "./components/api/api.js";

const App = () => {
  const [data, setData] = useState([]);
  const [currentUser, setUser] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [currentDifficulty, setDifficulty] = useState("");
  const [id, setID] = useState("");
  const [editing, setEdit] = useState(false);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const inputRefs = { nameInputRef, emailInputRef, passInputRef };

  const getUsers = async () => {
    const users = await api.get("/");
    return users;
  };
  const getData = async () => {
    try {
      const users = await getUsers();
      setData(users.data || []);
    } catch (e) {
      console.error(e.response);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [filteredData]);

  const search = (e) => {
    if (e.target.value === "") setFilteredData([]);
    else if (data.length > 0)
      setFilteredData(
        data.filter((item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
  };
  const setupEdit = (bool) => {
    setEdit(bool);
  };
  const onLogin = async () => {
    try {
      const [emailInput, passInput] = [
        emailInputRef.current,
        passInputRef.current,
      ];
      const res = await api.post("/users/login", {
        email: emailInput.value || "",
        password: passInput.value || "",
        token: window.localStorage.getItem("token"),
      });

      setUser(res.data.user);
      if (!window.localStorage.getItem("token")) {
        window.localStorage.setItem("token", res.data.genToken);
        api.defaults.headers.common["Authorization"] =
          window.localStorage.getItem("token");
      }
    } catch (e) {
      console.error(e.response);
    }
  };
  const onSignup = async () => {
    try {
      const [emailInput, passInput, nameInput] = [
        emailInputRef.current,
        passInputRef.current,
        nameInputRef.current,
      ];
      const res = await api.post("/users", {
        email: emailInput.value || "",
        password: passInput.value || "",
        name: nameInput.value || "",
      });

      setUser(res.data.user);
      window.localStorage.setItem("token", res.data.genToken);
      api.defaults.headers.common["Authorization"] =
        window.localStorage.getItem("token");
      console.log(res);
    } catch (e) {
      console.error(e.response);
      console.log("meow");
    }
  };
  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser({});
      window.localStorage.setItem("token", "");
    } catch (e) {
      console.error(e.response);
    }
  };
  useEffect(() => {
    onLogin();
  }, []);

  return (
    <BrowserRouter>
      <Header setEdit={setupEdit} user={currentUser} logout={logout} />
      <Route path="/" exact>
        <HomePage data={data} search={search} filteredData={filteredData} />
      </Route>
      <Route path="/create">
        <CreateEditPage
          data={data}
          editID={id}
          editing={editing}
          setEdit={setupEdit}
          getData={getData}
          currentUser={currentUser}
        />
      </Route>
      <Route path="/flash">
        <FlashPage
          data={data}
          currentDifficulty={currentDifficulty}
          setDifficulty={setDifficulty}
        />
      </Route>
      {data.length > 0 &&
        data.map((char) => {
          return (
            <Route key={char._id} path={`/${char._id}`} exact>
              <CharacterPage
                char={char}
                getData={getData}
                editID={id}
                setID={setID}
                editing={editing}
                setEdit={setupEdit}
                currentUser={currentUser}
              />
            </Route>
          );
        })}
      <Route path="/login">
        <LoginPage inputRefs={inputRefs} onLogin={onLogin} />
      </Route>

      <Route path="/signup">
        <SignUpPage inputRefs={inputRefs} onSignup={onSignup} />
      </Route>
    </BrowserRouter>
  );
};

export default App;
