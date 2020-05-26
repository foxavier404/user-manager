#!/bin/bash
# quick generate base laravel
PARAM=$1

if [[ "$PARAM" == "logic" ]]; then
    echo " !!! À lire absolument !!!"
    echo ""
    echo "# Cette option vous permet de générer le modèle,"
    echo "# le contrôleur et la migration d'une table du MCD"
    echo "# Exemple du nom d'entité \"User\" qui crée : "
    echo "#  1 - User.php dans le dossier 'Person' de Models dans App"
    echo "#  2 - UserController.php dans le dossier 'Person'"
    echo "#  3 - create_users_table.php dans le dossier migrations"
	echo ""
    echo -n "> Saisir le nom du module : "
    read MODULE
    while true 
    do
        echo -n "# Saisir le nom de l'entité : "
        read NAME
        echo $NAME $MODULE
        php artisan make:controller $MODULE/$NAME'Controller' --model=Models/$MODULE/$NAME
        php artisan make:migration create_${NAME,,}'s_table' --create=${NAME,,}'s'
    done
fi

if [[ "$PARAM" == "migration" ]]; then
	echo " !!! À lire absolument !!!"
    echo ""
    echo "# Cette option vous permet de crée une migration simple pour une table"
    echo "# Exemple d'un nom de migration \"add_weight_to_users\" qui crée : "
    echo "#  1 - \"add_weight_to_users_table.php\" dans le dossier migrations"
	echo ""
    echo -n "> Saisir le nom de la migration : "
    read MIGRATIONNAME
    echo -n "> Saisir l'entité concernée : "
    read ENTITYNAME
    php artisan make:migration ${MIGRATIONNAME,,}'_table' --table=${ENTITYNAME,,}'s'
    echo ""
fi

if [[ "$PARAM" == "db" ]]; then
	echo " !!! À lire absolument !!!"
    echo ""
    echo "# Cette option vous permet de pousser les migrations vers la base de donnée"
    echo ""
    php artisan migrate
fi

if [[ "$PARAM" == "seed" ]]; then
	echo " !!! À lire absolument !!!"
    echo ""
    echo "# Cette option vous permet de pousser seeds vers la base de donnée"
    echo ""
    php artisan db:seed
fi


