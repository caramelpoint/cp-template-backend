CREATE DATABASE templatedb;
CREATE USER templateuser WITH ENCRYPTED PASSWORD 'templateuser123';
GRANT ALL PRIVILEGES ON DATABASE templatedb TO templateuser;
ALTER USER templateuser WITH SUPERUSER;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";