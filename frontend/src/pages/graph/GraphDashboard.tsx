import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Network, Server, FileText, Settings, ShieldAlert, BrainCircuit, RotateCw, Activity } from 'lucide-react';
import { graphService } from '../../services/graph';
import { Card, CardContent } from '../../components/ui/card';
import { useToast } from '../../components/ui/toast';

export const GraphDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rebuilding, setRebuilding] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await graphService.getStatistics();
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRebuild = async () => {
    setRebuilding(true);
    try {
      await graphService.rebuildGraph();
      await loadData();
      showToast('success', 'Index Rebuilt', 'Knowledge Graph successfully rebuilt.');
    } catch (e) {
      console.error(e);
      showToast('error', 'Rebuild Failed', 'Could not rebuild the graph index.');
    } finally {
      setRebuilding(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-400">Loading Intelligence Engine...</div>;

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Network className="text-blue-400 w-8 h-8" />
            Knowledge Graph
          </h1>
          <p className="text-slate-400 mt-1">Discover contextual relationships between assets, documents, personnel, and AI insights.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleRebuild} disabled={rebuilding} className="gap-2 border-slate-700 hover:border-slate-500">
            <RotateCw className={`w-4 h-4 ${rebuilding ? 'animate-spin' : ''}`} /> {rebuilding ? 'Rebuilding...' : 'Rebuild Index'}
          </Button>
          <Button onClick={() => navigate('/graph/explorer')} className="gap-2 shadow-glow bg-blue-600 hover:bg-blue-500 text-white">
            Open Graph Explorer <Activity className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card p-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Network className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Total Nodes</p>
                  <p className="text-2xl font-bold text-white">{stats.totalNodes || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card p-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Total Relationships</p>
                  <p className="text-2xl font-bold text-white">{stats.totalEdges || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card p-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">AI Context Links</p>
                  <p className="text-2xl font-bold text-white">{stats.types?.insights || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card p-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Incidents Linked</p>
                  <p className="text-2xl font-bold text-white">{stats.types?.incidents || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <div className="p-4 border-b border-slate-700/50">
            <h3 className="font-semibold text-white flex items-center gap-2">Data Distribution</h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-slate-300"><Server className="w-4 h-4 text-slate-500"/> Assets</span>
                <span className="text-slate-400 font-mono">{stats?.types?.assets || 0}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-slate-500 h-1.5 rounded-full" style={{width: '60%'}}></div></div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-slate-300"><FileText className="w-4 h-4 text-blue-400"/> Documents</span>
                <span className="text-slate-400 font-mono">{stats?.types?.documents || 0}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-blue-400 h-1.5 rounded-full" style={{width: '40%'}}></div></div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-slate-300"><Settings className="w-4 h-4 text-emerald-400"/> Engineering</span>
                <span className="text-slate-400 font-mono">1</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-emerald-400 h-1.5 rounded-full" style={{width: '20%'}}></div></div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <Network className="w-16 h-16 text-slate-700 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Visualize Relationships</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-sm">
            Launch the interactive explorer to map the exact relationship between failing assets and historical maintenance documents.
          </p>
          <Button onClick={() => navigate('/graph/explorer')} className="bg-slate-800 hover:bg-slate-700 text-white">
            Explore Graph Network
          </Button>
        </Card>
      </div>
    </div>
  );
};
