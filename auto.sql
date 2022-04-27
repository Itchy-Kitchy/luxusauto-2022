-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 27. 17:09
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `auto-kolcsonzo`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `auto`
--

CREATE TABLE `auto` (
  `auto` varchar(25) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `rendszam` varchar(6) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `berletidij` int(11) NOT NULL,
  `tol` date NOT NULL,
  `ig` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ugyfel`
--

CREATE TABLE `ugyfel` (
  `nev` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `lakcim` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `tel` int(11) NOT NULL,
  `rendszam` varchar(6) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `tol` date NOT NULL,
  `ig` date NOT NULL,
  `fizetendo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `velemeny`
--

CREATE TABLE `velemeny` (
  `nev` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `rendszam` varchar(6) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `velemeny` varchar(200) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`rendszam`);

--
-- A tábla indexei `ugyfel`
--
ALTER TABLE `ugyfel`
  ADD PRIMARY KEY (`nev`),
  ADD KEY `auto-ugyfel` (`rendszam`);

--
-- A tábla indexei `velemeny`
--
ALTER TABLE `velemeny`
  ADD KEY `nev` (`nev`),
  ADD KEY `rendszam` (`rendszam`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `ugyfel`
--
ALTER TABLE `ugyfel`
  ADD CONSTRAINT `auto-ugyfel` FOREIGN KEY (`rendszam`) REFERENCES `auto` (`rendszam`);

--
-- Megkötések a táblához `velemeny`
--
ALTER TABLE `velemeny`
  ADD CONSTRAINT `velemeny_ibfk_1` FOREIGN KEY (`nev`) REFERENCES `ugyfel` (`nev`),
  ADD CONSTRAINT `velemeny_ibfk_2` FOREIGN KEY (`rendszam`) REFERENCES `auto` (`rendszam`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
