-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: tiendavive
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `id_categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Cuidado Personal'),(2,'Perfumería'),(3,'Joyería y Accesorios'),(4,'Ropa y Complementos'),(5,'Cuidado Personal'),(6,'Perfumería'),(7,'Joyería y Accesorios'),(8,'Ropa y Complementos'),(9,'Cuidado Personal'),(10,'Perfumería'),(11,'Joyería y Accesorios'),(12,'Ropa y Complementos');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_de_pedidos`
--

DROP TABLE IF EXISTS `detalle_de_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_de_pedidos` (
  `id_detalle` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cantidad` int DEFAULT NULL,
  `precio_unitario` double DEFAULT NULL,
  `pedidos_id_pedido` bigint unsigned NOT NULL,
  `productos_id_producto` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_detalle`,`pedidos_id_pedido`),
  UNIQUE KEY `id_detalle` (`id_detalle`),
  KEY `fk_detalle_de_pedidos_pedidos1_idx` (`pedidos_id_pedido`),
  KEY `fk_detalle_de_pedidos_productos1_idx` (`productos_id_producto`),
  CONSTRAINT `fk_detalle_de_pedidos_pedidos1` FOREIGN KEY (`pedidos_id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  CONSTRAINT `fk_detalle_de_pedidos_productos1` FOREIGN KEY (`productos_id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_de_pedidos`
--

LOCK TABLES `detalle_de_pedidos` WRITE;
/*!40000 ALTER TABLE `detalle_de_pedidos` DISABLE KEYS */;
INSERT INTO `detalle_de_pedidos` VALUES (1,1,145000,1,1),(2,1,350000,2,2),(3,1,12000,3,3),(4,2,75000,4,4);
/*!40000 ALTER TABLE `detalle_de_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id_pago` bigint unsigned NOT NULL AUTO_INCREMENT,
  `metodo_pago` varchar(50) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` varchar(50) DEFAULT NULL,
  `pedidos_id_pedido` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_pago`,`pedidos_id_pedido`),
  UNIQUE KEY `id_pago` (`id_pago`),
  KEY `fk_pagos_pedidos1_idx` (`pedidos_id_pedido`),
  CONSTRAINT `fk_pagos_pedidos1` FOREIGN KEY (`pedidos_id_pedido`) REFERENCES `pedidos` (`id_pedido`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (1,'Transferencia Bancaria','2026-06-05 15:22:22','APROBADO',1),(2,'Transferencia Bancaria','2026-06-07 13:47:10','APROBADO',1);
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id_pedido` bigint unsigned NOT NULL AUTO_INCREMENT,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` varchar(50) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `usuarios_id_usuario` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_pedido`,`usuarios_id_usuario`),
  UNIQUE KEY `id_pedido` (`id_pedido`),
  KEY `fk_pedidos_usuarios1_idx` (`usuarios_id_usuario`),
  CONSTRAINT `fk_pedidos_usuarios1` FOREIGN KEY (`usuarios_id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,'2026-06-05 15:18:10','PROCESADO',192000,1),(2,'2026-06-07 13:34:46','PENDIENTE',150000,1),(3,'2026-06-07 13:36:05','PENDIENTE',150000,2),(4,'2026-06-07 13:36:07','PENDIENTE',150000,2),(5,'2026-06-07 13:36:08','PENDIENTE',150000,2),(6,'2026-06-07 14:01:20','PROCESADO',192000,2),(7,'2026-06-07 14:20:29','PROCESADO',192000,2),(8,'2026-06-07 14:22:35','PROCESADO',192000,2);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) DEFAULT NULL,
  `descripcion` text,
  `precio` double DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `id_categoria` bigint NOT NULL,
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `id_producto` (`id_producto`),
  KEY `fk_productos_categorias` (`id_categoria`),
  CONSTRAINT `fk_productos_categorias` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Perfume Mujer Floral Esencia','Eau de Parfum 100ml con notas de jazmín',145000,0,1),(2,'Perfume Hombre Intense','Fragancia amaderada de larga duración 100ml',160000,15,2),(3,'Aretes de Plata Mujer','Topos de plata ley 925 con diseño de corazón',35000,25,3),(4,'Set de Moñas Scrunchies x5','Moñas de satín para el cabello suaves',12000,60,4),(5,'Anillo Ajustable Minimalista','Anillo de acero inoxidable unisex',25000,30,5),(6,'Gafas de Sol Urban','Protección UV400 con filtro polarizado',55000,18,6),(7,'Medias Tobilleras x3','Pack de 3 pares de medias de algodón unisex',15000,100,7),(8,'Desodorante Masculino ace','Protección total contra el sudor',16000,50,1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `direccion` text,
  `telefono` varchar(20) DEFAULT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `id_usuario` (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Carlos Mendoza','carlos@email.com','$2b$12$R9h/cIPz97v...','Av. 5 #10-20','3101234567','2026-06-05 14:42:24','ACTIVO'),(2,'Laura Restrepo','laura@email.com','$2b$12$K7j/bEPz54v...','Calle 24 #8-15','3189876543','2026-06-05 14:42:24','ACTIVO'),(3,'Andres Felipe','andres@email.com','claveSegura2026','Calle 5 #10-25, Cali','3127654321','2026-06-07 13:00:19','ACTIVO');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-07  9:34:17
