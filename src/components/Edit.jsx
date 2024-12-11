import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import playerdata from "../../players";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  let [data, setData] = useState(playerdata);
  let [name, setName] = useState("");
  let [club, setClub] = useState("");
  // let [id, setId] = useState(null);

  // function handleEdit(playerId) {
  //   let player = data.find((player) => player.id === playerId);
  //   setId(player.id);
  //   setName(player.name);
  //   setClub(player.club);
  // }
  useEffect(() => {
    const player = playerdata.find((p) => p.id === parseInt(id));
    if (player) {
      setName(player.name);
      setClub(player.club);
    }
  }, [id]);
  function handleUpdate() {
    let index = data
      .map((player) => {
        return player.id;
      })
      .indexOf(id);
    let player = [...data];
    player[index].name = name;
    player[index].club = club;

    setData(player);
    navigate("/");
  }

  return (
    <div className="edit-container">
      <h1>Edit Player</h1>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Club:</label>
          <input
            type="text"
            value={club}
            onChange={(e) => {
              setClub(e.target.value);
            }}
          />
        </div>

        <NavLink to={"/"}>
          <button type="submit" onClick={handleUpdate}>
            Updated
          </button>
        </NavLink>
      </form>
    </div>
  );
}

export default Edit;
