--LA CREATION DE LA TABLE USERS
CREATE TABLE `users` (
  `id` int(11) NOT NULL UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--LA CREATION DE LA TABLE pacmen

CREATE TABLE `pacmen` (
  `id` int(11) NOT NULL UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `AGE` INT(11)  NOT NULL,
  `famille` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `couleur` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `nourriture` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
)
ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




--POUR La PARTIE CRUD (index.js) J ai UTLISé UNE PROCEDURE DE STOCKAGE  , C'EST LA SUIVANTE :




CREATE DEFINER=`root`@`localhost` PROCEDURE `pacmanAddOrEdit`(
IN _ID INT ,
IN _Age INT ,
IN _Famille varchar(45),
IN _Couleur varchar(45),
IN _Nourriture varchar(45)
)
BEGIN
	IF _ID = 0 THEN
		insert INTO pacmandb.pacmen (Age,Famille,Couleur,Nourriture)
        value (_Age , _Famille , _Couleur , _Nourriture);

        SET _ID = last_insert_id();
	else
		update pacmandb.pacmen
        set
        Age = _Age,
        Famille = _Famille,
        Couleur = _Couleur,
        Nourriture = _Nourriture
        where ID=_ID;
	END IF;

    select _ID as `ID`;
end


--POUR LA PARTIE (Inscription/Connexion/Déconnexion)  J' AI STOCKé DIRECTEMENT SANS AUCUNE PROCEDURE DE STOCKAGE
