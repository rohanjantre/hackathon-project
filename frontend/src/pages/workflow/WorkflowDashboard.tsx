import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Workflow, CheckCircle, Clock, AlertCircle, Plus, PlayCircle } from 'lucide-react';
import { workflowService } from '../../services/workflow';
import { Card, CardContent } from '../../components/ui/card';

export const WorkflowDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await workflowService.getDashboard();
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-400">Loading Automation Engine...</div>;

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Workflow className="text-blue-400 w-8 h-8" />
            Workflow Automation
          </h1>
          <p className="text-slate-400 mt-1">Design, execute, and monitor automated operational sequences.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2 border-slate-700 hover:border-slate-500">
            <PlayCircle className="w-4 h-4" /> Run Manual Trigger
          </Button>
          <Button className="gap-2 shadow-glow bg-blue-600 hover:bg-blue-500 text-white">
            <Plus className="w-4 h-4" /> Create Workflow
          </Button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card p-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Workflow className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Active Workflows</p>
                  <p className="text-2xl font-bold text-white">{stats.activeWorkflows}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card p-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Pending Tasks</p>
                  <p className="text-2xl font-bold text-white">{stats.pendingTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card p-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Completed Today</p>
                  <p className="text-2xl font-bold text-white">{stats.completedToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card p-1 border-red-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Overdue Tasks</p>
                  <p className="text-2xl font-bold text-red-400">{stats.overdueTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
            <h3 className="font-semibold text-white flex items-center gap-2">Recent Triggers</h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded bg-slate-800/40 border border-slate-700/50">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-white">Compliance Certificate Expired</p>
                  <p className="text-xs text-slate-400 mt-1">Triggered: <span className="font-mono text-blue-400">ISO-9001 Renewal Protocol</span></p>
                </div>
                <span className="ml-auto text-[10px] text-slate-500">10m ago</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded bg-slate-800/40 border border-slate-700/50">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-white">AI Prediction: Bearing Failure (P-201)</p>
                  <p className="text-xs text-slate-400 mt-1">Triggered: <span className="font-mono text-blue-400">Emergency Maintenance Alert</span></p>
                </div>
                <span className="ml-auto text-[10px] text-slate-500">1h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card flex flex-col items-center justify-center p-10 text-center">
          <Workflow className="w-16 h-16 text-slate-700 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Automate Repetitive Tasks</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-sm">
            Use the visual workflow builder to connect AI Insights, Compliance alerts, and Asset data directly into human operational tasks.
          </p>
          <Button className="bg-slate-800 hover:bg-slate-700 text-white">
            Launch Workflow Builder
          </Button>
        </Card>
      </div>
    </div>
  );
};
