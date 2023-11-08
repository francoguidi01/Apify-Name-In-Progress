import { Component } from '@angular/core';
import { __values } from 'tslib';
@Component({
  selector: 'app-make-a-playlist',
  templateUrl: './make-a-playlist.component.html',
  styleUrls: ['./make-a-playlist.component.css']
})
export class MakeAPlaylistComponent {




showIcon1: boolean = true;
showIcon2: boolean = true;
showPlaylistCard: boolean = true;
showMasEscuchadosCard: boolean = true;

showRecommendedPlaylist: boolean = false;



/* sumValues() {
 
   const value1 = parseInt(this.quizForm.value.question1, 10) || 0;
   const value2 = parseInt(this.quizForm.value.question2, 10) || 0;
   const value3 = parseInt(this.quizForm.value.question3, 10) || 0;
   const value4 = parseInt(this.quizForm.value.question4, 10) || 0;
   const value5 = parseInt(this.quizForm.value.question5, 10) || 0;
   const value6 = parseInt(this.quizForm.value.question6, 10) || 0;
   const value7 = parseInt(this.quizForm.value.question7, 10) || 0;
   const value8 = parseInt(this.quizForm.value.question8, 10) || 0;
   const value9 = parseInt(this.quizForm.value.question9, 10) || 0;
   return value1 + value2 + value3 + value4 + value5 + value6 + value7 + value8 + value9;
 }*/






//POP 9-14
//ROCK 15-20
//R&B 21-27 









toggleVisibility(card: string) {
  if (card == 'playlist') {
    this.showMasEscuchadosCard = false;
    this.showRecommendedPlaylist = true;
    this.showPlaylistCard = false;
    this.showIcon1 = false;
    this.showIcon2 = false;

  } else if (card == 'form') {
 //   this.showFormSection = true;
    this.showPlaylistCard = false;
    this.showMasEscuchadosCard = false;
    this.showIcon2 = false;
    this.showIcon1 = false;

  }
}


}






/*¿Cuál es tu género musical favorito?
¿Tienes artistas o bandas favoritas en ese género?
¿Prefieres música en inglés o en otro idioma?
¿Te gusta la música en vivo? ¿Asistes a conciertos o festivales?
¿Tienes una canción favorita? ¿Cuál es y por qué te gusta?
¿Escuchas música mientras trabajas o estudias?
¿Te gusta bailar al ritmo de la música? ¿Qué tipo de baile disfrutas más?
¿Tienes una lista de reproducción favorita para diferentes momentos del día?
¿Prefieres música relajante o enérgica?
¿Te gusta descubrir nueva música? ¿Cómo lo haces? (radio, streaming, recomendaciones de amigos)*/



/*
1- ¿Qué es lo primero que haces al levantarte?
Me miro al espejo para levantarme el ánimo. 1pts
Voy al baño y me lavo la cara con muuuucha agua fría. 2pts
Me estiro entera!! Me encanta desperezarme. 3pts

2- De este calzado,¿cuál va más contigo?
Unas Converse. 2pts
Unas bailarinas o sandalias. Son cómodas y muy monas!! 1pts
Unas botas. me flipa combinarlas con pitillos. 3pts

3- Para una noche de chicas.¿Qué planes preparas?
Alquilo pelis de terror y preparo historias de miedo para contar durante toda la noche. 2pts
Organizo mogollón de juegos para que nos conozcamos mejor. 3pts
Revistas de chicas, música y pelis románticas. 1pts

4- Tu mejor amiga se ha enfadado con su novio porque le han dicho que él tiene otro ligue.¿Qué le dices?
Que hable con él. Antes de nada tendrá que saber su versión de los hechos,¿no? 1pts
Que le olvide!! Hay muchos peces en el mar como para que se esté preocupando por alguien que no la merece. 2pts
Que investigue bien si es cierto. Si le monta un pollo y luego resulta que es mentira, va a quedar muy mal!! 3pts

5- En lo primero que te fijas en un chico es...
En el estilo que tiene. Me gustan con un rollito especial. 2pts
Puede sonar mal, pero en el físico. Si no me entra por los ojos no hay nada que hacer...1pts
En su personalidad!! 3pts

6- ¿Dónde te irías de vacas?
A Nueva York. Haría compras por un tubo!! 1pts
A Los Ángeles. A ver si me encuentro alguna 'celebritie' 3pts
A Londres. Es una ciudad que tiene de todo 2pts

7- Seguro que estás enganchada a Internet pero, ¿cuál es tu red social favorita?
Tuenti 1pts
Facebook 2pts
Twitter 3pts

8- En tu casa, ¿con quién tienes mejor rollito?
Con mi padre. Me da todos los caprichos que quiero. 3pts
La verdad es que me ponen un poco de los nervios todos. aunque les quiero!! 2pts
Con mi madre. Es mi mejor amiga y le cuento todo. 1pts

9- ¿A quién borrarías del panorama musical?
A Tokio Hotel. 3pts
A Justin Bieber. No me gusta mucho su música. 1pts
A Eminem. No entiendo para nada su estilo!! 2pts
*/


