CREATE DATABASE projet;

--\c into projet

CREATE TABLE utilisateurs(
    id_user SERIAL PRIMARY KEY,
    nom VARCHAR(255)
);