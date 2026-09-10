-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(30) NOT NULL CHECK (role IN ('CITIZEN', 'ADMIN', 'DEPARTMENT')),
    department_id INTEGER,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


-- Citizens table
CREATE TABLE citizens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    citizen_id VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    api_endpoint TEXT,
    api_type VARCHAR(50),
    data_format VARCHAR(30),
    status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


-- Link department users to their department
ALTER TABLE users
ADD CONSTRAINT fk_users_department
FOREIGN KEY (department_id) REFERENCES departments(id);


-- Applications table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    citizen_id INTEGER NOT NULL,
    application_number VARCHAR(50) UNIQUE NOT NULL,
    application_type VARCHAR(100) NOT NULL,
    status VARCHAR(30) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'SUBMITTED', 'UNDER_VERIFICATION', 'APPROVED', 'REJECTED')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (citizen_id) REFERENCES citizens(id)
);


-- Consents table
CREATE TABLE consents (
    id SERIAL PRIMARY KEY,
    citizen_id INTEGER NOT NULL,
    department_id INTEGER NOT NULL,
    data_requested TEXT NOT NULL,
    purpose TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'GRANTED', 'REVOKED', 'EXPIRED')),
    granted_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,

    FOREIGN KEY (citizen_id) REFERENCES citizens(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);


-- Identity mapping table
CREATE TABLE identity_mapping (
    id SERIAL PRIMARY KEY,
    citizen_id INTEGER NOT NULL,
    property_ref VARCHAR(100),
    taxpayer_id VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (citizen_id) REFERENCES citizens(id)
);


-- Verification results table
CREATE TABLE verification_results (
    id SERIAL PRIMARY KEY,
    application_id INTEGER NOT NULL,
    department_id INTEGER NOT NULL,
    verification_type VARCHAR(100) NOT NULL,
    status VARCHAR(30) NOT NULL CHECK (status IN ('PENDING', 'VERIFIED', 'FAILED')),
    result_data JSONB,
    verified_at TIMESTAMPTZ,

    FOREIGN KEY (application_id) REFERENCES applications(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);


-- Audit logs table
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    department_id INTEGER,
    application_id INTEGER,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100),
    status VARCHAR(30),
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (application_id) REFERENCES applications(id)
);


-- Connectors table
CREATE TABLE connectors (
    id SERIAL PRIMARY KEY,
    department_id INTEGER NOT NULL,
    api_type VARCHAR(50),
    endpoint TEXT NOT NULL,
    authentication_type VARCHAR(50),
    data_format VARCHAR(30),
    version VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (department_id) REFERENCES departments(id)
);


-- Index for faster application lookup by citizen
CREATE INDEX idx_applications_citizen_id
ON applications(citizen_id);


-- Index for faster audit log lookup by user
CREATE INDEX idx_audit_logs_user_id
ON audit_logs(user_id);


-- Index for faster identity mapping lookup by citizen
CREATE INDEX idx_identity_mapping_citizen_id
ON identity_mapping(citizen_id);


-- Index for faster verification lookup by application
CREATE INDEX idx_verification_results_application_id
ON verification_results(application_id);


-- Indexes for frequently queried foreign keys
CREATE INDEX idx_consents_citizen_id
ON consents(citizen_id);

CREATE INDEX idx_consents_department_id
ON consents(department_id);

CREATE INDEX idx_verification_results_department_id
ON verification_results(department_id);

CREATE INDEX idx_audit_logs_department_id
ON audit_logs(department_id);

CREATE INDEX idx_audit_logs_application_id
ON audit_logs(application_id);

CREATE INDEX idx_connectors_department_id
ON connectors(department_id);

CREATE INDEX idx_users_department_id
ON users(department_id);