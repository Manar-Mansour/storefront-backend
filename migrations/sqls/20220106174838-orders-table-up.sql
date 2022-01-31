CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(10),
    user_id bigint REFERENCES users(id) ON DELETE CASCADE
);
