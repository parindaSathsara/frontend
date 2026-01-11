CREATE DATABASE  IF NOT EXISTS `shwomens` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shwomens`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shwomens
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `album_product`
--

DROP TABLE IF EXISTS `album_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album_product` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `album_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `variant_id` bigint unsigned DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `album_product_album_id_product_id_variant_id_unique` (`album_id`,`product_id`,`variant_id`),
  KEY `album_product_product_id_foreign` (`product_id`),
  KEY `album_product_variant_id_foreign` (`variant_id`),
  CONSTRAINT `album_product_album_id_foreign` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE,
  CONSTRAINT `album_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `album_product_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album_product`
--

LOCK TABLES `album_product` WRITE;
/*!40000 ALTER TABLE `album_product` DISABLE KEYS */;
INSERT INTO `album_product` VALUES (1,1,15,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(2,1,12,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(3,1,2,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(4,2,2,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(5,2,1,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(6,2,3,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(7,2,12,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(8,3,4,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(9,3,13,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(10,3,11,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(11,3,7,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(12,3,15,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(13,3,3,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(14,4,1,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(15,4,6,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(16,4,4,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(17,5,1,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(18,5,9,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(19,5,5,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(20,5,10,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(21,5,7,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(22,5,6,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(23,5,2,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(24,5,8,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(25,6,5,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(26,6,7,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(27,6,11,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(28,6,12,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(29,6,4,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(30,6,14,NULL,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57');
/*!40000 ALTER TABLE `album_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `cover_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount_percentage` decimal(5,2) NOT NULL DEFAULT '0.00',
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `albums_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (1,'Bridal Collection 2026','bridal-collection-2026','Exquisite bridal wear collection featuring stunning sarees, jewelry sets, and accessories for the modern bride.','https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80',NULL,0.00,1,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(2,'Summer Elegance','summer-elegance','Light and breezy collection perfect for summer occasions. Featuring pastel sarees and delicate jewelry.','https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&q=80',NULL,0.00,1,1,0,'2026-01-04 03:42:57','2026-01-11 01:41:14'),(3,'Festival Favorites','festival-favorites','Celebrate every festival in style with our curated collection of vibrant sarees and traditional jewelry.','https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&q=80',NULL,0.00,1,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(4,'Office Chic','office-chic','Professional yet elegant pieces for the working woman. Subtle colors and sophisticated designs.','https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80',NULL,0.00,0,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(5,'Heritage Gold','heritage-gold','Timeless gold jewelry inspired by ancient Indian heritage. Crafted for generations.','https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80',NULL,0.00,1,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(6,'Contemporary Fusion','contemporary-fusion','Where tradition meets modernity. Indo-western styles for the global Indian woman.','https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=80',NULL,0.00,0,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57');
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('main','secondary','promotional') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'main',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  `variant_id` bigint unsigned DEFAULT NULL,
  `album_id` bigint unsigned DEFAULT NULL,
  `item_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_items_product_id_foreign` (`product_id`),
  KEY `cart_items_variant_id_foreign` (`variant_id`),
  KEY `cart_items_album_id_foreign` (`album_id`),
  KEY `cart_items_cart_id_index` (`cart_id`),
  CONSTRAINT `cart_items_album_id_foreign` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (6,1,2,NULL,NULL,'product',1,24999.00,24999.00,'2026-01-11 03:57:09','2026-01-11 03:57:09'),(7,1,3,NULL,NULL,'product',1,3999.00,3999.00,'2026-01-11 04:16:20','2026-01-11 04:16:20'),(8,1,5,NULL,NULL,'product',1,5499.00,5499.00,'2026-01-11 04:16:22','2026-01-11 04:16:22'),(9,1,NULL,NULL,2,'album',1,45496.00,45496.00,'2026-01-11 04:27:27','2026-01-11 04:27:27');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tax` decimal(10,2) NOT NULL DEFAULT '0.00',
  `shipping` decimal(10,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `coupon_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_user_id_index` (`user_id`),
  KEY `carts_session_id_index` (`session_id`),
  CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,1,NULL,79993.00,14398.74,0.00,0.00,94391.74,NULL,'2026-01-11 00:44:19','2026-01-11 04:27:27'),(2,3,NULL,0.00,0.00,50.00,0.00,50.00,NULL,'2026-01-11 01:54:09','2026-01-11 02:47:09');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` bigint unsigned DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`),
  KEY `categories_parent_id_foreign` (`parent_id`),
  CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Sarees','sarees','Beautiful traditional and modern sarees',NULL,NULL,1,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(2,'Silk Sarees','silk-sarees',NULL,NULL,1,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(3,'Cotton Sarees','cotton-sarees',NULL,NULL,1,1,0,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(4,'Shirts','shirts','Stylish shirts for every occasion',NULL,NULL,1,2,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(5,'Jewelry','jewelry','Exquisite jewelry collection',NULL,NULL,1,3,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(6,'Bangles','bangles',NULL,NULL,5,1,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(7,'Cuff Bracelets','cuff-bracelets',NULL,NULL,5,1,2,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(8,'Earrings','earrings',NULL,NULL,5,1,3,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(9,'Anklets','anklets',NULL,NULL,5,1,4,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(10,'Rings','rings',NULL,NULL,5,1,5,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(11,'Jewelry Sets','jewelry-sets',NULL,NULL,5,1,6,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(12,'Kids Jewelry','kids-jewelry',NULL,NULL,5,1,7,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(13,'Nose Studs','nose-studs',NULL,NULL,5,1,8,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(14,'Toe Rings','toe-rings',NULL,NULL,5,1,9,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(15,'Necklaces','necklaces',NULL,NULL,5,1,10,'2026-01-04 03:42:57','2026-01-04 03:42:57');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('percentage','fixed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `min_purchase_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `max_discount_amount` decimal(10,2) DEFAULT NULL,
  `usage_limit` int DEFAULT NULL,
  `usage_per_user` int NOT NULL DEFAULT '1',
  `used_count` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `coupons_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `variant_id` bigint unsigned DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `reserved_quantity` int NOT NULL DEFAULT '0',
  `low_stock_threshold` int NOT NULL DEFAULT '10',
  `track_inventory` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `inventory_product_id_variant_id_unique` (`product_id`,`variant_id`),
  KEY `inventory_variant_id_foreign` (`variant_id`),
  CONSTRAINT `inventory_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inventory_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,1,NULL,100,0,10,1,'2026-01-04 03:42:57','2026-01-11 01:17:54'),(2,2,NULL,17,0,5,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(3,3,NULL,74,1,5,1,'2026-01-04 03:42:57','2026-01-11 02:47:08'),(4,4,NULL,77,0,5,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(5,5,NULL,16,0,5,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(6,6,NULL,68,0,5,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(7,7,NULL,13,0,5,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(8,8,NULL,78,0,5,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(9,9,NULL,53,0,5,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(10,10,NULL,96,0,5,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(11,11,NULL,53,0,5,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(12,12,NULL,57,0,5,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(13,13,NULL,12,0,5,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(14,14,NULL,96,0,5,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(15,15,NULL,47,0,5,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(16,16,NULL,13,0,10,1,'2026-01-11 01:19:51','2026-01-11 01:19:51'),(17,17,NULL,15,0,10,1,'2026-01-11 01:21:55','2026-01-11 01:21:55'),(18,19,NULL,123123,0,10,1,'2026-01-11 01:43:32','2026-01-11 01:43:32'),(19,20,NULL,1233,0,10,1,'2026-01-11 01:48:27','2026-01-11 03:23:13');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_100000_create_password_reset_tokens_table',1),(2,'2019_08_19_000000_create_failed_jobs_table',1),(3,'2019_12_14_000001_create_personal_access_tokens_table',1),(4,'2024_01_01_000001_create_roles_table',1),(5,'2024_01_01_000002_create_permissions_table',1),(6,'2024_01_01_000003_create_role_permission_table',1),(7,'2024_01_01_000004_create_users_table',1),(8,'2024_01_01_000005_create_categories_table',1),(9,'2024_01_01_000006_create_products_table',1),(10,'2024_01_01_000007_create_product_variants_table',1),(11,'2024_01_01_000008_create_product_images_table',1),(12,'2024_01_01_000009_create_inventory_table',1),(13,'2024_01_01_000010_create_albums_table',1),(14,'2024_01_01_000011_create_album_product_table',1),(15,'2024_01_01_000012_create_carts_table',1),(16,'2024_01_01_000013_create_cart_items_table',1),(17,'2024_01_01_000014_create_orders_table',1),(18,'2024_01_01_000015_create_order_items_table',1),(19,'2024_01_01_000016_create_payments_table',1),(20,'2024_01_01_000017_create_reviews_table',1),(21,'2024_01_01_000018_create_wishlists_table',1),(22,'2024_01_01_000019_create_banners_table',1),(23,'2024_01_01_000020_create_coupons_table',1),(24,'2024_01_01_000021_create_settings_table',1),(25,'2024_01_01_000022_create_variation_options_table',2),(26,'2024_01_01_000023_add_bank_transfer_fields_to_payments_table',3),(28,'2024_01_01_000023_create_variation_types_table',4),(29,'2024_01_01_000024_update_variation_options_for_dynamic_types',5),(30,'2024_01_01_000025_create_product_variant_options_table',5),(31,'2024_01_01_000026_update_product_variants_remove_hardcoded_fields',5);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  `variant_id` bigint unsigned DEFAULT NULL,
  `album_id` bigint unsigned DEFAULT NULL,
  `item_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `meta_data` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  KEY `order_items_variant_id_foreign` (`variant_id`),
  KEY `order_items_album_id_foreign` (`album_id`),
  KEY `order_items_order_id_index` (`order_id`),
  CONSTRAINT `order_items_album_id_foreign` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE SET NULL,
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL,
  CONSTRAINT `order_items_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,3,NULL,NULL,'product','Chanderi Cotton Silk Saree','SKU-O5LGHMIO',1,3999.00,3999.00,'{\"size\": null, \"color\": null, \"variant\": null, \"material\": null}','2026-01-11 02:47:08','2026-01-11 02:47:08');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `tax` decimal(10,2) NOT NULL DEFAULT '0.00',
  `shipping` decimal(10,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','shipped','delivered','cancelled','refunded') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `payment_status` enum('pending','paid','failed','refunded') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `shipping_first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `coupon_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipped_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_order_number_unique` (`order_number`),
  KEY `orders_user_id_index` (`user_id`),
  KEY `orders_order_number_index` (`order_number`),
  KEY `orders_status_index` (`status`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'ORD-20260111-4EAF6D',3,3999.00,719.82,0.00,0.00,4718.82,'refunded','pending','Parinda','Sathsara','customer@test.com','0772897856','No. 249/F3 Mountplesent Estate, Hapugala','Galle','Test','80000','Sri Lanka','Parinda','Sathsara','customer@test.com','0772897856','No. 249/F3 Mountplesent Estate, Hapugala','Galle','Test','80000','Sri Lanka','Test',NULL,NULL,NULL,NULL,'2026-01-11 02:47:08','2026-01-11 03:25:38',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','completed','failed','refunded') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `gateway` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gateway_response` json DEFAULT NULL,
  `payment_slip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_reference` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slip_uploaded_at` timestamp NULL DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `verified_by` bigint unsigned DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payments_transaction_id_unique` (`transaction_id`),
  KEY `payments_order_id_index` (`order_id`),
  KEY `payments_transaction_id_index` (`transaction_id`),
  KEY `payments_verified_by_foreign` (`verified_by`),
  CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payments_verified_by_foreign` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,NULL,'bank_transfer',4718.82,'pending',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-01-11 02:47:08','2026-01-11 02:47:08');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'view_products','View Products',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(2,'create_products','Create Products',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(3,'edit_products','Edit Products',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(4,'delete_products','Delete Products',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(5,'view_categories','View Categories',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(6,'create_categories','Create Categories',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(7,'edit_categories','Edit Categories',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(8,'delete_categories','Delete Categories',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(9,'view_albums','View Albums',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(10,'create_albums','Create Albums',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(11,'edit_albums','Edit Albums',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(12,'delete_albums','Delete Albums',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(13,'view_orders','View Orders',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(14,'edit_orders','Edit Orders',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(15,'delete_orders','Delete Orders',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(16,'view_customers','View Customers',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(17,'edit_customers','Edit Customers',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(18,'delete_customers','Delete Customers',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(19,'view_inventory','View Inventory',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(20,'manage_inventory','Manage Inventory',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(21,'view_analytics','View Analytics',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(22,'view_reports','View Reports',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(23,'view_reviews','View Reviews',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(24,'approve_reviews','Approve Reviews',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(25,'delete_reviews','Delete Reviews',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(26,'manage_banners','Manage Banners',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(27,'manage_coupons','Manage Coupons',NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (5,'App\\Models\\User',1,'auth-token','4cd34b052c80a4d07560822ae01390147112ea43d67699cf82bbebc26fb90ed9','[\"*\"]','2026-01-11 01:22:03',NULL,'2026-01-11 01:03:22','2026-01-11 01:22:03'),(6,'App\\Models\\User',1,'auth-token','04715e9675f8a55453c0bedd5c96073e6ea8f76b40ff3a71aba803fe55d23947','[\"*\"]','2026-01-11 01:03:45',NULL,'2026-01-11 01:03:45','2026-01-11 01:03:45');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `variant_id` bigint unsigned DEFAULT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_primary` tinyint(1) NOT NULL DEFAULT '0',
  `sort_order` int NOT NULL DEFAULT '0',
  `alt_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_images_product_id_foreign` (`product_id`),
  KEY `product_images_variant_id_foreign` (`variant_id`),
  CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_images_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,NULL,'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',NULL,1,0,'Banarasi Silk Saree - Royal Red','2026-01-04 03:42:57','2026-01-04 03:42:57'),(2,2,NULL,'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',NULL,1,0,'Kanjivaram Pure Silk Saree','2026-01-04 03:42:57','2026-01-04 03:42:57'),(3,3,NULL,'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80',NULL,1,0,'Chanderi Cotton Silk Saree','2026-01-04 03:42:57','2026-01-04 03:42:57'),(4,4,NULL,'https://images.unsplash.com/photo-1583391733981-8b530c6d14c6?w=800&q=80',NULL,1,0,'Patola Double Ikat Saree','2026-01-04 03:42:57','2026-01-04 03:42:57'),(5,5,NULL,'https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=800&q=80',NULL,1,0,'Organza Floral Print Saree','2026-01-04 03:42:57','2026-01-04 03:42:57'),(6,6,NULL,'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',NULL,1,0,'Kundan Bridal Necklace Set','2026-01-04 03:42:57','2026-01-04 03:42:57'),(7,7,NULL,'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80',NULL,1,0,'Temple Gold Jhumkas','2026-01-04 03:42:57','2026-01-04 03:42:57'),(8,8,NULL,'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',NULL,1,0,'Pearl Choker Necklace','2026-01-04 03:42:57','2026-01-04 03:42:57'),(9,9,NULL,'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',NULL,1,0,'Diamond Studded Bangles','2026-01-04 03:42:57','2026-01-04 03:42:57'),(10,10,NULL,'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&q=80',NULL,1,0,'Meenakari Hoop Earrings','2026-01-04 03:42:57','2026-01-04 03:42:57'),(11,11,NULL,'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',NULL,1,0,'Silk Blend Designer Shirt','2026-01-04 03:42:57','2026-01-04 03:42:57'),(12,12,NULL,'https://images.unsplash.com/photo-1583391733956-6a1e6a5a6b8b?w=800&q=80',NULL,1,0,'Embroidered Cotton Kurti','2026-01-04 03:42:57','2026-01-04 03:42:57'),(13,13,NULL,'https://images.unsplash.com/photo-1551163943-3f7e29e0ae38?w=800&q=80',NULL,1,0,'Block Print Tunic Top','2026-01-04 03:42:57','2026-01-04 03:42:57'),(14,14,NULL,'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',NULL,1,0,'Chikankari White Kurta','2026-01-04 03:42:57','2026-01-04 03:42:57'),(15,15,NULL,'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=800&q=80',NULL,1,0,'Bandhani Print Blouse','2026-01-04 03:42:57','2026-01-04 03:42:57'),(16,16,NULL,'products/2Mn6SNWR72MUslHEpvao9gwUz0MDaoAid8ql3vZ7.png',NULL,1,0,'Test','2026-01-11 01:19:51','2026-01-11 01:19:51'),(17,17,NULL,'products/0OJAn8UOkUm0W1t62cRl1m4PyDppjBPyTqVRIoh7.png',NULL,1,0,'Parinda','2026-01-11 01:21:55','2026-01-11 01:21:55'),(18,19,NULL,'products/QJmErSG5KyWbtD2il5KPRX5ongtMbnN8PzEk0w8R.png',NULL,1,0,'Testasdasdasd','2026-01-11 01:43:32','2026-01-11 01:43:32'),(19,20,NULL,'products/iX1P69kCqL3r5ggFaIvgqVCFXnyTEnx52HMomeyw.png',NULL,1,0,'Data TResttt','2026-01-11 01:48:27','2026-01-11 01:48:27');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variant_options`
--

DROP TABLE IF EXISTS `product_variant_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_variant_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_variant_id` bigint unsigned NOT NULL,
  `variation_type_id` bigint unsigned NOT NULL,
  `variation_option_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `variant_variation_unique` (`product_variant_id`,`variation_type_id`),
  KEY `product_variant_options_variation_type_id_foreign` (`variation_type_id`),
  KEY `product_variant_options_variation_option_id_foreign` (`variation_option_id`),
  CONSTRAINT `product_variant_options_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_variant_options_variation_option_id_foreign` FOREIGN KEY (`variation_option_id`) REFERENCES `variation_options` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_variant_options_variation_type_id_foreign` FOREIGN KEY (`variation_type_id`) REFERENCES `variation_types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variant_options`
--

LOCK TABLES `product_variant_options` WRITE;
/*!40000 ALTER TABLE `product_variant_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_variant_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_variants` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `variant_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_adjustment` decimal(10,2) NOT NULL DEFAULT '0.00',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_variants_sku_unique` (`sku`),
  KEY `product_variants_product_id_foreign` (`product_id`),
  CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants`
--

LOCK TABLES `product_variants` WRITE;
/*!40000 ALTER TABLE `product_variants` DISABLE KEYS */;
INSERT INTO `product_variants` VALUES (1,20,'12343123132','Green / XXL / Chiffon',1231.00,NULL,1,'2026-01-11 01:48:27','2026-01-11 01:48:27');
/*!40000 ALTER TABLE `product_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `is_trending` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `meta_data` json DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text COLLATE utf8mb4_unicode_ci,
  `meta_keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  UNIQUE KEY `products_sku_unique` (`sku`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'Banarasi Silk Saree - Royal Red','banarasi-silk-saree-royal-red','SKU-MY4ZVC6I','Exquisite handwoven Banarasi silk saree with intricate gold zari work. Perfect for weddings and special occasions.',NULL,15999.00,13999.00,NULL,1,0,0,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-11 03:23:36',NULL),(2,1,'Kanjivaram Pure Silk Saree','kanjivaram-pure-silk-saree','SKU-LSZ7GDMO','Authentic Kanjivaram saree with traditional temple border and rich pallu design.',NULL,24999.00,NULL,NULL,1,0,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(3,1,'Chanderi Cotton Silk Saree','chanderi-cotton-silk-saree','SKU-O5LGHMIO','Lightweight Chanderi saree with delicate butis and elegant border. Ideal for office and casual occasions.',NULL,4999.00,3999.00,NULL,0,1,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(4,1,'Patola Double Ikat Saree','patola-double-ikat-saree','SKU-OOEJSAIQ','Rare Patola saree featuring traditional geometric patterns in vibrant colors.',NULL,45000.00,NULL,NULL,1,0,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(5,1,'Organza Floral Print Saree','organza-floral-print-saree','SKU-EKGD93GU','Modern organza saree with beautiful floral prints and sequin work.',NULL,6999.00,5499.00,NULL,0,1,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(6,5,'Kundan Bridal Necklace Set','kundan-bridal-necklace-set','SKU-SYH3DGDB','Stunning bridal kundan necklace with matching earrings and maang tikka. Crafted with precision.',NULL,35000.00,29999.00,NULL,1,1,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(7,5,'Temple Gold Jhumkas','temple-gold-jhumkas','SKU-VS8TPEKC','Traditional temple design gold-plated jhumkas with intricate craftsmanship.',NULL,8999.00,NULL,NULL,1,0,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(8,5,'Pearl Choker Necklace','pearl-choker-necklace','SKU-9ULRHTCN','Elegant freshwater pearl choker with gold accents. Perfect for any occasion.',NULL,12999.00,9999.00,NULL,0,1,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(9,5,'Diamond Studded Bangles','diamond-studded-bangles','SKU-ZHUYAFXN','Set of 4 exquisite bangles studded with American diamonds in gold finish.',NULL,18999.00,NULL,NULL,1,0,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(10,5,'Meenakari Hoop Earrings','meenakari-hoop-earrings','SKU-O5RPFESE','Colorful meenakari work on traditional hoop earrings with antique finish.',NULL,3999.00,2999.00,NULL,0,1,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(11,4,'Silk Blend Designer Shirt','silk-blend-designer-shirt','SKU-QPEOIRQS','Premium silk blend shirt with subtle shimmer. Perfect for formal and festive occasions.',NULL,4999.00,3999.00,NULL,1,1,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(12,4,'Embroidered Cotton Kurti','embroidered-cotton-kurti','SKU-AWVAUUZV','Hand-embroidered cotton kurti with mirror work and traditional patterns.',NULL,2499.00,NULL,NULL,1,0,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(13,4,'Block Print Tunic Top','block-print-tunic-top','SKU-91KXYTL0','Handcrafted block print tunic with three-quarter sleeves and side slits.',NULL,1999.00,1499.00,NULL,0,1,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(14,4,'Chikankari White Kurta','chikankari-white-kurta','SKU-26NANSYR','Lucknowi Chikankari hand-embroidered kurta in pure cotton. Timeless elegance.',NULL,5999.00,NULL,NULL,1,0,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(15,4,'Bandhani Print Blouse','bandhani-print-blouse','SKU-YIRPSKHC','Vibrant bandhani print blouse with modern cut and traditional appeal.',NULL,1799.00,1299.00,NULL,0,1,1,0,NULL,NULL,NULL,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(16,1,'Test','test','123123','Test','Test',1231.00,123.00,123.00,0,0,1,0,NULL,'sdasd','asdasd',NULL,'2026-01-11 01:19:51','2026-01-11 01:19:51',NULL),(17,5,'Parinda','parinda','Test','Test','Test',12312.00,12312.00,123123.00,0,0,1,0,NULL,'Test','test',NULL,'2026-01-11 01:21:55','2026-01-11 01:21:55',NULL),(19,12,'Testasdasdasd','testasdasdasd','Testasdasd','Test','Test',1231.00,123.00,123123.00,0,0,1,0,NULL,'asdasd','asdasdasd',NULL,'2026-01-11 01:43:32','2026-01-11 01:43:32',NULL),(20,13,'Data TResttt','data-tresttt','Test123132123','Test','Test',122312.00,123123.00,123.00,1,1,1,0,NULL,'123123','1231231',NULL,'2026-01-11 01:48:27','2026-01-11 01:48:27',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `order_id` bigint unsigned DEFAULT NULL,
  `rating` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `is_verified_purchase` tinyint(1) NOT NULL DEFAULT '0',
  `is_approved` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reviews_product_id_user_id_unique` (`product_id`,`user_id`),
  KEY `reviews_user_id_foreign` (`user_id`),
  KEY `reviews_order_id_foreign` (`order_id`),
  KEY `reviews_product_id_index` (`product_id`),
  KEY `reviews_is_approved_created_at_index` (`is_approved`,`created_at`),
  CONSTRAINT `reviews_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL,
  CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_id` bigint unsigned NOT NULL,
  `permission_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_permission_role_id_permission_id_unique` (`role_id`,`permission_id`),
  KEY `role_permission_permission_id_foreign` (`permission_id`),
  CONSTRAINT `role_permission_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_permission_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES (1,1,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(2,1,2,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(3,1,3,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(4,1,4,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(5,1,5,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(6,1,6,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(7,1,7,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(8,1,8,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(9,1,9,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(10,1,10,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(11,1,11,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(12,1,12,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(13,1,13,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(14,1,14,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(15,1,15,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(16,1,16,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(17,1,17,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(18,1,18,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(19,1,19,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(20,1,20,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(21,1,21,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(22,1,22,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(23,1,23,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(24,1,24,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(25,1,25,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(26,1,26,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(27,1,27,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(28,2,1,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(29,2,2,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(30,2,3,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(31,2,4,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(32,2,5,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(33,2,6,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(34,2,7,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(35,2,8,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(36,2,9,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(37,2,10,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(38,2,11,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(39,2,12,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(40,2,13,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(41,2,14,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(42,2,16,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(43,2,17,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(44,2,19,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(45,2,20,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(46,2,21,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(47,2,22,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(48,2,23,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(49,2,24,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(50,2,25,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(51,2,26,'2026-01-04 03:42:57','2026-01-04 03:42:57'),(52,2,27,'2026-01-04 03:42:57','2026-01-04 03:42:57');
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'super_admin','Super Admin','Full system access','2026-01-04 03:42:57','2026-01-04 03:42:57'),(2,'admin','Admin','Admin access to manage products, orders, and customers','2026-01-04 03:42:57','2026-01-04 03:42:57'),(3,'customer','Customer','Customer account for shopping','2026-01-04 03:42:57','2026-01-04 03:42:57');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'string',
  `group` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_id` bigint unsigned NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'India',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_role_id_foreign` (`role_id`),
  CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'Super','Admin','superadmin@shwomens.com',NULL,'$2y$12$YgsTWU9FkY3DpxLbTDZPnO6/2jDdp58dbMSQv954kmxO5wUh/C3BW','9876543210',NULL,NULL,NULL,NULL,'India',1,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(2,2,'Admin','User','admin@shwomens.com',NULL,'$2y$12$04Jat/Cq2BWPQr2Mgd/0/OdYYOol8iNaFzKp0rU76Vl/r2OJTIz2G','9876543211',NULL,NULL,NULL,NULL,'India',1,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL),(3,3,'Test','Customer','customer@test.com',NULL,'$2y$12$nZ0kEONYBf7UD.u10IIZH.8T1wpgD2mprOD3EoyHyOsQiCWQB2uWK','9876543212','123 Test Street','Mumbai','Maharashtra','400001','India',1,NULL,'2026-01-04 03:42:57','2026-01-04 03:42:57',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variation_options`
