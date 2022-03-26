import React, { useState, useEffect } from "react";
import axios from "axios";
import "./character.css";
const url = "https://thronesapi.com/api/v2/Characters";

function CharacterCard({ props }) {
  return (
    <>
      <div key={props.id} className="card" style={{ width: "18rem" }}>
        <img src={props.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.fullName}</h5>
          <div className="card-text">
            <p className="cardContent">Title: {props.title}</p>
            <p className="cardContent">Family: {props.family}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function CharacterMap({ props }) {
  return (
    <div className="characterFlex">
      {props &&
        props.map((c) => {
          return <CharacterCard props={c} />;
        })}
    </div>
  );
}

function Characters() {
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = axios.get(url);
        const result = await data;
        setCharacter(result.data);
        setLoading(false);
      } catch (error) {
        console.log("error=>", error);
      }
    };
    getCharacters();
  }, []);
  return <>{loading ? <p className="loading">Loading...</p> : <section>{<CharacterMap props={character} />}</section>}</>;
}

export default Characters;
