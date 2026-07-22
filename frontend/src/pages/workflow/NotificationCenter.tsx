import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Bell, Check, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { workflowService } from '../../services/workflow';
import type { Notification } from '../../services/workflow';

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await workflowService.getNotifications();
      setNotifications(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await workflowService.markNotificationRead(id);
      loadNotifications();
    } catch (e) {
      console.error(e);
    }
  };

  const getIcon = (priority: string) => {
    switch(priority) {
      case 'Critical': return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'Warning': return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case 'Success': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8 max-w-4xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Bell className="text-blue-400 w-6 h-6" />
            Notification Center
          </h1>
        </div>
        <Button variant="ghost" className="text-slate-400 hover:text-white gap-2">
          <Check className="w-4 h-4" /> Mark All Read
        </Button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-10 text-slate-500">Loading Notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-10 text-slate-500">You're all caught up!</div>
        ) : (
          notifications.map(n => (
            <div key={n._id} className={`flex items-start gap-4 p-4 rounded-xl border ${n.isRead ? 'bg-slate-900/50 border-transparent opacity-60' : 'bg-slate-800 border-slate-700 shadow-lg'}`}>
              <div className="mt-1 flex-shrink-0">
                {getIcon(n.priority)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-semibold ${n.isRead ? 'text-slate-400' : 'text-white'}`}>{n.title}</h4>
                  <span className="text-xs text-slate-500 font-mono">{new Date(n.createdAt).toLocaleTimeString()}</span>
                </div>
                <p className="text-sm text-slate-400 mb-2">{n.message}</p>
                {!n.isRead && (
                  <button onClick={() => markAsRead(n._id)} className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
