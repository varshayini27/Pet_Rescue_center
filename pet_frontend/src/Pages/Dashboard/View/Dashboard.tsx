import React from 'react'

const Dashboard = () => {
  return (
    <div style={{ background: "#f4f8f6", minHeight: "100vh", padding: "32px" }}>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
        {/* Stat Cards */}
        <div style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(34,105,24,0.08)",
          padding: 24,
          minWidth: 220,
          flex: 1
        }}>
          <div style={{ fontSize: 18, color: "#888" }}>Total Pets</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#226918" }}>128</div>
        </div>
        <div style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(34,105,24,0.08)",
          padding: 24,
          minWidth: 220,
          flex: 1
        }}>
          <div style={{ fontSize: 18, color: "#888" }}>Adoptions This Month</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#1e7735" }}>23</div>
        </div>
        <div style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(34,105,24,0.08)",
          padding: 24,
          minWidth: 220,
          flex: 1
        }}>
          <div style={{ fontSize: 18, color: "#888" }}>Pending Requests</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#e67e22" }}>7</div>
        </div>
        <div style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(34,105,24,0.08)",
          padding: 24,
          minWidth: 220,
          flex: 1
        }}>
          <div style={{ fontSize: 18, color: "#888" }}>Donations (₹)</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#2d98da" }}>₹12,500</div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {/* Chart Section */}
        <div style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(34,105,24,0.08)",
          padding: 24,
          flex: 2,
          minWidth: 350
        }}>
          <h2 style={{ color: "#226918", fontSize: 20, marginBottom: 16 }}>Adoptions Over Time</h2>
          {/* Dummy Bar Chart */}
          <svg width="100%" height="180" viewBox="0 0 400 180">
            <rect x="30" y="80" width="30" height="70" fill="#1e7735" rx="6"/>
            <rect x="80" y="60" width="30" height="90" fill="#2d98da" rx="6"/>
            <rect x="130" y="40" width="30" height="110" fill="#e67e22" rx="6"/>
            <rect x="180" y="100" width="30" height="50" fill="#226918" rx="6"/>
            <rect x="230" y="60" width="30" height="90" fill="#1e7735" rx="6"/>
            <rect x="280" y="30" width="30" height="120" fill="#2d98da" rx="6"/>
            <rect x="330" y="90" width="30" height="60" fill="#e67e22" rx="6"/>
            {/* X-axis labels */}
            <text x="35" y="165" fontSize="12" fill="#888">Jan</text>
            <text x="85" y="165" fontSize="12" fill="#888">Feb</text>
            <text x="135" y="165" fontSize="12" fill="#888">Mar</text>
            <text x="185" y="165" fontSize="12" fill="#888">Apr</text>
            <text x="235" y="165" fontSize="12" fill="#888">May</text>
            <text x="285" y="165" fontSize="12" fill="#888">Jun</text>
            <text x="335" y="165" fontSize="12" fill="#888">Jul</text>
          </svg>
        </div>

        {/* Recent Activity */}
        <div style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(34,105,24,0.08)",
          padding: 24,
          flex: 1,
          minWidth: 300
        }}>
          <h2 style={{ color: "#226918", fontSize: 20, marginBottom: 16 }}>Recent Activity</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 18 }}>
              <span style={{ color: "#1e7735", fontWeight: 600 }}>Adoption Request</span> for <b>Max</b> by <b>Priya S.</b>
              <div style={{ fontSize: 12, color: "#888" }}>2 hours ago</div>
            </li>
            <li style={{ marginBottom: 18 }}>
              <span style={{ color: "#2d98da", fontWeight: 600 }}>Donation</span> of <b>₹1,000</b> by <b>Rahul K.</b>
              <div style={{ fontSize: 12, color: "#888" }}>Today</div>
            </li>
            <li style={{ marginBottom: 18 }}>
              <span style={{ color: "#e67e22", fontWeight: 600 }}>New Pet Added</span>: <b>Bella</b> (Dog)
              <div style={{ fontSize: 12, color: "#888" }}>Yesterday</div>
            </li>
            <li>
              <span style={{ color: "#226918", fontWeight: 600 }}>Adoption Approved</span> for <b>Luna</b>
              <div style={{ fontSize: 12, color: "#888" }}>2 days ago</div>
            </li>
          </ul>
        </div>
      </div>

      {/* Table of Pets */}
      <div style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 12px rgba(34,105,24,0.08)",
        padding: 24,
        marginTop: 40
      }}>
        <h2 style={{ color: "#226918", fontSize: 20, marginBottom: 16 }}>Pets in Shelter</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f4f8f6" }}>
                <th style={{ padding: "12px 8px", textAlign: "left", color: "#226918" }}>Name</th>
                <th style={{ padding: "12px 8px", textAlign: "left", color: "#226918" }}>Type</th>
                <th style={{ padding: "12px 8px", textAlign: "left", color: "#226918" }}>Age</th>
                <th style={{ padding: "12px 8px", textAlign: "left", color: "#226918" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px 8px" }}>Max</td>
                <td style={{ padding: "10px 8px" }}>Dog</td>
                <td style={{ padding: "10px 8px" }}>2 years</td>
                <td style={{ padding: "10px 8px", color: "#1e7735", fontWeight: 600 }}>Available</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 8px" }}>Bella</td>
                <td style={{ padding: "10px 8px" }}>Dog</td>
                <td style={{ padding: "10px 8px" }}>1 year</td>
                <td style={{ padding: "10px 8px", color: "#e67e22", fontWeight: 600 }}>Pending</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 8px" }}>Luna</td>
                <td style={{ padding: "10px 8px" }}>Cat</td>
                <td style={{ padding: "10px 8px" }}>3 years</td>
                <td style={{ padding: "10px 8px", color: "#2d98da", fontWeight: 600 }}>Adopted</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 8px" }}>Charlie</td>
                <td style={{ padding: "10px 8px" }}>Dog</td>
                <td style={{ padding: "10px 8px" }}>4 months</td>
                <td style={{ padding: "10px 8px", color: "#1e7735", fontWeight: 600 }}>Available</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 8px" }}>Simba</td>
                <td style={{ padding: "10px 8px" }}>Cat</td>
                <td style={{ padding: "10px 8px" }}>5 years</td>
                <td style={{ padding: "10px 8px", color: "#e67e22", fontWeight: 600 }}>Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default Dashboard