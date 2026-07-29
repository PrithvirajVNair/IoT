import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, machineId, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white shadow-xl w-full max-w-md overflow-hidden border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Confirm Deletion
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 space-y-2 text-sm text-slate-600">
          <p>
            Are you sure you want to delete machine <span className="font-semibold font-mono text-slate-800">{machineId}</span>?
          </p>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={() => {
              onConfirm(machineId);
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 shadow-sm"
          >
            Delete Machine
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
