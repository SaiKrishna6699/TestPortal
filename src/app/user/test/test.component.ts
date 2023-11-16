import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { faClock, faArrowAltCircleLeft, faArrowAltCircleRight, faEdit } from '@fortawesome/free-regular-svg-icons';
import { interval } from 'rxjs';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { LoginServiceService } from 'src/app/services/login/login-service.service';
import { Route, Router } from '@angular/router';
import { ResultsService } from 'src/app/services/results/results.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  // //questions variable:
  // questionList: any[] = [];
  // currentQuestionNumber: number = Math.floor(Math.random() * 40);

  // correctAnswer: number = 0;
  // incorrectAnswer: number = 0;

  // questionNumbers: { [key: number]: number } = {};
  // currentIndex: number = 0;

  // //score
  // interval$: any;
  // score: string[] = [];
  // points: number = 0;
  // counter: number = 60;

  // //timer
  // timer: number = 20 * 60;
  // displayTime!: string;

  // //progress
  // progress: string = "0";


  // //clock and ui
  // clock: any = faClock;
  // right: any = faArrowAltCircleRight;
  // left: any = faArrowAltCircleLeft
  // cycle: any = faEdit;


  // //userDetails:
  // username!: string;
  // email!: string;

  // constructor(private questionService: QuestionsService, private user: UserServiceService) {
  //   const userDetails = this.user.getUser();
  //   console.log(userDetails);
  //   this.username = userDetails.name;
  //   this.email = userDetails.email;
  //   // this.username = userDetails.email
  //   this.startTimer();
  //  }

  // ngOnInit(): void {
  //   this.getAllQuestions();
  //   this.insertQuestionNumber();
  //   this.startCounter();
  // }


  // //question methods:
  // getAllQuestions() {
  //   this.questionService.getQuestionsJson().subscribe(
  //     (res: any) => {
  //       console.log(res.questions);
  //       this.questionList = res.questionList;
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // insertQuestionNumber() {
  //   let newKey = Object.keys(this.questionNumbers).length + 1;
  //   this.questionNumbers[newKey] = this.currentQuestionNumber;
  //   this.currentIndex = newKey;
  // }

  // nextQuestion() {
  //   let totalQuestions = Object.keys(this.questionNumbers).length;
  //   if (this.currentIndex < totalQuestions) {
  //     this.currentIndex++;
  //     this.currentQuestionNumber = this.questionNumbers[this.currentIndex];
  //   }
  //   else {
  //     let newQuestionNumber;
  //     do {
  //       newQuestionNumber = Math.floor(Math.random() * 40);
  //     } while (Object.values(this.questionNumbers).includes(newQuestionNumber));
  //     this.currentQuestionNumber = newQuestionNumber;
  //     this.insertQuestionNumber();

  //   }
  // }

  // previousQuestion() {
  //   if (this.currentIndex > 1) {
  //     this.currentIndex--;
  //     this.currentQuestionNumber = this.questionNumbers[this.currentIndex];
  //   }
  // }

  // answer(currentQuestionNumber: number, option: any) {
  //   if (option.correct) {
  //     this.points += 10;
  //     this.correctAnswer += 1;
  //     this.nextQuestion();
  //     this.IncreaseProgressPercent();
  //   }
  //   else {
  //     this.points -= 10;
  //     this.incorrectAnswer += 1;
  //     this.nextQuestion();
  //     this.DecreaseProgressPercent();
  //   }
  //   this.refreshCounter();
  // }



  // //Progress Bar
  // IncreaseProgressPercent() {
  //   if (this.points > 0) {
  //     this.progress = ((this.points / 100) * 100).toString();
  //     return this.progress;
  //   }
  //   else {
  //     return this.progress;
  //   }
  // }

  // DecreaseProgressPercent() {
  //   if ((parseFloat(this.progress) > 0) || this.points < 0) {
  //     this.progress = (parseFloat(this.progress) - 10).toString(); // Decrease by 10
  //     return this.progress;
  //   } else {
  //     return this.progress;
  //   }
  // }

  // //Timer Functions
  // refreshCounter() {
  //   this.stopCounter();
  //   this.counter = 60;
  //   this.startCounter();
  // }

  // startCounter() {
  //   this.interval$ = interval(1000).subscribe(val => {
  //     this.counter--;
  //     if (this.counter == 0) {
  //       this.incorrectAnswer += 1;
  //       this.nextQuestion();
  //       this.counter = 60;
  //       this.points -= 10;
  //     }
  //   });
  //   setTimeout(() => {
  //     this.interval$.unsubscribe();
  //   }, 60000)

  // }

  // stopCounter() {
  //   this.interval$.unsubscribe();
  //   this.counter = 0;
  // }

  // resetQuiz() {
  //   this.refreshCounter();
  //   this.points = 0;
  //   this.incorrectAnswer = 0;
  //   this.correctAnswer = 0;
  //   this.questionNumbers = {};
  //   this.currentIndex = 1
  //   this.counter = 60;
  //   this.currentQuestionNumber = Math.floor(Math.random() * 40);
  // }

  // //timer
  // startTimer() {
  //   const interval = setInterval(() => {
  //     this.timer--;
  //     this.updateDisplayTime();

  //     if (this.timer <= 0) {
  //       clearInterval(interval);
  //       this.stopCounter();
  //       const result = 'fail';

  //       //time
  //       const currentDateAndTime: Date = new Date();
  //       const year = currentDateAndTime.getFullYear();
  //       const month = currentDateAndTime.getMonth() + 1; // Month is 0-indexed, so we add 1
  //       const day = currentDateAndTime.getDate();
  //       const hours = currentDateAndTime.getHours();
  //       const minutes = currentDateAndTime.getMinutes();
  //       const seconds = currentDateAndTime.getSeconds();

  //       const formattedDateAndTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //       //time

  //       const currentScore = [
  //         this.username, this.points.toString(), this.correctAnswer.toString(), this.incorrectAnswer.toString(), (this.currentIndex-1).toString(), formattedDateAndTime.toString(), result
  //       ];
  //     }
  //   }, 1000);
  // }

  // updateDisplayTime() {
  //   const minutes = Math.floor(this.timer / 60);
  //   const seconds = this.timer % 60;
  //   this.displayTime = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  // }

  // formatTime(value: number): string {
  //   return value < 10 ? `0${value}` : `${value}`;
  // }

  constructor(private login: LoginServiceService, private questionService: QuestionsService, private route: Router, private user: UserServiceService, private results: ResultsService, private dialog: DialogService) {
    const userDetails = this.user.getUser();
    this.username = userDetails.name;
    this.email = userDetails.email;
    this.startTimer();
  }
  ngOnInit(): void {
    this.getAllQuestions();
    this.insertQuestionNumber();
    this.startCounter();

  }

  getAllQuestions() {
    this.questionService.getQuestionsJson().subscribe(
      (res) => {
        console.log(res.questions);
        this.questionList = res.questions;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  username!: string;
  email!: string;

  clock: any = faClock;
  right: any = faArrowAltCircleRight;
  left: any = faArrowAltCircleLeft
  cycle: any = faEdit;

  //points for each correct and counter for each question
  points: number = 0;
  counter: number = 60;

  //Timer
  timer: number = 20 * 60;
  displayTime!: string;

  startTimer() {
    const interval = setInterval(() => {
      this.timer--;
      this.updateDisplayTime();

      if (this.timer <= 0) {
        clearInterval(interval);
        this.stopCounter();
        const result = 'fail';

        //time
        const currentDateAndTime: Date = new Date();
        const year = currentDateAndTime.getFullYear();
        const month = currentDateAndTime.getMonth() + 1; // Month is 0-indexed, so we add 1
        const day = currentDateAndTime.getDate();
        const hours = currentDateAndTime.getHours();
        const minutes = currentDateAndTime.getMinutes();
        const seconds = currentDateAndTime.getSeconds();

        const formattedDateAndTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        //time

        const currentScore = [{
          username: this.username,
          email: this.email,
          points: this.points.toString(),
          correctAnswers: this.correctAnswer.toString(),
          wrongAnswers: this.incorrectAnswer.toString(),
          questionAttempted: (this.currentIndex - 1).toString(),
          time: formattedDateAndTime.toString(),
          results: result
        }];
        this.results.saveResults(currentScore[0])
          .then((res: any) => {
            console.log("Result Uploaded");
            this.dialog.openDialog(`Test Finished you have ${result}ed.`)
            setTimeout(() => {
              this.route.navigate(['/user/results']);
            }, 10000);
          })
          .catch((err: any) => {
            console.log("Error occurred", err);
          });



      }
    }, 1000);
  }

  updateDisplayTime() {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    this.displayTime = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }

  formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  interval$: any;

  score: string[] = [];

  //progress
  progress: string = "0";


  correctAnswer: number = 0;
  incorrectAnswer: number = 0;

  questionNumbers: { [key: number]: number } = {};
  currentIndex: number = 0;

  //question json list
  questionList: any[] = [];
  //random current question
  currentQuestionNumber: number = Math.floor(Math.random() * 40);

  insertQuestionNumber() {
    let newKey = Object.keys(this.questionNumbers).length + 1;
    this.questionNumbers[newKey] = this.currentQuestionNumber;
    this.currentIndex = newKey;
  }

  nextQuestion() {
    let totalQuestions = Object.keys(this.questionNumbers).length;
    if (this.currentIndex < totalQuestions) {
      this.currentIndex++;
      this.currentQuestionNumber = this.questionNumbers[this.currentIndex];
    } else {
      let newQuestionNumber;
      do {
        newQuestionNumber = Math.floor(Math.random() * 40);
      } while (Object.values(this.questionNumbers).includes(newQuestionNumber));
      this.currentQuestionNumber = newQuestionNumber;
      this.insertQuestionNumber();
    }
    if (this.points >= 100 || this.incorrectAnswer > 15 || this.currentIndex > 40) {
      this.stopCounter();
      const result = (this.points >= 100 && this.incorrectAnswer <= 15) ? "pass" : "fail";

      //time
      const currentDateAndTime: Date = new Date();
      const year = currentDateAndTime.getFullYear();
      const month = currentDateAndTime.getMonth() + 1; // Month is 0-indexed, so we add 1
      const day = currentDateAndTime.getDate();
      const hours = currentDateAndTime.getHours();
      const minutes = currentDateAndTime.getMinutes();
      const seconds = currentDateAndTime.getSeconds();

      const formattedDateAndTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      //time

      const currentScore = [{
        username: this.username,
        email: this.email,
        points: this.points.toString(),
        correctAnswers: this.correctAnswer.toString(),
        wrongAnswers: this.incorrectAnswer.toString(),
        questionAttempted: (this.currentIndex - 1).toString(),
        time: formattedDateAndTime.toString(),
        results: result
      }];
      console.log(currentScore[0]);
      this.results.saveResults(currentScore[0])
        .then((res: any) => {
          console.log("Result Uploaded");
          this.dialog.openDialog(`Test Finished you have ${result}ed`)
          this.route.navigate(['/user/results']);
        })
        .catch((err: any) => {
          console.log("Error occurred", err);
        });
    }
  }

  previousQuestion() {
    if (this.currentIndex > 1) {
      this.currentIndex--;
      this.currentQuestionNumber = this.questionNumbers[this.currentIndex];
    }
  }

  answer(currentQuestionNumber: number, option: any) {
    if (option.correct) {
      this.points += 10;
      this.correctAnswer += 1;
      this.nextQuestion();
      this.IncreaseProgressPercent();
    }
    else {
      this.points -= 10;
      this.incorrectAnswer += 1;
      this.nextQuestion();
      this.DecreaseProgressPercent();
    }
    this.refreshCounter();
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe(val => {
      this.counter--;
      if (this.counter == 0) {
        this.incorrectAnswer += 1;
        this.nextQuestion();
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 60000)

  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  refreshCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  IncreaseProgressPercent() {
    if (this.points > 0) {
      this.progress = ((this.points / 100) * 100).toString();
      return this.progress;
    }
    else {
      return this.progress;
    }
  }

  DecreaseProgressPercent() {
    if ((parseFloat(this.progress) > 0) || this.points < 0) {
      this.progress = (parseFloat(this.progress) - 10).toString(); // Decrease by 10
      return this.progress;
    } else {
      return this.progress;
    }
  }

  resetQuiz() {
    this.refreshCounter();
    this.points = 0;
    this.incorrectAnswer = 0;
    this.correctAnswer = 0;
    this.questionNumbers = {};
    this.currentIndex = 1
    this.counter = 60;
    this.currentQuestionNumber = Math.floor(Math.random() * 40);
  }

}
