"use client"

const InvoiceList = () => {
  return (
    <div className="invoice-list">
      <div className="page-header">
        <h1 className="gradient-text">Faturas</h1>
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
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Nova Fatura
        </button>
      </div>

      <div className="filters">
        <div className="search-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Pesquisar faturas..." className="search-input" />
        </div>

        <button className="btn btn-outline filter-btn">
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
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          <span>Filtrar</span>
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Referência</th>
              <th>Fornecedor</th>
              <th>Data</th>
              <th>Vencimento</th>
              <th>Valor</th>
              <th>Estado</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "INV-001",
                supplier: "Materiais ABC",
                date: "15/05/2023",
                dueDate: "15/06/2023",
                amount: 1250.75,
                status: "paid",
              },
              {
                id: "INV-002",
                supplier: "Transportes Rápidos",
                date: "20/05/2023",
                dueDate: "05/06/2023",
                amount: 450.0,
                status: "pending",
              },
              {
                id: "INV-003",
                supplier: "Fornecedor XYZ",
                date: "22/05/2023",
                dueDate: "22/06/2023",
                amount: 2780.5,
                status: "paid",
              },
              {
                id: "INV-004",
                supplier: "Logística Global",
                date: "25/05/2023",
                dueDate: "10/06/2023",
                amount: 890.25,
                status: "pending",
              },
              {
                id: "INV-005",
                supplier: "Materiais Premium",
                date: "28/05/2023",
                dueDate: "28/06/2023",
                amount: 1675.0,
                status: "paid",
              },
              {
                id: "INV-006",
                supplier: "Materiais ABC",
                date: "01/06/2023",
                dueDate: "15/06/2023",
                amount: 1350.0,
                status: "pending",
              },
              {
                id: "INV-007",
                supplier: "Fornecedor XYZ",
                date: "05/06/2023",
                dueDate: "20/06/2023",
                amount: 2100.75,
                status: "pending",
              },
            ].map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.supplier}</td>
                <td>{invoice.date}</td>
                <td>{invoice.dueDate}</td>
                <td>€{invoice.amount.toFixed(2)}</td>
                <td>
                  <span className={`badge ${invoice.status === "paid" ? "badge-green" : "badge-purple"}`}>
                    {invoice.status === "paid" ? "Pago" : "Pendente"}
                  </span>
                </td>
                <td className="text-right">
                  <button className="btn-text">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .invoice-list {
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
        
        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .search-container {
          position: relative;
          flex: 1;
        }
        
        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted-foreground);
        }
        
        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          background: var(--muted);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          color: var(--foreground);
          font-size: 0.9rem;
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
        }
        
        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .text-right {
          text-align: right;
        }
        
        .btn-text {
          background: transparent;
          border: none;
          color: var(--foreground);
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius);
          transition: background 0.3s ease;
        }
        
        .btn-text:hover {
          background: var(--muted);
        }
        
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .filters {
            flex-direction: column;
          }
          
          .table-container {
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  )
}

export default InvoiceList
