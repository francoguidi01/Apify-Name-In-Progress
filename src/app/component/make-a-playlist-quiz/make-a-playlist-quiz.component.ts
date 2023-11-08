import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizModel } from 'src/app/models/quiz-model';

@Component({
  selector: 'app-make-a-playlist-quiz',
  templateUrl: './make-a-playlist-quiz.component.html',
  styleUrls: ['./make-a-playlist-quiz.component.css']
})
export class MakeAPlaylistQuizComponent {

  currentQuestion: number = 1;
  totalQuestions: number = 2;
  quiz: QuizModel = new QuizModel();
  quizForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.quizForm = this.formBuilder.group({
      'question1': new FormControl(this.quiz.question1, [Validators.required]),
      'question2': new FormControl(this.quiz.question2, [Validators.required]),
      // 'question3': new FormControl(this.quiz.question3, [Validators.required]),
      // 'question4': new FormControl(this.quiz.question4, [Validators.required]),
      // 'question5': new FormControl(this.quiz.question5, [Validators.required]),
      // 'question6': new FormControl(this.quiz.question6, [Validators.required]),
      // 'question7': new FormControl(this.quiz.question7, [Validators.required]),
      // 'question8': new FormControl(this.quiz.question8, [Validators.required]),
      // 'question9': new FormControl(this.quiz.question9, [Validators.required]),
    });
  }





  quizPlaylist() {
    console.log(this.quizForm.value);
    let sumTotal = this.sumValues()
    console.log('La suma es:', sumTotal);
    if (9 < sumTotal && sumTotal < 14) {
      console.log('eres pop');
      //alert('eres pop tio');
    } else if (15 < sumTotal && sumTotal < 20) {
      console.log('eres rock');
      //  alert('eres rock tio');
    } else {
      console.log('eres r&b');
      //  alert('eres r&b tio');
    }

  }


  nextQuestion() {
    if (this.currentQuestion < this.totalQuestions) {
      this.currentQuestion++;
    }
  }

  previousQuestion() {
    if (this.currentQuestion > 1) {
      this.currentQuestion--;
    }
  }



  /*
  
  
  target_acousticness Range: 0 - 1
  target_danceability Range: 0 - 1
  target_energy Range: 0 - 1
  target_popularity Range: 0 - 100
  target_valence Range: 0 - 1
  */

  sumValues() {
    let suma = 0;
    let strella = '';
    let target_acousticness = 0.5;
    let target_danceability = 0.5;
    let target_energy = 0.5;
    let target_popularity = 50;
    let target_valence = 0.5;


    if (this.quizForm.value.question1 == 1) {
      target_popularity += 20;
    } else if (this.quizForm.value.question1 == 2) {
      target_popularity -= 20;
    } else {
      target_energy += 0.1;
      target_danceability += 0.1;
    }
    console.log('Pregunta 1')
    console.log(target_popularity)
    console.log(target_danceability)
    console.log(target_energy)

    if (this.quizForm.value.question2 == 1) {
      target_acousticness += 0.1;
    } else if (this.quizForm.value.question2 == 2) {
      target_danceability += 0.1;
    } else {
      target_valence -= 0.1;
      target_popularity -= 15;
    }
    console.log('Pregunta 2')
    console.log(target_popularity)
    console.log(target_danceability)
    console.log(target_energy)
    console.log(target_acousticness)
    console.log(target_valence);

    if (this.quizForm.value.question3 == 1) {
      target_acousticness += 0.1;
      target_valence -= 0.2;
      target_energy -= 0.2;
    } else if (this.quizForm.value.question3 == 2) {
      target_danceability += 0.1;
      target_energy += 0.2;
    } else {
      target_popularity += 15;
    }

    if (this.quizForm.value.question4 == 1) {
      target_popularity -= 20;
    } else if (this.quizForm.value.question4 == 2) {
      target_danceability += 0.2;
    } else {
      target_popularity += 15;
    }

    if (this.quizForm.value.question5 == 1) {
      target_popularity -= 20;
    } else if (this.quizForm.value.question5 == 2) {
      target_danceability += 0.2;
    } else {
      target_popularity += 15;
    }

    if (this.quizForm.value.question6 == 1) {
      target_valence -= 0, 1;
    } else if (this.quizForm.value.question6 == 2) {
      target_danceability += 0.2;
      target_popularity += 20;
    } else {
      target_acousticness += 15;
    }

    if (this.quizForm.value.question7 == 1) {
      target_popularity -= 15;
    } else if (this.quizForm.value.question7 == 2) {
      target_danceability += 0.2;
      target_popularity += 20;
      target_energy += 0.2;
    } else {
      target_valence -= 0.2;
      target_popularity -= 15;
    }

    if (this.quizForm.value.question8 == 1) {
      target_popularity -= 15;
    } else if (this.quizForm.value.question8 == 2) {
      target_valence -= 0.1;
      target_energy -= 0.2;
    } else {
      target_valence += 0.2;
      target_popularity += 15;
      target_danceability += 0.3;
    }

    if (this.quizForm.value.question9 == 1) {
      target_acousticness += 0.2;
      target_valence -= 0.1;
      target_popularity -= 15;
    } else if (this.quizForm.value.question9 == 2) {
      target_valence += 0.2;
      target_danceability += 0.2;
      target_popularity += 20;
    } else {
      target_popularity += 15;
      target_energy -= 0.2;
    }


    // for (let questionName in this.quizForm.value) {
    //   if (questionName.startsWith('question')) {
    //     const value = parseInt(this.quizForm.value[questionName], 10) || 0;
    //     suma += value;
    //     strella += `${questionName}: ${value}\n`;
    //   }
    // }
    return suma;
  }




}

