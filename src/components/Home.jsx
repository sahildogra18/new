import { useState } from "react";
import playerdata from "../../players";
import { NavLink } from "react-router-dom";

function Home() {
  let [data, setData] = useState(playerdata);
  let [name, setName] = useState("");
  let [club, setClub] = useState("");
  let [id, setId] = useState(null);

  function handleDelete(id) {
    const db = data.filter((player) => player.id !== id);
    setData(db);
  }

  function handleAdd() {
    const newPlayer = {
      id: data.length + 1,
      name: name,
      club: club,
    };

    setData([...data, newPlayer]);
    setName("");
    setClub("");
    setId(null);
  }

  function handleEdit(playerId) {
    let player = data.find((player) => player.id === playerId);
    setId(player.id);
    setName(player.name);
    setClub(player.club);
  }

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
  }

  return (
    <div>
      <h1>List of Players</h1>
      <div>
        <label>
          First name
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>

        <label>
          Team name
          <input
            type="text"
            placeholder="Enter your team"
            value={club}
            onChange={(e) => {
              setClub(e.target.value);
            }}
          />
        </label>

        {id ? (
          <button onClick={handleUpdate}>Save</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>

      {Array.isArray(data) && data.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Team</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((player) => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.club}</td>
                <td>
                  <button onClick={() => handleDelete(player.id)}>
                    Delete
                  </button>
                  <NavLink to={`/edit/${player.id}`}>
                    <button onClick={() => handleEdit(player.id)}>Edit</button>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No players available</p>
      )}
    </div>
  );
}

export default Home;
