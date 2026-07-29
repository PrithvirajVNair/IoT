import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';

const AddMachineModal = ({ isOpen, onClose, onAddMachine }) => {
  const [machineDetails, setMachineDetails] = useState({
    id: '', name: '', status: 'running', temperature: '', vibration: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMachine(machineDetails, () => {
      setMachineDetails({ id: '', name: '', status: 'running', temperature: '', vibration: '' });
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white shadow-xl w-full max-w-md overflow-hidden border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-blue-600" />
            Add New Machine
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Machine ID</label>
            <input type="text" value={machineDetails.id} onChange={(e) => setMachineDetails({...machineDetails, id: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. M-105" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input type="text" value={machineDetails.name} onChange={(e) => setMachineDetails({...machineDetails, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. CNC Lathe 2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select value={machineDetails.status} onChange={(e) => setMachineDetails({...machineDetails, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="running">Running</option>
              <option value="idle">Idle</option>
              <option value="fault">Fault</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Temp (°C)</label>
              <input type="number" value={machineDetails.temperature} onChange={(e) => setMachineDetails({...machineDetails, temperature: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="68" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vibration (mm/s)</label>
              <input type="number" step="0.1" value={machineDetails.vibration} onChange={(e) => setMachineDetails({...machineDetails, vibration: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="2.1" required />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-6">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
            >
              Add Machine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMachineModal;
