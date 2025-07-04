"use client"

const TransporterList = () => {
  return (
    <div className="transporter-list">
      <div className="page-header">
        <h1 className="gradient-text">Transportadoras</h1>
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
          Nova Transportadora
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
          <input type="text" placeholder="Pesquisar transportadoras..." className="search-input" />
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
              <th>Nome</th>
              <th>Contacto</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>NIF</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "1",
                name: "Transportes Rápidos",
                contact: "Pedro Almeida",
                email: "pedro@transportesrapidos.pt",
                phone: "912345678",
                vat: "PT123456789",
              },
              {
                id: "2",
                name: "Logística Global",
                contact: "Marta Sousa",
                email: "marta@logisticaglobal.pt",
                phone: "923456789",
                vat: "PT234567890",
              },
              {
                id: "3",
                name: "Entregas Expressas",
                contact: "Ricardo Ferreira",
                email: "ricardo@entregasexpressas.pt",
                phone: "934567890",
                vat: "PT345678901",
              },
              {
                id: "4",
                name: "Transportadora Nacional",
                contact: "Inês Rodrigues",
                email: "ines@transportadora.pt",
                phone: "945678901",
                vat: "PT456789012",
              },
            ].map((transporter) => (
              <tr key={transporter.id}>
                <td className="font-medium">{transporter.name}</td>
                <td>{transporter.contact}</td>
                <td>{transporter.email}</td>
                <td>{transporter.phone}</td>
                <td>{transporter.vat}</td>
                <td className="text-right">
                  <button className="btn-text">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .transporter-list {
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
        
        .font-medium {
          font-weight: 500;
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

export default TransporterList
