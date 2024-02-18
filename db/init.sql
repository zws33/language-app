CREATE TABLE language (
    language_code character varying(3) PRIMARY KEY
);

CREATE TABLE word (
    word_id SERIAL PRIMARY KEY,
    word_text character varying(100) NOT NULL,
    language_code character varying(3) NOT NULL REFERENCES language(language_code),
    CONSTRAINT unique_word_text_language UNIQUE (word_text, language_code)
);

CREATE TABLE translation (
    translation_id SERIAL PRIMARY KEY,
    word_id_1 integer NOT NULL REFERENCES word(word_id),
    word_id_2 integer NOT NULL REFERENCES word(word_id),
    CONSTRAINT unique_word_ids CHECK (word_id_1 <> word_id_2)
);

CREATE TABLE tag (
    tag_id SERIAL PRIMARY KEY,
    tag_text character varying(500) NOT NULL UNIQUE
);

CREATE TABLE word_tag (
    word_id integer REFERENCES word(word_id),
    tag_id integer REFERENCES tag(tag_id),
    CONSTRAINT word_tag_pkey PRIMARY KEY (word_id, tag_id)
);

-- Seed languages
INSERT INTO language (language_code) VALUES
('EN'),
('ES'),
('FR'),
('IT'),
('DE'),
('PT')
;