-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2020 at 08:00 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentacar`
--

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `car_id` int(11) NOT NULL,
  `car_registration_number` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `car_make_id` int(11) NOT NULL,
  `car_model_id` int(11) NOT NULL,
  `car_fuel_type_id` int(11) NOT NULL,
  `car_category_id` int(11) NOT NULL,
  `car_year` int(4) NOT NULL,
  `car_engine_volume` decimal(10,2) NOT NULL,
  `car_available` tinyint(1) NOT NULL DEFAULT '1',
  `car_km_dist` decimal(10,2) NOT NULL DEFAULT '0.00',
  `car_fuel_level` decimal(10,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`car_id`, `car_registration_number`, `car_make_id`, `car_model_id`, `car_fuel_type_id`, `car_category_id`, `car_year`, `car_engine_volume`, `car_available`, `car_km_dist`, `car_fuel_level`) VALUES
(2, 'BG502DD', 1, 1, 1, 3, 2010, '2998.00', 1, '10.00', '1.20'),
(3, 'SD302LO', 4, 4, 2, 1, 2005, '1789.00', 0, '80.00', '12.00'),
(8, 'BG609SS', 1, 1, 1, 3, 2010, '2998.00', 1, '60.00', '0.00'),
(9, 'LE158PO', 1, 1, 1, 3, 1999, '1300.00', 1, '0.00', '0.00'),
(13, 'BG502DK', 1, 2, 1, 1, 2017, '3200.00', 1, '0.00', '0.00'),
(14, 'SM502DD', 1, 1, 2, 3, 2004, '1250.00', 1, '15.00', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `car_category`
--

CREATE TABLE `car_category` (
  `cc_id` int(11) NOT NULL,
  `cc_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `car_category`
--

INSERT INTO `car_category` (`cc_id`, `cc_name`) VALUES
(3, 'big'),
(1, 'medium'),
(2, 'small');

-- --------------------------------------------------------

--
-- Table structure for table `car_expense`
--

