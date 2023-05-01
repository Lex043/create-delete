import supabase from "../../config/supabaseClient";
import { useEffect, useState } from "react";
import TodoItem from "../todoItem/TodoItem";

import "./Home.scss";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [todos, setTodos] = useState(null);

  const [task, setTask] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTask("");

    if (!task) {
      setFormError("Please fill in the task correctly!");
      return;
    }

    const { data: todo, error } = await supabase
      .from("todos")
      .insert({ task })
      .single();

    if (error) {
      setFormError("Please fill in the task correctly!");
    }

    if (todo) {
      setTodos([todo, ...todos]);
      setFormError(null);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase.from("todos").select("*");

      if (error) {
        setFetchError("Could not fetch todos");
        setTodos(null);
      }

      if (todos) {
        setTodos(todos);
        setFetchError(null);
      }
    };

    fetchTodos();
  }, [todos]);

  const handleDelete = async (id) => {
    const { data, error } = await supabase.from("todos").delete().eq("id", id);
    setTodos(todos.filter((x) => x.id !== id));

    if (data) {
      console.log(data);
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <section className="main__container">
      <h1>CR&D with Supabase</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Create new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        {formError && <p>{formError}</p>}
      </form>
      <TodoItem
        fetchError={fetchError}
        todos={todos}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default Home;
