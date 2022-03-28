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


!stats => Voir les statuts/infos du bot

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
!openticket 
-Cliquez sur le bouton pour ouvrir le ticket, un ticket sera ouvert, ensuite selectionnez la catégorie pour être 
moove dans les bons channels.

le *channelLog* corresponde au nom du channel où vous souhaitez que les logs soit écrit !;) 
Dans le ticket selectionnez la categorie pour moove le ticket

!closeticket pour fermer le ticket ou en cliquant sur le bouton

**Giveaways**
créer un giveaways>

commande + channel mentionné + temps (m/d) + nombre de winners + prix(tout attaché)
minute = m
heures = h
days= d
exemple >   *!giveaways #logs 1m 1 grade-ingame*


**Membercount**
!membercount pour afficher le nombre de membre

**Invites Systeme**
Le classement des membres qui ont le plus d'invitations
!topinvites
!topinvites + nombre de membre a afficher