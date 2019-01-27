'use strict';

$(document).ready(function() {
    $("label[for='min-precio'] > span").html( $("#min-precio").val() );
    $("#min-precio").change(function(){
        $("label[for='min-precio'] > span").html( $(this).val() );
    });

    $("label[for='max-precio'] > span").html( $("#max-precio").val() );
    $("#max-precio").change(function(){
        $("label[for='max-precio'] > span").html( $(this).val() );
    });

    $("#anuncios-filtro-form").submit(function() {
        var url = '/?precio='+$("#min-precio").val()+'-'+$("#max-precio").val();
        var tags = $('input[name="tags[]"]:checked');
        var name = $('input[name="name"]').val().trim();
        var venta = $('input[name="venta"]:checked').val();

        if( tags.length > 0 ) {
            url += '&tags=';
            let count = 0;
            tags.each(function() {
                if(count == 0) {
                    url += $(this).val();
                } else {
                    url += ','+$(this).val();
                }
                count ++;
            });
        }

        if( typeof(venta) !== 'undefined' ) {
            url += '&venta='+venta;
        }

        if( name.length > 0 ) {
            url += '&name='+name;
        }

        window.location.href = encodeURI(url);

        return false;
    });
});