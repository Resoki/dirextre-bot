/* Discord bot made by Resoki /*

**Installation**
Ouvrir un terminal et verifier qu'on se situe bien dans le dossier 
Installer les dependances > *npm install*
Changer le token dans Config/global.json
Demarrer le bot > *npm start*

**Modération:**
!ban 
!kick
!slowmode

**Filter de message**, dans le fichier Evenements/blackListWords sont écrit tous les mots banni du serveur,
si un membre l'utilise, le robot supprimera sont message et l'avertira.  Vous pouvez bien sur ajouter / supprimer des mots

!stats => Voir les statuts/infos du bot

**Commande Fun**
-dog
-weather (ex: !weather Paris)

**Events:**
Quand un user rejoin le serveur > message de bienvenue!
(Attention à bien renseigner l'id du channel, dans Config/global.json *channelJoin*, ainsi que le message de votre choix dans *messageJoin*


**Status du bot**
dans config/global.json =>
*activityBot* > Joue à '<votre texte ici>'
si *statusBot* = true, le bot apparaitra en ligne
si *statusBot* = false > le bot apparaitra en ne pas déranger