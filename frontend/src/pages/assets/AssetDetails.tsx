import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assetService } from '../../services/assets';
import type { AssetMetadata } from '../../services/assets';
import { Card, CardContent } from '../../components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Server, FileText, ShieldAlert } from 'lucide-react';

export const AssetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<AssetMetadata | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      loadAsset(id);
    }
  }, [id]);

  const loadAsset = async (assetId: string) => {
    try {
      const data = await assetService.getAssetById(assetId);
      setAsset(data);
      const analyticsData = await assetService.getAssetAnalytics(assetId);
      setAnalytics(analyticsData);
    } catch (e) {
      console.error(e);
    }
  };

  if (!asset) return <div className="p-10 text-center text-slate-400">Loading asset...</div>;

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-800/40 border border-slate-700/60 shadow-glass">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
            <Server className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{asset.assetName}</h1>
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                asset.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>{asset.status}</span>
            </div>
            <p className="text-slate-400 text-sm mt-1">ID: <span className="font-mono text-slate-300">{asset.assetCode}</span> • {asset.category}</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase font-semibold">Health Score</p>
            <p className={`text-2xl font-bold ${asset.healthScore > 80 ? 'text-green-400' : asset.healthScore > 50 ? 'text-amber-400' : 'text-red-400'}`}>
              {asset.healthScore}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase font-semibold">Risk Level</p>
            <p className={`text-2xl font-bold ${asset.riskLevel === 'Low' ? 'text-green-400' : asset.riskLevel === 'Medium' ? 'text-amber-400' : 'text-red-400'}`}>
              {asset.riskLevel}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-700/60 overflow-x-auto pb-px">
        {['overview', 'analytics', 'documents', 'maintenance', 'incidents'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-white border-b border-slate-700/60 pb-2">Asset Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-slate-500">Department</p><p className="text-slate-200">{asset.department || '-'}</p></div>
                  <div><p className="text-slate-500">Location/Plant</p><p className="text-slate-200">{asset.plant || '-'}, {asset.location || '-'}</p></div>
                  <div><p className="text-slate-500">Operating Hours</p><p className="text-slate-200">{asset.operatingHours || 0} hrs</p></div>
                  <div><p className="text-slate-500">Criticality</p><p className="text-slate-200">{asset.criticality || 'Medium'}</p></div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-white border-b border-slate-700/60 pb-2">AI Insights</h3>
                <div className="p-4 rounded-lg bg-slate-800/40 border-l-4 border-l-amber-500">
                  <h4 className="text-sm font-medium text-amber-400 flex items-center gap-2"><ShieldAlert className="w-4 h-4"/> Vibration anomaly detected</h4>
                  <p className="text-xs text-slate-400 mt-1">AI confidence 94%. Recommended inspection of bearing assembly within 48 hours.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && analytics && (
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-6">Health Score Trend (Last 6 Months)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.healthTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[0, 100]} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                      itemStyle={{ color: '#60a5fa' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'documents' && (
          <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700/50 border-dashed">
            <FileText className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400">Linked documents from Knowledge Center will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
