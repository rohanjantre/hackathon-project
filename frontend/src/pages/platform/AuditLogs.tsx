import React, { useEffect, useState } from 'react';
import { Shield, Search, Clock } from 'lucide-react';
import { platformService } from '../../services/platform';
import { Card } from '../../components/ui/card';

export const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const data = await platformService.getAuditLogs();
      setLogs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="text-emerald-400 w-6 h-6" />
            Security Audit Logs
          </h1>
          <p className="text-slate-400 mt-1">Immutable record of all system-wide actions.</p>
        </div>
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl flex items-center shadow-inner overflow-hidden w-64">
          <Search className="w-4 h-4 ml-3 text-slate-400" />
          <input type="text" placeholder="Search logs..." className="bg-transparent border-none text-sm text-white px-3 py-2 w-full focus:outline-none focus:ring-0" />
        </div>
      </div>

      <Card className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-700/50 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Timestamp</th>
                <th className="p-4 font-semibold">Action</th>
                <th className="p-4 font-semibold">Module</th>
                <th className="p-4 font-semibold">User / System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading audit trail...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">No logs found.</td></tr>
              ) : (
                logs.map(log => (
                  <tr key={log._id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-slate-300 text-sm font-mono whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {new Date(log.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4 text-white text-sm font-medium">{log.action}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-blue-400">
                        {log.module || 'System'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-sm">{log.user || 'Automated System'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
