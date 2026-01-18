import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export default function HBLDashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const CSV_URL = 'https://raw.githubusercontent.com/agvanguard/HBL-Dashboard/refs/heads/main/public/data.csv';

  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    
    const parsedData = lines.slice(1).map((line, index) => {
      const values = line.split(',');
      return {
        id: index,
        subgroup: values[0]?.trim() || '',
        team: values[1]?.trim() || '',
        hbl: parseInt(values[2]) || 0,
        unassigned: parseInt(values[3]) || 0
      };
    });

    return parsedData;
  };

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(CSV_URL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data. Please check the CSV file URL.');
      }
      
      const text = await response.text();
      const parsedData = parseCSV(text);
      
      setData(parsedData);
      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Healthy Backlog Limits Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Monitor team capacity and unassigned tickets</p>
            </div>
            
            <button
              onClick={loadData}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
          
          {lastUpdated && (
            <div className="text-sm text-gray-600 mt-4">
              Last updated: <span className="font-semibold">{lastUpdated.toLocaleString()}</span>
            </div>
          )}
          
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Note:</span> The unassigned ticket limit is 25% of the HBL (Healthy Backlog Limit).
            </p>
          </div>
          
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{error}</p>
              <p className="text-xs text-red-600 mt-2">
                Make sure to update the CSV_URL in src/App.jsx with your GitHub repository URL.
              </p>
            </div>
          )}
        </div>

        {/* Data Table */}
        {isLoading && data.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 flex flex-col items-center justify-center">
            <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
            <span className="text-lg text-gray-600">Loading data...</span>
          </div>
        ) : data.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
              <h2 className="text-xl font-semibold">Healthy Backlog Limits</h2>
              <p className="text-indigo-100 text-sm mt-1">{data.length} teams</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subgroup
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      HBL
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unassigned Tickets
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((row, index) => (
                    <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-sm text-gray-900">{row.subgroup}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.team}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right font-semibold">
                        {row.hbl.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">
                        {row.unassigned.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : !error ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Available</h3>
            <p className="text-gray-500">Click "Refresh Data" to load the latest data</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
