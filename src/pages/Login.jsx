import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: window.location.origin
  }
});
    alert("Check your email to confirm!");
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
  };

  return (
    <div className="center">
      <div className="card">
        <h1>School Tracker</h1>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={signIn}>Login</button>
        <button className="secondary" onClick={signUp}>Sign Up</button>
      </div>
    </div>
  );
}