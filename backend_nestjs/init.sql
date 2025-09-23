-- Script de inicialização do banco MariaDB para Sotero-SOS
-- Este script é executado automaticamente quando o container é criado pela primeira vez

-- Usar o banco de dados criado automaticamente
USE sotero_db;

-- Configurações para otimizar o MariaDB
SET sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO';

-- O Prisma irá criar as tabelas automaticamente via migrations
-- Este arquivo pode ser usado para dados iniciais se necessário

-- Exemplo de dados iniciais (descomente se necessário):

-- Inserir setores iniciais
-- INSERT INTO setor (nome_setor, turno) VALUES 
-- ('Operações Manhã', 'manha'),
-- ('Operações Tarde', 'tarde'),
-- ('Operações Noite', 'noite'),
-- ('Administrativo', NULL);

-- Inserir motivos comuns
-- INSERT INTO motivo (descricao, tempo_previsto) VALUES 
-- ('Pneu furado', '00:30:00'),
-- ('Problema mecânico', '01:00:00'),
-- ('Falta de combustível', '00:15:00'),
-- ('Acidente de trânsito', '02:00:00'),
-- ('Problema elétrico', '00:45:00');

-- Inserir categorias de veículos
-- INSERT INTO veiculo (categoria, situacao) VALUES 
-- ('SUPER TOCO', 'operacional'),
-- ('TRUCK', 'operacional'),
-- ('TRICICLO', 'operacional'),
-- ('COMPACTADOR', 'operacional');

-- Inserir usuário administrador inicial (senha: admin123)
-- INSERT INTO usuario (username, hashed_password, tipo, nome) VALUES 
-- ('admin', '$2b$10$ejemplo_hash_senha', 'admin', 'Administrador do Sistema');

FLUSH PRIVILEGES;
