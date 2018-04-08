//= require ./imagezoom
//= require ./jquery.flexslider
//= require_self


$(window).load(function() {
  $('.flexslider').flexslider({
    animation: "slides"
  });


    panel.find('#product_variation_id').change(function(){
        var op = $(this).children('option:selected');
        panel.find('#product_slider .flex-control-thumbs li:eq('+$(this).children('option').index(op)+') img').click();
    }).trigger('change');
});