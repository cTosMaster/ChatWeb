#drop database noticetel;
-- 1. 데이터베이스 생성
create database if not exists noticetel;

-- 2. 사용자 계정 생성 (있으면 SKIP)
CREATE USER IF NOT EXISTS 'noticetel'@'%' IDENTIFIED BY 'noticetel12#$';

-- 3. 권한 부여
GRANT ALL PRIVILEGES ON noticetel.* TO 'noticetel'@'%';
FLUSH PRIVILEGES;

-- 4. DB 사용
USE noticetel;

CREATE TABLE board (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    writer VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);