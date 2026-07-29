import React from 'react';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    running: 'bg-green-100 text-green-800 border-green-200',
    idle: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    fault: 'bg-red-100 text-red-800 border-red-200 font-bold',
  };

  return (
    <span className={`px-2.5 py-0.5 text-xs uppercase tracking-wide border ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
