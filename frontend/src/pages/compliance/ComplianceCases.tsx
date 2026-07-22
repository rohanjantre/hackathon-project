import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { complianceService } from '../../services/compliance';
import type { ComplianceCase } from '../../services/compliance';

export const ComplianceCases: React.FC = () => {
  const [cases, setCases] = useState<ComplianceCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      const data = await complianceService.getCases();
      setCases(data);
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
          <h1 className="text-2xl font-bold text-white">Compliance Cases</h1>
          <p className="text-slate-400 mt-1">Track and resolve regulatory and operational violations.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-500">Log New Case</Button>
      </div>

      <div className="bg-slate-800/50 rounded-xl border border-slate-700/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800 text-slate-400 font-medium border-b border-slate-700/60">
              <tr>
                <th className="px-6 py-4">Case ID</th>
                <th className="px-6 py-4">Asset / Equipment</th>
                <th className="px-6 py-4">Regulation</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Risk Score</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {loading ? (
                <tr><td colSpan={7} className="text-center py-8">Loading...</td></tr>
              ) : cases.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8">No open compliance cases. Great job!</td></tr>
              ) : (
                cases.map(c => (
                  <tr key={c._id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-emerald-400">{c.caseId}</td>
                    <td className="px-6 py-4 font-medium text-white">{c.assetId}</td>
                    <td className="px-6 py-4">{c.regulation}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        c.severity === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {c.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">{c.status}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-slate-700 overflow-hidden">
                          <div 
                            className={`h-full ${c.riskScore > 80 ? 'bg-red-500' : c.riskScore > 50 ? 'bg-amber-500' : 'bg-green-500'}`} 
                            style={{ width: `${c.riskScore}%` }} 
                          />
                        </div>
                        <span className="text-xs">{c.riskScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm">Review</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
