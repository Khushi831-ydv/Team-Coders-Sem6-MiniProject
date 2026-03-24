-- =========================
-- ADMIN TABLE
-- =========================
CREATE TABLE admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    role VARCHAR(50)
);

INSERT INTO admin (name, email, password, role) VALUES
('Admin One', 'admin1@greenaudit.com', 'admin123', 'Super Admin'),
('Admin Two', 'admin2@greenaudit.com', 'admin123', 'Manager');


-- =========================
-- CAMPUS TABLE
-- =========================
CREATE TABLE campus (
    campus_id INT PRIMARY KEY AUTO_INCREMENT,
    campus_name VARCHAR(100),
    location VARCHAR(100)
);

INSERT INTO campus (campus_name, location) VALUES
('Main Campus', 'Delhi'),
('Tech Campus', 'Mumbai');


-- =========================
-- BUILDING TABLE
-- =========================
CREATE TABLE building (
    building_id INT PRIMARY KEY AUTO_INCREMENT,
    building_name VARCHAR(100),
    campus_id INT,
    FOREIGN KEY (campus_id) REFERENCES campus(campus_id)
);

INSERT INTO building (building_name, campus_id) VALUES
('Block A', 1),
('Block B', 1),
('Block C', 2);


-- =========================
-- USER TABLE
-- =========================
CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    role VARCHAR(50),
    campus_id INT,
    FOREIGN KEY (campus_id) REFERENCES campus(campus_id)
);

INSERT INTO user (name, role, campus_id) VALUES
('Riya', 'Student', 1),
('Aman', 'Faculty', 1),
('Karan', 'Student', 2);


-- =========================
-- ENERGY USAGE
-- =========================
CREATE TABLE energy_usage (
    id INT PRIMARY KEY AUTO_INCREMENT,
    building_id INT,
    units_consumed FLOAT,
    record_date DATE,
    FOREIGN KEY (building_id) REFERENCES building(building_id)
);

INSERT INTO energy_usage (building_id, units_consumed, record_date) VALUES
(1, 120.5, '2026-03-01'),
(2, 150.0, '2026-03-01'),
(3, 98.7, '2026-03-01');


-- =========================
-- WATER CONSUMPTION
-- =========================
CREATE TABLE water_consumption (
    id INT PRIMARY KEY AUTO_INCREMENT,
    building_id INT,
    liters_used FLOAT,
    record_date DATE,
    FOREIGN KEY (building_id) REFERENCES building(building_id)
);

INSERT INTO water_consumption (building_id, liters_used, record_date) VALUES
(1, 500.0, '2026-03-01'),
(2, 650.0, '2026-03-01'),
(3, 400.0, '2026-03-01');


-- =========================
-- WASTE MANAGEMENT
-- =========================
CREATE TABLE waste_management (
    id INT PRIMARY KEY AUTO_INCREMENT,
    building_id INT,
    waste_kg FLOAT,
    waste_type VARCHAR(50),
    record_date DATE,
    FOREIGN KEY (building_id) REFERENCES building(building_id)
);

INSERT INTO waste_management (building_id, waste_kg, waste_type, record_date) VALUES
(1, 25.5, 'Plastic', '2026-03-01'),
(2, 40.0, 'Organic', '2026-03-01'),
(3, 18.2, 'Paper', '2026-03-01');


-- =========================
-- CARBON FOOTPRINT
-- =========================
CREATE TABLE carbon_footprint (
    id INT PRIMARY KEY AUTO_INCREMENT,
    building_id INT,
    emission_value FLOAT,
    record_date DATE,
    FOREIGN KEY (building_id) REFERENCES building(building_id)
);

INSERT INTO carbon_footprint (building_id, emission_value, record_date) VALUES
(1, 55.2, '2026-03-01'),
(2, 70.5, '2026-03-01'),
(3, 45.3, '2026-03-01');
