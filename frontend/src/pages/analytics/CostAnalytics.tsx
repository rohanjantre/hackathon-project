import React, { useEffect, useState } from 'react';
import { Download, BarChart2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { analyticsService } from '../../services/analytics';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Button } from '../../components/ui/button';

export const CostAnalytics: React.FC = () => {
  const [costs, setCosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await analyticsService.getCostAnalytics();
      setCosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  if (loading) return <div className="p-10 text-center text-slate-400">Loading Cost Analytics...</div>;

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BarChart2 className="text-emerald-400 w-8 h-8" />
            Cost & Expense Analytics
          </h1>
          <p className="text-slate-400 mt-1">Deep dive into operational, maintenance, and risk expenses.</p>
        </div>
        <Button variant="outline" className="border-slate-700 text-slate-300 gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <Card className="glass-card">
        <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
          <h3 className="font-semibold text-white">Expense Trending Analysis (YTD)</h3>
          <div className="flex gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1 text-blue-400"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Maintenance</span>
            <span className="flex items-center gap-1 text-emerald-400"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Compliance</span>
            <span className="flex items-center gap-1 text-amber-400"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Downtime</span>
            <span className="flex items-center gap-1 text-red-400"><div className="w-2 h-2 rounded-full bg-red-500"></div> Risk</span>
          </div>
        </div>
        <CardContent className="p-6 h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={costs} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMaint" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRisk2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip formatter={(value: any) => formatCurrency(Number(value))} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
              <Area type="monotone" dataKey="maintenance" stackId="1" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMaint)" />
              <Area type="monotone" dataKey="compliance" stackId="1" stroke="#10b981" fillOpacity={1} fill="url(#colorComp)" />
              <Area type="monotone" dataKey="downtime" stackId="1" stroke="#f59e0b" fillOpacity={1} fill="url(#colorDown)" />
              <Area type="monotone" dataKey="risk" stackId="1" stroke="#ef4444" fillOpacity={1} fill="url(#colorRisk2)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
