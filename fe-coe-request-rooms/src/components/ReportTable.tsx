const ReportTable = () => {
  // Sample data for the table
  const reports = [
    { 
      id: 1, 
      dateTime: '2025-02-25 09:30', 
      toolName: 'Thermometer', 
      temperature: '25°C', 
      quantity: '2', 
      roomStatus: 'Available' 
    },
    { 
      id: 2, 
      dateTime: '2025-02-25 14:45', 
      toolName: 'Sensor A', 
      temperature: '23°C', 
      quantity: '3', 
      roomStatus: 'Occupied' 
    },
  ];

  return (
    <div className="bg-white shadow-sm rounded-2xl p-8 h-full w-full ">
      <h2 className="text-lg font-medium mb-4">Report table</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="pb-3 text-base font-normal">Date/Time</th>
              <th className="pb-3 text-base font-normal">Tool name</th>
              <th className="pb-3 text-base font-normal">Temperature</th>
              <th className="pb-3 text-base font-normal">Quantity</th>
              <th className="pb-3 text-base font-normal">Room status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id} className="border-t border-gray-200">
                <td className="py-3 text-sm ">{report.dateTime}</td>
                <td className="py-3 text-sm ">{report.toolName}</td>
                <td className="py-3 text-sm ">{report.temperature}</td>
                <td className="py-3 text-sm ">{report.quantity}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    report.roomStatus === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {report.roomStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end mt-4">
        <button className="text-base text-gray-500">See more</button>
      </div>
    </div>
  );
};

export default ReportTable;