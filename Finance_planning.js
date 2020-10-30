/*
//addtion notes-
//modules- It consists of different pieces of codesthat are interconnected with each other. Genearally codes are divided into different modules to maintain code integrity and to have a proper architechture division.cont.
// in order to design the solution of the problem.
//Everything(container, block etc.) in the UI is represented by a class(As UI is written in html).Thats why ,whenever we will do an operation on one of this element, we would access them through their class.

var budgetController= (function(){ //budget-handling module
    var x=34;
    var add=function(a){
      return x + a;
    }
    return {
        publicTest: function(b){
          return add(b);
        }
     }
})();
//A new concept:- JAVASCRIPT do not have syntaxes like 'budgetController.x' to access variables inside function. And thats the reason it won't be able to access the variables and functions defined itside it with .cont.
//the common type of syntaxes like mentioned. We gotta use 'return' to return /access any value(variable or fn) defined inside the function. Thats the only way to access them. Bit different from other programming languages.
//similarly, 'budgetController.add(anynumber)' wont work. Explanation:- 'add()' is indeed a function, but it is internal to the 'budgetController' and can only be called from other functions on the inside. It is not visible from the outside.
//. So when we try to call from the outside using budgetController.add(), then the JS engine cannot find it and says "This is not a function." What that means, and what the error message maybe should say, is: "add is not a public function of the budgetController." Public means accessible from the outside.
//OR 'budgetController' variable holds and IFEE function. Function publicTest is public because it is returned from 'budgetController' variable. 'add()' function is not part of what is being returned from 'budgetController', which makes it private to the outside world.cont.
//'add()' function is not private for 'publicTest' method as it is in its scope (it goes up the scope chain and finds it).

var UIController=(function(){ //UserInterface handling module
  //code
})();

var Controller=(function(budgetcntrl, uicntrl){ //Control handling module(it basically connects other modules).
    var budvalue= budgetController.publicTest(21);
    return {
           otherfn:function(){       //'Controller.otherfn()' if typed in console returns the printed value using the variable 'budvalue' which stores the value returned by the method 'publicTest' of fn 'budgetController()'.cont.
              console.log(budvalue);  //BUT when was the fn 'Controller()' called? We called 'otherfn' of 'Controller()' but we never called 'Controller' alone. If we havn't called 'Controller' seperately, then how.cont.
           }                        // the 'budvalue' was processed ? because 'budgetController.publicTest()' was never called since 'Controller()' seperately was never called. So, when the 'otherfn' uses 'budvalue' inside.cont.
       }                            //it, how it has the processed value? What is missing?
})(budgetController, UIController);
//
*/



