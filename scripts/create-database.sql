-- Sistema de Gestão de Faturas - Estrutura da Base de Dados
-- Execute este script para criar as tabelas necessárias

-- Tabela de Utilizadores
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user', 'viewer') DEFAULT 'user',
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Tabela de Fornecedores
CREATE TABLE IF NOT EXISTS suppliers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    vat VARCHAR(50),
    iban VARCHAR(50),
    payment_terms INT DEFAULT 30,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Transportadoras
CREATE TABLE IF NOT EXISTS transporters (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    vat VARCHAR(50),
    iban VARCHAR(50),
    license_number VARCHAR(100),
    vehicle_types JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Faturas
CREATE TABLE IF NOT EXISTS invoices (
    id VARCHAR(50) PRIMARY KEY,
    invoice_number VARCHAR(100) NOT NULL UNIQUE,
    supplier VARCHAR(255) NOT NULL,
    supplier_id VARCHAR(50),
    transporter_id VARCHAR(50),
    entity_type ENUM('supplier', 'transporter') NOT NULL,
    date DATE NOT NULL,
    due_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    vat_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('paid', 'pending', 'overdue', 'cancelled') DEFAULT 'pending',
    description TEXT,
    payment_method VARCHAR(100),
    payment_date DATE NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL,
    FOREIGN KEY (transporter_id) REFERENCES transporters(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabela de Arquivos/Documentos
CREATE TABLE IF NOT EXISTS invoice_files (
    id VARCHAR(50) PRIMARY KEY,
    invoice_id VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INT NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_url VARCHAR(500),
    entity_type ENUM('supplier', 'transporter') NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by VARCHAR(50),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabela de Log de Auditoria
CREATE TABLE IF NOT EXISTS audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id VARCHAR(50),
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Índices para melhor performance
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_date ON invoices(date);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
CREATE INDEX idx_invoices_supplier ON invoices(supplier);
CREATE INDEX idx_suppliers_active ON suppliers(is_active);
CREATE INDEX idx_transporters_active ON transporters(is_active);
CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_audit_log_date ON audit_log(created_at);

-- Inserir utilizador administrador padrão
INSERT INTO users (id, name, email, password_hash, role, department) 
VALUES (
    'admin-001', 
    'Administrador Sistema', 
    'admin@empresa.pt', 
    '$2b$10$hash_da_password_Admin@2024!', 
    'admin', 
    'TI'
) ON DUPLICATE KEY UPDATE name = name;

-- Views úteis para relatórios
CREATE OR REPLACE VIEW invoice_summary AS
SELECT 
    DATE_FORMAT(date, '%Y-%m') as month,
    COUNT(*) as total_invoices,
    SUM(total_amount) as total_amount,
    SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END) as paid_amount,
    SUM(CASE WHEN status = 'pending' THEN total_amount ELSE 0 END) as pending_amount,
    SUM(CASE WHEN status = 'overdue' THEN total_amount ELSE 0 END) as overdue_amount
FROM invoices 
GROUP BY DATE_FORMAT(date, '%Y-%m')
ORDER BY month DESC;

CREATE OR REPLACE VIEW supplier_performance AS
SELECT 
    s.id,
    s.name,
    COUNT(i.id) as total_invoices,
    SUM(i.total_amount) as total_amount,
    AVG(i.total_amount) as avg_amount,
    SUM(CASE WHEN i.status = 'paid' THEN 1 ELSE 0 END) as paid_invoices,
    ROUND(SUM(CASE WHEN i.status = 'paid' THEN 1 ELSE 0 END) * 100.0 / COUNT(i.id), 2) as payment_rate
FROM suppliers s
LEFT JOIN invoices i ON s.id = i.supplier_id
WHERE s.is_active = TRUE
GROUP BY s.id, s.name
ORDER BY total_amount DESC;
