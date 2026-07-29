import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMachineAPI } from "../services/allAPIs";
import {
  fetchMachines,
  acknowledgeFault,
  deleteMachine,
} from "../redux/machinesSlice";
import MachineCard from "../components/MachineCard";
import MachineDetailModal from "../components/MachineDetailModal";
import AddMachineModal from "../components/AddMachineModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { Plus, Search, Filter, AlertTriangle, Factory } from "lucide-react";
import { toast } from "react-toastify";

const POLL_INTERVAL = 60000; // 1 minute

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    machines,
    loading: isLoading,
    error,
  } = useSelector((state) => state.machines);
  const hasError = error !== null;

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [machineToDelete, setMachineToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchMachines());

    const intervalId = setInterval(() => {
      dispatch(fetchMachines());
    }, POLL_INTERVAL);

    // Clear interval on cleanup
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleAddMachine = async (machineDetails, resetAndClose) => {
    const { id, name, status, temperature, vibration } = machineDetails;
    if (!id || !name || !status || !temperature || !vibration) {
      toast.warning("Please fill out all fields.");
      return;
    }
    try {
      const response = await addMachineAPI({
        id,
        name,
        status,
        temperature: Number(temperature),
        vibration: Number(vibration),
      });
      if (response.status === 201 || response.status === 200) {
        toast.success("Machine added successfully!");
        resetAndClose();
        dispatch(fetchMachines());
      } else {
        toast.error("Failed to add machine");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the machine.");
    }
  };

  const handleAcknowledgeFault = (machineId) => {
    dispatch(acknowledgeFault(machineId));
    toast.success(`Fault acknowledged for ${machineId}`);
  };

  const handleDeleteClick = (machineId) => {
    setMachineToDelete(machineId);
  };

  const handleConfirmDelete = (machineId) => {
    dispatch(deleteMachine(machineId));
    toast.success(`Machine ${machineId} deleted successfully`);
  };

  const filteredMachines = (machines || []).filter((machine) => {
    const matchesSearch = machine.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || machine.status === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });
  console.log(filteredMachines);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
              <Factory className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                Plant Overview
              </h1>
              <p className="text-sm text-slate-500">
                Live machine telemetry and status
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <div className="relative">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-3 h-9 bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Machine
              </button>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search machines..."
                className="pl-9 pr-4 py-2 border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                className="pl-9 pr-4 py-2 border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Running">Running</option>
                <option value="Idle">Idle</option>
                <option value="Fault">Fault</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message/Banner */}
        {hasError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Connection Error
                </h3>
                <div className="mt-1 text-sm text-red-700">
                  <p>
                    {error ||
                      "Unable to connect to the telemetry server. Data may be out of date."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Machine Grid */}
        {/* Following is for skeleton loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <div
                key={n}
                className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 animate-pulse h-48"
              >
                <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-100 rounded"></div>
                  <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMachines
              .filter((machine) => machine.is_active == true)
              .map((machine) => (
                <MachineCard
                  key={machine.id}
                  machine={machine}
                  onSelect={setSelectedMachine}
                  onAcknowledgeFault={handleAcknowledgeFault}
                  onDelete={handleDeleteClick}
                />
              ))}
          </div>
        )}

        {!isLoading && filteredMachines.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No machines found matching your criteria.
          </div>
        )}
      </div>

      {/* Machine Details Modal */}
      <MachineDetailModal
        machine={selectedMachine}
        onClose={() => setSelectedMachine(null)}
        onAcknowledgeFault={handleAcknowledgeFault}
      />

      {/* Add Machine Modal */}
      <AddMachineModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddMachine={handleAddMachine}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!machineToDelete}
        machineId={machineToDelete}
        onClose={() => setMachineToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Dashboard;
