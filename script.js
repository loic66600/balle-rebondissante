//configurer le canvas
//le canvas est une zone de dessin qui permet de dessiner des formes 2d ou 3d

//on selection l element canvas dans le dom
const canvas = document.querySelector('canvas');

//on definit le contexte 2d ou 3d de canvas
let ctx = canvas.getContext('2d');

//on definit la largeur et la hauteur du canvas
//en fontion de la largeur et la hauteur de l ecran
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

//function qui generer un nombre aleatoire
function random(min, max) {
    return (Math.random() * (max - min + 1)) + min;

}
//fonction qui generer une couleur aleatoire
function randomColor() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

//on cree un class Ball
class Ball {
    //on va definir un counstructeur pour y paasser les parametres
    constructor(x, y, velX, velY, color, size) {
        this.x = x;//position x de la balle
        this.y = y;//position y de la balle
        this.velX = velX;//vitesse x de la balle
        this.velY = velY;//vitesse y de la balle
        this.color = color;//couleur de la balle
        this.size = size;//taille de la balle
    }

    //METHODE DRAW pour dessiner la balle
    draw() {
        //on demarre un nouveau chemin
        ctx.beginPath();
        //affile la couleur de la balle
        ctx.fillStyle = this.color;
        //un dessin de cercle
        ctx.arc(
            this.x,//position horizontale de la balle
            this.y,//position verticale de la balle
            this.size,//taille de la balle
            0, 2 * Math.PI //debut et fin du cercle
        );
        //on defini la couleur de remplissage
        ctx.fill();
    }
    //une methode qui permet de mettre a jour la position de la balle lorsqu elletouche le border du canvas
    update() {
        //detecter les bords du canvas
        if ((this.x + this.size) >= width) {
            this.velX = -this.velX;
        }

        //detecter les bords du canvas a gauche
        if ((this.x - this.size) <= 0) {
            this.velX = Math.abs(this.velX);
        }

        //detecter les bords du canvas en haut
        if ((this.y + this.size) >= height) {
            this.velY = -this.velY;
        }

        //detecter les bords du canvas en bas
        if ((this.y - this.size) <= 0) {
            this.velY = Math.abs(this.velY);
        }
        //on ajoute la vitesse x et y a la position x et y de la balle
        this.x += this.velX;// this.x = this.x + this.velX
        this.y += this.velY;// this.y = this.y + this.velY
    }

    //methode qui permet de detecter les collisions entre les balle
    collisionDetection() {
        //on parcour les autres balledu tableau
        for (const ball of balls) {
            //on ne fait pas collision avec elle meme
            if (ball !== this) {
                const dx = this.x - ball.x;//differance de position x
                const dy = this.y - ball.y;//differance de position y
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {//si les balles se touchent
                    //on inverse leur vitesse
                    this.velX = -this.velX;
                    this.velY = -this.velY;
                    ball.velX = -ball.velX;
                    ball.velY = -ball.velY;

                    ball.color = this.color = randomColor();//on change la couleur de la balle

                }
            }

        }
    }
}

//on cree un tbleau pour stocker les balle
let balls = [];

//on va cree une boucle pur genere le nobre de balle voulu
while (balls.length < 40) {
    //on defini des constantes pour les parametres de la balle
    const size = random(10, 20);//taille de la balle
    const vitesseX = random(-3, 3);//vitesse x de la balle
    const vitesseY = random(-3, 3);//vitesse y de la balle
    //on va instancier une balle et on lui passer les parametres
    const balle = new Ball(
        random(size, width - size),//position x     
        random(size, height - size),//position y
        vitesseX === 0 ? 1 : vitesseX,//vitesse x de la balle   
        vitesseY === 0 ? 1 : vitesseY,//vitesse y de la balle
        randomColor(),//couleur de la balle
        size//taille de la balle    
    );
    //on ajoute la balle dans le tableau
    balls.push(balle);
}
console.log(balls);

//fontion qui permet de dessiner les balle
function loop() {
    //on defini la couleur de fond
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    //on efface le canvas
    ctx.fillRect(0, 0, width, height);
    //on deffinitle cardre du canvas
    ctx.fillRect(
        0,//position x
        0,//position y
        width,//largeur
        height//hauteur
    );

    // on parcoure les balle du tableau
    for (const balle of balls) {
        //on dessine la balle
        balle.draw();
        //on met a jour la balle
        balle.update();
        //on detecte les collisions
        balle.collisionDetection();
    }

    //on appelle la fonction loop
    requestAnimationFrame(loop);
}
//on appele la fonction loop
loop();


