import React, { useEffect, useState } from 'react';
import { Building2, Settings, Key, Shield, Activity, HardDrive, Cpu, Server } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { platformService } from '../../services/platform';
import { useNavigate } from 'react-router-dom';

export const PlatformDashboard: React.FC = () => {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadHealth();
  }, []);

  const loadHealth = async () => {
    try {
      const data = await platformService.getSystemHealth();
      setHealth(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-400">Loading Platform Administration...</div>;

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Settings className="text-blue-500 w-8 h-8" />
            Platform Administration
          </h1>
          <p className="text-slate-400 mt-1">Enterprise configuration, multi-tenancy, and system health.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card hover:bg-slate-800 transition-colors cursor-pointer" onClick={() => navigate('/platform/organization')}>
          <CardContent className="p-6 text-center space-y-3">
            <Building2 className="w-8 h-8 text-indigo-400 mx-auto" />
            <h3 className="text-white font-bold">Organization & Plants</h3>
            <p className="text-xs text-slate-400">Manage structure</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover:bg-slate-800 transition-colors cursor-pointer" onClick={() => navigate('/platform/settings')}>
          <CardContent className="p-6 text-center space-y-3">
            <Settings className="w-8 h-8 text-blue-400 mx-auto" />
            <h3 className="text-white font-bold">System Settings</h3>
            <p className="text-xs text-slate-400">General & Branding</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:bg-slate-800 transition-colors cursor-pointer" onClick={() => navigate('/platform/audit')}>
          <CardContent className="p-6 text-center space-y-3">
            <Shield className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-white font-bold">Audit Logs</h3>
            <p className="text-xs text-slate-400">Compliance tracking</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:bg-slate-800 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center space-y-3">
            <Key className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="text-white font-bold">API & Integrations</h3>
            <p className="text-xs text-slate-400">External connections</p>
          </CardContent>
        </Card>
      </div>

      {health && (
        <Card className="glass-card mt-8">
          <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              System Health Monitoring
            </h3>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded uppercase tracking-wider">
              {health.status}
            </span>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <Server className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-sm text-slate-400">Backend API</p>
                  <p className="font-bold text-white">{health.backend}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <HardDrive className="w-8 h-8 text-indigo-400" />
                <div>
                  <p className="text-sm text-slate-400">Database (MongoDB)</p>
                  <p className="font-bold text-white">{health.database}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <Cpu className="w-8 h-8 text-amber-400" />
                <div>
                  <p className="text-sm text-slate-400">CPU Usage</p>
                  <p className="font-bold text-white">{health.cpuUsage}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <Activity className="w-8 h-8 text-violet-400" />
                <div>
                  <p className="text-sm text-slate-400">AI Services (LLM)</p>
                  <p className="font-bold text-white">{health.aiServices}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
