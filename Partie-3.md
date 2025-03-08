# Projet Partie 3

L'objectif de cette partie est d'améliorer votre client/serveur de `tchat`. En particulier, vos clients être en mesure de retrouver leur session de communication même après une déconnexion. Enfin, on souhaite également prendre en charge la notion de groupe privé avec invitation. 


## Extension de votre application de tchat

1. Prendre en charge la création de groupes privés et publiques. Cela implique de développer et d'appliquer les modifications nécessaires, comme par example, modifier en conséquence la spécification des messages. De plus, un utilisateur ne peut rejoindre un groupe que si ce dernier est invité, cela implique ainsi de rajouter de nouveaux messages pour gérer les invitations. Donner la spécification des messages envoyés par le client, et des réponses par le serveur.

2. Utiliser une base de données `sqlite`, en particulier le module `sqlite3`, pour stocker toutes les données relatives au bon fonctionnement du `tchat`. En particulier, les messages envoyés de tous les utilisateurs, tous les évènements survenus dans les groupes, tous les groupes crées, tous les messages échangés dans les groupes, ...
Ainsi si un utilisateur, se déconnecte et se reconnecte, ce dernier devrait retrouver sa session telle quelle !

3. Donner le schéma de votre base de données. 

3. Ajouter les commandes/messages pour permettre à l'utilisateur de sauvegarder, supprimer, télécharger sa session. Donner la spécification des messages envoyés par le client, et des réponses par le serveur.



