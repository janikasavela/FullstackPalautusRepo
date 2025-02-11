
CREATE TABLE blogs (
   id SERIAL PRIMARY KEY,
   author text,
   url text NOT NULL,
   title text NOT NULL,
   likes INT DEFAULT 0
);

INSERT INTO blogs (author, url, title) values 
('Jukka', 'www.jukka.com', 'Mielipiteeni julkisesta liikenteestä'),
('Jaana', 'www.jaana.com', 'Herkullisen kasvislasagnen resepti'); 