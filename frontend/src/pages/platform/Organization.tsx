import React, { useEffect, useState } from 'react';
import { Building2, MapPin } from 'lucide-react';
import { platformService } from '../../services/platform';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export const Organization: React.FC = () => {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [orgData, plantData] = await Promise.all([
        platformService.getOrganizations(),
        platformService.getPlants()
      ]);
      setOrgs(orgData);
      setPlants(plantData);
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
            <Building2 className="text-indigo-400 w-6 h-6" />
            Organization & Plants
          </h1>
          <p className="text-slate-400 mt-1">Manage global enterprise structure and facilities.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">Create Plant</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card col-span-1">
          <div className="p-4 border-b border-slate-700/50">
            <h3 className="font-bold text-white">Company Profile</h3>
          </div>
          <CardContent className="p-6 space-y-4">
            {orgs.length > 0 ? orgs.map(org => (
              <div key={org._id} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Organization Name</label>
                  <p className="text-lg font-bold text-white">{org.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Industry</label>
                  <p className="text-white">{org.industry || 'Industrial Manufacturing'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Headquarters</label>
                  <p className="text-slate-300">{org.address || 'Global HQ'}</p>
                </div>
              </div>
            )) : (
              <div className="text-slate-500">No organization profile found.</div>
            )}
            <Button variant="outline" className="border-slate-700 text-slate-300 w-full">Edit Profile</Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="font-bold text-white">Manufacturing Plants</h3>
          {loading ? (
            <div className="text-slate-500">Loading plants...</div>
          ) : plants.length === 0 ? (
            <div className="text-slate-500 bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">No plants registered.</div>
          ) : (
            plants.map(plant => (
              <Card key={plant._id} className="glass-card bg-slate-800/40 border-l-4 border-l-blue-500">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-lg">{plant.name}</h4>
                    <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {plant.location || 'Location not specified'}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded uppercase tracking-wider">
                    {plant.status}
                  </span>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
