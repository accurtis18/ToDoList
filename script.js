$(document).ready(function(){
    var localToDo = localStorage.getItem("toDoList");
    var toDo = [];
    if(localToDo !== null && localToDo !== ""){
        toDo = localToDo.split(',');
        grabItems();
    }

function writeItems(listItem){
    $('#toDoList').append(`<div class="row rowItem"><div class="col-md-3 d-none d-lg-block empty">&nbsp;</div>
    <div class="col-md-9">
    <div class="input-group mb-3 fullItem">
    <div class="input-group-prepend">
    <div class="input-group-text">
      <input type="checkbox" aria-label="Checkbox for following text input" id="check">
    </div>
  </div>
    <input type="text" class="form-control" id="listItem" value="${listItem}" readonly>
    <div class="input-group-append">
        <button class="input-group-text bg-danger text-white" id="delete">Delete</button>
    </div>
    </div>
    </div>
    </div>`);
}

function grabItems(){
    for(item of toDo){
        writeItems(item);
    }
}

function runAddItems(){
    var addItem = $('#addedItem').val();
    toDo.push(addItem);
    writeItems(addItem);
    $('#addedItem').val("");
    localStorage.setItem("toDoList", toDo.join(','));
}

$('#addedItem').keypress(function (e) {
    if (e.which == 13) {
        runAddItems();
      return false;
    }
  });

$('#add').on("click",function(){
    runAddItems();
});

$('#completed').on("click", function(){
   checked();
   $("#completed").hide();
})

$('#toDoList').on("click", '#check', function(){
    var checked = $('input:checked');
    if(checked.length === 0){
        $("#completed").hide();
    } else{
        $("#completed").show();
    } 
});

function checked(){
    var checked = $('input:checked')
    console.log(checked);
    $.each(checked, function(){
        $(this).closest(".fullItem").remove();
        var item = $(this).closest(".fullItem").find("input[id='listItem'").val();
        removeFromArray(item);
    });

}

$('#toDoList').on("click", '#delete', function(){
    $(this).closest(".fullItem").remove();
    var item = $(this).closest(".fullItem").find("input[id='listItem'").val();
    console.log(item);
    removeFromArray(item);
});

function removeFromArray(it){
    var arrayIndex = toDo.indexOf(it);
    if (arrayIndex > -1){
        toDo.splice(arrayIndex, 1);
        localStorage.setItem("toDoList", toDo.join(','));
    }
}
});