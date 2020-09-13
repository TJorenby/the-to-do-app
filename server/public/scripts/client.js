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
      console.log(`completeStatus is: ${response[i].is_complete}`);
      el.append(`
      <tr class="${response[i].priority_lvl}">
        <td>${response[i].task_type}</td>
        <td>${response[i].task_desc}</td>
        <td>${response[i].priority_lvl}</td>
        <td>${response[i].due_date.split('T')[0]}</td>
        <td><button type="button" class="completeBtn btn btn-outline-success btn-hover" data-id=${response[i].id} data-status=${response[i].is_complete}>Task Complete!</button></td>
        <td><button type="button" class="deleteBtn btn btn-outline-dark" data-id=${response[i].id}>Delete Task</button></td>         
      </tr>
      `);
      //priorityLvlColor(response[i].priority_lvl);
    }
  }).catch(function(err){
    alert('error! could not get data');
    console.log(err);
  })
}
//data-toggle="button" aria-pressed="false"

function onDeleteBtn(){
  console.log('in onDeleteBtn');
  let taskId = $(this).data('id');
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskId}`,
  }).then(function(response){
    console.log('task DELETED:', response);
    getTaskList();
  }).catch(function(err){
    alert('DELETE error!');
    console.log(err);
  });
  

}// end onDeleteBtn

// change complete status to true in DB
function onCompleteBtn(){
  let taskId = $(this).data('id');
  let taskStatus = $(this).data('status');
  let taskUpdate = {
    completeStatus: taskStatus
  }
  
  console.log('taskStatus is:', taskStatus);
  console.log('taskId is:', taskId);
  console.log ('task update is:', taskUpdate);
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
  taskCompleteClass();
  getTaskList();

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

function taskCompleteClass(){
  console.log ('in taskCompleteClass');
  let taskStatus = $(this).data('status');
  if (taskStatus === 'true'){
    $(this).toggleClass('taskComplete');
  }
}// THIS IS NOT WORKING YET

/*function priorityLvlColor(priorityLvl){
  console.log ('inpriorityLvlColor');
    if(priorityLvl === 'low'){

    }
}*/