-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2023 at 08:54 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `note app`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` varchar(64) DEFAULT NULL,
  `title` varchar(64) NOT NULL,
  `status` varchar(64) NOT NULL,
  `user_id` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `status`, `user_id`) VALUES
('1234', 'Event 1', 'Accepted', ''),
('9393', 'Test Event 2', '', '83318'),
('bf53ebab-22f0-456e-a1a3-4d79f9c612a1', 'This is a test event ', '', 'a97e54cf-507f-440e-a387-cb9e399a7f85');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` varchar(64) NOT NULL,
  `title` varchar(64) DEFAULT NULL,
  `user_id` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `template_id` varchar(64) DEFAULT NULL,
  `event_id` varchar(64) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `user_id`, `description`, `template_id`, `event_id`, `created_date`, `last_modified_date`, `content`) VALUES
('b4983790-18b9-45ca-9886-d6e02195cd6c', 'Test Note 1', 'a97e54cf-507f-440e-a387-cb9e399a7f85', 'This is a test template', 'd32c3ee7-096e-47ac-aa1b-ebc323b41b49', 'bf53ebab-22f0-456e-a1a3-4d79f9c612a1', '2023-08-15 18:13:31', NULL, '[{\"id\":\"Lzkvwz9ojC\",\"type\":\"paragraph\",\"data\":{\"text\":\"This is a test template\"}}]');

-- --------------------------------------------------------

--
-- Table structure for table `summaries`
--

CREATE TABLE `summaries` (
  `id` varchar(64) NOT NULL,
  `topic` varchar(64) NOT NULL,
  `content` text NOT NULL,
  `note_id` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `summaries`
--

INSERT INTO `summaries` (`id`, `topic`, `content`, `note_id`) VALUES
('332a21a6-2221-4147-a1e0-d0c157958c1d', 'positive', 'asd', '32434289'),
('39a73e64-7347-473c-86a8-2032022fb9a5', 'question', 'sads', '32434289'),
('fbb58247-f6d7-4eff-a97a-006d41b7cf35', 'negative', 'asd', '32434289');

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `id` varchar(64) NOT NULL,
  `content` longtext DEFAULT NULL,
  `title` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `user_id` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`id`, `content`, `title`, `description`, `user_id`) VALUES
('765', '[{\"id\":\"RoW1asWdes\",\"type\":\"paragraph\",\"data\":{\"text\":\"asdasd\"}}]', 'Template1.3.2sa', 'asd', '83318'),
('d32c3ee7-096e-47ac-aa1b-ebc323b41b49', '[{\"id\":\"Lzkvwz9ojC\",\"type\":\"paragraph\",\"data\":{\"text\":\"This is a test template\"}}]', 'Test Template 1', '', 'a97e54cf-507f-440e-a387-cb9e399a7f85'),
('e8a8105e-e45f-499c-bb50-e9a1ef1c22c2', NULL, 'Test', '', 'f07e2a54-a7a8-4edd-8359-46a8ea581597');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `user_id` varchar(128) NOT NULL,
  `token` varchar(128) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `user_id`, `token`, `created`) VALUES
(83437, '0fab8e00-ad39-41ff-9791-75b775e4aa1d', '8b60c090-f9b2-4612-881f-68a3a6159c80', '2023-08-15 15:01:23'),
(83438, '0fab8e00-ad39-41ff-9791-75b775e4aa1d', 'ea3a3a64-bebd-4d85-a192-f310fa629d6e', '2023-08-15 15:02:02'),
(83439, '83318', '76147898-87e6-4209-8238-00df87d54708', '2023-08-15 15:02:12'),
(83440, '617e358f-9f33-49da-b002-f4637074fa21', '8483b1a8-41e2-467e-a617-0f089827c486', '2023-08-15 16:04:58'),
(83441, '83318', 'a082fb81-569b-43e7-804e-5591d1048a46', '2023-08-15 16:06:48'),
(83442, 'f07e2a54-a7a8-4edd-8359-46a8ea581597', 'ee67be56-9d35-45f7-9e70-18b621f96a43', '2023-08-15 16:06:59'),
(83443, '83318', '72e7ce4e-cd17-4747-a758-7927c89c8aeb', '2023-08-15 17:35:32'),
(83444, '5190e944-1fc7-40b0-8887-a97de41865d2', '15e43ce0-4095-4b9f-9a98-7d4b5c45805d', '2023-08-15 17:35:43'),
(83445, '5190e944-1fc7-40b0-8887-a97de41865d2', '54aa29fb-be82-467b-9198-6306793c934f', '2023-08-15 17:36:04'),
(83446, '83318', '2d2d691c-a444-4be4-b62b-8db7b588bc6c', '2023-08-15 17:36:30'),
(83447, '6a9511ac-3bcf-447a-bc75-c4c124f47772', '7c29492b-a5eb-4d5d-a4c6-580d7ca83e53', '2023-08-15 17:47:41'),
(83448, '6a9511ac-3bcf-447a-bc75-c4c124f47772', 'b4b804d0-1bde-4906-9add-8888b6580dc5', '2023-08-15 17:47:54'),
(83449, '83318', '8368da02-e3ee-4b97-b4bd-0bd973cfdcff', '2023-08-15 17:48:01'),
(83450, '6a9511ac-3bcf-447a-bc75-c4c124f47772', 'fd531677-8c0e-4b49-b2ef-1365cd854bf3', '2023-08-15 17:49:29'),
(83451, '6a9511ac-3bcf-447a-bc75-c4c124f47772', '5c6b4bd0-2de5-4f0b-b2be-0cfd01b3ced0', '2023-08-15 17:50:43'),
(83452, '83318', '34bc9011-43d5-473b-9279-7827b415b5c5', '2023-08-15 17:52:49'),
(83453, '6a9511ac-3bcf-447a-bc75-c4c124f47772', 'b6fbbc41-4e24-4fa1-b0dc-e3866a175510', '2023-08-15 17:54:25'),
(83454, 'a97e54cf-507f-440e-a387-cb9e399a7f85', '58884745-ff07-45f8-a69b-796ac0ea9ca0', '2023-08-15 18:06:21'),
(83455, 'a97e54cf-507f-440e-a387-cb9e399a7f85', 'cd1ad790-a833-4873-a304-870f1ee94859', '2023-08-15 18:12:30'),
(83456, '83318', '68b1e218-661e-426c-b2a3-d85bd1d3c1b2', '2023-08-15 18:24:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password_hash` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`) VALUES
('83318', 'luke', '3946ca64ff78d93ca61090a437cbb6b3d2ca0d488f5f9ccf3059608368b27693'),
('a97e54cf-507f-440e-a387-cb9e399a7f85', 'TestUser', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `summaries`
--
ALTER TABLE `summaries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83457;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
