-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: greenaudit
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `ai_predictions`
--

DROP TABLE IF EXISTS `ai_predictions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_predictions` (
  `prediction_id` bigint NOT NULL AUTO_INCREMENT,
  `campus_id` int NOT NULL,
  `building_id` int DEFAULT NULL,
  `metric_type_id` int NOT NULL,
  `prediction_for_month` date NOT NULL,
  `predicted_value` decimal(12,2) NOT NULL,
  `confidence_score` decimal(5,2) DEFAULT NULL,
  `model_name` varchar(100) NOT NULL,
  `generated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('PENDING','GENERATED','APPLIED') DEFAULT 'GENERATED',
  PRIMARY KEY (`prediction_id`),
  KEY `fk_prediction_campus` (`campus_id`),
  KEY `fk_prediction_building` (`building_id`),
  KEY `idx_prediction_metric_month` (`metric_type_id`,`prediction_for_month`),
  CONSTRAINT `fk_prediction_building` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`building_id`),
  CONSTRAINT `fk_prediction_campus` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`campus_id`),
  CONSTRAINT `fk_prediction_metric` FOREIGN KEY (`metric_type_id`) REFERENCES `metric_types` (`metric_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_predictions`
--

LOCK TABLES `ai_predictions` WRITE;
/*!40000 ALTER TABLE `ai_predictions` DISABLE KEYS */;
INSERT INTO `ai_predictions` VALUES (1,1,1,1,'2026-04-01',19150.00,91.40,'LSTM_Energy_v1','2026-04-05 07:00:24','GENERATED'),(2,1,2,1,'2026-04-01',14920.00,89.60,'LSTM_Energy_v1','2026-04-05 07:00:24','GENERATED'),(3,1,1,2,'2026-04-01',301000.00,88.20,'WaterForecast_v1','2026-04-05 07:00:24','GENERATED'),(4,1,2,2,'2026-04-01',221500.00,87.90,'WaterForecast_v1','2026-04-05 07:00:24','GENERATED'),(5,1,1,4,'2026-04-01',272.00,90.30,'CarbonPredict_v2','2026-04-05 07:00:24','GENERATED'),(6,1,2,4,'2026-04-01',211.00,89.10,'CarbonPredict_v2','2026-04-05 07:00:24','GENERATED');
/*!40000 ALTER TABLE `ai_predictions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ai_recommendations`
--

DROP TABLE IF EXISTS `ai_recommendations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_recommendations` (
  `recommendation_id` bigint NOT NULL AUTO_INCREMENT,
  `campus_id` int NOT NULL,
  `building_id` int DEFAULT NULL,
  `related_metric_type_id` int DEFAULT NULL,
  `priority_level` enum('LOW','MEDIUM','HIGH','CRITICAL') DEFAULT 'MEDIUM',
  `recommendation_title` varchar(150) NOT NULL,
  `recommendation_text` text NOT NULL,
  `estimated_impact` varchar(255) DEFAULT NULL,
  `action_plan` varchar(255) DEFAULT NULL,
  `recommendation_status` enum('OPEN','IN_PROGRESS','DONE','DISMISSED') DEFAULT 'OPEN',
  `generated_on` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`recommendation_id`),
  KEY `fk_reco_campus` (`campus_id`),
  KEY `fk_reco_building` (`building_id`),
  KEY `fk_reco_metric` (`related_metric_type_id`),
  KEY `idx_reco_status` (`recommendation_status`),
  KEY `idx_reco_priority` (`priority_level`),
  CONSTRAINT `fk_reco_building` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`building_id`),
  CONSTRAINT `fk_reco_campus` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`campus_id`),
  CONSTRAINT `fk_reco_metric` FOREIGN KEY (`related_metric_type_id`) REFERENCES `metric_types` (`metric_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_recommendations`
--

LOCK TABLES `ai_recommendations` WRITE;
/*!40000 ALTER TABLE `ai_recommendations` DISABLE KEYS */;
INSERT INTO `ai_recommendations` VALUES (1,1,1,1,'HIGH','Deep energy audit for Science Labs','Conduct a deep energy audit of the Science Labs to identify HVAC inefficiencies and implement smart scheduling for high-drain lab equipment.','Reduce campus energy expenditure by 12% and improve efficiency score.','Audit HVAC, install timers, review peak-hour usage.','OPEN','2026-03-31','2026-04-05 07:00:24'),(2,1,2,2,'MEDIUM','Optimize water recycling in Engineering Block','Increase recycled water reuse for washrooms and cooling systems in the Engineering Block.','Can save 8-10% water monthly.','Upgrade recycled water line and install monitoring valves.','IN_PROGRESS','2026-03-31','2026-04-05 07:00:24'),(3,1,4,3,'MEDIUM','Improve paper recycling in Library','Improve paper waste segregation and deploy labeled disposal bins inside library zones.','Waste diverted percentage may improve by 5%.','Place bins, run awareness drive, weekly monitoring.','OPEN','2026-03-31','2026-04-05 07:00:24'),(4,1,3,4,'LOW','Reduce idle power consumption in Admin Block','Encourage shutdown policies for printers, PCs and lighting after office hours.','Could reduce carbon footprint by 3-4%.','Add shutdown checklist and occupancy sensors.','OPEN','2026-03-31','2026-04-05 07:00:24');
/*!40000 ALTER TABLE `ai_recommendations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buildings`
--

DROP TABLE IF EXISTS `buildings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buildings` (
  `building_id` int NOT NULL AUTO_INCREMENT,
  `campus_id` int NOT NULL,
  `department_id` int DEFAULT NULL,
  `building_name` varchar(100) NOT NULL,
  `building_code` varchar(20) NOT NULL,
  `building_type` enum('ACADEMIC','LAB','HOSTEL','ADMIN','LIBRARY','SPORTS') NOT NULL,
  `floors` int DEFAULT '1',
  `occupancy_capacity` int DEFAULT '0',
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`building_id`),
  UNIQUE KEY `building_code` (`building_code`),
  KEY `fk_buildings_campus` (`campus_id`),
  KEY `fk_buildings_department` (`department_id`),
  CONSTRAINT `fk_buildings_campus` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`campus_id`),
  CONSTRAINT `fk_buildings_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buildings`
--

LOCK TABLES `buildings` WRITE;
/*!40000 ALTER TABLE `buildings` DISABLE KEYS */;
INSERT INTO `buildings` VALUES (1,1,1,'Science Labs','BLD-SCI-01','LAB',3,500,'ACTIVE','2026-04-05 07:00:24'),(2,1,2,'Engineering Block','BLD-ENG-01','ACADEMIC',4,900,'ACTIVE','2026-04-05 07:00:24'),(3,1,3,'Admin Block','BLD-ADM-01','ADMIN',2,250,'ACTIVE','2026-04-05 07:00:24'),(4,1,NULL,'Central Library','BLD-LIB-01','LIBRARY',3,600,'ACTIVE','2026-04-05 07:00:24');
/*!40000 ALTER TABLE `buildings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campuses`
--

DROP TABLE IF EXISTS `campuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campuses` (
  `campus_id` int NOT NULL AUTO_INCREMENT,
  `campus_name` varchar(100) NOT NULL,
  `campus_code` varchar(20) NOT NULL,
  `location` varchar(120) DEFAULT NULL,
  `total_area_sqft` decimal(12,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`campus_id`),
  UNIQUE KEY `campus_code` (`campus_code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campuses`
--

LOCK TABLES `campuses` WRITE;
/*!40000 ALTER TABLE `campuses` DISABLE KEYS */;
INSERT INTO `campuses` VALUES (1,'GreenAudit Main Campus','GMC01','Delhi',250000.00,'2026-04-05 07:00:24');
/*!40000 ALTER TABLE `campuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carbon_emissions`
--

DROP TABLE IF EXISTS `carbon_emissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carbon_emissions` (
  `emission_id` bigint NOT NULL AUTO_INCREMENT,
  `campus_id` int NOT NULL,
  `building_id` int NOT NULL,
  `emission_date` date NOT NULL,
  `emission_month` date NOT NULL,
  `energy_emission_kgco2` decimal(12,3) DEFAULT '0.000',
  `water_emission_kgco2` decimal(12,3) DEFAULT '0.000',
  `waste_emission_kgco2` decimal(12,3) DEFAULT '0.000',
  `transport_emission_kgco2` decimal(12,3) DEFAULT '0.000',
  `total_emission_kgco2` decimal(12,3) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`emission_id`),
  KEY `fk_emission_campus` (`campus_id`),
  KEY `idx_emission_building_month` (`building_id`,`emission_month`),
  KEY `idx_total_emission` (`total_emission_kgco2`),
  CONSTRAINT `fk_emission_building` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`building_id`),
  CONSTRAINT `fk_emission_campus` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`campus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carbon_emissions`
--

LOCK TABLES `carbon_emissions` WRITE;
/*!40000 ALTER TABLE `carbon_emissions` DISABLE KEYS */;
INSERT INTO `carbon_emissions` VALUES (1,1,1,'2026-01-31','2026-01-01',210.000,18.200,14.000,12.000,254.200,'2026-04-05 07:00:24'),(2,1,1,'2026-02-28','2026-02-01',204.100,17.600,13.200,11.500,246.400,'2026-04-05 07:00:24'),(3,1,1,'2026-03-31','2026-03-01',221.800,19.300,14.800,12.700,268.600,'2026-04-05 07:00:24'),(4,1,2,'2026-01-31','2026-01-01',166.000,13.800,10.900,11.200,201.900,'2026-04-05 07:00:24'),(5,1,2,'2026-02-28','2026-02-01',160.200,13.100,10.400,10.800,194.500,'2026-04-05 07:00:24'),(6,1,2,'2026-03-31','2026-03-01',171.100,14.200,11.300,11.600,208.200,'2026-04-05 07:00:24'),(7,1,3,'2026-01-31','2026-01-01',48.000,3.200,2.100,1.800,55.100,'2026-04-05 07:00:24'),(8,1,3,'2026-02-28','2026-02-01',46.200,3.000,2.000,1.700,52.900,'2026-04-05 07:00:24'),(9,1,3,'2026-03-31','2026-03-01',50.600,3.300,2.200,1.900,58.000,'2026-04-05 07:00:24'),(10,1,4,'2026-01-31','2026-01-01',112.000,7.600,5.000,3.800,128.400,'2026-04-05 07:00:24'),(11,1,4,'2026-02-28','2026-02-01',108.200,7.300,4.900,3.600,124.000,'2026-04-05 07:00:24'),(12,1,4,'2026-03-31','2026-03-01',116.400,7.900,5.300,4.100,133.700,'2026-04-05 07:00:24');
/*!40000 ALTER TABLE `carbon_emissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `campus_id` int NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `department_code` varchar(20) NOT NULL,
  `hod_name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `uq_department` (`campus_id`,`department_code`),
  CONSTRAINT `fk_departments_campus` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`campus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,1,'Science Faculty','SCI','Dr. Mehta','2026-04-05 07:00:24'),(2,1,'Engineering Faculty','ENG','Dr. Kapoor','2026-04-05 07:00:24'),(3,1,'Administration','ADM','Mr. Sinha','2026-04-05 07:00:24');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `energy_usage`
