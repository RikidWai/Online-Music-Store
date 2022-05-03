-- Create Table Music
CREATE TABLE Music(
    musicId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    musicName VARCHAR(256) NOT NULL,
    category VARCHAR(50),
    composer VARCHAR(256),
    description VARCHAR(256),
    price NUMERIC(5, 1),
    published VARCHAR(30),
    newArrival VARCHAR(3)
);
--  Create Table Login
CREATE TABLE Login(
    userId VARCHAR(256) NOT NULL PRIMARY KEY,
    pw VARCHAR(256) NOT NULL
);

-- Create Table Cart 
CREATE TABLE Cart(
    cartId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    musicId INT NOT NULL,
    userId VARCHAR(256) NOT NULL,
    quantity INT UNSIGNED,
    FOREIGN KEY(musicId) REFERENCES Music(musicId),
    FOREIGN KEY(userId) REFERENCES Login(userId)
);


INSERT INTO Login VALUES ('Ricky', 'iLoveComp3322')
INSERT
INTO
    Music(
        musicId,
        musicName,
        category,
        composer,
        description,
        price,
        published,
        newArrival
    )
VALUES(
    1,
    'Symphony No. 41 Jupiter, 1st Movement Allegro Vivace',
    'Classical',
    'Wolfgang Amadeus Mozart',
    'Jupiter Symphony, byname of Symphony No. 41 in C Major, K 551, orchestral work by Austrian composer Wolfgang Amadeus Mozart, known for its good humour, exuberant energy, and unusually grand scale for a symphony of the Classical period.',
    30,
    '1788',
    'Yes'
);
INSERT
INTO
    Music(
        musicId,
        musicName,
        category,
        composer,
        description,
        price,
        published,
        newArrival
    )
VALUES(
    2,
    'Scherzo: Allegro vivace con delicatezza',
    'Classical',
    'Schubert, Franz',
    'In the first part of the Classical period, the dance movement, when it appeared, usually consisted of a minuet in fairly simple binary form (the two-part form from which sonata form evolved)...',
    80,
    '1828',
    'No'
);
INSERT
INTO
    Music(
        musicId,
        musicName,
        category,
        composer,
        description,
        price,
        published,
        newArrival
    )
VALUES(
    3,
    'Bach, J.S.: Goldberg Variations, BWV 988',
    'Baroque',
    'J.S. Bach',
    'On his visits to Dresden, Bach had won the regard of the Russian envoy, Hermann Karl, Reichsgraf (count) von Keyserlingk, who commissioned the so-called Goldberg Variations; these were published in 1741...',
    100,
    '1741',
    'No'
);
INSERT
INTO
    Music(
        musicId,
        musicName,
        category,
        composer,
        description,
        price,
        published,
        newArrival
    )
VALUES(
    4,
    'Mussorgsky, Modest: Night on Bald Mountain',
    'Classical',
    'Mussorgsky, Modest',
    'Night on Bald Mountain, Russian Noch na lysoy gore, also called Night on Bare Mountain, orchestral work by the Russian composer Modest Mussorgsky that was completed in June 1867...',
    40,
    '1867',
    'No'
);
INSERT
INTO
    Music(
        musicId,
        musicName,
        category,
        composer,
        description,
        price,
        published,
        newArrival
    )
VALUES(
    5,
    'Claudio Monteverdi: Madrigals',
    'Baroque',
    'Claudio Monteverdi\'s Madrigals',
    'Claudio Giovanni Antonio Monteverdi was an Italian composer, gambist, singer and Roman Catholic priest. Monteverdi\'s work, often regarded as revolutionary, marked the transition from the Renaissance style of music to that of the Baroque period...',
    200,
    '1587-1651',
    'No'
);
INSERT
INTO
    Music(
        musicId,
        musicName,
        category,
        composer,
        description,
        price,
        published,
        newArrival
    )
VALUES(
    6,
    'Bach: Concerto No. 1 in D Major',
    'Baroque',
    'Bach',
    'Baroque music, a style of music that prevailed during the period from about 1600 to about 1750, known for its grandiose, dramatic, and energetic spirit but also for its stylistic diversity...',
    140,
    '1791',
    'No'
);
INSERT
INTO
    Music(
        musicId,
        musicName,
        category,
        composer,
        description,
        price,
        published,
        newArrival
    )
VALUES(
    7,
    'Frederic Chopin: Piano Concerto No. 1 in E Minor',
    'Romantic',
    'Frederic Chopin',
    'A second concert confirmed his success, and on his return home he prepared himself for further achievements abroad by writing his Piano Concerto No. 2 in F Minor (1829) and his Piano 
Concerto No. 1 in E Minor (1830)...',
    130,
    '1830',
    'No'
);

INSERT
INTO
    Music(
        musicId,
        musicName,
        category,
        composer,
        description,
        price,
        published,
        newArrival
    )
VALUES(
    8,
    'Franz Liszt: Christus',
    'Late 19th',
    'Franz Liszt',
    'For the next eight years Liszt lived mainly in Rome and occupied himself more and more with 
religious music. He completed the oratorios Die Legende von der heiligen Elisabeth (1857-62)
and Christus (1855-66) and a number of smaller works...',
    199,
    '1855-1866',
    'No'
);

INSERT
INTO
    Music(
        musicId,
        musicName,
        category,
        composer,
        description,
        price,
        published,
        newArrival
    )
VALUES(
    9,
    'Claude Debussy: Children\'s Corner',
    'Romantic',
    'Claude Debussy',
    'Repelled by the gossip and scandal arising from this situation, he sought refuge for a time at Eastbourne, on the south coast of England. For his daughter, nicknamed Chouchou, he wrote the piano suite Children\'s Corner (1908)...',
    149,
    '1908',
    'No'
);

INSERT
INTO
    Music(
        musicId,
        musicName,
        category,
        composer,
        description,
        price,
        published,
        newArrival
    )
VALUES(
    10,
    'Robert Schumann: Papillons',
    'Romantic',
    'Robert Schumann',
    'In the summer of 1829 he left Leipzig for Heidelberg. There he composed waltzes in the style of Franz Schubert, afterward used in his piano cycle Papillons (Opus 2; 1829-31), and practiced industriously...',
    131,
    '1831',
    'No'
);

INSERT
INTO
    Music(
        musicId,
        musicName,
        category,
        composer,
        description,
        price,
        published,
        newArrival
    )
VALUES(
    11,
    'Symphony No. 3',
    'Late 19th',
    'Gustav Mahler',
    'Symphony No. 3, symphony for orchestra and choruses by Austrian composer Gustav Mahler that purports to encapsulate everything the composer had learned about life to date...',
    80,
    '1902',
    'No'
);

INSERT
INTO
    Music(
        musicId,
        musicName,
        category,
        composer,
        description,
        price,
        published,
        newArrival
    )
VALUES(
    12,
    'Liszt: Bagatelle sans tonalite',
    'Late 19th',
    'Liszt',
    'In 1869 Liszt was invited to return to Weimar by the grand duke to give master classes in piano playing, and two years later he was asked to do the same in Budapest...',
    103,
    '1872',
    'No'
);

SELECT * FROM Music WHERE musicName LIKE '%Scherzo%' OR composer LIKE '%Bach%'