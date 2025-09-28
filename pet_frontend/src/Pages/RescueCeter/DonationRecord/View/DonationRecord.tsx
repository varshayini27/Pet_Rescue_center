import React, { useEffect, useState } from "react";
// If you use MUI, you can import Card, Typography, etc. as needed
// For charting, we'll use 'recharts' (assume it's installed)
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { fetchAllDonation } from "../../../../Services/fetch";
import { useDispatch, useSelector } from "react-redux";
import type { IDonation } from "../../../../Components/types/donation";
import type { ReduxState } from "../../../../Components/types/redux";





const aggregateByDate = (records: any[]) => {
  // Aggregate total amount per date
  const map: { [date: string]: number } = {};
  records.forEach((rec) => {
    if (!map[rec.date]) map[rec.date] = 0;
    map[rec.date] += rec.amount;
  });
  return Object.entries(map).map(([date, total]) => ({
    date,
    total,
  }));
};

const aggregateByMethod = (records: any[]) => {
  // Aggregate total amount per method
  const map: { [method: string]: number } = {};
  records.forEach((rec) => {
    if (!map[rec.method]) map[rec.method] = 0;
    map[rec.method] += rec.amount;
  });
  return Object.entries(map).map(([method, total]) => ({
    method,
    total,
  }));
};

const DonationRecord: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredDonation, setFilteredDonations] = useState<IDonation[]>([]);
  const rescueCenterId = useSelector((state: ReduxState) => state?.auth?.rescueCenterId);

console.log({rescueCenterId})
console.log({records})

const dispatch=useDispatch();
 

  useEffect(() => {
    const getDonations = async () => {
      const allDonations = await fetchAllDonation(dispatch);
      console.log({allDonations})
      if (allDonations) {
        const filtered = allDonations.filter(
          (donation: IDonation) => donation.rescue_center_id === rescueCenterId
        );
        setFilteredDonations(filtered);
        console.log("Filtered Donations:", filtered);
      }
    };
  
    getDonations();
  }, [dispatch]);
  const totalAmount = filteredDonation.reduce((sum, rec) => sum + rec.amount, 0);
  const totalDonations = filteredDonation.length;
  const uniqueDonors = new Set(filteredDonation.map((rec) => rec.user_id)).size;

  const dataByDate = aggregateByDate(filteredDonation);
  const dataByMethod = aggregateByMethod(filteredDonation);


  return (
    <div style={{ padding: "32px" }}>
      <h2>Donation Records</h2>
      {/* {loading ? (
        <div>Loading...</div>
      ) : ( */}
        <>
          {/* Rich Data Summary */}
          {/* Summary Cards */}
          <div style={{
            display: "flex",
            gap: "32px",
            marginBottom: "32px",
            flexWrap: "wrap"
          }}>
            <div style={{
              flex: "1 1 200px",
              background: "#f5f5f5",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              minWidth: "200px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2.2rem", fontWeight: 700, color: "#4caf50" }}>{totalDonations}</div>
              <div style={{ fontSize: "1.1rem", color: "#555" }}>Total Donations</div>
            </div>
            <div style={{
              flex: "1 1 200px",
              background: "#f5f5f5",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              minWidth: "200px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2.2rem", fontWeight: 700, color: "#2196f3" }}>${totalAmount}</div>
              <div style={{ fontSize: "1.1rem", color: "#555" }}>Total Amount</div>
            </div>
            <div style={{
              flex: "1 1 200px",
              background: "#f5f5f5",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              minWidth: "200px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2.2rem", fontWeight: 700, color: "#ff9800" }}>{uniqueDonors}</div>
              <div style={{ fontSize: "1.1rem", color: "#555" }}>Unique Donors</div>
            </div>
          </div>
          {/* End Summary Cards */}

          {/* Quick Stats Grid */}
          <div style={{
            display: "flex",
            gap: "24px",
            marginBottom: "32px",
            flexWrap: "wrap"
          }}>
            <div style={{
              flex: "1 1 250px",
              background: "#e3f2fd",
              borderRadius: "8px",
              padding: "16px",
              minWidth: "180px"
            }}>
              <div style={{ fontWeight: 600, color: "#1976d2" }}>Top Donor</div>
              <div style={{ fontSize: "1.1rem", marginTop: 4 }}>
                {filteredDonation.length > 0
                  ? filteredDonation.reduce((a, b) => (a.amount > b.amount ? a : b)).name
                  : "-"}
              </div>
            </div>
            <div style={{
              flex: "1 1 250px",
              background: "#fff3e0",
              borderRadius: "8px",
              padding: "16px",
              minWidth: "180px"
            }}>
              <div style={{ fontWeight: 600, color: "#f57c00" }}>Largest Donation</div>
              <div style={{ fontSize: "1.1rem", marginTop: 4 }}>
                {filteredDonation.length > 0
                  ? `$${filteredDonation.reduce((a, b) => (a.amount > b.amount ? a : b)).amount}`
                  : "-"}
              </div>
            </div>
            <div style={{
              flex: "1 1 250px",
              background: "#e8f5e9",
              borderRadius: "8px",
              padding: "16px",
              minWidth: "180px"
            }}>
              <div style={{ fontWeight: 600, color: "#388e3c" }}>Most Used Method</div>
              <div style={{ fontSize: "1.1rem", marginTop: 4 }}>
                {(() => {
                  if (records.length === 0) return "-";
                  const methodCount: { [k: string]: number } = {};
                  records.forEach(r => { methodCount[r.method] = (methodCount[r.method] || 0) + 1; });
                  return Object.entries(methodCount).sort((a, b) => b[1] - a[1])[0][0];
                })()}
              </div>
            </div>
          </div>

          {/* Bar Chart: Donations by Date */}
          <div style={{ marginBottom: "48px" }}>
            <h3>Donations Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#4caf50" name="Total Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart: Donations by Method
          <div style={{ marginBottom: "48px" }}>
            <h3>Donations by Payment Method</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataByMethod}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#2196f3" name="Total Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div> */}

          {/* Table of All Records */}
          <div>
            <h3>All Donation Records</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "16px",
                background: "#fff",
              }}
            >
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Donor Name
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Amount
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Date
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDonation.map((rec) => (
                  <tr key={rec.user_id}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {rec.name}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      ${rec.amount}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {rec.date}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {rec.message}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      {/* )} */}
    </div>
  );
};

export default DonationRecord;
