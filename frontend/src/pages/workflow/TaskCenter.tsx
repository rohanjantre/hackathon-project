import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { CheckSquare, Clock, Filter, CheckCircle2 } from 'lucide-react';
import { workflowService } from '../../services/workflow';
import type { Task } from '../../services/workflow';
import { Card, CardContent } from '../../components/ui/card';

export const TaskCenter: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await workflowService.getTasks();
      setTasks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <CheckSquare className="text-amber-400 w-6 h-6" />
            Task Center
          </h1>
          <p className="text-slate-400 mt-1">Manage assigned operational and maintenance tasks.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-700 text-slate-300 gap-2"><Filter className="w-4 h-4" /> Filter</Button>
          <Button className="bg-amber-600 hover:bg-amber-500 text-white shadow-glow-amber">Create Task</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-10 text-slate-500">Loading Tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-10 text-slate-500">You have no pending tasks.</div>
        ) : (
          tasks.map(task => (
            <Card key={task._id} className="glass-card hover:bg-slate-800/80 transition-colors cursor-pointer border-l-4 border-l-amber-500">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-white text-lg">{task.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                      task.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{task.description}</p>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> Due: {new Date(task.dueDate || Date.now()).toLocaleDateString()}</span>
                    <span>Owner: {task.owner}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400" style={{ width: `${task.progress}%` }}></div>
                    </div>
                    <span className="text-xs text-slate-400 w-8">{task.progress}%</span>
                  </div>
                  <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
