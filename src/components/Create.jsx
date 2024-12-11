import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Create() {
  let [values, setValues] = useState({
    name: "",
    club: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  let nevigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch("http://localhost:3000/players", values, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let answer = await response.json();
    console.log(answer);
    nevigate("/");
  };

  return (
    <>
      <div className="create-page">
        <h1>Add Player</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              required
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Club:</label>
            <input
              type="text"
              name="club"
              required
              value={values.club}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Position:</label>
            <input
              type="text"
              name="position"
              required
              value={values.position}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Add Player</button>
        </form>
      </div>
    </>
  );
}

export default Create;
