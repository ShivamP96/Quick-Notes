DROP TABLE IF EXISTS table CASCADE;
CREATE TABLE tasks(
  id SERIAL PRIMARY KEY NOT NULL,
  input TEXT,
  category_id INTEGER references categories(id) on DELETE CASCADE,
  user_id INTEGER references users(id) ON DELETE CASCADE
)
