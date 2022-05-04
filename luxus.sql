-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Máj 04. 14:14
-- Kiszolgáló verziója: 10.1.38-MariaDB
-- PHP verzió: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `luxus`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `auto`
--

CREATE TABLE `auto` (
  `rendszam` varchar(6) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `tipus` tinytext COLLATE utf8mb4_hungarian_ci NOT NULL,
  `napidij` float NOT NULL,
  `ev` smallint(4) NOT NULL,
  `szin` tinytext COLLATE utf8mb4_hungarian_ci NOT NULL,
  `loero` smallint(6) NOT NULL,
  `vegseb` smallint(6) NOT NULL,
  `foglalt` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `berles`
--

CREATE TABLE `berles` (
  `bid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `rendszam` varchar(6) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `kezd` date NOT NULL,
  `veg` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `komment`
--

CREATE TABLE `komment` (
  `uid` int(11) NOT NULL,
  `rendszam` varchar(6) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `ertekeles` tinyint(4) NOT NULL,
  `text` tinytext COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ugyfel`
--

CREATE TABLE `ugyfel` (
  `uid` int(11) NOT NULL,
  `nev` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `jelszo` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `cim` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `tel` varchar(12) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL
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
-- A tábla indexei `berles`
--
ALTER TABLE `berles`
  ADD PRIMARY KEY (`bid`),
  ADD KEY `uid` (`uid`),
  ADD KEY `rendszam` (`rendszam`);

--
-- A tábla indexei `komment`
--
ALTER TABLE `komment`
  ADD KEY `uid` (`uid`),
  ADD KEY `rendszam` (`rendszam`);

--
-- A tábla indexei `ugyfel`
--
ALTER TABLE `ugyfel`
  ADD PRIMARY KEY (`uid`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `berles`
--
ALTER TABLE `berles`
  ADD CONSTRAINT `berles_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `ugyfel` (`uid`),
  ADD CONSTRAINT `berles_ibfk_2` FOREIGN KEY (`rendszam`) REFERENCES `auto` (`rendszam`);

--
-- Megkötések a táblához `komment`
--
ALTER TABLE `komment`
  ADD CONSTRAINT `komment_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `ugyfel` (`uid`),
  ADD CONSTRAINT `komment_ibfk_2` FOREIGN KEY (`rendszam`) REFERENCES `auto` (`rendszam`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
