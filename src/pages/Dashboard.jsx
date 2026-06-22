import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  async function fetchClasses() {
    const { data } = await supabase
      .from("classes")
      .select("*")
      .eq("user_id", user.id);

    setClasses(data || []);
  }

  async function addClass() {
    const name = prompt("Class name:");
    if (!name) return;

    await supabase.from("classes").insert({
      name,
      user_id: user.id,
    });

    fetchClasses();
  }

   return (
    <div className="page">
      <div className="header">
        <h2>Your Classes</h2>
        <button onClick={addClass}>+ Add Class</button>
      </div>

      <div className="grid">
        {classes.map((c) => (
  <div key={c.id} className="card">
    <h3>{c.name}</h3>
  </div>
))}
      </div>
    </div>
  );
}