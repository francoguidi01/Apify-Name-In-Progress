import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionAdjugdement } from 'src/app/models/question-adjugdement';
import { QuizModel } from 'src/app/models/quiz-model';
import { SpotifyService } from 'src/app/service/spotify.service';
import { environment } from 'src/environments/environment.development';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-make-a-playlist-quiz',
  templateUrl: './make-a-playlist-quiz.component.html',
  styleUrls: ['./make-a-playlist-quiz.component.css']
})
export class MakeAPlaylistQuizComponent {

  ngOnInit() {
  }
  currentQuestion: number = 1;
  totalQuestions: number = 9;
  quiz: QuizModel = new QuizModel();
  quizForm: FormGroup;

  showLoadingSection:boolean= true;
  showResultSection:boolean= false;

  constructor(private formBuilder: FormBuilder, private service: SpotifyService, private http: HttpClient) {
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

        if (this.questionAdjudgment.adjustments[answer]) {
          for (const key in this.questionAdjudgment.adjustments[answer]) {
            if (this.questionAdjudgment.adjustments[answer].hasOwnProperty(key)) {
              targets[key] = (targets[key] || 0) + this.questionAdjudgment.adjustments[answer][key];
            }
          }
        }

      }

    }
    return targets;
  }

  recommended: any;
  showData: boolean = false;
  playlistCreated: any;

  calculateValues(): void {
    let targets = this.adJugmentQuiz();

    targets['valence'] = targets['valence'] / 10;
    targets['acousticness'] = targets['acousticness'] / 10;
    targets['danceability'] = targets['danceability'] / 10;
    targets['energy'] = targets['energy'] / 10;

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

      });
    } else {
      this.service.get_token().subscribe(token => {
        this.service.getRecommendations(localTokenData, null, arrayData).subscribe(recommended => {
          console.log('canciones recomendadas 1: ', recommended);

        });
      });
    }

    this.showLoadingSection = false;
    this.showResultSection = true;
    this.loadYeah();
  }

  loadYeah()
  {
    if(this.showResultSection)
    {
    const yeah = document.getElementById('yeahSound') as HTMLAudioElement;
     yeah.play();
    
    }
  }


  postPlaylist() {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    const userId = JSON.parse(localStorage.getItem('userData') || '{}').id;

    if (Object.keys(localTokenData).length !== 0) {
      this.service.postPlaylist(localTokenData, userId).subscribe(playlistCreated => {
        this.playlistCreated = playlistCreated;
        this.getSongsRecommendedURIS();
        console.log(this.playlistCreated);
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.getSongsRecommendedURIS();
      });
    }
  }

  uriIds: Array<String> = [];
  getSongsRecommendedURIS() {
    console.log('canciones recomendadas2: ', this.recommended);

    this.recommended.tracks.forEach((tracks: { uri: String }) => {
      this.uriIds.push(tracks.uri);
    });
    this.postSongOnPlaylist();
    console.log(this.uriIds);
  }

  postSongOnPlaylist() {
    const localTokenData = JSON.parse(localStorage.getItem('token') || '{}');
    // console.log(localTokenData);
    if (Object.keys(localTokenData).length !== 0) {

      this.service.postSongOnPlaylist(localTokenData, this.playlistCreated.id, this.uriIds).subscribe(songsAdded => {
        this.redirectToPlaylist();
      });
    } else {
      this.service.get_token().subscribe(token => {
        this.redirectToPlaylist();
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

  redirectToPlaylist() {
    window.open(this.playlistCreated.external_urls.spotify, '_blank');
  }

}