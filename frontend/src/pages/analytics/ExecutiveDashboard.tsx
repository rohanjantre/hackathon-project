import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Activity, BrainCircuit, AlertTriangle, Download } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { analyticsService } from '../../services/analytics';
import { Button } from '../../components/ui/button';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ExecutiveDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [costs, setCosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, costsData] = await Promise.all([
        analyticsService.getExecutiveDashboard(),
        analyticsService.getCostAnalytics()
      ]);
      setStats(statsData);
      setCosts(costsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-400">Loading Executive Command Center...</div>;

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="text-blue-500 w-8 h-8" />
            Executive Command Center
          </h1>
          <p className="text-slate-400 mt-1">High-level enterprise overview, health, and operational intelligence.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
          <Download className="w-4 h-4" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Overall Health', value: `${stats.overallHealth}%`, icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
          { label: 'AI Readiness', value: `${stats.aiReadinessScore}%`, icon: BrainCircuit, color: 'text-violet-400', bg: 'bg-violet-500/20' },
          { label: 'Compliance', value: `${stats.complianceScore}%`, icon: ShieldCheck, color: 'text-blue-400', bg: 'bg-blue-500/20' },
          { label: 'Asset Availability', value: `${stats.assetAvailability}%`, icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-500/20' },
          { label: 'Downtime', value: `${stats.downtimePercentage}%`, icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/20' }
        ].map((kpi, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
              <p className="text-xs text-slate-400 uppercase font-semibold">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card lg:col-span-2">
          <div className="p-4 border-b border-slate-700/50">
            <h3 className="font-semibold text-white">Cost & Risk Trend (YTD)</h3>
          </div>
          <CardContent className="p-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costs} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMaintenance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{fontSize: 12}} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 12}} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                <Area type="monotone" dataKey="maintenance" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMaintenance)" />
                <Area type="monotone" dataKey="risk" stroke="#ef4444" fillOpacity={1} fill="url(#colorRisk)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <div className="p-4 border-b border-slate-700/50">
            <h3 className="font-semibold text-white">Operational Efficiency</h3>
          </div>
          <CardContent className="p-6 flex flex-col items-center justify-center space-y-6 h-80">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="#1e293b" strokeWidth="12" fill="none" />
                <circle cx="96" cy="96" r="88" stroke="#10b981" strokeWidth="12" fill="none" strokeDasharray="552" strokeDashoffset={552 - (552 * stats.operationalEfficiency) / 100} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{stats.operationalEfficiency}%</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Efficiency</span>
              </div>
            </div>
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Maintenance Completion</span>
                <span className="text-emerald-400 font-bold">{stats.maintenanceCompletion}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">AI Recommendation Use</span>
                <span className="text-violet-400 font-bold">{stats.aiRecommendationAcceptance}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
