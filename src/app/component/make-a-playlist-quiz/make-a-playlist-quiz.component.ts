import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionAdjugdement } from 'src/app/models/question-adjugdement';
import { QuizModel } from 'src/app/models/quiz-model';
import { SpotifyService } from 'src/app/service/spotify.service';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-make-a-playlist-quiz',
  templateUrl: './make-a-playlist-quiz.component.html',
  styleUrls: ['./make-a-playlist-quiz.component.css']
})
export class MakeAPlaylistQuizComponent {

  currentQuestion: number = 1;
  totalQuestions: number = 9;
  quiz: QuizModel = new QuizModel();
  quizForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private service: SpotifyService) {
    environment.token = JSON.parse(localStorage.getItem('token') || '{}');
    environment.token = JSON.parse(localStorage.getItem('userData') || '{}');
    this.quizForm = this.formBuilder.group({
      'question1': new FormControl(this.quiz.question1, [Validators.required]),
      'question2': new FormControl(this.quiz.question2, [Validators.required]),
      'question3': new FormControl(this.quiz.question3, [Validators.required]),
      'question4': new FormControl(this.quiz.question4, [Validators.required]),
      'question5': new FormControl(this.quiz.question5, [Validators.required]),
      'question6': new FormControl(this.quiz.question6, [Validators.required]),
      'question7': new FormControl(this.quiz.question7, [Validators.required]),
      'question8': new FormControl(this.quiz.question8, [Validators.required]),
      'question9': new FormControl(this.quiz.question9, [Validators.required])
    });
  }
  questionAdjudgment: QuestionAdjugdement = new QuestionAdjugdement();

  initialTargets = {
    acousticness: 5,
    danceability: 5,
    energy: 5,
    popularity: 50,
    valence: 5,
  };

  adJugmentQuiz() {
    this.questionAdjudgment.adjustments = {
      1: { popularity: 10, energy: 1, valence: 1 },
      2: { popularity: -10, energy: -1, valence: -1 },
      3: { acousticness: 1, danceability: 1, energy: -1 },
      4: { acousticness: -1, danceability: -1, valence: 1 }
    };

    let targets: { [key: string]: number } = { ...this.initialTargets };
    if (this.quizForm && this.quizForm.value) {

      for (let i = 1; i <= 9; i++) {
        const answer = this.quizForm.value[`question${i}`];
       // console.log('answer: ', answer);

        if (this.questionAdjudgment.adjustments[answer]) {
          // Aplicar los ajustes directamente a las propiedades correspondientes en targets
          for (const key in this.questionAdjudgment.adjustments[answer]) {
            if (this.questionAdjudgment.adjustments[answer].hasOwnProperty(key)) {
              targets[key] = (targets[key] || 0) + this.questionAdjudgment.adjustments[answer][key];
            }
          }
        }

       // console.log('question ', i, ' ', { ...targets });
      }

    }
    return targets;
  }



  /*== 1 &&*/
  // 2: { popularity: -1, energy: -0.1, valence: -0.1 }, // -20
  // 3: { acousticness: 0.1, danceability: 0.1, energy: -0.1 },
  // 4: { acousticness: -0.1, danceability: -0.1, valence: 0.1 }
  // 5: { danceability: 0.2, popularity: 1 },//-20
  // 6: { valence: -0.1, danceability: 0.2, popularity: 1 },//20
  // 7: { popularity: 1, danceability: 0.2, energy: 0.2 },//-15
  // 8: { popularity: 1, valence: -0.1, energy: -0.2 },//-15
  // 9: { acousticness: 0.2, valence: -0.1, popularity: 1 }//-15
  recommended: any;
  showData: boolean = false;

  calculateValues(): void {
    let targets = this.adJugmentQuiz();
    //  console.log('Final Targets:', targets);
    targets['valence'] = targets['valence'] / 10;
    targets['acousticness'] = targets['acousticness'] / 10;
    targets['danceability'] = targets['danceability'] / 10;
    targets['energy'] = targets['energy'] / 10;

   // console.log('Final Targets:', targets);
    const arrayData = [
      targets['acousticness'].toString(),
      targets['danceability'].toString(),
      targets['energy'].toString(),
      targets['popularity'].toString(),
      targets['valence'].toString()
    ];
    console.log('array data: ', arrayData)




    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    if (Object.keys(localTokenData).length !== 0) {
      this.service.getRecommendations(localTokenData, null, arrayData).subscribe(recommended => {
        this.recommended = recommended;
        console.log(recommended);
        this.showData=true;
      });
    } else {
      this.service.get_token().subscribe(token => {
        // this.token = token;
        this.service.getRecommendations(localTokenData, null, arrayData).subscribe(recommended => {
          //   this.recommended = recommended;
          console.log(recommended);
    
        });
      });
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