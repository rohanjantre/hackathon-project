import React, { useEffect, useState } from 'react';
import { Map, BrainCircuit } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { analyticsService } from '../../services/analytics';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export const PlantComparison: React.FC = () => {
  const [plants, setPlants] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [plantsData, summaryData] = await Promise.all([
        analyticsService.getPlantComparison(),
        analyticsService.getExecutiveSummary()
      ]);
      setPlants(plantsData);
      setSummary(summaryData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-400">Loading Enterprise Comparison...</div>;

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Map className="text-indigo-400 w-8 h-8" />
          Plant Comparison Matrix
        </h1>
        <p className="text-slate-400 mt-1">Cross-facility benchmarking for performance, risk, and compliance.</p>
      </div>

      {summary && (
        <Card className="glass-card bg-gradient-to-br from-indigo-900/20 to-slate-900/80 border-indigo-500/20 shadow-inner">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
              <h4 className="font-bold text-white text-lg">AI Executive Briefing</h4>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg font-light">
              "{summary.summary}"
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="glass-card">
        <div className="p-4 border-b border-slate-700/50">
          <h3 className="font-semibold text-white">Performance Metrics by Plant</h3>
        </div>
        <CardContent className="p-6 h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={plants} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="health" name="Overall Health %" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="compliance" name="Compliance %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="maintenance" name="Maintenance Efficiency %" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="risk" name="Risk Exposure %" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
