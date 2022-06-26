
CREATE TABLE users(
    id int PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(50)  NOT NULL,
    password VARCHAR(255) DEFAULT 0,
    business VARCHAR(255) DEFAULT "",
    profilePhoto MEDIUMTEXT DEFAULT "",
    businessName VARCHAR(255) DEFAULT "",
    category VARCHAR(255) DEFAULT "",
    businessEmail VARCHAR(50) DEFAULT "",
    businessAddress VARCHAR(255) DEFAULT "",
    businessLanguage VARCHAR(50) DEFAULT "",
    businessCountry VARCHAR(50) DEFAULT "",
    description VARCHAR(255) DEFAULT "",
    createdAt VARCHAR(255) NOT NULL
);

CREATE TABLE posts(
    id int PRIMARY KEY AUTO_INCREMENT,
    userId VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    createdAt VARCHAR(255) NOT NULL
)

CREATE TABLE likes(
    id int PRIMARY KEY AUTO_INCREMENT,
    userId VARCHAR(255) NOT NULL,
    postId VARCHAR(255) NOT NULL,
    isLike VARCHAR(25) NOT NULL,
    createdAt VARCHAR(255) NOT NULL
)

CREATE TABLE followfollowing(
    id int PRIMARY KEY AUTO_INCREMENT,
    followerId VARCHAR(25) NOT NULL,
    followingId VARCHAR(25) NOT NULL,
    createdAt VARCHAR(255) NOT NULL
)

CREATE TABLE conversation(
    id int PRIMARY KEY AUTO_INCREMENT,
    doAddToConversation VARCHAR(255) NOT NULL,
    beenAddToConversation VARCHAR(255) NOT NULL,
    createdAt VARCHAR(255) NOT NULL
)

CREATE TABLE message(
    id int PRIMARY KEY AUTO_INCREMENT,
    conversationId VARCHAR(255) NOT NULL,
    text VARCHAR(255) NOT NULL,
    senderId VARCHAR(255) NOT NULL,
    receiverId VARCHAR(255) NOT NULL,
    createdAt VARCHAR(255) NOT NULL
)

CREATE TABLE comments(
    id int PRIMARY KEY AUTO_INCREMENT,
    userId VARCHAR(255) NOT NULL,
    postId VARCHAR(255) NOT NULL,
    comment VARCHAR(255) NOT NULL,
    createdAt VARCHAR(255) NOT NULL
)