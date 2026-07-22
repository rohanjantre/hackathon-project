import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Search, Server, Filter, ShieldAlert } from 'lucide-react';
import { assetService } from '../../services/assets';
import type { AssetMetadata } from '../../services/assets';

export const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<AssetMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    setLoading(true);
    try {
      const data = await assetService.getAssets();
      setAssets(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = search ? await assetService.searchAssets(search) : await assetService.getAssets();
      setAssets(data);
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
          <h1 className="text-2xl font-bold text-white">Asset Inventory</h1>
          <p className="text-slate-400 mt-1">Manage and view all registered enterprise assets.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500">Register New Asset</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by asset code, name, department..."
            className="w-full bg-slate-800/80 border border-slate-700 text-slate-200 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
        </form>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      <div className="bg-slate-800/50 rounded-xl border border-slate-700/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800 text-slate-400 font-medium border-b border-slate-700/60">
              <tr>
                <th className="px-6 py-4">Asset Code</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Health</th>
                <th className="px-6 py-4">Risk</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {loading ? (
                <tr><td colSpan={7} className="text-center py-8">Loading...</td></tr>
              ) : assets.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8">No assets found.</td></tr>
              ) : (
                assets.map(asset => (
                  <tr key={asset._id} className="hover:bg-slate-700/30 transition-colors group">
                    <td className="px-6 py-4 font-mono text-blue-400">{asset.assetCode}</td>
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                      <Server className="w-4 h-4 text-slate-500" /> {asset.assetName}
                    </td>
                    <td className="px-6 py-4">{asset.department || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        asset.status === 'Active' ? 'bg-green-500/20 text-green-400' : 
                        asset.status === 'Maintenance' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-slate-700 overflow-hidden">
                          <div 
                            className={`h-full ${asset.healthScore > 80 ? 'bg-green-500' : asset.healthScore > 50 ? 'bg-amber-500' : 'bg-red-500'}`} 
                            style={{ width: `${asset.healthScore}%` }} 
                          />
                        </div>
                        <span className="text-xs">{asset.healthScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1 ${asset.riskLevel === 'High' ? 'text-red-400' : asset.riskLevel === 'Medium' ? 'text-amber-400' : 'text-green-400'}`}>
                        {asset.riskLevel === 'High' && <ShieldAlert className="w-3 h-3" />}
                        {asset.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/assets/${asset._id}`)}>
                        Details
                      </Button>
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
