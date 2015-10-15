$(document).ready(function(){
  $(".attach-preview").on('click', function(){
    var modalId = this.dataset.target;
    var attachmentId = modalId.split("attach-")[1];
    mixpanel.track("dc1_attachment_preview", {"query": this.dataset.query,
      "attachment_id": attachmentId,
      "user": this.dataset.user,
      "customer": this.dataset.customer
    });
    $("#"+modalId).modal();
  });
});
