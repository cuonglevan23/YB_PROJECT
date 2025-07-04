function App() {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h1>App is working!</h1>
      <p>If you see this, React is rendering correctly.</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
}

export default App;
