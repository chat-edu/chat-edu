CREATE TABLE IF NOT EXISTS ${USER_TABLE} (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS ${NOTEBOOK_TABLE} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    user_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES ${USER_TABLE}(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS ${NOTE_TABLE} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    content TEXT,
    notebook_id INT,
    FOREIGN KEY (notebook_id) REFERENCES ${NOTEBOOK_TABLE}(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ${SCORE_TABLE} (
    user_id VARCHAR(255),
    notebook_id INT,
    score INT,
    PRIMARY KEY (user_id, notebook_id),
    FOREIGN KEY (user_id) REFERENCES ${USER_TABLE}(id) ON DELETE CASCADE,
    FOREIGN KEY (notebook_id) REFERENCES ${NOTEBOOK_TABLE}(id) ON DELETE CASCADE
);

-- update the user table to include profile_picture_url
ALTER TABLE ${USER_TABLE} ADD COLUMN IF NOT EXISTS profile_picture_url VARCHAR(255);