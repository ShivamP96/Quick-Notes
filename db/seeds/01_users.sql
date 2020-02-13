INSERT INTO users (id, name, email, password) VALUES (1,'Cassandra', 'cl@lighthouse.com', 'password');
INSERT INTO users (id, name, email, password) VALUES (2,'Shivam', 'sp@lighthouse.com', 'password');
INSERT INTO users (id,name, email, password) VALUES (3,'Flavian', 'fm@lighthouse.com', 'password');
INSERT INTO users (id,name, email, password) VALUES (4,'username', 'testemail', 'password');


SELECT pg_catalog.setval('public.users_id_seq', 5, true);
