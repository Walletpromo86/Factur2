"use client"

import { useState } from "react"

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1 className="gradient-text">Sistema de Faturação</h1>
        </div>

        <div className="header-actions">
          <button className="btn-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="notification-dot"></span>
          </button>

          <div className="user-menu">
            <button className="user-button" onClick={() => setShowDropdown(!showDropdown)}>
              <div className="avatar">
                <span>US</span>
              </div>
            </button>

            {showDropdown && (
              <div className="dropdown">
                <div className="dropdown-item">Perfil</div>
                <div className="dropdown-item">Configurações</div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item">Sair</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          background: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .logo h1 {
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .btn-icon {
          background: transparent;
          border: none;
          color: var(--foreground);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: background 0.3s ease;
        }
        
        .btn-icon:hover {
          background: var(--muted);
        }
        
        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--neon-pink);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        
        .user-menu {
          position: relative;
        }
        
        .user-button {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }
        
        .dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: var(--card);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          width: 200px;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          z-index: 100;
        }
        
        .dropdown-item {
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .dropdown-item:hover {
          background: var(--muted);
        }
        
        .dropdown-divider {
          height: 1px;
          background: var(--border);
          margin: 0.25rem 0;
        }
      `}</style>
    </header>
  )
}

export default Header
