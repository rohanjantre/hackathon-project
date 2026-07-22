import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { UploadCloud, File, AlertCircle } from 'lucide-react';
import { documentService } from '../../services/documents';
import { Card, CardContent } from '../../components/ui/card';

export const UploadDocument: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Manual');
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await documentService.getCategories();
        setCategories(cats);
      } catch (e) {
        console.error('Failed to load categories', e);
      }
    };
    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (!title) {
        setTitle(e.target.files[0].name.split('.')[0]);
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setIsUploading(true);
    setError('');

    try {
      await documentService.uploadDocument(file, {
        title,
        category,
        department,
        description
      });
      navigate('/documents');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 flex justify-center items-start pt-10">
      <Card className="glass-card w-full max-w-3xl border-slate-700/60 p-1">
        <CardContent className="p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Upload Industrial Document</h1>
            <p className="text-slate-400 mt-1">Upload manuals, SOPs, or schematics for AI ingestion.</p>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-6">
            {/* Drag & Drop Area Placeholder */}
            <div className="border-2 border-dashed border-slate-700 hover:border-blue-500/50 transition-colors rounded-xl p-10 text-center bg-slate-800/30 relative">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.jpg,.jpeg,.png"
              />
              {!file ? (
                <div className="space-y-3 pointer-events-none">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto text-blue-400">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <p className="font-medium text-slate-300">Drag & drop your document here</p>
                  <p className="text-xs text-slate-500">Supports PDF, DOCX, XLSX, TXT, CSV up to 100MB</p>
                </div>
              ) : (
                <div className="space-y-3 pointer-events-none">
                  <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-400">
                    <File className="w-7 h-7" />
                  </div>
                  <p className="font-medium text-green-400">{file.name}</p>
                  <p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Document Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Turbine Maintenance SOP"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Department / Asset Tag (Optional)</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
                placeholder="e.g. Electrical / Generator-01"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">AI Context / Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 min-h-[100px] focus:outline-none focus:border-blue-500"
                placeholder="Briefly describe what this document contains to help the AI categorize it."
              />
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800/80">
              <Button type="button" variant="ghost" onClick={() => navigate('/documents')}>
                Cancel
              </Button>
              <Button type="submit" disabled={!file || isUploading} className="min-w-[120px]">
                {isUploading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  'Upload to Engine'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
