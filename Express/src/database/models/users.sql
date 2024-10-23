-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 21, 2024 at 04:24 PM
-- Server version: 10.3.39-MariaDB-0ubuntu0.20.04.2
-- PHP Version: 7.4.3-4ubuntu2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `s4006840_fsd_a2`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `date_joined` datetime NOT NULL,
  `headline` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `interests` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `username`, `password_hash`, `date_joined`, `headline`, `bio`, `interests`) VALUES
(4, 'adnan@gmail.com', 'adnansharaf', '$argon2id$v=19$m=4096,t=3,p=1$5CU8PO76GhYWv9dIyjWmQg$i2lSWgqhBqokgBz2MusmYEVeJURs2vzK4VjIb2NDB/U', '2024-05-11 03:44:23', NULL, NULL, NULL),
(5, 'rasyidi@gmail.com', 'falahra', '$argon2id$v=19$m=4096,t=3,p=1$REO3bSJvmzL+cKOfVu44Uw$D3Q7j6nZcLlGRcP8WP2Ym0APOs0ArcjaSpQ6/9Hlcl8', '2024-05-11 10:22:13', NULL, NULL, NULL),
(6, 'jamaal@gmail.com', 'jamaal', '$argon2id$v=19$m=4096,t=3,p=1$Qyh8y4E4PDlNqdlvp8Yz+Q$3ufeTV3VMTpf/TQwISVqwcgPHpIxRgHD1BlCPqFRmRs', '2024-05-11 10:49:50', NULL, NULL, NULL),
(8, 'manraj@gmail.com', 'manraj', '$argon2id$v=19$m=4096,t=3,p=1$9rk9PzkK3V3pCakyZYqD5g$wcNkFaquYuA2tX0a8RAuE63par8E4p+i5a7bhJHuhAQ', '2024-05-11 10:56:21', NULL, NULL, NULL),
(9, 'elijah@gmail.com', 'elijah', '$argon2id$v=19$m=4096,t=3,p=1$+Q/HkRJR8XMWc3esKrRgIQ$JDUACrRth/1KY07Y4nHCjLzpLN3QFSq/OcGhfUKI37E', '2024-05-11 10:57:34', NULL, NULL, NULL),
(10, 'ashton@gmail.com', 'ashton', '$argon2id$v=19$m=4096,t=3,p=1$4sPD5dEVBMlpAOxhN9e9Bw$p+ghVw6sayO6CaM8dnVf5G5CKN1OJ3kIIixNjddHIv4', '2024-05-11 11:00:13', 'ASDad', 'ASDasdaSD', 'asdsda'),
(11, 'philip@gmail.com', 'philip', '$argon2id$v=19$m=4096,t=3,p=1$X2zjJSyjbW96rCOWT+7P8g$XJ59fi0ELX0hBXYwbpnpoTMNDHFtwhl6EBCxWOswcOg', '2024-05-11 11:09:15', 'zxcvzxcvzxcv', 'zxcvzxcvxcvxsasfdasfasdfsda', 'cvzxcvxcvxcfasdfasdfasfsd'),
(12, 'wyatt@gmail.com', 'wyattt', '$argon2id$v=19$m=4096,t=3,p=1$O0Q9MMZRBN5eZ6mf3N4wiA$+DukvPGrddUIZv9J6smazdB3Ug23HLxQRqxIOz/z6t8', '2024-05-11 12:44:02', 'fasdfasdfa', 'sfsdafasdfasd', NULL),
(23, 'natch222@gmail.com', 'jamaal1', '$argon2id$v=19$m=4096,t=3,p=1$+AawSlzCvTPki/eE/22dEg$WPz4BPF5Zd4BACoj8LKOgeiLux7mOpxWzXE8CGeaUPc', '2024-05-15 09:50:32', NULL, NULL, NULL),
(39, 'jamaal123@gmail.com', 'jamaald', '$argon2id$v=19$m=4096,t=3,p=1$XUDySQVFyHeFjRVRhpEBzA$CkFXmrssu7n/st4jUYZ4wDy3GLB81titoeJlfabq0qQ', '2024-05-15 10:58:42', NULL, NULL, NULL),
(41, 'natch@gmail.com', 'natchi', '$argon2id$v=19$m=4096,t=3,p=1$AE7ECcD1Ck0YeKCXcrgMTQ$1KzmADEvTIdbPapIk4a2mybt8kTD6sAoageO7V+cqys', '2024-05-21 05:39:14', NULL, NULL, NULL),
(63, 'natch@gmail.comdd', 'natchoe', '$argon2id$v=19$m=4096,t=3,p=1$dN+HNwNYV0OGfT/TSwXuvw$I1l89bteFaPGRDlPkYVpRxBFzNtphXh7MuDqJNA19U4', '2024-05-21 05:56:50', NULL, NULL, NULL),
(69, 'dddddd', 'natchood', '$argon2id$v=19$m=4096,t=3,p=1$Rvn2+aTVGLfvlAM6kHPbpg$olN66qCffB5ct/2oMYpEN0nSXtnKrjIPOCZSAEnahu0', '2024-05-21 06:00:25', NULL, NULL, NULL),
(70, 'natch@gmail', 'mbolger', '$argon2id$v=19$m=4096,t=3,p=1$REIIjK2EOp8+DlfbJeWoJQ$LT3UlsSLM8AnZB6EexjMA9744v2BYjTqIfppQGmnKuo', '2024-05-21 06:05:07', NULL, NULL, NULL),
(75, 'Whatthehelllllllll@gmail.com', 'jamaaldx', '$argon2id$v=19$m=4096,t=3,p=1$rFQJsDqNTI94gPY01On5wg$DqxCYgcAJcyU9ASlUTPWKhZut7xHXXz4M/Z2qiLPDYo', '2024-05-21 06:15:28', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
