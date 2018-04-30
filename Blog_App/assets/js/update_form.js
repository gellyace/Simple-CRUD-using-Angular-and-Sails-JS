$(document).ready(function(){
    updateForm();
});

function updateForm() {
    $('#btnEdit').click(function() {
        $("input[name='title']").removeAttr("readonly");  
        $("input[name='genre']").removeAttr("readonly");  
        $("input[name='description']").removeAttr("readonly");
        $("#btnEdit").hide();
        $("#btnSave").removeAttr("hidden");
    });
}