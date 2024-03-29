-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2022 at 02:35 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fastluxury`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `lplate` varchar(6) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `brand` varchar(10) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `type` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `available` tinyint(1) NOT NULL,
  `rentprice` int(11) NOT NULL,
  `imageURL` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `year` int(4) NOT NULL,
  `power` int(3) NOT NULL,
  `drive` varchar(10) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `engine` varchar(4) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `color` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`lplate`, `brand`, `type`, `available`, `rentprice`, `imageURL`, `year`, `power`, `drive`, `engine`, `color`) VALUES
('asd123', 'Ferrari', 'Roma', 0, 100000, 'https://upload.wikimedia.org/wikipedia/commons/c/c5/2021_Ferrari_Roma_Front.jpg', 2020, 612, 'benzines', 'V8', 'bézs'),
('bgt255', 'Chevrolet', 'Corvette C8', 1, 69000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Chevrolet_Corvette_C8_Stingray_blue.jpg/1920px-Chevrolet_Corvette_C8_Stingray_blue.jpg', 2020, 490, 'benzines', 'V8', 'világoskék'),
('jag333', 'Jaguar', 'F-Type SVR', 0, 89000, 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Jaguar_F-Type_-_Mondial_de_l%27Automobile_de_Paris_2016_-_001.jpg', 2020, 567, 'benzines', 'V8', 'narancsssárga'),
('lkj234', 'Porsche', 'Taycan Turbo', 1, 120000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Porsche_Taycan_at_IAA_2019_IMG_0786.jpg/1200px-Porsche_Taycan_at_IAA_2019_IMG_0786.jpg', 2019, 671, 'elektromos', 'AC', 'fehér'),
('qwe987', 'Tesla', 'Model S', 1, 78000, 'https://upload.wikimedia.org/wikipedia/commons/1/14/2018_Tesla_Model_S_75D.jpg', 2019, 605, 'elektromos', 'dual', 'piros'),
('sup678', 'Toyota', 'GR Supra', 1, 69000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/2020_Toyota_GR_Supra_%28United_States%29.png/1920px-2020_Toyota_GR_Supra_%28United_States%29.png', 2020, 335, 'benzines', 'I6', 'fehér');

-- --------------------------------------------------------

--
-- Table structure for table `rents`
--

CREATE TABLE `rents` (
  `lplate` varchar(6) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `useremail` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `firstname` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `lastname` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `rents`
--

INSERT INTO `rents` (`lplate`, `useremail`, `startdate`, `enddate`, `firstname`, `lastname`) VALUES
('jag333', 'csanyi@gmail.com', '2022-09-16', '2022-09-27', 'Cementes', 'Sándor'),
('asd123', 'rolipoli@gmail.com', '2022-09-01', '2022-09-05', 'Pápista', 'Roland');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `useremail` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `username` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `userpassword` text COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`useremail`, `username`, `userpassword`) VALUES
('rolipoli@gmail.com', 'rolipoli', '$2b$10$aeWaWw634LIdiVvo5THc0uzIYd/7NjeRGPs1kos9WopqBJetZZ.zy'),
('csanyi@gmail.com', 'cementsanyi', '$2b$10$G1y6jK7TZwPYVfoocjE5/OkmmXiZjxn6Vu1K4vcSerzQ/eb1sqVUK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`lplate`);

--
-- Indexes for table `rents`
--
ALTER TABLE `rents`
  ADD PRIMARY KEY (`useremail`),
  ADD KEY `cars-rents` (`lplate`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD KEY `useremail` (`useremail`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
