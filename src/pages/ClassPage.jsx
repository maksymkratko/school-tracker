import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useParams } from "react-router-dom";

export default function ClassPage() {
  const { id } = useParams();
  const [tab, setTab] = useState("assignments");
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const a = await supabase.from("assignments").select("*").eq("class_id", id);
    const e = await supabase.from("exams").select("*").eq("class_id", id);

    setAssignments(a.data || []);
    setExams(e.data || []);
  }

  async function addAssignment() {
    const title = prompt("Assignment title:");
    const due_date = prompt("Due date (YYYY-MM-DD):");

    await supabase.from("assignments").insert({
      title,
      due_date,
      class_id: id,
      user_id: (await supabase.auth.getUser()).data.user.id,
    });

    loadData();
  }

  async function addExam() {
    const title = prompt("Exam title:");
    const exam_date = prompt("Exam date (YYYY-MM-DD):");

    await supabase.from("exams").insert({
      title,
      exam_date,
      class_id: id,
      user_id: (await supabase.auth.getUser()).data.user.id,
    });

    loadData();
  }

  return (
    <div className="page">
      <div className="tabs">
        <button onClick={() => setTab("assignments")}>Assignments</button>
        <button onClick={() => setTab("exams")}>Exams</button>
      </div>

      {tab === "assignments" && (
        <>
          <button onClick={addAssignment}>+ Add Assignment</button>
          {assignments.map((a) => (
            <div className="card" key={a.id}>
              <h3>{a.title}</h3>
              <p>Due: {a.due_date}</p>
            </div>
          ))}
        </>
      )}

      {tab === "exams" && (
        <>
          <button onClick={addExam}>+ Add Exam</button>
          {exams.map((e) => (
            <div className="card" key={e.id}>
              <h3>{e.title}</h3>
              <p>Date: {e.exam_date}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}