CREATE TABLE `car_expense` (
  `ce_id` int(11) NOT NULL,
  `ce_car_id` int(11) NOT NULL,
  `ce_user_id` int(11) NOT NULL,
  `ce_description` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `ce_price` decimal(10,2) NOT NULL,
  `ce_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `car_expense`
--

INSERT INTO `car_expense` (`ce_id`, `ce_car_id`, `ce_user_id`, `ce_description`, `ce_price`, `ce_date`) VALUES
(2, 2, 1, 'Zamena ulja', '3000.00', '2020-06-05 13:28:33'),
(3, 2, 1, 'Zamena farova', '1500.00', '2020-06-05 13:28:33'),
(4, 2, 1, 'Zamena ulja', '3000.00', '2020-06-05 13:28:33'),
(5, 9, 1, 'asdk', '123.00', '2020-06-12 18:29:25');

-- --------------------------------------------------------

--
-- Table structure for table `car_fuel_type`
--

CREATE TABLE `car_fuel_type` (
  `cft_id` int(11) NOT NULL,
  `cft_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `car_fuel_type`
--

INSERT INTO `car_fuel_type` (`cft_id`, `cft_name`) VALUES
(2, 'benzin'),
(1, 'diesel'),
(3, 'gas');

-- --------------------------------------------------------

--
-- Table structure for table `car_make`
--

CREATE TABLE `car_make` (
  `cm_id` int(11) NOT NULL,
  `cm_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `car_make`
--

INSERT INTO `car_make` (`cm_id`, `cm_name`) VALUES
(1, 'Audi'),
(2, 'BMW'),
(3, 'Mercedes'),
(4, 'Fiat');

-- --------------------------------------------------------

--
-- Table structure for table `car_model`
--

CREATE TABLE `car_model` (
  `cm_id` int(11) NOT NULL,
  `cm_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `cm_cm_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `car_model`
--

INSERT INTO `car_model` (`cm_id`, `cm_name`, `cm_cm_id`) VALUES
(1, 'A6', 1),
(2, 'R8', 1),
(3, '500L', 4),
(4, 'Bravo', 4),
(5, 'Seicento', 4),
(6, '200L', 3);

-- --------------------------------------------------------

--
-- Table structure for table `car_registration`
--

CREATE TABLE `car_registration` (
  `cr_id` int(11) NOT NULL,
  `cr_car_id` int(11) NOT NULL,
  `cr_registration_from` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cr_registration_to` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `car_registration`
--

INSERT INTO `car_registration` (`cr_id`, `cr_car_id`, `cr_registration_from`, `cr_registration_to`) VALUES
(3, 2, '2020-05-01 23:43:11', '2020-06-01 23:43:11'),
(4, 8, '2020-05-06 13:13:52', '2020-06-19 13:13:52'),
(12, 14, '2020-05-06 13:28:16', '2020-06-10 13:28:16'),
(13, 3, '2020-06-06 13:32:53', '2020-07-06 13:32:53'),
(15, 13, '2020-06-06 13:33:04', '2021-06-06 13:33:04'),
(16, 2, '2020-06-09 18:00:25', '2021-06-09 18:00:25'),
(18, 14, '2020-06-10 18:02:47', '2021-06-10 18:02:47');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `client_id` int(11) NOT NULL,
  `client_id_number` varchar(9) COLLATE utf8_unicode_ci NOT NULL,
  `client_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `client_available` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`client_id`, `client_id_number`, `client_name`, `client_available`) VALUES
(1, '008234567', 'Marko Markovic', 0),
(2, '002356457', 'Nemanja Nikolic', 1),
(3, '003216547', 'Darko Darkovic', 1),
(24, '008568811', 'Nemanja Jankovic', 1),
(25, '008123456', 'Jovana Andrić', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rent`
--

CREATE TABLE `rent` (
  `rent_id` int(11) NOT NULL,
  `rent_user_id` int(11) NOT NULL,
  `rent_client_id` int(11) NOT NULL,
  `rent_car_id` int(11) NOT NULL,
  `rent_active` tinyint(1) NOT NULL DEFAULT '1',
  `rent_datetime_from` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rent_datetime_to` datetime DEFAULT NULL,
  `rent_fuel_start` decimal(10,2) NOT NULL,
  `rent_fuel_finish` decimal(10,2) DEFAULT NULL,
  `rent_km_start` decimal(10,2) NOT NULL,
  `rent_km_finish` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `rent`
--

INSERT INTO `rent` (`rent_id`, `rent_user_id`, `rent_client_id`, `rent_car_id`, `rent_active`, `rent_datetime_from`, `rent_datetime_to`, `rent_fuel_start`, `rent_fuel_finish`, `rent_km_start`, `rent_km_finish`) VALUES
(12, 1, 2, 2, 0, '2020-06-05 15:03:14', '2020-06-06 01:44:24', '0.00', '1.20', '0.00', '10.00'),
(15, 1, 1, 3, 1, '2020-06-10 18:05:58', NULL, '12.00', NULL, '80.00', NULL),
(16, 1, 25, 8, 0, '2020-06-10 18:39:32', '2020-06-12 18:45:13', '0.00', '0.00', '50.00', '60.00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `users_id` int(11) NOT NULL,
  `users_email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `users_password` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `users_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `users_role` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`users_id`, `users_email`, `users_password`, `users_name`, `users_role`) VALUES
(1, 'admin@admin.com', '$2b$10$HF9sj4Oub0GXIoJ8IrxXR.uBunooWOZi/nNeFJcPLC7qFZsutNfb2', 'Admin 1', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`car_id`),
  ADD UNIQUE KEY `car_registration_number` (`car_registration_number`),
  ADD KEY `car_make` (`car_make_id`),
  ADD KEY `car_model` (`car_model_id`),
  ADD KEY `car_category_id` (`car_category_id`),
  ADD KEY `car_fuel_type_id` (`car_fuel_type_id`);

--
-- Indexes for table `car_category`
--
ALTER TABLE `car_category`
  ADD PRIMARY KEY (`cc_id`),
  ADD UNIQUE KEY `cc_name` (`cc_name`);

--
-- Indexes for table `car_expense`
--
ALTER TABLE `car_expense`
  ADD PRIMARY KEY (`ce_id`),
  ADD KEY `ce_user_id` (`ce_user_id`),
  ADD KEY `ce_car_id` (`ce_car_id`);

--
-- Indexes for table `car_fuel_type`
--
ALTER TABLE `car_fuel_type`
  ADD PRIMARY KEY (`cft_id`),
  ADD UNIQUE KEY `cft_name` (`cft_name`);

--
-- Indexes for table `car_make`
--
ALTER TABLE `car_make`
  ADD PRIMARY KEY (`cm_id`);

--
-- Indexes for table `car_model`
--
ALTER TABLE `car_model`
  ADD PRIMARY KEY (`cm_id`),
  ADD KEY `cm_cm_id` (`cm_cm_id`);

--
-- Indexes for table `car_registration`
--
ALTER TABLE `car_registration`
  ADD PRIMARY KEY (`cr_id`),
  ADD KEY `cr_car_id` (`cr_car_id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`),
  ADD UNIQUE KEY `client_id_number` (`client_id_number`);

--
-- Indexes for table `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`rent_id`),
  ADD KEY `rent_client_id` (`rent_client_id`),
  ADD KEY `rent_car_id` (`rent_car_id`),
  ADD KEY `rent_user_id` (`rent_user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`users_id`),
  ADD UNIQUE KEY `user_email_unique` (`users_email`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `car_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `car_category`
--
ALTER TABLE `car_category`
  MODIFY `cc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `car_expense`
--
ALTER TABLE `car_expense`
  MODIFY `ce_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `car_fuel_type`
--
ALTER TABLE `car_fuel_type`
  MODIFY `cft_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `car_make`
--
ALTER TABLE `car_make`
  MODIFY `cm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `car_model`
--
ALTER TABLE `car_model`
  MODIFY `cm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `car_registration`
--
ALTER TABLE `car_registration`
  MODIFY `cr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `rent`
--
ALTER TABLE `rent`
  MODIFY `rent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `users_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `FK_2572075ff96b95e5a43071d4301` FOREIGN KEY (`car_make_id`) REFERENCES `car_make` (`cm_id`),
  ADD CONSTRAINT `FK_e6a51ce3fb55f8f5bbce61ff28e` FOREIGN KEY (`car_model_id`) REFERENCES `car_model` (`cm_id`),
  ADD CONSTRAINT `car_ibfk_1` FOREIGN KEY (`car_category_id`) REFERENCES `car_category` (`cc_id`),
  ADD CONSTRAINT `car_ibfk_2` FOREIGN KEY (`car_fuel_type_id`) REFERENCES `car_fuel_type` (`cft_id`);

--
-- Constraints for table `car_expense`
--
ALTER TABLE `car_expense`
  ADD CONSTRAINT `car_expense_ibfk_1` FOREIGN KEY (`ce_car_id`) REFERENCES `car` (`car_id`),
  ADD CONSTRAINT `car_expense_ibfk_2` FOREIGN KEY (`ce_user_id`) REFERENCES `user` (`users_id`);

--
-- Constraints for table `car_model`
--
ALTER TABLE `car_model`
  ADD CONSTRAINT `FK_dfd86e1be2b8c07602d367fd903` FOREIGN KEY (`cm_cm_id`) REFERENCES `car_make` (`cm_id`);

--
-- Constraints for table `car_registration`
--
ALTER TABLE `car_registration`
  ADD CONSTRAINT `car_registration_ibfk_1` FOREIGN KEY (`cr_car_id`) REFERENCES `car` (`car_id`);

--
-- Constraints for table `rent`
--
ALTER TABLE `rent`
  ADD CONSTRAINT `rent_ibfk_1` FOREIGN KEY (`rent_car_id`) REFERENCES `car` (`car_id`),
  ADD CONSTRAINT `rent_ibfk_2` FOREIGN KEY (`rent_client_id`) REFERENCES `client` (`client_id`),
  ADD CONSTRAINT `rent_ibfk_3` FOREIGN KEY (`rent_user_id`) REFERENCES `user` (`users_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
