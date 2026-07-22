import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { CheckCircle, XCircle, Clock, Search, ShieldCheck } from 'lucide-react';
import { workflowService } from '../../services/workflow';
import { Card, CardContent } from '../../components/ui/card';

export const ApprovalCenter: React.FC = () => {
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApprovals();
  }, []);

  const loadApprovals = async () => {
    try {
      const data = await workflowService.getApprovals();
      setApprovals(data);
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
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="text-indigo-400 w-6 h-6" />
            Approval Center
          </h1>
          <p className="text-slate-400 mt-1">Review, approve, or reject operational requests.</p>
        </div>
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl flex items-center shadow-inner overflow-hidden w-64">
          <Search className="w-4 h-4 ml-3 text-slate-400" />
          <input type="text" placeholder="Search requests..." className="bg-transparent border-none text-sm text-white px-3 py-2 w-full focus:outline-none focus:ring-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-10 text-slate-500">Loading Approvals...</div>
        ) : approvals.length === 0 ? (
          <div className="text-center py-10 text-slate-500">No pending approvals.</div>
        ) : (
          approvals.map(approval => (
            <Card key={approval._id} className="glass-card hover:bg-slate-800/80 transition-colors cursor-pointer border-l-4 border-l-indigo-500">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-white text-lg">{approval.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                      approval.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 
                      approval.status === 'Rejected' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {approval.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> Requested: {new Date(approval.createdAt).toLocaleDateString()}</span>
                    <span>Requester: {approval.requester}</span>
                  </div>
                </div>
                
                {approval.status === 'Pending' && (
                  <div className="flex items-center gap-3">
                    <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 gap-1">
                      <XCircle className="w-4 h-4" /> Reject
                    </Button>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white gap-1 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                      <CheckCircle className="w-4 h-4" /> Approve
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
