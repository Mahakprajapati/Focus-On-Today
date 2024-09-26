const circles = document.querySelectorAll(".circle");
const inputFields = document.querySelectorAll(".goal-input");
const error_label = document.querySelector(".error-label");
const progress_bar = document.querySelector(".progress-bar");
const progress_value = document.querySelector(".progress-value");
const progress_label =document.querySelector(".progress-label");
const down_Quote=document.querySelector(".quote");


const upQuotes=[
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'whoa! You just completed all the goals, time for chill :D'
]
const  downQuotes=[
  "Move one step ahead, today!",
  "Keep Going !",
  "Keep Going, You’re making great progress!",
  "You’ve done great progress! "
] 

// const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {

//   first:{
//     goal:'',
//     completed:false
//   },
//   second:{
//     goal:'',
//     completed:false
//   },
//   third:{
//     goal:'',
//     completed:false
//   },
// };

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
  
let completedGoalCounts=Object.values(allGoals).filter((goal)=>goal.completed).length;
progress_value.style.width=`${(completedGoalCounts/`${inputFields.length}`)*100}%`;
progress_label.innerText=upQuotes[completedGoalCounts];
down_Quote.innerText=downQuotes[completedGoalCounts];
progress_value.firstElementChild.innerText=`${completedGoalCounts}/${inputFields.length}completed`;
// number.innerText=completedGoalCounts;

circles.forEach((circle) => {
  circle.addEventListener("click", (e) => {
    let allGoalsadded = [...inputFields].every((input) => {
      // console.log(input.value);
      return input.value;
    });

    if (allGoalsadded) {
      circle.parentElement.classList.toggle("completed");
      const inputId = circle.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalCounts=Object.values(allGoals).filter((goal)=>goal.completed).length;
      progress_value.style.width=`${(completedGoalCounts/`${inputFields.length}`)*100}%`;
      progress_label.innerText=upQuotes[completedGoalCounts];
      down_Quote.innerText=downQuotes[completedGoalCounts];
      progress_value.firstElementChild.innerText=`${completedGoalCounts}/${inputFields.length}completed`;

      // console.log(completedGoalCounts);
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      error_label.parentElement.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  // console.log(allGoals[input.id]);
  if(allGoals[input.id]){
  input.value = allGoals[input.id].goal;
  // console.log(allGoals[input.id].goal);

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
  }

  input.addEventListener("focus", () => {
    error_label.parentElement.classList.remove("show-error");
  });

  input.addEventListener("input", () => {

    if (allGoals[input.id] && allGoals[input.id].completed){
      input.value=allGoals[input.id].goal;
      return;
    }
    if(allGoals[input.id]){
    allGoals[input.id].goal=input.value;
    }else{
      allGoals[input.id]={
        goal:input.value,
        completed:false
      }
    }
     
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
