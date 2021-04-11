CREATE DATABASE esmetrip;

CREATE TABLE utilisateurs (
    id_u SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    email TEXT NOT NULL,
    mdp TEXT NOT NULL,
);
