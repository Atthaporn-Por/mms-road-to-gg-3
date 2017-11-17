CREATE DATABASE  IF NOT EXISTS `gettaxi` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `gettaxi`;
-- MySQL dump 10.13  Distrib 5.7.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gettaxi
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_book`
--

DROP TABLE IF EXISTS `account_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_book` (
  `id_account_book` int(11) NOT NULL AUTO_INCREMENT,
  `account_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `account_number` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_account_book`),
  UNIQUE KEY `id_account_book_UNIQUE` (`id_account_book`),
  KEY `account_of_driver` (`phone`),
  CONSTRAINT `account_of_driver` FOREIGN KEY (`phone`) REFERENCES `driver` (`phone`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_book`
--

LOCK TABLES `account_book` WRITE;
/*!40000 ALTER TABLE `account_book` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversation`
--

DROP TABLE IF EXISTS `conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conversation` (
  `id_reservation` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `speaker` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `text` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_reservation`,`time`),
  KEY `speaker` (`speaker`),
  CONSTRAINT `con_in_reserve` FOREIGN KEY (`id_reservation`) REFERENCES `reservation` (`id_reservation`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `speaker` FOREIGN KEY (`speaker`) REFERENCES `member` (`phone`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation`
--

LOCK TABLES `conversation` WRITE;
/*!40000 ALTER TABLE `conversation` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driver` (
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `status` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `license_no` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `ssn` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `driver_permission_id` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`phone`),
  UNIQUE KEY `license_no_UNIQUE` (`license_no`),
  UNIQUE KEY `driver_permission_id_UNIQUE` (`driver_permission_id`),
  CONSTRAINT `member_as_driver` FOREIGN KEY (`phone`) REFERENCES `member` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES ('0905911782',1,'online','123456789','44531','123456789');
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `garage`
--

DROP TABLE IF EXISTS `garage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `garage` (
  `id_garage` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_garage`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garage`
--

LOCK TABLES `garage` WRITE;
/*!40000 ALTER TABLE `garage` DISABLE KEYS */;
INSERT INTO `garage` VALUES ('999666333','garage number 1'),('888555222','garage number 2');
/*!40000 ALTER TABLE `garage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `latitude` decimal(9,6) NOT NULL,
  `longtitude` decimal(9,6) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idx_location` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`latitude`,`longtitude`),
  UNIQUE KEY `idx_location_UNIQUE` (`idx_location`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (13.737167,100.533187,'Faculty of Engineering, Chulalongkorn University',1),(13.743993,100.520790,'Rongmueng Apartment',2);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `facebook_id` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`phone`),
  UNIQUE KEY `facebook_id_UNIQUE` (`facebook_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('0802281312','f47a2f73a5a0b11bec357163b97fac6db2be67873ffafe49583db4f81610457e','2538-10-04','orraphan.op','orraphan.p@gmail.com','Siam Park','Orraphan','Phoengamwong'),('0905911782','11c096897fd4fe4244590f68e17411ab25899c7f1b2fff4ad3265100107afcc7','2538-10-05','mikerfour','thuchchai.mikep@hotmail.com','Chamcuri Square','Thuchchai','Jiamsorn'),('0913627076','d1826fcc4279de078184b47c047c27f23aa3a9ff5fddbeee8944f81adf9da31c','2538-10-03','atthaporn.phinitnart','qwertygms@hotmail.com','69 RuengMueng Bangkok','Atthaporn','Phinitnart');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `id_notification` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `release_date` date NOT NULL,
  `image_path` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_notification`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recieved`
--

DROP TABLE IF EXISTS `recieved`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recieved` (
  `id_notification` int(11) NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `isviewed` enum('seen','unseen') COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_notification`,`phone`),
  KEY `phone` (`phone`),
  CONSTRAINT `id_notification` FOREIGN KEY (`id_notification`) REFERENCES `notification` (`id_notification`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `phone` FOREIGN KEY (`phone`) REFERENCES `member` (`phone`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recieved`
--

LOCK TABLES `recieved` WRITE;
/*!40000 ALTER TABLE `recieved` DISABLE KEYS */;
/*!40000 ALTER TABLE `recieved` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report` (
  `id_reservation` int(11) NOT NULL,
  `comment` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_reservation`),
  CONSTRAINT `report_of_reservation` FOREIGN KEY (`id_reservation`) REFERENCES `reservation` (`id_reservation`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_type`
--

DROP TABLE IF EXISTS `report_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_type` (
  `type` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `id_report` int(11) NOT NULL,
  PRIMARY KEY (`type`,`name`),
  KEY `type_of_report_idx` (`id_report`),
  CONSTRAINT `type_of_report` FOREIGN KEY (`id_report`) REFERENCES `report` (`id_reservation`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_type`
--

LOCK TABLES `report_type` WRITE;
/*!40000 ALTER TABLE `report_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `report_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservation` (
  `id_reservation` int(11) NOT NULL AUTO_INCREMENT,
  `user_phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `driver_phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_reservation`),
  KEY `user_phone` (`user_phone`),
  KEY `driver_phone` (`driver_phone`),
  CONSTRAINT `driver_phone` FOREIGN KEY (`driver_phone`) REFERENCES `driver` (`phone`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_phone` FOREIGN KEY (`user_phone`) REFERENCES `user` (`phone`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1,'0913627076','0905911782'),(2,'0802281312','0905911782');
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `id_reservation` int(11) NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `comment` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rating` enum('0','1','2','3','4','5') COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_reservation`),
  KEY `phone_of_driver` (`phone`),
  CONSTRAINT `phone_of_driver` FOREIGN KEY (`phone`) REFERENCES `driver` (`phone`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `review_of_reservation` FOREIGN KEY (`id_reservation`) REFERENCES `reservation` (`id_reservation`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcriber_driver`
--

DROP TABLE IF EXISTS `subcriber_driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcriber_driver` (
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `real_time_lat_location` decimal(9,6) DEFAULT NULL,
  `real_time_long_location` decimal(9,6) DEFAULT NULL,
  `direction` decimal(9,6) DEFAULT NULL,
  PRIMARY KEY (`phone`),
  CONSTRAINT `driver_online` FOREIGN KEY (`phone`) REFERENCES `driver` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcriber_driver`
--

LOCK TABLES `subcriber_driver` WRITE;
/*!40000 ALTER TABLE `subcriber_driver` DISABLE KEYS */;
/*!40000 ALTER TABLE `subcriber_driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcriber_user`
--

DROP TABLE IF EXISTS `subcriber_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcriber_user` (
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `real_time_lat_location` decimal(9,6) DEFAULT NULL,
  `real_time_long_location` decimal(9,6) DEFAULT NULL,
  `direction` decimal(9,6) DEFAULT NULL,
  PRIMARY KEY (`phone`),
  CONSTRAINT `user_online` FOREIGN KEY (`phone`) REFERENCES `user` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcriber_user`
--

LOCK TABLES `subcriber_user` WRITE;
/*!40000 ALTER TABLE `subcriber_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `subcriber_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taxi`
--

DROP TABLE IF EXISTS `taxi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taxi` (
  `id_taxi` int(11) NOT NULL AUTO_INCREMENT,
  `make` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `model` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `type_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `id_garage` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_taxi`),
  KEY `type_of_taxi` (`type_name`),
  KEY `driver_of_taxi` (`phone`),
  KEY `garage_of_taxi` (`id_garage`),
  CONSTRAINT `driver_of_taxi` FOREIGN KEY (`phone`) REFERENCES `driver` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `garage_of_taxi` FOREIGN KEY (`id_garage`) REFERENCES `garage` (`id_garage`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `type_of_taxi` FOREIGN KEY (`type_name`) REFERENCES `taxi_type` (`type_name`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taxi`
--

LOCK TABLES `taxi` WRITE;
/*!40000 ALTER TABLE `taxi` DISABLE KEYS */;
/*!40000 ALTER TABLE `taxi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taxi_type`
--

DROP TABLE IF EXISTS `taxi_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taxi_type` (
  `type_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `id_garage` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`type_name`,`id_garage`),
  KEY `type_in_garage` (`id_garage`),
  CONSTRAINT `type_in_garage` FOREIGN KEY (`id_garage`) REFERENCES `garage` (`id_garage`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taxi_type`
--

LOCK TABLES `taxi_type` WRITE;
/*!40000 ALTER TABLE `taxi_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `taxi_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip`
--

DROP TABLE IF EXISTS `trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trip` (
  `id_trip` int(11) NOT NULL AUTO_INCREMENT,
  `pick_up_location` int(11) NOT NULL,
  `drof_off_location` int(11) NOT NULL,
  `distance` double NOT NULL,
  `duration` time NOT NULL,
  `fare` int(11) NOT NULL,
  PRIMARY KEY (`id_trip`),
  KEY `pick_detail_location_idx` (`pick_up_location`),
  KEY `drop_detail_location_idx` (`drof_off_location`),
  CONSTRAINT `drop_detail_location` FOREIGN KEY (`drof_off_location`) REFERENCES `location` (`idx_location`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_reservation` FOREIGN KEY (`id_trip`) REFERENCES `reservation` (`id_reservation`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `pick_detail_location` FOREIGN KEY (`pick_up_location`) REFERENCES `location` (`idx_location`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (1,1,2,1600,'00:10:00',40),(2,2,1,1600,'00:10:00',30);
/*!40000 ALTER TABLE `trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id_payment` int(11) NOT NULL AUTO_INCREMENT,
  `ccn` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `cvv` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `exp_date` date NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_payment`),
  UNIQUE KEY `ccn_UNIQUE` (`ccn`),
  KEY `sd_idx` (`phone`),
  CONSTRAINT `member_as_user` FOREIGN KEY (`phone`) REFERENCES `member` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'1234567890123456','123','2560-01-01','0802281312'),(2,'1234567890654321','999','2560-01-02','0913627076');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-17 18:10:58
