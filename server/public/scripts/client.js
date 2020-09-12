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

// change complete status to true in DB
function onCompleteBtn(){
  let taskId = $(this).data('id');
  let taskUpdate = {
    completeStatus: true
  }
  console.log('in onCompleteBtn',taskId);
  
  $.ajax({
    method: 'PUT',
    url: `/tasks/${taskId}`,
    data: taskUpdate
  }).then(function(response){
    console.log('back from onCompleteBtn PUT with:', response);
  }).catch(function(err){
    alert('PUT error!');
    console.log(err);
  });

  // TO DO toggleClass for CSS on DOM
}

function onAddTaskBtn(){
  console.log('in onAddTaskBtn');
  let taskToSend ={
    task_type:$('#taskTypeIn').val() ,
    task_desc:$('#taskDescIn').val(),
    priority_lvl:$('#priorityLvlIn').val(),
    due_date:$('#dueDateIn').val(),
    is_complete: false
  }
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: taskToSend
  }).then(function(response){
    console.log('back from POST with:', response);
    getTaskList();
    resetInputs();
  }).catch(function(err){
    alert('error! Unable to post to Database');
    console.log(err);
  })
}

function resetInputs(){
  $('#taskTypeIn').val('Work'),
  $('#taskDescIn').val(''),
  $('#priorityLvlIn').val('Low'),
  $('#dueDateIn').val('')
}


