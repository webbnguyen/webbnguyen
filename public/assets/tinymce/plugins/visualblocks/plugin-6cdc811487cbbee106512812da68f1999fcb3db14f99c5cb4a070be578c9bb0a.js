tinymce.PluginManager.add("visualblocks",function(e,t){function n(){var t=this;t.active(o),e.on("VisualBlocks",function(){t.active(e.dom.hasClass(e.getBody(),"mce-visualblocks"))})}var r,i,o;window.NodeList&&(e.addCommand("mceVisualBlocks",function(){var n,a=e.dom;r||(r=a.uniqueId(),n=a.create("link",{id:r,rel:"stylesheet",href:t+"/css/visualblocks.css"}),e.getDoc().getElementsByTagName("head")[0].appendChild(n)),e.on("PreviewFormats AfterPreviewFormats",function(t){o&&a.toggleClass(e.getBody(),"mce-visualblocks","afterpreviewformats"==t.type)}),a.toggleClass(e.getBody(),"mce-visualblocks"),o=e.dom.hasClass(e.getBody(),"mce-visualblocks"),i&&i.active(a.hasClass(e.getBody(),"mce-visualblocks")),e.fire("VisualBlocks")}),e.addButton("visualblocks",{title:"Show blocks",cmd:"mceVisualBlocks",onPostRender:n}),e.addMenuItem("visualblocks",{text:"Show blocks",cmd:"mceVisualBlocks",onPostRender:n,selectable:!0,context:"view",prependToContext:!0}),e.on("init",function(){e.settings.visualblocks_default_state&&e.execCommand("mceVisualBlocks",!1,null,{skip_focus:!0})}),e.on("remove",function(){e.dom.removeClass(e.getBody(),"mce-visualblocks")}))});
