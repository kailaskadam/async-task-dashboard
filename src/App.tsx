import './App.css'
import { CreateTaskCurried } from "./utils/task";
import { withRetry, withTimeout } from "./utils/wrappers";


import { useTaskManager } from "./hooks/useTaskManager";

export default function  App() {
  const {tasks, addTask, updateTask} = useTaskManager();


  const runTasks = async () => {
    const rawTasks = [
      CreateTaskCurried("Task1")(2000)(true),
      CreateTaskCurried("Task2")(1000)(false),
      CreateTaskCurried("Task3")(1500)(true)];

      const wrappedTasks = rawTasks.map((task, index) => {
      addTask(`Task ${index + 1}`);

      const finalTask = withRetry(() => withTimeout(task as unknown as () => Promise<void>, 1800), 2);

      return finalTask()
        .then(() => updateTask(index, "success"))
        .catch(() => updateTask(index, "failed"));
    });

    await Promise.allSettled(wrappedTasks);
}

return (
    <div style={{ padding: 20 }}>
      <h2>Async Task Dashboard</h2>

      <button onClick={runTasks}>Run Tasks</button>

      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            {t.name} - {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
