import React from "react";
import StatusBadge from "./StatusBadge";
import { Thermometer, Activity, X, Calendar, Clock } from "lucide-react";

const MachineDetailModal = ({ machine, onClose, onAcknowledgeFault }) => {
  if (!machine) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-xl w-full max-w-lg overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {machine.name}
            </h2>
            <p className="text-sm font-mono text-slate-500 mt-1">
              {machine.id}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={machine.status} />
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="text-sm text-slate-500 mb-1 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-slate-500" />
                Temperature
              </div>
              <div className="text-3xl font-light text-slate-800">
                {machine.temperature}
                <span className="text-lg font-medium text-slate-400 ml-1">
                  °C
                </span>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="text-sm text-slate-500 mb-1 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-slate-500" />
                Vibration
              </div>
              <div className="text-3xl font-light text-slate-800">
                {machine.vibration}
                <span className="text-lg font-medium text-slate-400 ml-1">
                  mm/s
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-2">
              System Information
            </h3>
            <div className="bg-slate-50 rounded-lg border border-slate-100 p-4 text-sm space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  Last Telemetry Sync
                </span>
                <span className="font-medium text-slate-800">
                  {new Date(machine.lastUpdated).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Maintenance Schedule
                </span>
                <span className="font-medium text-slate-800">In 14 days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-50"
          >
            Close
          </button>
          {machine.status === "fault" && (
            <button
              onClick={() => {
                onAcknowledgeFault(machine.id);
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 shadow-sm"
            >
              Acknowledge Fault
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineDetailModal;
