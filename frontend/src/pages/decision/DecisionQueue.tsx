import React, { useEffect, useState } from 'react';
import { ShieldCheck, Cpu, DollarSign, ArrowRight, Zap, Target, FileText } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { decisionService } from '../../services/decision';
import { Button } from '../../components/ui/button';

export const DecisionQueue: React.FC = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await decisionService.getActionQueue();
      setRecommendations(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setProcessing(id);
    try {
      if (action === 'approve') await decisionService.approveDecision(id);
      else await decisionService.rejectDecision(id);
      
      setRecommendations(prev => prev.filter(r => r.id !== id));
    } catch (e) {
      console.error(e);
    } finally {
      setProcessing(null);
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-400">Loading AI Recommendations...</div>;

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8 max-w-6xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Zap className="text-amber-400 w-8 h-8" />
          AI Decision Queue
        </h1>
        <p className="text-slate-400 mt-1">Review, authorize, and execute high-impact AI recommendations.</p>
      </div>

      <div className="space-y-6">
        {recommendations.length === 0 ? (
          <div className="text-center p-12 bg-slate-800/40 border border-slate-700/50 rounded-xl">
            <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white">All Clear</h3>
            <p className="text-slate-400 mt-2">No pending decisions in the queue.</p>
          </div>
        ) : (
          recommendations.map(rec => (
            <Card key={rec.id} className="glass-card border-l-4 overflow-hidden relative" style={{ borderLeftColor: rec.priority === 'Critical' ? '#ef4444' : '#f59e0b' }}>
              <div className="absolute top-0 right-0 p-4 flex gap-4 text-xs font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1 text-emerald-400"><Cpu className="w-3 h-3" /> AI Conf: {rec.confidence}%</span>
                <span className="flex items-center gap-1 text-red-400"><Target className="w-3 h-3" /> Risk: {rec.riskScore}</span>
              </div>
              <CardContent className="p-6">
                <div className="mb-4 pr-48">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${rec.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {rec.priority} Priority
                    </span>
                    <span className="text-slate-500 text-xs font-mono">{rec.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-tight">{rec.title}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Impacted Assets</p>
                    <p className="text-sm font-semibold text-slate-200">{rec.affectedAssets.join(', ')}</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Business Impact</p>
                    <p className="text-sm font-semibold text-slate-200">{rec.businessImpact}</p>
                  </div>
                  <div className="bg-emerald-900/20 p-4 rounded-lg border border-emerald-900/50">
                    <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold mb-1">Est. Cost Saving</p>
                    <p className="text-xl font-bold text-emerald-400 flex items-center">
                      <DollarSign className="w-5 h-5 mr-1" />
                      {new Intl.NumberFormat('en-US').format(rec.estimatedCostSaving)}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-slate-400 font-semibold mb-2 flex items-center gap-2"><FileText className="w-4 h-4" /> Supporting Evidence</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.evidence.map((ev: string, idx: number) => (
                      <span key={idx} className="text-xs bg-slate-800 text-blue-400 px-3 py-1.5 rounded-full border border-blue-900/50 flex items-center">
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                  <div className="text-sm">
                    <span className="text-slate-500">Suggested Action:</span> <span className="font-bold text-white">{rec.suggestedAction}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="border-slate-600 text-slate-300 hover:bg-slate-800"
                      onClick={() => handleAction(rec.id, 'reject')}
                      disabled={processing === rec.id}
                    >
                      Reject
                    </Button>
                    <Button 
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wider"
                      onClick={() => handleAction(rec.id, 'approve')}
                      disabled={processing === rec.id}
                    >
                      {processing === rec.id ? 'Processing...' : 'Authorize Action'} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
