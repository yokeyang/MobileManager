-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: mobile
-- ------------------------------------------------------
-- Server version	5.7.19-log

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
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` char(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` char(13) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Smanager` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
INSERT INTO `manager` VALUES (1,'yoke','MTIz',1);
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(10) NOT NULL,
  `tel` char(13) DEFAULT NULL,
  `address` char(20) DEFAULT NULL,
  `kind` char(8) DEFAULT NULL,
  `imgUrl` varchar(100) DEFAULT NULL,
  `finish` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES (1,'杨宇坤','13098878963','武汉工程大学','iphone6','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(2,'杨宇坤','13098878963','武汉工程大学','iphone6','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(3,'yokeyang','13098878963','wit','pixel','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(4,'yokeyang','13098878963','wit','pixel','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(5,'yoke','13098878963','wit','pixel','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(6,'yoke','13098878963','wit','pixel','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(7,'yoke','13098878963','wit','pixel','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(8,'yoke','13098878963','wit','pixel','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(9,'yokeyang','13098878963','wit','pixel','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(10,'yokeyang','13098878963','wit','pixel','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(11,'yokeyang','13098878963','wit','pixel','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(12,'yokeyang','13098878963','wit','pixel','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(13,'yokeyang','13098878963','wit','iphone6p','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(14,'yokeyang','13098878963','wit','iphone6p','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(15,'yokeyang','13098878963','wit','iphone6p','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0),(16,'yokeyang','13098878963','wit','iphone6p','http://owmdzsjg2.bkt.clouddn.com/iOS-11-main.png',0);
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-13 11:41:04