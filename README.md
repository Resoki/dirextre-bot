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
!mute > bien mettre l'ID du rôle mute dans Config/global.json à *roleMute*

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

*---------------------------V2--------------------------*

**Ticket Systeme**
!ticket Pour ouvrir le ticket > un message de log apparaitra dans un channel, veuillez verifier que dans Config/global.json 
le *channelLog* corresponde au nom du channel où vous souhaitez que les logs soit écrit !;) 
!closeticket pour fermer le ticket


**Giveaways**
créer un giveaways>

commande + channel mentionné + temps (m/d) + nombre de winners + prix(tout attaché)
minute = m
heures = h
days= d
exemple >   *!giveaways #logs 1m 1 grade-ingame*


**Verify System**
Pour qu'un utilisateur verify son compte > !verify
un code lui sera demandé, exemple :  !verify 123234
Son profil sera ensuite verifié, il recevra le rôle 'verifie', reglable dans Config/global.js à *roleVerified*
Il faut regler coté serveur discord le role Verifie pour faire en sorte que si l'user n'as pas le role verifie qu'il voit seulement quelques channels, par exemple.
Une log est envoyé > *channelLog*