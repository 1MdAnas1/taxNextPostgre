// simulate slow data fetching
async function getDashboardData() {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec delay

  return {
    users: 120,
    revenue: 5400,
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Users: {data.users}</p>
      <p>Revenue: ${data.revenue}</p>
    </div>
  );
}