import { useEffect, useState } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
const App = () => {
  const name = [{ id: Math.floor(Math.random() * 1000), name: "abul" }];
  const [item, setItem] = useState(name);
  const [value, setValue] = useState();
  const [edit, setEdit] = useState(false);
  const [updateId, setUpdateId] = useState("");
  useEffect(() => {
    AOS.init();
  }, []);

  // insert Data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      alert("plese something write here.....");
    } else {
      setItem((prev) => {
        return [...prev, { id: Math.floor(Math.random() * 1000), name: value }];
      });
      setValue("");
    }
  };
  // delet Data
  const handleDelet = (id) => {
    setItem((prev) => {
      return [...prev].filter((todo) => {
        return todo.id !== id;
      });
    });
  };

  // Edit Data
  const EditData = (id) => {
    let newData = item.find((data) => data.id === id);
    setEdit(true);
    setValue(newData.name);
    setUpdateId(id);
  };

  // updateData
  const updateData = (e) => {
    e.preventDefault();
    let newData = item.find((data) => data.id === updateId);
    newData.name = value;
    setEdit(false);
    setValue("");
  };
  return (
    <div className="container">
      {/* todo tittle  */}
      <h1>Todo App</h1>
      {/* todo form  */}
      <form onSubmit={edit ? updateData : handleSubmit}>
        <input
          value={value}
          placeholder="Write your todo...."
          type="text"
          onChange={(e) => setValue(e.target.value)}
        />

        <button type="submit">{edit ? "Update" : "Submit"}</button>
      </form>
      {/* todo item  */}
      <div className="itmes">
        <span>{item.length}</span>
        {item.map((item, index) => {
          return (
            <div data-aos="flip-right" className="item" key={index}>
              <h3>{item.name}</h3>
              <button onClick={() => EditData(item.id)}>Edit</button>
              <button onClick={() => handleDelet(item.id)}>Delet</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
