import { Component, OnInit} from '@angular/core';
import {TodoService} from '../services/todos.service';
import {Todo} from '../../Todo';

@Component({
  moduleId: module.id,
  selector: 'todos',
  templateUrl: 'todos.component.html'
})

export class TodosComponent implements OnInit {
  todos: Todo[];
  
  constructor(private _todoService: TodoService){
    
  }
  
  ngOnInit(){
    this.todos = [];
    this._todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos;
      });
  }

 addTodo(event:any,todoText:any){
       
        var newTodo={
          text:todoText.value,
          isCompleted:false
        };

       this._todoService.saveTodo(newTodo)
       .subscribe(res =>
        { 
          this.todos.push(res);

        });
                  todoText.value='';       
}

setEditState(todo:any,state:any){
         if(state){
              todo.isEditMode=state;
                  }
              else{
                         delete todo.isEditMode;
                  }
}

updateStatus(todo:any){
var _todo={
_id:todo._id,
text:todo.text,
isCompleted:!todo.isCompleted
};

this._todoService.updateTodo(_todo)
.subscribe((data:any)=> {
todo.isCompleted=!todo.isCompleted;
});

}

 updateTodoText(event:any, todo:any){
    if(event.which === 13){
        todo.text = event.target.value;
        var _todo = {
          _id: todo._id,
          text: todo.text,
          isCompleted: todo.isCompleted
        };
        
        this._todoService.updateTodo(_todo)
          .subscribe(data => {
            this.setEditState(todo, false);
          })
    }
 }

 deleteTodo(todo:any){
var todos=this.todos;
this._todoService.deleteTodo(todo._id)
.subscribe((data:any)=>{
     for(var i=0;i<todos.length;i++){
          if(todos[i]._id==todo._id){
                       todos.splice(i,1);
            }
    }
})

 }


}
