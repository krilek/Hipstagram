PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Users"
(
  id           integer
    constraint user_pk
      primary key autoincrement,
  login        varchar(512),
  email        varchar(512) not null,
  passwordHash varchar(512) not null,
  admin        smallint
);
INSERT INTO Users VALUES(7,'krilek','krilek@gmail.com','$2a$10$7KBijt6sdB935936OEG58Oyua3h89tYqXkEc//1QG3Ahes5u1Z0lG',0);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('Users',7);
COMMIT;
