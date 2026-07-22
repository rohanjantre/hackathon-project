import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { BrainCircuit, TrendingUp, Search } from 'lucide-react';
import { predictiveService } from '../../services/predictive';
import type { Prediction } from '../../services/predictive';
import { Card, CardContent } from '../../components/ui/card';

export const PredictionsList: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPredictions();
  }, []);

  const loadPredictions = async () => {
    try {
      const data = await predictiveService.getPredictions();
      setPredictions(data);
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
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <TrendingUp className="text-red-400 w-8 h-8" />
            Failure Predictions
          </h1>
          <p className="text-slate-400 mt-1">AI-driven proactive maintenance alerts based on historical and real-time data.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl flex items-center shadow-inner overflow-hidden w-64">
            <Search className="w-4 h-4 ml-3 text-slate-400" />
            <input type="text" placeholder="Search assets..." className="bg-transparent border-none text-sm text-white px-3 py-2 w-full focus:outline-none focus:ring-0" />
          </div>
          <Button className="bg-slate-700 hover:bg-slate-600 text-white">Filter</Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Analyzing asset health patterns...</div>
      ) : predictions.length === 0 ? (
        <div className="text-center py-12 text-slate-400">No imminent failures predicted.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {predictions.map((p) => (
            <Card key={p._id} className={`glass-card border-t-4 ${p.riskLevel === 'High' ? 'border-t-red-500' : p.riskLevel === 'Medium' ? 'border-t-amber-500' : 'border-t-blue-500'}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="px-2 py-1 rounded bg-slate-800 text-xs font-mono text-slate-300">
                    {p.assetId}
                  </div>
                  <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded text-xs font-bold text-violet-400 border border-violet-500/20">
                    <BrainCircuit className="w-3 h-3" /> {p.confidence}%
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{p.businessImpact}</p>
                
                <div className="space-y-3 mb-6 bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Risk Level</span>
                    <span className={`font-bold ${p.riskLevel === 'High' ? 'text-red-400' : 'text-amber-400'}`}>{p.riskLevel}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Est. Downtime</span>
                    <span className="text-white font-mono">{p.estimatedDowntimeHours} hrs</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Avoidable Cost</span>
                    <span className="text-emerald-400 font-bold">${p.expectedCostSaving.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Recommended Action</p>
                  <p className="text-sm text-slate-300 bg-slate-800 p-2 rounded">{p.recommendedAction}</p>
                </div>

                <Button className={`w-full ${p.riskLevel === 'High' ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                  Create Work Order
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
