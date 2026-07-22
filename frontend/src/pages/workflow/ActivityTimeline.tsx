import React, { useEffect, useState } from 'react';
import { Activity, Clock } from 'lucide-react';
import { workflowService } from '../../services/workflow';

export const ActivityTimeline: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await workflowService.getActivities();
      setActivities(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Activity className="text-blue-400 w-6 h-6" />
          Activity Timeline
        </h1>
        <p className="text-slate-400 mt-1">Complete system audit trail and automation history.</p>
      </div>

      <div className="relative border-l border-slate-700/60 ml-4 space-y-8 py-4">
        {loading ? (
          <div className="text-slate-500 pl-8">Loading history...</div>
        ) : activities.length === 0 ? (
          <div className="text-slate-500 pl-8">No activities recorded yet.</div>
        ) : (
          activities.map((activity, index) => (
            <div key={activity._id || index} className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-slate-900"></div>
              
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 shadow-lg hover:bg-slate-800 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white text-sm">{activity.action}</h4>
                  <span className="text-xs flex items-center gap-1 text-slate-500 font-mono"><Clock className="w-3 h-3" /> {new Date(activity.createdAt).toLocaleString()}</span>
                </div>
                
                <div className="flex items-center gap-3 text-xs mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300">Module: {activity.module}</span>
                  {activity.user && <span className="text-slate-400">User: {activity.user}</span>}
                </div>
                
                {activity.details && Object.keys(activity.details).length > 0 && (
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30 text-xs font-mono text-slate-400 overflow-x-auto">
                    {JSON.stringify(activity.details, null, 2)}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
