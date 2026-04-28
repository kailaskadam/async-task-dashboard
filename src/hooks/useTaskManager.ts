//custom hooks pattern

import { useState } from "react";

export const useTaskManager = () => {
    const [tasks, setTasks] = useState<{name: string, status: string}[]>([]);
    
    const addTask = (task: string) => {
        setTasks(prevTasks => [...prevTasks, {name: task, status: 'pending'}]);
    }

    const updateTask = (index:number,status:string) => {
        setTasks(prevTasks => prevTasks.map((task, i) => i === index ? {...task, status} : task));
    }

    return { tasks, addTask,updateTask };
}
