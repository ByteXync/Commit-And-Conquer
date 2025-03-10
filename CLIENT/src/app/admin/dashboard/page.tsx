import Head from 'next/head';

function Dashboard() {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        <div className="card">
          <h2>Card 1</h2>
          <p>This is some text in card 1.</p>
        </div>
        <div className="card">
          <h2>Card 2</h2>
          <p>This is some text in card 2.</p>
        </div>
        <div className="card">
          <h2>Card 3</h2>
          <p>This is some text in card 3.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