/*
1- ¿Qué es lo primero que haces al levantarte? 
Me miro al espejo para levantarme el ánimo. 1pts  target_popularity++
Voy al baño y me lavo la cara con muuuucha agua fría. 2pts  target_popularity--
Me estiro entera!! Me encanta desperezarme. 3pts target_energy++ target_danceability++

2- De este calzado,¿cuál va más contigo?
Unas Converse. 2pts target_acousticness++ 
Unas bailarinas o sandalias. Son cómodas y muy monas!! 1pts target_danceability++
Unas botas. me flipa combinarlas con pitillos. 3pts target_valence-- target_popularity--

3- Para una noche de chicas.¿Qué planes preparas?
Alquilo pelis de terror y preparo historias de miedo para contar durante toda la noche. 2pts target_acousticness++ target_valence-- target_energy--
Organizo mogollón de juegos para que nos conozcamos mejor. 3pts target_danceability++ target_energy++
Revistas de chicas, música y pelis románticas. 1pts target_popularity++

4- Tu mejor amiga se ha enfadado con su novio porque le han dicho que él tiene otro ligue.¿Qué le dices?
Que hable con él. Antes de nada tendrá que saber su versión de los hechos,¿no? 1pts target_popularity--
Que le olvide!! Hay muchos peces en el mar como para que se esté preocupando por alguien que no la merece. 2pts target_danceability++
Que investigue bien si es cierto. Si le monta un pollo y luego resulta que es mentira, va a quedar muy mal!! 3pts target_popularity++

5- En lo primero que te fijas en un chico es...
En el estilo que tiene. Me gustan con un rollito especial. 2pts  target_popularity--
Puede sonar mal, pero en el físico. Si no me entra por los ojos no hay nada que hacer...1pts target_danceability++
En su personalidad!! 3pts target_popularity++

6- ¿Dónde te irías de vacas?
A Nueva York. Haría compras por un tubo!! 1pts target_valence--
A Los Ángeles. A ver si me encuentro alguna 'celebritie' 3pts target_danceability++ target_popularity++
A Londres. Es una ciudad que tiene de todo 2pts target_acousticness++

7- Seguro que estás enganchada a Internet pero, ¿cuál es tu red social favorita?
Tuenti 1pts target_popularity--
Facebook 2pts target_danceability++ target_popularity++ target_energy++
Twitter 3pts target_valence-- target_popularity--

8- En tu casa, ¿con quién tienes mejor rollito?
Con mi padre. Me da todos los caprichos que quiero. 3pts target_popularity--
La verdad es que me ponen un poco de los nervios todos. aunque les quiero!! 2pts target_valence-- target_energy--
Con mi madre. Es mi mejor amiga y le cuento todo. 1pts target_danceability++ target_valence++ target_popularity++

9- ¿A quién borrarías del panorama musical?
A Tokio Hotel. 3pts target_acousticness++ target_valence-- target_popularity--
A Justin Bieber. No me gusta mucho su música. 1pts target_danceability++ target_valence++ target_popularity++
A Eminem. No entiendo para nada su estilo!! 2pts target_popularity++ target_energy--
*/