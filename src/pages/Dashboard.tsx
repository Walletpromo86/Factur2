"use client"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="gradient-text">Dashboard</h1>
        <button className="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Nova Fatura
        </button>
      </div>

      <div className="stats-grid">
        <div className="futuristic-card">
          <h3 className="stat-title">Total de Faturas</h3>
          <p className="stat-value">127</p>
          <p className="stat-change">+5 no último mês</p>
        </div>

        <div className="futuristic-card">
          <h3 className="stat-title">Pagamentos Pendentes</h3>
          <p className="stat-value">€12,450</p>
          <p className="stat-change">8 faturas por pagar</p>
        </div>

        <div className="futuristic-card">
          <h3 className="stat-title">Fornecedores</h3>
          <p className="stat-value">24</p>
          <p className="stat-change">+2 no último mês</p>
        </div>

        <div className="futuristic-card">
          <h3 className="stat-title">Transportadoras</h3>
          <p className="stat-value">7</p>
          <p className="stat-change">Sem alterações</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="futuristic-card">
          <h2 className="card-title">Faturas Recentes</h2>
          <div className="recent-invoices">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="invoice-item">
                <div className="invoice-info">
                  <div className="invoice-supplier">
                    <div className="supplier-avatar">{["ABC", "XYZ", "MP", "TR", "LG"][i - 1]}</div>
                    <div>
                      <p className="supplier-name">
                        {
                          [
                            "Materiais ABC",
                            "Fornecedor XYZ",
                            "Materiais Premium",
                            "Transportes Rápidos",
                            "Logística Global",
                          ][i - 1]
                        }
                      </p>
                      <p className="invoice-date">
                        {["15/05/2023", "20/05/2023", "22/05/2023", "25/05/2023", "28/05/2023"][i - 1]}
                      </p>
                    </div>
                  </div>
                  <div className="invoice-amount">
                    <span className={`badge ${i % 2 === 0 ? "badge-purple" : "badge-green"}`}>
                      {i % 2 === 0 ? "Pendente" : "Pago"}
                    </span>
                    <p className="amount">€{[1250.75, 450.0, 2780.5, 890.25, 1675.0][i - 1].toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .page-header h1 {
          font-size: 2rem;
          font-weight: bold;
        }
        
        .btn svg {
          margin-right: 0.5rem;
        }
        
        .stat-title {
          font-size: 0.875rem;
          color: var(--neon-purple);
          margin-bottom: 0.5rem;
        }
        
        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }
        
        .stat-change {
          font-size: 0.75rem;
          color: var(--muted-foreground);
        }
        
        .dashboard-content {
          margin-top: 2rem;
        }
        
        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--neon-purple);
        }
        
        .recent-invoices {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .invoice-item {
          padding: 0.75rem;
          border-radius: var(--radius);
          background: rgba(255, 255, 255, 0.05);
          transition: background 0.3s ease;
        }
        
        .invoice-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .invoice-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .invoice-supplier {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .supplier-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--muted);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid var(--border);
        }
        
        .supplier-name {
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        
        .invoice-date {
          font-size: 0.75rem;
          color: var(--muted-foreground);
        }
        
        .invoice-amount {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }
        
        .amount {
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .invoice-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          
          .invoice-amount {
            align-items: flex-start;
            width: 100%;
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard
