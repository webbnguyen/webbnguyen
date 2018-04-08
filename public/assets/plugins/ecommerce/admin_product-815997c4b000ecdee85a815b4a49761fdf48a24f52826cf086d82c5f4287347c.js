(function() {
  $(function() {
    var cache_values, cache_variation, check_variation_status, form, product_variations, variation_id;
    form = $('#form-post');
    variation_id = 1;
    product_variations = form.find('#product_variations');
    form.find('.content-frame-body > .c-field-group:last').after(product_variations.removeClass('hidden'));
    product_variations.on('click', '.product_variation_photo_link', function() {
      var $input;
      $input = $(this).prev();
      $.fn.upload_filemanager({
        formats: "image",
        dimension: $input.attr("data-dimension") || '',
        versions: $input.attr("data-versions") || '',
        thumb_size: $input.attr("data-thumb_size") || '',
        selected: function(file, response) {
          return $input.val(file.url);
        }
      });
      return false;
    });
    cache_variation = product_variations.find('.blank_product_variation').remove().clone().removeClass('hidden');
    cache_values = cache_variation.find('.sortable_values > li:first').remove().clone();
    product_variations.find('.add_new_variation').click(function() {
      var clone;
      clone = cache_variation.clone().attr('data-id', 'new_' + (variation_id += 1));
      product_variations.children('.variations_sortable').append(clone);
      clone.trigger('fill_variation_id');
      check_variation_status();
      return false;
    });
    product_variations.on('click', '.add_new_value', function() {
      var clone, key;
      clone = cache_values.clone();
      key = $(this).closest('.product_variation').attr('data-id');
      clone.find('input, select').each(function() {
        return $(this).attr('name', $(this).attr('name').replace('[]', '[' + key + ']')).removeAttr('id');
      });
      $(this).closest('.variation_attributes').find('.sortable_values').append(clone);
      clone.find('.product_attribute_select').trigger('change');
      return false;
    });
    product_variations.on('change', '.product_attribute_select', function() {
      var attr, i, len, results, sel, v, value;
      v = $(this).val();
      sel = $(this).closest('.row').find('.product_attribute_vals_select').html('');
      results = [];
      for (i = 0, len = PRODUCT_ATTRIBUTES.length; i < len; i++) {
        attr = PRODUCT_ATTRIBUTES[i];
        if (attr.id == v) {
          results.push((function() {
            var j, len1, ref, results1;
            ref = attr.translated_values;
            results1 = [];
            for (j = 0, len1 = ref.length; j < len1; j++) {
              value = ref[j];
              results1.push(sel.append('<option value="' + value.id + '">' + value.label.replace(/</g, '&lt;') + '</option>'));
            }
            return results1;
          })());
        } else {
          results.push(void 0);
        }
      }
      return results;
    });
    product_variations.on('fill_variation_id', '.product_variation', function() {
      var key;
      key = $(this).attr('data-id');
      $(this).find('input, select').each(function() {
        return $(this).attr('name', $(this).attr('name').replace('[]', '[' + key + ']')).removeAttr('id');
      });
      return $(this).find('.sortable_values').sortable({
        handle: '.val_sorter'
      });
    });
    product_variations.find('.sortable_values').sortable({
      handle: '.val_sorter'
    });
    product_variations.find('.variations_sortable').sortable({
      handle: '.variation_sorter',
      update: function() {
        return $(this).children().each(function(index) {
          return $(this).find('.product_variation_position').val(index);
        });
      }
    });
    product_variations.on('click', '.val_del', function() {
      $(this).closest('li').fadeOut('slow', function() {
        return $(this).remove();
      });
      return false;
    });
    product_variations.on('click', '.var_del', function() {
      if (!confirm(product_variations.attr('data-confirm-msg'))) {
        return false;
      }
      $(this).closest('.product_variation').fadeOut('slow', function() {
        $(this).remove();
        return check_variation_status();
      });
      return false;
    });
    check_variation_status = function() {
      var fields, i, j, key, len, len1, p_field, results, results1;
      fields = ['ecommerce_sku', 'ecommerce_price', 'ecommerce_weight', 'ecommerce_stock', 'ecommerce_qty', 'ecommerce_photos'];
      if (product_variations.find('.product_variation').length > 0) {
        results = [];
        for (i = 0, len = fields.length; i < len; i++) {
          key = fields[i];
          p_field = form.find('.c-field-group .item-custom-field[data-field-key="' + key + '"]');
          results.push(p_field.hide().find('.required').addClass('e_skip_required').removeClass('required'));
        }
        return results;
      } else {
        results1 = [];
        for (j = 0, len1 = fields.length; j < len1; j++) {
          key = fields[j];
          p_field = form.find('.c-field-group .item-custom-field[data-field-key="' + key + '"]');
          results1.push(p_field.show().find('.e_skip_required').removeClass('e_skip_required').addClass('required'));
        }
        return results1;
      }
    };
    return check_variation_status();
  });

}).call(this);
