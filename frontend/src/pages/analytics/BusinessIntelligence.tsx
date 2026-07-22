import React, { useEffect, useState } from 'react';
import { PieChart, DollarSign, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { analyticsService } from '../../services/analytics';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const BusinessIntelligence: React.FC = () => {
  const [kpis, setKpis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKPIs();
  }, []);

  const loadKPIs = async () => {
    try {
      const data = await analyticsService.getKPIs();
      setKpis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  if (loading) return <div className="p-10 text-center text-slate-400">Loading Business Intelligence...</div>;

  const costBreakdownData = [
    { name: 'Maintenance', value: kpis.maintenanceCost },
    { name: 'Compliance', value: kpis.complianceCost },
    { name: 'Risk', value: kpis.riskCost },
    { name: 'Downtime', value: kpis.downtimeCost },
  ];

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <PieChart className="text-emerald-500 w-8 h-8" />
          Business Intelligence & Financials
        </h1>
        <p className="text-slate-400 mt-1">Financial impact, cost analysis, and revenue implications of plant operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card bg-gradient-to-br from-emerald-900/40 to-slate-900 border-emerald-500/30">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{formatCurrency(kpis.revenueImpact)}</p>
            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Revenue Impact</p>
          </CardContent>
        </Card>

        <Card className="glass-card bg-gradient-to-br from-blue-900/40 to-slate-900 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{formatCurrency(kpis.estimatedCostSavings)}</p>
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Estimated AI Savings</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Operational Cost</p>
            <p className="text-3xl font-bold text-white">{formatCurrency(kpis.operationalCost)}</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-red-500/30">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Downtime Cost</p>
            <p className="text-3xl font-bold text-red-400">{formatCurrency(kpis.downtimeCost)}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <div className="p-4 border-b border-slate-700/50">
          <h3 className="font-semibold text-white">Cost Category Breakdown (YTD)</h3>
        </div>
        <CardContent className="p-6 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="#94a3b8" tickFormatter={(value) => `$${value/1000}k`} />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" width={100} />
              <Tooltip formatter={(value: any) => formatCurrency(Number(value))} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
