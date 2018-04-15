$.ajaxSetup({
  timeout: 60000
});
$(document).bind("ajaxStart", function(){
   $("#loading").show();
 }).bind("ajaxStop",function(){
   $("#loading").hide();
 });

/*Create alias link*/
$("a[role='alias']").on("click",function(event){
  $(event.target.dataset.toggle).click();
});

$("body").on("response:received",function(event,data,textStatus,jqXHR){
  toastr.warning(event.target.id+" has not processed a response");
});


$(document).ready(function(){
  $(".submit-with-recaptcha").on("click",function(event){
    form = $(event.target.dataset.form)[0]
    if (form.checkValidity() === false) {
      form.classList.add('was-validated');
      return ;
    }
    form.classList.remove('was-validated');
    $("#recaptcha").data("form",event.target.dataset.form);
    grecaptcha.execute();
  });

  $(".ajax-form").submit(function(event){
    event.preventDefault();
    if (event.target.checkValidity() === false) {
      event.target.classList.add('was-validated');
      return ;
    }
    event.target.classList.remove('was-validated');
    $(event.target).find("input").removeClass("is-invalid is-valid")
    $.ajax({
      url: event.target.action,
      data: $(event.target).serialize(),
      method: event.target.method,
    }).then(function(data,textStatus,jqXHR){
      $(event.target).trigger("response:received",[data,textStatus,jqXHR]);
    },function( jqXHR, textStatus, errorThrown ){
      if(jqXHR.status==400){
        for(const field in jqXHR.responseJSON){
          if(field=="non-field-errors"){
            toastr.error(jqXHR.responseJSON["non-field-errors"].join("<br/>"))
          }else{
            input = $(event.target).find("input[name='"+field+"']")
            input.addClass("is-invalid")
            input.siblings(".invalid-feedback").html(jqXHR.responseJSON[field].join("<br/>"))
          }
        }
      }else if(jqXHR.status==403){
        toastr.warning(jqXHR.responseJSON["non-field-errors"].join("<br/>"))
      }else{
        toastr.error(jqXHR.statusText)
      }
    });
  });

  $("#formLogin").on("response:received",function(event,data,textStatus,jqXHR){
    event.stopPropagation()
    if(data.status=="OK"){
      toastr.success(data.message);
      setTimeout(function(){
        window.location.href="dashboard";
      },500)
    }else if(data.status=="INACTIVE"){
      toastr.warning(data.message)
      $("#formEmailVerifyInputEmail").val(data.email)
      $("#formMobileVerifyInputMobile").val(data.mobile)
      $("#userFirstname").text(data.first_name)
      if(data.email_verified) $("#maskEmailVerify").removeClass("d-none");
      else $("#maskEmailVerify").addClass("d-none");
      if(data.mobile_verified) $("#maskMobileVerify").removeClass("d-none");
      else $("#maskMobileVerify").addClass("d-none");
      $("#buttonLoginRegister").attr("data-target","#modalVerification")
      // slideInModal("#modalVerification")
      $(".modal.show").modal('hide');
      $("#modalVerification").modal('show');
    }else if(data.status="2FACTOR"){
      toastr.info(data.message)
    }else{
      toastr.error("Invalid response")
    }
    return false
  });

  $("#formMobileVerify").on("response:received",function(event,data,textStatus,jqXHR){
    if(data.status=="OK"){
      toastr.success(data.message);
      $("#maskMobileVerify").removeClass("d-none");
    }
    return false;
  });

  $("#formEmailVerify").on("response:received",function(event,data,textStatus,jqXHR){
    if(data.status=="OK"){
      toastr.success(data.message);
      $("#maskEmailVerify").removeClass("d-none");
    }
    return false;
  });

});

function slideInModal(selector){
  // Not working
  $(selector).one('show.bs.modal', function (e) {
      $(e.target).attr('class', 'modal slideInRight animated');
  })
  $('.modal.show').one('hide.bs.modal', function (e) {
    $(e.target).attr('class', 'modal slideOutLeft animated');
  })
  $('.modal.show').modal('hide');
  $(selector).modal('show');
}

function reCaptchaResponse(token){
  var formSelector = $("#recaptcha").data("form");
  $(formSelector+" input[name=g-recaptcha-response]").val(token);
  grecaptcha.reset();
  $(formSelector).submit();
}

function toggleChat(){
  node = $("#chatModal")[0]
  if(node.clientHeight>300){
    $(node).animate({
      height: "-=340",
      maxWidth: "250px"
    },300/*,function(){
      node.style.maxWidth="250px";
    }*/);
  }
  else {
    // node.style.maxWidth="400px";
    $(node).animate({
      height: "+=340",
      maxWidth: "95%"
    },300);
  }
}

function showChat(){
  if($("#chatModal").css("visibility")=="visible"){
    $('#chatModal').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){$("#chatModal").removeClass("wobble")});
    $("#chatModal").addClass("wobble")
  }else{
    $("#chatModal").css("visibility","visible")
  }
}

function hideChat(){
  $('#chatModal').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){$("#chatModal").removeClass("fadeOutUp");$("#chatModal").css("visibility","hidden")});
  $("#chatModal").addClass("fadeOutUp")
}

// SideNav Initialization
$(".button-collapse").sideNav();

// Material Select Initialization
$(document).ready(function () {
    $('.mdb-select').material_select();
});

// Data Picker Initialization
$('.datepicker').pickadate();

// Tooltip Initialization
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
