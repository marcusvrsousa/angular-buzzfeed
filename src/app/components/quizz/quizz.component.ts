import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import dataQuestions from "../../../assets/data/questions.json"

@Component({
  selector: 'app-quizz',
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
  title:string = ''
  questions: any
  questionSelected: any
  
  answers:string[] = [];
  answerSelected:string = ""
  
  questionIndex:number = 0
  questionMaxIndex:number = 0
  
  finished:boolean = false
  
  ngOnInit(): void {
    if(dataQuestions){
      this.finished = false;
      this.title = dataQuestions.title
      this.questions = dataQuestions.questions
      this.questionSelected = dataQuestions.questions[this.questionIndex]
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoice(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1
    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalResult:string = await this.checkResult(this.answers) 
      this.finished = true
      this.answerSelected = dataQuestions.results[finalResult as keyof typeof dataQuestions.results]
    }
  }

  async checkResult(answers: string[]){
    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length > 
        arr.filter(item => item === current).length
      ){
        return previous
      }else{
        return current
      }
    })

    return result
  }
}