import React, { useEffect, useState } from "react";

function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/students`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start py-12 px-4 bg-gradient-to-br from-blue-50 via-cyan-100 to-white">
      <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">All Students</h2>
        {loading ? (
          <div className="text-blue-600 text-lg text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-100">
              <thead>
                <tr className="bg-cyan-50">
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Fees Paid</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-50">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-cyan-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-900">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-700">{student.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.feesPaid ? (
                        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Yes</span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllStudents; 