--

DROP TABLE IF EXISTS `energy_usage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `energy_usage` (
  `energy_id` bigint NOT NULL AUTO_INCREMENT,
  `campus_id` int NOT NULL,
  `building_id` int NOT NULL,
  `recorded_by` int DEFAULT NULL,
  `usage_date` date NOT NULL,
  `usage_month` date NOT NULL,
  `kwh_consumed` decimal(12,2) NOT NULL,
  `peak_demand_kw` decimal(10,2) DEFAULT NULL,
  `source_type` enum('GRID','SOLAR','GENERATOR','HYBRID') DEFAULT 'GRID',
  `notes` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`energy_id`),
  KEY `fk_energy_campus` (`campus_id`),
  KEY `fk_energy_user` (`recorded_by`),
  KEY `idx_energy_building_month` (`building_id`,`usage_month`),
  KEY `idx_energy_date` (`usage_date`),
  CONSTRAINT `fk_energy_building` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`building_id`),
  CONSTRAINT `fk_energy_campus` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`campus_id`),
  CONSTRAINT `fk_energy_user` FOREIGN KEY (`recorded_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `energy_usage`
--

LOCK TABLES `energy_usage` WRITE;
/*!40000 ALTER TABLE `energy_usage` DISABLE KEYS */;
INSERT INTO `energy_usage` VALUES (1,1,1,2,'2026-01-31','2026-01-01',18200.00,145.00,'GRID','Science Labs monthly reading','2026-04-05 07:00:24'),(2,1,1,2,'2026-02-28','2026-02-01',17650.00,141.00,'GRID','Science Labs monthly reading','2026-04-05 07:00:24'),(3,1,1,2,'2026-03-31','2026-03-01',18920.00,149.00,'GRID','Science Labs monthly reading','2026-04-05 07:00:24'),(4,1,2,2,'2026-01-31','2026-01-01',14300.00,120.00,'GRID','Engineering Block monthly reading','2026-04-05 07:00:24'),(5,1,2,2,'2026-02-28','2026-02-01',13950.00,116.00,'GRID','Engineering Block monthly reading','2026-04-05 07:00:24'),(6,1,2,2,'2026-03-31','2026-03-01',14780.00,123.00,'GRID','Engineering Block monthly reading','2026-04-05 07:00:24'),(7,1,3,2,'2026-01-31','2026-01-01',4100.00,38.00,'GRID','Admin Block monthly reading','2026-04-05 07:00:24'),(8,1,3,2,'2026-02-28','2026-02-01',3980.00,36.00,'GRID','Admin Block monthly reading','2026-04-05 07:00:24'),(9,1,3,2,'2026-03-31','2026-03-01',4240.00,39.00,'GRID','Admin Block monthly reading','2026-04-05 07:00:24'),(10,1,4,2,'2026-01-31','2026-01-01',9800.00,82.00,'GRID','Library monthly reading','2026-04-05 07:00:24'),(11,1,4,2,'2026-02-28','2026-02-01',9520.00,79.00,'GRID','Library monthly reading','2026-04-05 07:00:24'),(12,1,4,2,'2026-03-31','2026-03-01',10120.00,85.00,'GRID','Library monthly reading','2026-04-05 07:00:24');
/*!40000 ALTER TABLE `energy_usage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_types`
--

DROP TABLE IF EXISTS `food_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_types` (
  `food_type_id` int NOT NULL AUTO_INCREMENT,
  `food_type_name` varchar(50) NOT NULL,
  PRIMARY KEY (`food_type_id`),
  UNIQUE KEY `food_type_name` (`food_type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_types`
--

LOCK TABLES `food_types` WRITE;
/*!40000 ALTER TABLE `food_types` DISABLE KEYS */;
INSERT INTO `food_types` VALUES (4,'Mixed'),(2,'Non-Vegetarian'),(3,'Vegan'),(1,'Vegetarian');
/*!40000 ALTER TABLE `food_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `housing_types`
--

DROP TABLE IF EXISTS `housing_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `housing_types` (
  `housing_type_id` int NOT NULL AUTO_INCREMENT,
  `housing_type_name` varchar(50) NOT NULL,
  PRIMARY KEY (`housing_type_id`),
  UNIQUE KEY `housing_type_name` (`housing_type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `housing_types`
--

LOCK TABLES `housing_types` WRITE;
/*!40000 ALTER TABLE `housing_types` DISABLE KEYS */;
INSERT INTO `housing_types` VALUES (2,'Apartment'),(1,'Hostel'),(3,'Own House'),(4,'Shared Housing');
/*!40000 ALTER TABLE `housing_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metric_types`
--

DROP TABLE IF EXISTS `metric_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metric_types` (
  `metric_type_id` int NOT NULL AUTO_INCREMENT,
  `metric_name` varchar(50) NOT NULL,
  `unit` varchar(30) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`metric_type_id`),
  UNIQUE KEY `metric_name` (`metric_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metric_types`
--

LOCK TABLES `metric_types` WRITE;
/*!40000 ALTER TABLE `metric_types` DISABLE KEYS */;
INSERT INTO `metric_types` VALUES (1,'Energy Consumption','kWh','Electricity consumption'),(2,'Water Usage','Liters','Water usage'),(3,'Waste Diverted','%','Waste diversion percentage'),(4,'Carbon Footprint','kgCO2e','Carbon emissions');
/*!40000 ALTER TABLE `metric_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recycling_habits`
--

DROP TABLE IF EXISTS `recycling_habits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recycling_habits` (
  `recycling_habit_id` int NOT NULL AUTO_INCREMENT,
  `recycling_habit_name` varchar(50) NOT NULL,
  PRIMARY KEY (`recycling_habit_id`),
  UNIQUE KEY `recycling_habit_name` (`recycling_habit_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recycling_habits`
--

LOCK TABLES `recycling_habits` WRITE;
/*!40000 ALTER TABLE `recycling_habits` DISABLE KEYS */;
INSERT INTO `recycling_habits` VALUES (1,'Always'),(4,'Never'),(3,'Rarely'),(2,'Sometimes');
/*!40000 ALTER TABLE `recycling_habits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `report_id` bigint NOT NULL AUTO_INCREMENT,
  `campus_id` int NOT NULL,
  `generated_by` int NOT NULL,
  `report_name` varchar(150) NOT NULL,
  `report_type` enum('OVERVIEW','ENERGY','WATER_WASTE','CARBON','AI_SUMMARY','CUSTOM') NOT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `generated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`),
  KEY `fk_reports_campus` (`campus_id`),
  KEY `fk_reports_user` (`generated_by`),
  KEY `idx_report_type` (`report_type`),
  CONSTRAINT `fk_reports_campus` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`campus_id`),
  CONSTRAINT `fk_reports_user` FOREIGN KEY (`generated_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,1,1,'Campus Sustainability Overview Q1 2026','OVERVIEW','/reports/overview_q1_2026.pdf','2026-01-01','2026-03-31','2026-04-05 07:00:24'),(2,1,1,'Energy Analysis March 2026','ENERGY','/reports/energy_march_2026.pdf','2026-03-01','2026-03-31','2026-04-05 07:00:24'),(3,1,1,'Water and Waste Summary Q1 2026','WATER_WASTE','/reports/water_waste_q1_2026.pdf','2026-01-01','2026-03-31','2026-04-05 07:00:24'),(4,1,1,'AI Prediction Summary April 2026','AI_SUMMARY','/reports/ai_summary_april_2026.pdf','2026-04-01','2026-04-30','2026-04-05 07:00:24');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','2026-04-05 07:00:24'),(2,'Analyst','2026-04-05 07:00:24'),(3,'Viewer','2026-04-05 07:00:24');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_responses`
--

DROP TABLE IF EXISTS `survey_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_responses` (
  `survey_id` bigint NOT NULL AUTO_INCREMENT,
  `campus_id` int NOT NULL,
  `department_id` int DEFAULT NULL,
  `building_id` int DEFAULT NULL,
  `response_month` date NOT NULL,
  `respondent_type` enum('STUDENT','FACULTY','STAFF') DEFAULT 'STUDENT',
  `food_type_id` int DEFAULT NULL,
  `housing_type_id` int DEFAULT NULL,
  `transportation_mode_id` int DEFAULT NULL,
  `recycling_habit_id` int DEFAULT NULL,
  `clothing_spend_per_month` decimal(12,2) DEFAULT NULL,
  `energy_usage_kwh_per_month` decimal(12,2) DEFAULT NULL,
  `water_usage_liters_per_day` decimal(12,2) DEFAULT NULL,
  `consumption_spend_per_month` decimal(12,2) DEFAULT NULL,
  `carbon_emissions_kgco2` decimal(12,3) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`survey_id`),
  KEY `fk_survey_campus` (`campus_id`),
  KEY `fk_survey_department` (`department_id`),
  KEY `fk_survey_food` (`food_type_id`),
  KEY `fk_survey_housing` (`housing_type_id`),
  KEY `fk_survey_transport` (`transportation_mode_id`),
  KEY `fk_survey_recycle` (`recycling_habit_id`),
  KEY `idx_survey_month` (`response_month`),
  KEY `idx_survey_building` (`building_id`),
  CONSTRAINT `fk_survey_building` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`building_id`),
  CONSTRAINT `fk_survey_campus` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`campus_id`),
  CONSTRAINT `fk_survey_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  CONSTRAINT `fk_survey_food` FOREIGN KEY (`food_type_id`) REFERENCES `food_types` (`food_type_id`),
  CONSTRAINT `fk_survey_housing` FOREIGN KEY (`housing_type_id`) REFERENCES `housing_types` (`housing_type_id`),
  CONSTRAINT `fk_survey_recycle` FOREIGN KEY (`recycling_habit_id`) REFERENCES `recycling_habits` (`recycling_habit_id`),
  CONSTRAINT `fk_survey_transport` FOREIGN KEY (`transportation_mode_id`) REFERENCES `transportation_modes` (`transportation_mode_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_responses`
--

LOCK TABLES `survey_responses` WRITE;
/*!40000 ALTER TABLE `survey_responses` DISABLE KEYS */;
INSERT INTO `survey_responses` VALUES (9,1,1,1,'2026-01-01','STUDENT',2,2,3,1,1360.00,478.00,277.00,4136.00,369.630,'2026-04-05 07:03:28'),(10,1,2,2,'2026-01-01','FACULTY',3,1,2,4,4272.00,69.00,151.00,4318.00,158.860,'2026-04-05 07:03:28'),(11,1,2,2,'2026-02-01','STUDENT',1,4,4,2,3592.00,322.00,124.00,3782.00,357.030,'2026-04-05 07:03:28'),(12,1,3,3,'2026-02-01','STAFF',4,3,1,1,966.00,168.00,466.00,8657.00,247.745,'2026-04-05 07:03:28'),(13,1,1,1,'2026-03-01','STUDENT',2,2,4,2,4926.00,120.00,495.00,5920.00,218.610,'2026-04-05 07:03:28'),(14,1,NULL,4,'2026-03-01','STUDENT',1,1,1,1,2100.00,240.00,220.00,5000.00,190.220,'2026-04-05 07:03:28'),(15,1,2,2,'2026-03-01','FACULTY',2,3,3,2,3100.00,280.00,180.00,4600.00,205.450,'2026-04-05 07:03:28'),(16,1,1,1,'2026-03-01','STUDENT',3,1,2,3,1800.00,150.00,130.00,3900.00,145.330,'2026-04-05 07:03:28');
/*!40000 ALTER TABLE `survey_responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transportation_modes`
--

DROP TABLE IF EXISTS `transportation_modes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transportation_modes` (
  `transportation_mode_id` int NOT NULL AUTO_INCREMENT,
  `transportation_mode_name` varchar(50) NOT NULL,
  PRIMARY KEY (`transportation_mode_id`),
  UNIQUE KEY `transportation_mode_name` (`transportation_mode_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportation_modes`
--

LOCK TABLES `transportation_modes` WRITE;
/*!40000 ALTER TABLE `transportation_modes` DISABLE KEYS */;
INSERT INTO `transportation_modes` VALUES (2,'Bicycle'),(4,'Car'),(3,'Public Transport'),(1,'Walking');
/*!40000 ALTER TABLE `transportation_modes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_users_role` (`role_id`),
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'Khushi Yadav','admin@greenaudit.edu','$2b$12$greenaudit_admin_hash_001','9999999991','ACTIVE','2026-04-05 07:00:24','2026-04-05 07:00:24'),(2,2,'Riya Sharma','analyst@greenaudit.edu','$2b$12$greenaudit_analyst_hash_001','9999999992','ACTIVE','2026-04-05 07:00:24','2026-04-05 07:00:24'),(3,3,'Aman Verma','viewer@greenaudit.edu','$2b$12$greenaudit_viewer_hash_001','9999999993','ACTIVE','2026-04-05 07:00:24','2026-04-05 07:00:24');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_campus_overview`
--

DROP TABLE IF EXISTS `vw_campus_overview`;
/*!50001 DROP VIEW IF EXISTS `vw_campus_overview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_campus_overview` AS SELECT 
 1 AS `campus_id`,
 1 AS `campus_name`,
 1 AS `total_energy_kwh`,
 1 AS `total_water_liters`,
 1 AS `avg_waste_diverted_percent`,
 1 AS `total_carbon_kgco2`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `waste_records`
--

DROP TABLE IF EXISTS `waste_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `waste_records` (
  `waste_id` bigint NOT NULL AUTO_INCREMENT,
  `campus_id` int NOT NULL,
  `building_id` int NOT NULL,
  `recorded_by` int DEFAULT NULL,
  `record_date` date NOT NULL,
  `record_month` date NOT NULL,
  `waste_generated_kg` decimal(12,2) NOT NULL,
  `waste_recycled_kg` decimal(12,2) DEFAULT '0.00',
  `waste_diverted_percent` decimal(5,2) DEFAULT '0.00',
  `waste_type` enum('DRY','WET','PLASTIC','PAPER','E_WASTE','MIXED') DEFAULT 'MIXED',
  `notes` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`waste_id`),
  KEY `fk_waste_campus` (`campus_id`),
  KEY `fk_waste_user` (`recorded_by`),
  KEY `idx_waste_building_month` (`building_id`,`record_month`),
  CONSTRAINT `fk_waste_building` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`building_id`),
  CONSTRAINT `fk_waste_campus` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`campus_id`),
  CONSTRAINT `fk_waste_user` FOREIGN KEY (`recorded_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waste_records`
--

LOCK TABLES `waste_records` WRITE;
/*!40000 ALTER TABLE `waste_records` DISABLE KEYS */;
INSERT INTO `waste_records` VALUES (1,1,1,2,'2026-01-31','2026-01-01',1200.00,930.00,77.50,'MIXED','Science Labs waste','2026-04-05 07:00:24'),(2,1,1,2,'2026-02-28','2026-02-01',1140.00,900.00,78.95,'MIXED','Science Labs waste','2026-04-05 07:00:24'),(3,1,1,2,'2026-03-31','2026-03-01',1260.00,1010.00,80.16,'MIXED','Science Labs waste','2026-04-05 07:00:24'),(4,1,2,2,'2026-01-31','2026-01-01',980.00,790.00,80.61,'MIXED','Engineering waste','2026-04-05 07:00:24'),(5,1,2,2,'2026-02-28','2026-02-01',940.00,760.00,80.85,'MIXED','Engineering waste','2026-04-05 07:00:24'),(6,1,2,2,'2026-03-31','2026-03-01',1015.00,835.00,82.27,'MIXED','Engineering waste','2026-04-05 07:00:24'),(7,1,3,2,'2026-01-31','2026-01-01',220.00,175.00,79.55,'PAPER','Admin waste','2026-04-05 07:00:24'),(8,1,3,2,'2026-02-28','2026-02-01',210.00,168.00,80.00,'PAPER','Admin waste','2026-04-05 07:00:24'),(9,1,3,2,'2026-03-31','2026-03-01',230.00,186.00,80.87,'PAPER','Admin waste','2026-04-05 07:00:24'),(10,1,4,2,'2026-01-31','2026-01-01',460.00,360.00,78.26,'PAPER','Library waste','2026-04-05 07:00:24'),(11,1,4,2,'2026-02-28','2026-02-01',440.00,350.00,79.55,'PAPER','Library waste','2026-04-05 07:00:24'),(12,1,4,2,'2026-03-31','2026-03-01',475.00,390.00,82.11,'PAPER','Library waste','2026-04-05 07:00:24');
/*!40000 ALTER TABLE `waste_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `water_usage`
--

DROP TABLE IF EXISTS `water_usage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `water_usage` (
  `water_id` bigint NOT NULL AUTO_INCREMENT,
  `campus_id` int NOT NULL,
  `building_id` int NOT NULL,
  `recorded_by` int DEFAULT NULL,
  `usage_date` date NOT NULL,
  `usage_month` date NOT NULL,
  `liters_consumed` decimal(12,2) NOT NULL,
  `recycled_liters` decimal(12,2) DEFAULT '0.00',
  `source_type` enum('MUNICIPAL','BOREWELL','TANKER','RECYCLED') DEFAULT 'MUNICIPAL',
  `notes` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`water_id`),
  KEY `fk_water_campus` (`campus_id`),
  KEY `fk_water_user` (`recorded_by`),
  KEY `idx_water_building_month` (`building_id`,`usage_month`),
  KEY `idx_water_date` (`usage_date`),
  CONSTRAINT `fk_water_building` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`building_id`),
  CONSTRAINT `fk_water_campus` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`campus_id`),
  CONSTRAINT `fk_water_user` FOREIGN KEY (`recorded_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `water_usage`
--

LOCK TABLES `water_usage` WRITE;
/*!40000 ALTER TABLE `water_usage` DISABLE KEYS */;
INSERT INTO `water_usage` VALUES (1,1,1,2,'2026-01-31','2026-01-01',280000.00,25000.00,'MUNICIPAL','Science Labs water record','2026-04-05 07:00:24'),(2,1,1,2,'2026-02-28','2026-02-01',265000.00,22000.00,'MUNICIPAL','Science Labs water record','2026-04-05 07:00:24'),(3,1,1,2,'2026-03-31','2026-03-01',295000.00,27000.00,'MUNICIPAL','Science Labs water record','2026-04-05 07:00:24'),(4,1,2,2,'2026-01-31','2026-01-01',210000.00,18000.00,'MUNICIPAL','Engineering Block water record','2026-04-05 07:00:24'),(5,1,2,2,'2026-02-28','2026-02-01',202000.00,17500.00,'MUNICIPAL','Engineering Block water record','2026-04-05 07:00:24'),(6,1,2,2,'2026-03-31','2026-03-01',218000.00,19000.00,'MUNICIPAL','Engineering Block water record','2026-04-05 07:00:24'),(7,1,3,2,'2026-01-31','2026-01-01',52000.00,4000.00,'MUNICIPAL','Admin Block water record','2026-04-05 07:00:24'),(8,1,3,2,'2026-02-28','2026-02-01',50000.00,3900.00,'MUNICIPAL','Admin Block water record','2026-04-05 07:00:24'),(9,1,3,2,'2026-03-31','2026-03-01',54000.00,4100.00,'MUNICIPAL','Admin Block water record','2026-04-05 07:00:24'),(10,1,4,2,'2026-01-31','2026-01-01',112000.00,8000.00,'MUNICIPAL','Library water record','2026-04-05 07:00:24'),(11,1,4,2,'2026-02-28','2026-02-01',108000.00,7600.00,'MUNICIPAL','Library water record','2026-04-05 07:00:24'),(12,1,4,2,'2026-03-31','2026-03-01',115000.00,8400.00,'MUNICIPAL','Library water record','2026-04-05 07:00:24');
/*!40000 ALTER TABLE `water_usage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `vw_campus_overview`
--

/*!50001 DROP VIEW IF EXISTS `vw_campus_overview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_campus_overview` AS select `c`.`campus_id` AS `campus_id`,`c`.`campus_name` AS `campus_name`,coalesce(sum(`e`.`kwh_consumed`),0) AS `total_energy_kwh`,coalesce(sum(`w`.`liters_consumed`),0) AS `total_water_liters`,round(avg(`wr`.`waste_diverted_percent`),2) AS `avg_waste_diverted_percent`,coalesce(sum(`ce`.`total_emission_kgco2`),0) AS `total_carbon_kgco2` from ((((`campuses` `c` left join `energy_usage` `e` on((`c`.`campus_id` = `e`.`campus_id`))) left join `water_usage` `w` on((`c`.`campus_id` = `w`.`campus_id`))) left join `waste_records` `wr` on((`c`.`campus_id` = `wr`.`campus_id`))) left join `carbon_emissions` `ce` on((`c`.`campus_id` = `ce`.`campus_id`))) group by `c`.`campus_id`,`c`.`campus_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-05 12:42:20