--

DROP TABLE IF EXISTS `variation_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variation_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `variation_type_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `variation_options_variation_type_id_name_unique` (`variation_type_id`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variation_options`
--

LOCK TABLES `variation_options` WRITE;
/*!40000 ALTER TABLE `variation_options` DISABLE KEYS */;
INSERT INTO `variation_options` VALUES (1,0,'Red','#DC2626','0',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(2,0,'Blue','#2563EB','1',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(3,0,'Green','#16A34A','2',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(4,0,'Black','#000000','3',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(5,0,'White','#FFFFFF','4',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(6,0,'Gold','#D4AF37','5',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(7,0,'Silver','#C0C0C0','6',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(8,0,'Pink','#EC4899','7',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(9,0,'Purple','#9333EA','8',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(10,0,'Orange','#F97316','9',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(11,0,'Yellow','#EAB308','10',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(12,0,'Navy','#1E3A8A','11',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(13,0,'Maroon','#7F1D1D','12',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(14,0,'Beige','#D4C5A9','13',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(15,0,'Cream','#FFFDD0','14',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(16,0,'Brown','#78350F','15',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(17,0,'Teal','#0D9488','16',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(18,0,'Coral','#FF6B6B','17',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(19,0,'Magenta','#DB2777','18',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(20,0,'Rose Gold','#B76E79','19',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(21,0,'XS','Extra Small','0',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(22,0,'S','Small','1',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(23,0,'M','Medium','2',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(24,0,'L','Large','3',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(25,0,'XL','Extra Large','4',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(26,0,'XXL','2X Large','5',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(27,0,'XXXL','3X Large','6',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(28,0,'Free Size','One Size Fits All','7',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(29,0,'32','Size 32','8',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(30,0,'34','Size 34','9',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(31,0,'36','Size 36','10',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(32,0,'38','Size 38','11',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(33,0,'40','Size 40','12',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(34,0,'42','Size 42','13',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(35,0,'44','Size 44','14',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(36,0,'Cotton','100% Cotton','0',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(37,0,'Silk','Pure Silk','1',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(38,0,'Chiffon','Chiffon Fabric','2',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(39,0,'Georgette','Georgette Fabric','3',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(40,0,'Linen','Linen Fabric','4',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(41,0,'Polyester','Polyester Blend','5',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(42,0,'Rayon','Rayon Fabric','6',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(43,0,'Velvet','Velvet Material','7',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(44,0,'Net','Net/Lace','8',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(45,0,'Satin','Satin Finish','9',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(46,0,'Crepe','Crepe Fabric','10',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(47,0,'Banarasi','Banarasi Weave','11',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(48,0,'Kanjivaram','Kanjivaram Silk','12',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(49,0,'Organza','Organza Fabric','13',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(50,0,'Khadi','Khadi Cotton','14',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(51,0,'Sterling Silver','925 Sterling Silver','15',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(52,0,'Gold Plated','22K Gold Plated','16',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(53,0,'Oxidized','Oxidized Metal','17',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(54,0,'Pearl','Cultured Pearl','18',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(55,0,'Kundan','Kundan Setting','19',1,'2026-01-11 00:50:38','2026-01-11 00:50:38'),(56,1,'Red','#ff0000','23',1,'2026-01-11 03:34:26','2026-01-11 03:34:26');
/*!40000 ALTER TABLE `variation_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variation_types`
--

DROP TABLE IF EXISTS `variation_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variation_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `input_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'select',
  `is_required` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `display_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `variation_types_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variation_types`
--

LOCK TABLES `variation_types` WRITE;
/*!40000 ALTER TABLE `variation_types` DISABLE KEYS */;
INSERT INTO `variation_types` VALUES (1,'Color','color','color_picker',0,1,1,'2026-01-11 03:21:20','2026-01-11 03:31:46'),(2,'Size','size','select',0,1,2,'2026-01-11 03:21:20','2026-01-11 03:21:20'),(3,'Material','material','select',0,1,3,'2026-01-11 03:21:20','2026-01-11 03:21:20'),(4,'Type','gold_type','select',0,1,4,'2026-01-11 03:22:16','2026-01-11 03:34:37'),(5,'Shoe Lace Color','shoe_lace_color','select',0,1,5,'2026-01-11 03:22:16','2026-01-11 03:22:16');
/*!40000 ALTER TABLE `variation_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlists`
--

DROP TABLE IF EXISTS `wishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlists` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `wishlists_user_id_product_id_unique` (`user_id`,`product_id`),
  KEY `wishlists_product_id_foreign` (`product_id`),
  CONSTRAINT `wishlists_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `wishlists_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlists`
--

LOCK TABLES `wishlists` WRITE;
/*!40000 ALTER TABLE `wishlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-11 21:55:35
