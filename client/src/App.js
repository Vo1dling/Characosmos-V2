import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header.components";
import HomePage from "./pages/HomePage/HomePage.pages";
import FlashPage from "./pages/FlashCardsPage/FlashCardsPage.pages";
import CreateEditPage from "./pages/CreateEditPage/CreateEditPage.pages";
import CharacterPage from "./pages/CharacterPage/CharacterPage.pages";
import api from "./components/api/api.js";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentDifficulty, setDifficulty] = useState("");
  const [id, setID] = useState("");
  const [editing, setEdit] = useState("false");

  const getUsers = async () => {
    const users = await api.get("/");
    return users;
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const users = await getUsers();
        setData(users.data);
      } catch (e) {
        console.error(e.response);
      }
    };
    getData();
  }, [filteredData]);
  const search = (e) => {
    if (e.target.value === "") setFilteredData([]);
    else
      setFilteredData(
        data.filter((item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
  };
  return (
    <BrowserRouter>
      <Header setEdit={setEdit} />
      <Route path="/" exact>
        <HomePage data={data} search={search} filteredData={filteredData} />
      </Route>
      <Route path="/create">
        <CreateEditPage
          data={data}
          editID={id}
          editing={editing}
          setEdit={setEdit}
        />
      </Route>

      <Route path="/flash">
        <FlashPage
          data={data}
          currentDifficulty={currentDifficulty}
          setDifficulty={setDifficulty}
        />
      </Route>
      {data.map((char) => {
        return (
          <Route key={char._id} path={`/${char._id}`} exact>
            <CharacterPage
              char={char}
              editID={id}
              setID={setID}
              editing={editing}
              setEdit={setEdit}
            />
          </Route>
        );
      })}
    </BrowserRouter>
  );
};

export default App;
