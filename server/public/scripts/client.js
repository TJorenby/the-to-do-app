$(document).ready(onReady);

function onReady(){
  console.log('JQ');
  clickEventListeners();
  getTaskList();
}

function clickEventListeners(){
  console.log('in clickEventListeners');
}

function getTaskList(){
  console.log('in getTaskList');
  $.ajax({
    method: 'GET',
    url: '/tasks'
  }).then(function(response){
    console.log('back from GET with:', response);
    let el = $('#taskTable');
    el.empty();
    for (let i in response){
      el.append(`
      <tr class ="taskRow">   
                <td><select class="taskType">
                    <option class="Work">Work</option>
                    <option class="Home">Home</option>
                    </select> 
                </td>            
                <td>${response[i].task_desc}</td>
                <td><select class="priorityLvl">
                    <option class="low">Low</option>
                    <option class="medium">Medium</option>
                    <option class="high">High</option>
                </td></select>  
                <td>
                    <input type="date" placeholder="Due Date"/>
                </td>
                <td><button id="completeBtn" data-id=${response[i].id}>Task Complete!</button></td>
                <td><button id="deleteBtn" data-id=${response[i].id}>Delete</button></td>
            </tr>
      `);
    }
  }).catch(function(err){
    alert('error! could not get data');
    console.log(err);
  })
}
