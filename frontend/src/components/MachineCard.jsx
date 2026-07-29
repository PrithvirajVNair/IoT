import React from 'react';
import StatusBadge from './StatusBadge';
import { Thermometer, Activity, Trash2 } from 'lucide-react';

const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MachineCard = ({ machine, onSelect, onAcknowledgeFault, onDelete }) => {
  const isFault = machine.status === 'fault';

  return (
    <div
      onClick={() => onSelect(machine)}
      className={`
        relative bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border 
        ${isFault ? 'border-red-300 bg-red-50/30' : 'border-slate-200'}
      `}
    >
      {/* Line for Fault Indication */}
      {isFault && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500" />}

      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{machine.name}</h2>
            <span className="text-xs text-slate-500 font-mono">{machine.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={machine.status} />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(machine.id);
              }}
              title="Delete machine"
              className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-slate-500" />
              Temp
            </div>
            <div className="text-xl font-semibold text-slate-700">{machine.temperature}<span className="text-sm font-normal text-slate-400 ml-1">°C</span></div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-slate-500" />
              Vib
            </div>
            <div className="text-xl font-semibold text-slate-700">{machine.vibration}<span className="text-sm font-normal text-slate-400 ml-1">mm/s</span></div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-slate-400">
            Updated: {formatTime(machine.lastUpdated)}
          </div>
          {isFault && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAcknowledgeFault(machine.id);
              }}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-1.5 px-3 rounded-md transition-colors shadow-sm"
            >
              Acknowledge
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineCard;
