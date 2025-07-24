import { useState , useRef } from "react";

import { Trash2, Pencil, Save } from "lucide-react";


function TodoItem({ task, toggleCompleted, deleteTask  ,editTask }) {
    const ref = useRef();
    const [isDisabled, setIsDisabled] = useState(true);
  return (
    <div className={`flex justify-between items-center ${isDisabled ? "bg-gray-200" : "bg-white"} p-4 rounded-lg shadow-sm mb-3`} >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task.id)}
          className="accent-purple-600 w-5 h-5 mt-1 cursor-pointer"
        />
        <div>
          <input
          
          type="text"
          
          defaultValue={task.task}
          disabled={isDisabled}
          ref={ref}
            className={`text-base ${
              task.completed ? "line-through text-gray-400" : "text-gray-800"
            } ${isDisabled ? "" : "outline-none" } `}
          />
            
          <span className="text-sm text-gray-400">
            {task.time} , {task.date}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => deleteTask(task.id)}>
          <Trash2 className="w-5 h-5 text-red-600 cursor-pointer" />
        </button>
        <button onClick={ () =>{
            if(isDisabled){
                setIsDisabled(false);
                setTimeout(() => {
                    ref.current?.focus();
                  }, 0);
                
            }
            else{
            setIsDisabled(true);
            editTask(task.id , ref.current.value)
            
        }

        } 
        }>
          {isDisabled ? <Pencil className="w-5 h-5 text-gray-600 cursor-pointer" /> : <Save className="w-5 h-5 text-gray-600 cursor-pointer" />}
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
