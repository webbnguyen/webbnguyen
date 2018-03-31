module CamaleonCms::Frontend::SeoHelper
  # add seo attributes to your page
  # you can pass custom data to overwrite default data generated by the system
  # return hash of seo attributes used by the_head(...)
  def cama_the_seo(data = {})
    if is_home?
      data2 = {}
    elsif is_page?
      data2 = {image: @cama_visited_post.the_thumb_url, title: "#{current_site.the_title} | #{@cama_visited_post.the_title}", description: @cama_visited_post.the_excerpt, keywords: @cama_visited_post.the_keywords, object: @cama_visited_post }
    elsif is_ajax?
      data2 = {}
    elsif is_search?
      data2 = {title: "#{current_site.the_title} | #{ct("search_title", default: "Search")}"}
    elsif is_post_type?
      data2 = {image: @cama_visited_post_type.the_thumb_url, title: "#{current_site.the_title} | #{@cama_visited_post_type.the_title}", description: @cama_visited_post_type.the_excerpt, keywords: @cama_visited_post_type.the_keywords, object: @cama_visited_post_type }
    elsif is_post_tag?
      data2 = {title: "#{current_site.the_title} | #{@cama_visited_tag.the_title}", description: @cama_visited_tag.the_excerpt, keywords: @cama_visited_tag.the_keywords, object: @cama_visited_tag }
    elsif is_category?
      data2 = {image: @cama_visited_category.the_thumb_url, title: "#{current_site.the_title} | #{@cama_visited_category.the_title}", description: @cama_visited_category.the_excerpt, keywords: @cama_visited_category.the_keywords, object: @cama_visited_category }
    elsif is_profile?
      data2 = {image: @user.the_avatar, title: "#{current_site.the_title} | #{@user.the_name}", description: @user.the_slogan, object: @user }
    else
      data2 = {}
    end
    cama_build_seo(data2.merge(@_cama_seo_setting_values || {}).merge(data))
  end

  # permit to define seo attributes by code without hooks (check here for more attributes: https://github.com/kpumuk/meta-tags)
  # @Sample: cama_seo_settings({title: "my custom title", description: "my descr", keywords: "my keywords", image: 'my img url'})
  # This values will be shown within the_head(...)
  def cama_seo_settings(options)
    @_cama_seo_setting_values ||= {}
    @_cama_seo_setting_values = @_cama_seo_setting_values.merge(options)
  end

  private
  # create seo attributes with options + default attributes
  def cama_build_seo(options = {})
    options[:image] = current_site.get_option("screenshot", current_site.the_logo) unless options[:image].present?
    options[:title] = current_site.the_title unless options[:title].present?
    options[:description] = current_site.the_option("seo_description") unless options[:description].present?
    options[:url] = request.original_url
    options[:keywords] = current_site.the_option("keywords") unless options[:keywords].present?

    s = {
      keywords: options[:keywords],
      author: current_site.get_option('seo_author'),
      icon: current_site.the_icon,
      og: {
        title: options[:title],
        description: options[:description],
        type: 'website',
        url: options[:url],
        image: options[:image]
      },
      twitter: {
        card: 'summary',
        title: options[:title],
        description: options[:description],
        url:   options[:url],
        image: options[:image],
        site: current_site.get_option('twitter_card'),
        creator: current_site.get_option('twitter_card'),
        domain: request.host
      },
      alternate: [
        { type: 'application/rss+xml', href: cama_rss_url }
      ]
    }.merge(options.except(:object))

    l = current_site.get_languages
    if l.size > 1
      l.each do |lang|
        s[:alternate] << {
          href: current_site.the_url(locale: lang),
          hreflang: lang
        }
      end
    end

    # call all hooks for seo
    r = { seo_data: s, object: options[:object] }
    hooks_run('seo', r)
    r[:seo_data]
  end
end
