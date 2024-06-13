-- data_init.sql

-- Insertar usuarios iniciales
INSERT INTO usuarios (nombre, balance) VALUES
('Luis Vallejo', 100000),
('Pedro Rivas', 150000);

-- Insertar transferencias iniciales
INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES
((SELECT id FROM usuarios WHERE nombre = 'Luis Vallejo'), (SELECT id FROM usuarios WHERE nombre = 'Pedro Rivas'), 60000, NOW()),
((SELECT id FROM usuarios WHERE nombre = 'Pedro Rivas'), (SELECT id FROM usuarios WHERE nombre = 'Luis Vallejo'), 20000, NOW());
