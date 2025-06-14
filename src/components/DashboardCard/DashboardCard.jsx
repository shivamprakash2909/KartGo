import "./DashboardCard.css";

const DashboardCard = ({ title, value, Icon }) => {
  return (
    <div className="dashboard-card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "8px",
        }}
      >
        <span>{title}</span>
        {Icon}
      </div>

      <h2
        style={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {value}
      </h2>
    </div>
  );
};

export default DashboardCard;