//MAIN CODE STARTS FROM BELOW.(but have a look at above code also)
var budgetController= (function(){ //budget-handling module

      var Expense= function(id,description,value){ //function constructor for storing the properties of an "Expense" object.(type is negative)
         this.id=id;
         this.description=description;
         this.value=value;
         this.percentage=-1;
      };

      Expense.prototype.calcPercentage= function(totalinc){ //This is the prototype of 'Expense' constructor that will calculate the percentage of each value in 'exp' array with respect to total income(total positive values).
            if(totalinc > 0){
                this.percentage=Math.round((this.value/totalinc)*100);
            }
            else{
                this.percentage= -1;
            }
      };

      Expense.prototype.getPercentage= function(){ //This fn simply returns the percentage of current object of 'Expense' fn constructor(that had already been calculated with 'calcPercentage' prototype).
           return this.percentage;
      }

      var Income= function(id,description, value){//function constructor for storing the properties of an "Income" object.(type is positive)
         this.id=id;
         this.description=description;
         this.value=value;
      };

      var calculatetotal=function(type){ //this fn calculates the total values present in both the arrays(exp and inc) of the 'everyitem' object of 'data' function below and insert them into 'totals' elements.here, the argument 'type' is a string value('exp'/'inc')
         var sum=0;
         data.everyitem[type].forEach(function(curr){//using 'forEach' loop that will loop over all the values present in the array 'data.everyitem[type]'(inc[]/ exp[]) and will add them one by one using loop. Remember, 'forEach' can take callback function as an argument, which we have done here.cont.
           sum+=curr.value;//'forEach' uses 3 arguments. current value,current index and current array. here, we need to pass current value, which is represented by the 'curr' variable. what exactly is  'curr' here? how 'curr.value' is possible?
         });
         data.totals[type]= sum; //placing the final total value into the required array(either inc[] or exp[]).
      };

      var data={ //'everyitem' contains 2 arrays that will store all the values of 'exp' and 'inc' objects.
             everyitem:{
                 exp:[],
                 inc:[]
            },
            totals:{ //its another object of 'data' obj that is used to represent the sum of all values in each array of everyitem obj just above.
              exp:0,
              inc:0
            },
            budget:0,
            percentage:-1
        };

      return{   //returning a function that has a variable-'newItem' which calls the function constructor(either 'Expense' or 'Income') with the required argument defined and  passed inside it.
          addingitem: function(type,des,value){  //'type' is a string value('exp'/'inc'), 'des' is a string value(description of the product), 'value' is the number of price value(getting money or spending it )
                  var newItem,ID;
                      //[1,2,3,4,5] nextID=6
                      //[1,3,4,6,8] nextId=9
                      //ID=lastID + 1
                  //Create new ID
                  if(data.everyitem[type].length> 0){ //the length of the array of data object(either 'exp' or 'inc') should be greater than 0, otherwise the ID will be 0.
                      ID=data.everyitem[type][data.everyitem[type].length- 1].id+ 1;  //'id' is defined as an argument in function constructors(Income and Expense). It is a returned value of 'ID'(which will be pased from this fn only).Don't be confused, follow step by step.
                  }
                  else{
                      ID=0;
                  }

                  //Create a local object 'newItem' based on 'inc' or 'exp' type using the necessary function constructor defined above.
                  if(type==='exp'){ //Remember, that 'type' is one of the argument received by this fn.
                    newItem=new Expense(ID,des,value);
                  }
                  else if(type==='inc'){
                    newItem=new Income(ID,des,value);
                  }

               //Push it into the data structure.
                data.everyitem[type].push(newItem); //The newly created object will be pushed into the right array(whether exp[] or inc[]). Ex:-exp: [{id: 0, description: "Bought a car", value: "1000"}, {id: 1, description: "Food", value: "200"}]

              //returning the newly created elements
                return newItem; //now, in the end, returning this new object created where this fn was called. it is required to store the new set values:-(ID,des,value) into a seperate variable in the 'Controller' module where it is called and used as an input of another fn.(look at 'Controller' module).
           },

           deletingItem:function(type, id){ //This fn will delete the inserted items from the 'inc' or 'exp' arrays of 'everyitem' object of 'data' object above.
             //id=6
             //[1,2,4,6,8] //REMEMBER, the id value is a number but it does not neecessarily reprsents the index. In this array, we have different id's but the indexes are different.(maybe because few elements in between were deleted).So, the id is constant value but index hae to be changed.
             //index-3
             var ids,index;
             ids= data.everyitem[type].map(function(currente){//'map' fn is like 'forEach' which takes callback fn as an argument except it creates a whole new array. It takes 3 arguments like 'forEach'- current_element, current_index and current_array.
                  return currente.id;  //here, the 'currente' represents the 'type'(Thats the best explanation) and we are returning each of its items one by one into this new array. But, the doubt is why we are using 'currente.id'? why '.id'? learn more about 'map' method. maybe, map was not the best choice here but it has 'indexOf' fn which was very helpful here.
             });

             index= ids.indexOf(id); //accessing the index of element that was passed onto this fn with the help of 'indexOf' method.
             if(index!==-1){ //if the 'index' variable that used 'indexOf' method to access the index of an element(id) of 'ids' array returns -1, it means the the element is not present.
                data.everyitem[type].splice(index,1); //'splice()' method will remove the element from the index mentioned, the second argument is how many elements have to be removed with that particular element.
             }
           },

           calculatebudget:function(){ //This fn calculates the budget and returns it to the 'updatingbudget' fn of 'Controller' module .

               //calculate total income and expenses
               calculatetotal('exp'); //calling the fn that calculates the sum of all the values present in the exp[] array.
               calculatetotal('inc'); //calling the fn that calculates the sum of all the values present in the inc[] array

               //calculate the budget: income and expenses
               data.budget= data.totals.inc- data.totals.exp; //difference between the total values present in the inc[] and exp[] arrays. Take a look at the syntaxes used to call them.

               //calculate the percentage of income that we spent
               if(data.totals.inc > 0){
                 data.percentage= Math.round((data.totals.exp/ data.totals.inc) *100); //calculating the percentage of total income spent, only if the total income is greater than 0.
               }
               else{
                 data.percentage= -1;
               }
           },

           calculatePercentage:function(){ //This fn calculates percentages of all elements present in the 'exp' array with respect to total income(sum of positive values) with the help of one of the prototypes of 'Expense' object.
                /*
                  a=20
                  b=40
                  c=30
                  income=100
                  ap=20/100= 20%
                  bp=40/100= 40%
                  cp=30/100= 30%
                */
                data.everyitem.exp.forEach(function(current){ //using 'forEach', we will call 'calcPercentage()' for each element of 'exp' array in order to calculate % for each of those elements. REMEMBER, each element of 'exp' array is an object of fn contructor 'Expense' (trace back the code to understand how all the elements are object of 'Expense' fn constructor).cont.
                  current.calcPercentage(data.totals.inc);    //Thats why ,each element is able to use the prototype fn of 'Expense' constructor (because every element is an object). We ar passing total income as an argument.
                });
           },

           gettingPercentage:function(){ //This fn uses map fn to return the percentage value of each and every element of 'exp' array, who also are objects of 'Expense' fn constructor.
               var allPercentage= data.everyitem.exp.map(function(cur){ //'cur' just represents the current element of 'exp' array of 'everytime' object of 'data' object.
                    return cur.getPercentage(); //calling the 'getPercentage' for each and every element of 'exp' to calculate the percentage value for each of them. All the returned values wil be stored in the new array 'allPercentage'.
               })
               return allPercentage; //returning the new array that contains all the percentage values of the elements present in the 'exp' array.
           },

           gettingbudget:function(){ //this fn contains all the variable objects that have to be returned to the 'Controller' module after calculation.
               return{
                   budget:data.budget,
                   totalInc:data.totals.inc,
                   totalExp:data.totals.exp,
                   percentage:data.percentage
               }
           },

           testing:function(){ //just a fn to test whether the values are getting pushed into the arrays or not by printing the arrays in data object.
              console.log(data);
           }
         }
})();
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var UIController= (function(){ //UserInterface handling module
      var htmlstrings={    //IP- we have created an object that will store all the classes ued in this code from the main source file. If we have to make any changes to these classes name in the source file, then we can change the names of classes here,in the JS file at once and it will reflect everywhere in the code where.cont.
        inputtype:'.add__type',   //these classes have been used.
        inputdescription:'.add__description',
        inputvalue:'.add__value',
        inputbutton:'.add__btn',
        incomecontainer:'.income__list',
        expensescontainer:'.expenses__list',
        budgetlabel:'.budget__value',
        incomelabel:'.budget__income--value',
        expenseslabel:'.budget__expenses--value',
        percentagelabel:'.budget__expenses--percentage',
        container:'.container',
        expPercentLabel:'.item__percentage',
        dateLabel:'.budget__title--month'
      };

      var formatAmount= function(amount,type){ //This function put some some changes into our amount values that would be displayed in our UI.
            var amountSplit, intvalue, decivalue;
            /*
              '+' or '-' before the amount number
              exactly 2 decimal points
              comma seperating the thousands

              3214.45623-> 3,214.45      5000-> 5,000.00      12042.9128-> 12,042.91
            */
            amount= Math.abs(amount); //making the current amount an absolute value( just like a normal value, small dif.)
            amount=amount.toFixed(2); //restricting the decimal numbers to only 2 digits using '.toFixed' method. Remember,'.toFixed' is the method of 'Num'(numerical value datatype) and when we use it on 'amount', it will become an object containing string values(yes! string values) rather than just being a primitive value, which simply means we can use a lot of methods or prototypes with the 'amount' that is an object now.cont.
            amountSplit= amount.split('.'); //thus in this next line, we are able to use a prototype of 'String' i.e '.split' since, the values in the object 'amount' are now string values(as we used '.toFixed' method).
            intvalue=parseInt(amountSplit[0]); //since, the 'amount' was divided into 2 parts :- integer part and decimal part, and stored in the 'amountSplit' as string values, here we are accessing the 1st element, which is the interger part and storing it in a variable 'intvalue'. We are using 'parseInt' to convert the string values into integer values(for using one of the methods of integer datatype).
            //if(intvalue.length >3){     //This fn was used to put comma when '.toLocaleString' was NOT introduced as a prototype of 'Num' datatype.
            //     intvalue= intvalue.substr(0,intvalue.length -3) + ',' + intvalue.substr(intvalue.length-3, 3); // '.substr' is used to select  particular character(s) in a string element. Its 1st argument is the position(index) of that character, 2nd argument is how many characters you want to select from that positioning.
            //  }
            intvalue=intvalue.toLocaleString(); //'.toLocaleString' is a prototype of 'Num' datatype that uses comma whenever required for proper formatting of number. ex:-239134.43-> 2,39,134.43. It return a string value(prototype of 'Num' but return a string value) .
            decivalue=amountSplit[1]; //storing the decimal value,which is in string format(2nd element of 'amountSplit')into a variable 'decivalue'.

            if(amount>0){  //the amount should have some value. Then only the next line of code will be executed, else we will return zero(0) with no sign. This condition will be applied during the every beginning of runningour web page when all the money values are 0, since we don't need any sign(+ or -) for them.(no need to have a sign for 0 value).
              return (type==='exp'? '-' : '+') + intvalue + '.' + decivalue;//returning the amount with a proper format to wherever this fn is called.
            }
            else{
              return intvalue + '.'+ decivalue;
            }
      };

      var nodePercList= function(passlist, callbackfn){ //Its a tricky fn here. We are defining a fn that will take 2 arguments:- 1st is the list of all html classes where we have to put our percentages value('fieldslist' as 'passlist' ), 2nd is the callback fn that performs the main operations.NOTE:- here, we are just passing the callback fn, not calling it. It will be called in the 'for' loop.cont.
          for(var i=0; i< passlist.length; i++){        //About 'callbackfn' fn, function has been PASSED here, and then it is CALLED in the 'for' loop below till the length of total html classes.
              callbackfn(passlist[i], i); //here, we are calling the 'callbackfn' that will take 2 arguments:- element of 'passlist' list(which is the class of html that has to be changed) and 2nd is the iteration value on which our list will iterate. In the end, all the html classes text will be changed to percentage value.
           }
         };

      return{ //in a function, if you need to have access to the local variables and functions outside the fn ,then you need to return whatever you what to access.Thats the only way, to access them.
            gettinginput: function(){ //this fn is used to take inputs from from the user.take care of the syntaxes.
              return{
                     typeofvalue:document.querySelector(htmlstrings.inputtype).value, //here, we are NOT using the class name directly. 'typeofvalue' will be store the input data. Same for below code.
                     textdescripton:document.querySelector(htmlstrings.inputdescription).value,
                     numbervalue:parseFloat(document.querySelector(htmlstrings.inputvalue).value) //'parseFloat' returns a floating value (without using it, a string value was getting returned instead of a 'float' or 'int' value).
                    }
              },

            addinglistitem:function(obj, type){  //this fn is used to put the details either in the 'INCOME' or 'EXPENSES' column, depending on the input type('+' or '-') and all the details would be displayed on the front of our web page.
                  var myhtml, newhtml, element;

                  //creating HTML with placeholder string.
                  if(type==='inc'){ //if the input received is 'inc', then following code would be executed.
                      element= htmlstrings.incomecontainer; //'element' variable will store the required 'class' according to the input received(here it is '.income__list')
                      myhtml='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                  } //the above line of code is an 'html' code to draw the structure of data to be displayed. It wasn't written in the source file. Sometimes we have to do hardcoding of html like this in the JS file. Note that in the html code above, there are 3 elements that would required to be inputted with the values entered by the user. they are:-
                  else if(type==='exp'){ // 'income-%id%', %description% , %value%.('%' sign is not necessary,we can put anything).
                      element= htmlstrings.expensescontainer;
                      myhtml='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                  }

                //Replace the placeholder text with actual data.
                  newhtml=myhtml.replace('%id%', obj.id);  //replacing '%id%' with the 'id' value (in the html code above) that was received as one of the elements from 'obj'(which holds the value of 'newItemreceive()'). Same for the next 2 lines.
                  newhtml=newhtml.replace('%description%', obj.description); //we are using 'newhtml.replace()' here instead of 'myhtml.replace()' because we want to continue to update our html code with received arguments that includes previous updates, so using the latest variable that has stored the previous updates as well.
                  newhtml=newhtml.replace('%value%',formatAmount(obj.value, type));//we are using 'formatAmount' to get the properly formatted amount value.

                  //Inserting the above HTML into the DOM(Domain Object Model)
                  document.querySelector(element).insertAdjacentHTML('beforeend',newhtml); //This line of code is responsible to put the html code in the source file(which then gets converted into DOM for execution).'element' is the class here. 'insertAdjacentHTML()' is the required method to perform the task.'beforeend' means that the html code will be.cont.
                }, //considered a child class(thats why, the data is displayed below the 'INCOME' or 'EXPENSES' in our web page. There are other types as well). 'newhtml()' is the object that stores the html code with the received user inputs.

           deletingListitem:function(selectId){  //This fn will delete the values from 'INCOME' or 'EXPENSES' column in our UI.
                  var localel= document.getElementById(selectId); //selecting the 'id' (passed as an argument)of the element that has to be deleted and storing it in a variable.
                  localel.parentNode.removeChild(localel); //deleting the element from the UI. This code is a bit tricky. Since, we cannot delete any element directly in JS, we have to make our element a child element of its parent element, and then delete it. So, here we called the parentNode of our element and then the 'removeChild()' method to remove our element.cont.
           } ,                                              //We can also use '.remove' method that was introduced later in JS source file.

           clearfieldvalues:function(){ //this fn is used to clear the fields(space where user enter the inputs) after hitting the 'tick' button on screen or pressing the 'enter' key after entering the set of input data containing 3 values(type, decription, amountvalue).
                  var fieldvalues, fieldsarray;
                  fieldvalues= document.querySelectorAll(htmlstrings.inputdescription + ',' + htmlstrings.inputvalue); //selecting the classes of inputs that we want to clear and representing them with a variable 'fieldvalues'. The end result will be a list.(( .querySelectorAll) returns to us, a very crappy list known as a "node list", instead of a nice clean array like '.querySelector' does.).
                  fieldsarray= Array.prototype.slice.call(fieldvalues); //the above line of code forms a list. We have to use a trick to represent it as an array to use a prototype of array.i.e 'slice' prototype. 'slice' allows us to copy one array, and make another array from it. It is an array copy / past function basically.
                  fieldsarray.forEach(function(current, index, array){ // 'forEach' is a prototype of Array that takes 3 inputs:-current object, index value and the array through which it has been called. here the object is supposed to be 'htmlstrings.inputdescription' and then 'htmlstrings.inputvalue' .
                      current.value=""; //making the value of current object as 'empty string'.
                  });
                  fieldsarray[0].focus(); //allowing the focus to be shifted at the '.inputdescription' space after clearing the previous data using 'focus' keyword. It is present at the 0th index.
              } ,

           displaybudget:function(obj){ //This fn is used to display the final values on our web page(upper part of our page). This fn's certain elements have been derived or accessed indirectly from 'budgetController'. It is called in the 'updatingBudget' fn in the 'Controller' module.
                 var type;
                 obj.budget> 0 ? type='inc': type='exp'; //If the total budget value is greater than 0, then the type is 'inc' which means positive value. We need 'type'(either 'inc' or 'exp') to send it as a 2nd argument in 'formatAmount' fn in the below line of code.
                 document.querySelector(htmlstrings.budgetlabel).textContent= formatAmount(obj.budget,type);  //it will place the current budget value, returned as a proper formatted value from 'formatAmount' fn, into the source file that would be displayed after every item entered.'obj' here is 'budgetobj' variable which has 'budget' inside it. So, with 'obj.budget', we are accessing the 'budget' of 'budgetobj'. same for below lines of code.
                 document.querySelector(htmlstrings.incomelabel).textContent= formatAmount(obj.totalInc,'inc'); //it will put the current Income value(formatted) into the source file that would be displayed after every item entered.
                 document.querySelector(htmlstrings.expenseslabel).textContent= formatAmount(obj.totalExp,'exp'); //it will put the current Expense value(formatted) into the source file that would be displayed after every item entered.
                 if(obj.percentage > 0){ //if the current percentage value is greater than 0, then only it will be displayed. Else, it will just show '---'.
                    document.querySelector(htmlstrings.percentagelabel).textContent= obj.percentage+ '%';
                 }
                 else{
                    document.querySelector(htmlstrings.percentagelabel).textContent= '---';
                 }
               },

          displayPercentages:function(percentages){ //This fn displays the % for each 'Expense' item in our UI. We are passing the 'percentages' array that contains the calculated % values for each element in 'exp' array that represents items of 'Expense' column in our UI.
                var fieldslist= document.querySelectorAll(htmlstrings.expPercentLabel); // We are selecting 'item__percentage' html class of all the 'Expense' items that are currently present in our source code.We will change the text of each of those classes and replace it with the percentage value of that item.
                //first check the code where the below fn has been called just after few lines.
                /*var nodePercList=function(passlist, callbackfn){ //Its a tricky fn here. We are defining a fn that will take 2 arguments:- 1st is the list of all html classes where we have to put our percentages value('fieldslist' as 'passlist' ), 2nd is the callback fn that performs the main operations.NOTE:- here, we are just passing the callback fn, not calling it. It will be called in the 'for' loop.cont.
                    for(var i=0; i<passlist.length; i++){        //About 'callbackfn' fn, function has been PASSED here, and then it is CALLED in the 'for' loop below till the length of total html classes.
                        callbackfn(passlist[i], i); //here, we are calling the 'callbackfn' that will take 2 arguments:- element of 'passlist' list(which is the class of html that has to be changed) and 2nd is the iteration value on which our list will iterate. In the end, all the html classes text will be changed to percentage value.
                    } //NOTE:-The forEach() method wasn't previously available for the NodeList('fieldslist' is a NodeList(a type of list)). It was added to JavaScript later. Thats why we are using a normal fn to perform this task. Here, we were not able to use 'forEach' because it wasn't allowed for a nodelist(which is just a type of list) in the previous version of JS.
                };*/    //Look at the bottom of this JS code to find a different way by which 'displayPercentages' has been defined using 'forEach' .
                nodePercList(fieldslist, function(currListEl, index ){  //here, we are calling our 'nodePercList' fn and passng the 2 arguments:-fieldslist(containing all 'Expense' html classes ) and the callback fn which will replace the class text with the percentage text. Remember that this callback fn has been PASSED and not CALLED. So, its inside will only be executed when it is called.cont.
                    if(percentages[index] > 0){                         //At this moment, just keep in mind that 'nodePercList' fn has been called with 2 arguments:- a list and a function, and the function's arguments would be passed when this function is called.
                        currListEl.textContent= percentages[index]+'%'; //replacing the class text with the percentage text and percentage sign, for each class(represented by 'currListEl' passed through 'passlist[i]') one by one using 'for' loop.
                    }
                    else{
                        currListEl.textContent= '---';
                    }
                });
          } ,

          displayDateMonth:function(){ //This function displays the current month and date.
              var curdate, monthnames, month, year;
              curdate= new Date();  // It will return the current date.ex-Fri Aug 18 2012 20:33:39 GMT+0530 (India Standard Time)
              //console.log(current);
              //christmasDate= new Date(2016, 11, 25);
              monthnames=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']; //creating an array containing names of all months.
              month=curdate.getMonth(); //It will return the current month as a number, like--- Jan-0, Feb-1, March-2......October-9, November-10, December-11
              year=curdate.getFullYear(); //returns the current year.
              document.querySelector('.budget__title--month').textContent= monthnames[month] + ' ' + year; //selecting the class of html code  whose text has to be changed and then changing the text of that class with the current month and date.
          },    //we can format the date with othr ways also. ex:- date = new Intl.DateTimeFormat("en", { year: "numeric", month: "long" }).format(curdate);
                                                          //       document.querySelector(htmlstrings.dateLabel).textContent = date;
          changeColor:function(){ // This fn changes the color of the input boxes to red when the type is 'exp'.
              var colorSelection=document.querySelectorAll( //Selecting all the classes at once where we have to make the changes in their style. Q:- why don't the color changes for all the boxes at once? Ans:-Because it is part of html and CSS i.e it is html and CSS related. Here we are just changing the some style of classes when 'change' event is triggered. Thats what we need to do with JS, thats the only job of JS here.
                  htmlstrings.inputtype + ','+             //note:-The reason we are using comma after selecting the class is because when using querySelectorAll, the data pass in has to be a string, usually something like this: "div, p, h3"
                  htmlstrings.inputdescription +','+
                  htmlstrings.inputvalue);

              nodePercList(colorSelection, function(curr){ //we are calling a fn 'nodePercList' that was defined above as a private fn.This fn takes 2 inputs:- list and an fn(let say A),then A is called inside this fn iteratively to perform certain tasks on each element of that list.
                  curr.classList.toggle('red-focus'); //toggling the style of each class with 'classList' method in order to change the color of there border to 'red'.
              }); //'classList':- This property is useful to add, remove and toggle CSS classes on an element. the classList property is read-only, however, you can modify it by using the add(), remove() and toggle() methods.
              //note:-We are not passing the 2nd argument for 'nodePercList' but where this fn is defined it is expecting 2 arguments, although it still works, because in JS you can pass less or even more arguments to the function.If you pass less arguments then the value of the rest of arguments will be set to 'undefined'.This fn is called somewhere else also, where we need to pass 2 arguments, but here we need only 1 argument, so we passed only 1 argument, it won't give error.

              document.querySelector(htmlstrings.inputbutton).classList.toggle('red'); //changing the color of the button that enters our input.
          },

          gethtmlstrings:function(){ //this fn returns the 'htmlstrings' object to the 'UIController' and thus, making it a global object which can be accessed outside this fn since its scope has become global.
                 return htmlstrings;
              },
      };
})();
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var Controller=(function(budgetcntrl, uicntrl){ //Control handling module(it basically connects other modules).

          var settingEventListners= function(){//This fn contains all the 'EventListeners'.

                var DOM= uicntrl.gethtmlstrings(); //creating a local variable that will allow the 'Controller' to have access to the elements of 'gethtmlstrings' which is a fn of 'UIController'

                document.querySelector(DOM.inputbutton).addEventListener('click', cmdAdditem); //passing the 'cmdAdditem' fn which performs the main tasks of this module.We have NOT passed the class directly.

                document.addEventListener('keydown',function(keypressEvent){   //'keydown' is an event of pressing a key from keyboard. It's beside fn decides what to do with this event.
                          if(keypressEvent.key===13 || keypressEvent.which===13){ //if the pressed key on keyword was an 'enter' key, then also our app should continue to work. The key value of 'enter' key is 13. Thays why, we are gonna br passing the 'cmdAdditem' here also to continue the functionng of code.
                                keypressEvent.preventDefault(); //Sometimes we call the below fn called twice. This happens when you first click the add button, and then hit enter/return. Because when you click the button, it gets and keeps the focus, and the default purpose of enter is "trigger the element which has the focus".cont.
                                cmdAdditem();                   //So pressing enter first triggers the button, and then its own event handler as well. That's why we are gonna use 'preventdefault()' to remove the triggered focus if it is active because of previous event.
                            }
                        }
                  );

                document.querySelector(DOM.container).addEventListener('click', cmdDeleteitem);//this line code would be used to delete the items from the data struture, from UI ,and also to update the budget.Necessary fn has been passed into the 'addEventListener' method which is defined below.

                document.querySelector(DOM.inputtype).addEventListener('change',uicntrl.changeColor); //it will trigger the event of 'changing' the color of input boxes everytime the type is changed in our UI. Here the event is 'change' and not 'click'.
          }

           var updatingBudget= function(){ //this fn is called below in the 'cmdAdditem' fn. Its job is to call the necessary fns from the 'budgetController' module to calculate the budget.
            //1. calculate the budget
                budgetcntrl.calculatebudget();
            //2. Return the budget
                var budgetobj= budgetcntrl.gettingbudget();
            //3. Display the budget on the UI
                console.log(budgetobj); //don't need it anymore
                uicntrl.displaybudget(budgetobj); //we are passing an object as an argument which contains all the necessary values that needs to be displayed in our web page.
          };

          var updatingPercentages=function(){
            // 1.Calculate percentages
                budgetcntrl.calculatePercentage(); //This fn calculates percentages for all the elements in the 'exp' array by calling the 'calcPercentage()' prototype of 'Expense' fn constructor.
            // 2.Read percentages from 'budgetController'
                var percentages= budgetcntrl.gettingPercentage(); //This fn returns an array that contains all the percentage values of all the elements in 'exp' array.
            // 3.Update the UI with new percentages
                console.log(percentages);//just testing.Should print 'percentages' array containing % values for all expense items.
                uicntrl.displayPercentages(percentages); //calling this UI fn that will simply display the percentages number of each expense item in 'Expense' column in our UI.
          };

           var cmdAdditem= function(){ //It contains the working of our code. very ip function.
                var inputReceive,newItemreceive;

                //1. Get the field input data
                inputReceive= uicntrl.gettinginput(); //calling 'gettinginput' of 'UIController' fn that basically takes the inputs from the user.
                console.log(inputReceive);  // printing all the received values from the user for testing purpose.

                if(inputReceive.textdescripton!=="" && !isNaN(inputReceive.numbervalue) && inputReceive.numbervalue >0){ //we are putting up some conditions so that the values are only printed in the 'INCOME' or 'EXPENSES' column if they satisfy them. The conditions include:- '.textdescripton' cannot return 'empty string', '.numbervalue' cannot return 'NaN' value.cont.
                                                                                                                        //and '.numbervalue' also cannot have 0 as input.
                      //2. add the item to the budget controller(adding the recently inputted values to the required array by calling the 'addingitem' fn of 'budgetController' and storing it in a variable).
                      newItemreceive= budgetcntrl.addingitem(inputReceive.typeofvalue, inputReceive.textdescripton, inputReceive.numbervalue);

                      //3. add the item to the UI( passing the details of the input received from the user(that was stored in the 'newItemreceive') to the called fn 'addingitem()' which would be used to display those values in the UI , and also another arugument, the type of input(-ve or +ve)).
                      uicntrl.addinglistitem(newItemreceive, inputReceive.typeofvalue);

                      //4. clear the fields
                      uicntrl.clearfieldvalues(); //calling this fn will clear the previously inputted values from the blocks in our web page(description, value) and shift the focus again to the 'description' space.

                      //5. Calculate the budget.
                      updatingBudget(); //calling this fn that will calculate the budget. It is defined in 'Controller' only.

                      //6. Calculate and Update the Percentages
                      updatingPercentages();

                      //7. just a testing function
                      console.log('working');
                }
            };

          var cmdDeleteitem= function(event){ //this fn is called in 'setupEventListeners' fn above as a callback fn as an 'click' event fn. mainly used to delete the items after triggering certain events. Also, whenever and wherever you are gonna click in the container(represented by a class)in the web page, it is known as the 'target'.cont.
            var itemID, splitID; //if you print the 'target' in the console, you will get the 'class' or 'id' container on which the event was triggered.(here the event is 'click'). For ex:-<div class="income__list"> - the space(or container) represented by this class in the web page wil be a 'target' when it is triggered by an event. here is event is 'click'.
            itemID= event.target.parentNode.parentNode.parentNode.parentNode.id;//This code has the concept of 'event Delegation'. The small cross button after entering the details in the 'Income' or 'Expenses' column is the EVENT here that can also be seen in the 'target' option as represented by class 'ion-ios-close-outline' when printed in the console. Here, our aim is to get the 'id' value of one of the parent nodes.cont.
            console.log(itemID);   //and is stored in the variable 'itemID' and is actually obtained by hardcoding like we did in one of the fn above which was inserting the html code into our DOM(generally not recommended this practice).Just for the note, the html code from which we have obtained this 'id' value was coded in this JS script only and then inserted into our main html file.
               if(itemID){
                   splitID= itemID.split('-'); //The 'itemID' contains 'id' value of a parent class. It's datatype is string. So, it can use any 'String' method. 'split()' is one of the string methods that is used to break the string into different smaller values seperated by a character which is placed with the split() as its argument.
                   type= splitID[0];  //accessing the first element of splitID string.
                   ID=parseInt(splitID[1]);     //accessing the second element of splitID string.

                   //1. Delete the item from the data structure
                   budgetcntrl.deletingItem(type, ID);
                   //2. Delete the item from the UI
                   uicntrl.deletingListitem(itemID);
                   //3. Update and show the new budget
                   updatingBudget(); //this fn will update the budget in UI after every delete event. Its a borrowed fn from above. The speciality of this fn(as the name suggests) is to update budget values in our UI after every event such as deleting or adding the items.
                   //4. Calculate and Update the Percentages
                   updatingPercentages();
                }
          };

          return { //It is going to return the 'setupEventListeners' fn . learn why we are returning a fn of an IIFE fn. It is the most ip part of code because it starts the code.
               init: function(){
                     console.log('Applicaton has started.');
                     uicntrl.displayDateMonth(); //calling the 'displayDateMonth()' fn that will display the current month and year at top of our UI.
                     ;
                     uicntrl.displaybudget({ //this fn will make sure that the initial values displayed are 0 or non-exist value(budget, totalincome, totalexpenses, percentage).Instead of defining an object somewhere else and to pass it here, we defined the whole object here whose elements would be used when called.
                           budget:0,
                           totalInc:0,
                           totalExp:0,
                           percentage:-1
                     });

                    settingEventListners();
                 }
          };
})(budgetController, UIController); //why 'enter' and 'space' key are behaving the same?


Controller.init(); //calling the 'init()' from outside. Read below note to understand why we are calling a fn outside of an IIFE fn.
//ipNote:- IIFE doesn't mean that it will perform all the operations defined inside it including the functions. That's why we had to call the 'init()' function of the 'Controller' outside(also notice that it has defined inside the 'return' keyword which makes it available outside the local scope,otherwise it wouldn't be).cont.
//It only performs the operations that are directly defined inside the fn.Below is the perfect example:-
/*
var akr=(function(){
    console.log('it is in no fn'); //will be immediately executed.
    var x=2;
    var nike=function(){
          var c=4;
          var add=x+c;
          console.log(add); //won't be immediately executed. Because it has been defined inside a function and that fn has to be returned first.
     };
  return{
      adidas:nike() //'nike()' fn will be executed and thus, printing the calculated value inside it which wasn't allowed before .Note that we have assigned a different variable for the function to be returned. Thats the general format for 'return'.
   };
})();
*/

/*another way of writing 'displayPercentages' is defined below. Compare it with the previous one(her we are using 'forEach'.The forEach() method wasn't previously available on the NodeList. It was added to JavaScript later)
displayPercentages: function(percentages){
            var fieldslist = document.querySelectorAll(htmlstring.expPercentLabel);
            fieldslist.forEach(function(current, index){
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                };
            });
        },
*/







//
