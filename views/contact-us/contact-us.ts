


// function getCheckProp() {
//   const checkBox = page.getViewById('myCheckbox');
//   console.log('checked prop value = ' + checkBox.checked);
// }

let date
let maxDate = new Date();
let minDate = new Date();
var page

minDate.setDate(maxDate.getDate()-5)

exports.onPageLoaded = function(args){
   page = args.object;
   
   
   
   
}


exports.onDatePickerLoaded = function(args){

     page = args.object;
     page.bindingContext = {
             minDate:minDate,
             maxDate:maxDate,
        
         }
    }
    
 

exports.getTap = function () {
    date = page.getViewById("date");
    const checkBox = page.getViewById('myCheckbox');
    alert(date.date+ '\n' +' valor de checkbx = ' + checkBox.checked);

    //   console.log('checked prop value = ' + checkBox.checked);
 }

 exports.backHome = function(){    
    page.frame.goBack()
   }