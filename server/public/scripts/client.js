$(document).ready(onReady);

function onReady(){
  console.log('JQ');
  clickEventListeners();
  getTaskList();
}

function clickEventListeners(){
  console.log('in clickEventListeners');
  $(document).on('click', '.deleteBtn', onDeleteBtn);
  $(document).on('click', '.completeBtn', onCompleteBtn);
  $(document).on('click', '#addTaskBtn', onAddTaskBtn);
}

function getTaskList(){
  console.log('in getTaskList');
  $.ajax({
    method: 'GET',
    url: '/tasks'
  }).then(function(response){
    console.log('back from GET with:', response);
    let el = $('#taskList');
    el.empty();
    for (let i in response){
      el.append(`
      <tr>
        <td>${response[i].task_type}</td>
        <td>${response[i].task_desc}</td>
        <td>${response[i].priority_lvl}</td>
        <td>${response[i].due_date.split('T')[0]}</td>
        <td><button class="completeBtn" data-id=${response[i].id}>Task Complete!</button></td>
        <td><button class="deleteBtn" data-id=${response[i].id}>Delete Task</button></td>           
      </tr>
      `);
    }
  }).catch(function(err){
    alert('error! could not get data');
    console.log(err);
  })
}

function onDeleteBtn(){
  console.log('in onDeleteBtn');
}

function onCompleteBtn(){
  console.log('in onCompleteBtn');
}

function onAddTaskBtn(){
  console.log('in onAddTaskBtn');
}
