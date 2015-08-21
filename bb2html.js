/*------------------------------------------------------------------------
# author    Ivijan-Stefan Stipic
# copyright Copyright (C) 2015 CreativForm. All Rights Reserved
# license   Licensed under MIT License
# website   www.CreativForm.com
-------------------------------------------------------------------------*/
;(function($){
$.fn.bb2html = function(){
	var $ELEMENT = this,
		$TEXT	= $.trim($ELEMENT.html());
	$TEXT=$TEXT.replace(/\[(\/?[A-Z].*?)\]/gi, "["+$.trim("$1".toLowerCase())+"]");
	var fix = {
		/* Fix broken brackets */
		brackets : function(a){
			 var bracketFind = ['[[[[',']]]]','[[[',']]]','[[',']]'],
			 	 bracketReplace = ['[',']','[',']','[',']'],
				 bracketMax = bracketFind.length;
			for(var i=0; i<bracketMax; i++){
				a=a.replace(bracketFind[i],bracketReplace[i]);
			}
			return a;
		},
		cleanTrash : function(a){
			var removeXML = [
					/\<xml(.+?)\>(.+?)\<\/xml\>/gi,
					/\<w:(.+?)\>(.+?)\<\/w:(.+?)\>/gi,
					/\<o:(.+?)\>/gi,
					/<\?(.*)\? ?>/gi,
					/\<\!--(.+)--\>/gi,
					/\<\!--(.+)\>/gi
				],
				removeXMLMax=removeXML.length
				removeTags = [
					'applet',
					'body',
					'bgsound',
					'base',
					'basefont',
					'embed',
					'frame',
					'frameset',
					'head',
					'html',
					'id',
					'iframe',
					'ilayer',
					'layer',
					'link',
					'meta',
					'name',
					'object',
					'script',
					'style',
					'soap',
					'title',
					'xml',
					'soap:',
					'o:',
					'w:',
					'm:'
				],
				removeTagsMax=removeTags.length;
			for(var i=0; i<removeXMLMax; i++){
				a=a.replace(removeXML[i],"");
			}
			for(var j=0; j<removeTagsMax; j++){
				a=a.replace(/\[/+removeTags[j]+/(.+?)\](.+?)\[\//+removeTags[j]+/\]/ig,"");
				a=a.replace(/\</+removeTags[j]+/(.+?)\>(.+?)\<\//+removeTags[j]+/\>/ig,"");
				a=a.replace(/\[/+removeTags[j]+/\b[^>]*]/ig,"");
				a=a.replace(/\[\//+removeTags[j]+/\b[^>]*]/ig,"");
				a=a.replace(/\</+removeTags[j]+/\b[^>]*>/ig,"");
				a=a.replace(/\<\//+removeTags[j]+/\>/ig,"");
			}
			return a;
		},
		/* Transform all BB tags to lowercase */
		bb2html : function(a){
			a=a.replace("&nbsp;",' ');
			a=a.replace("\u00a0",' ');
			a=a.replace("&quot;",'"');
			a=a.replace('&gt;','>');
			a=a.replace('&lt;','<');
			a=a.replace('&amp;','&');
			a=a.replace('[c]','&copy;');
			a=a.replace('[sp]','&nbsp;');
			a=a.replace(/[\n\r]/g,'<br>');
			a=a.replace(/[\n]/g,"<br>");
			a=a.replace(/[\r]/g,'<br>');
			a=a.replace("<br><br><br>","<p></p>");
			a=a.replace('[*]','<li>');
			a=a.replace('[/*]','</li>');
			a=a.replace('[hr]','<hr>');
			
			a=a.replace(/\[br\]/gi,'<br>');
			a=a.replace(/\[center\](.*?)\[\/center\]/gi,'<p style="a-align: center;">$1</p>');
			a=a.replace(/\[left\](.*?)\[\/left\]/gi,'<p style="a-align: left;">$1</p>');
			a=a.replace(/\[right\](.*?)\[\/right\]/gi,'<p style="a-align: right;">$1</p>');
			a=a.replace(/\[justify\](.*?)\[\/justify\]/gi,'<p style="a-align: justify;">$1</p>');
			a=a.replace(/\[news\](.*?)\[\/news\]/gi,'<div class="news">$1</div>');
			a=a.replace(/\[div\](.*?)\[\/div\]/gi,'<div>$1</div>');
			a=a.replace(/\[span\](.*?)\[\/span\]/gi,'<span>$1</span>');
			a=a.replace(/\[font\](.*?)\[\/font\]/gi,'<font>$1</font>');
			a=a.replace(/\[font\=(.*?)\](.*?)\[\/font\]/gi,'<font style="font-family:$1">$2</font>');
			a=a.replace(/\[b\](.*?)\[\/b\]/gi,'<strong>$1</strong>');
			a=a.replace(/\[bold\](.*?)\[\/bold\]/gi,'<strong>$1</strong>');
			a=a.replace(/\[strong\](.*?)\[\/strong\]/gi,'<strong>$1</strong>');
			a=a.replace(/\[big\](.*?)\[\/big\]/gi,'<big>$1</big>');
			a=a.replace(/\[small\](.*?)\[\/small\]/gi,'<small>$1</small>');
			a=a.replace(/\[list\](.*?)\[\/list\]/gi,'<ol>$1</ol>');
			a=a.replace(/\[list\=(.*?)\](.*?)\[\/list\]/gi,'<ol start="$1">$2</span>');
			a=a.replace(/\[ul\](.*?)\[\/ul\]/gi,'<ul>$1</ul>');
			a=a.replace(/\[li\](.*?)\[\/li\]/gi,'<li>$1</li>');
			a=a.replace(/\[tt\](.*?)\[\/tt\]/gi,'<tt>$1</tt>');
			a=a.replace(/\[code\](.*?)\[\/code\]/gi,'<code>$1</code>');
			a=a.replace(/\[quote\](.*?)\[\/quote\]/gi,'<blockquote>$1</blockquote>');
			a=a.replace(/\[blockquote\](.*?)\[\/blockquote\]/gi,'<blockquote>$1</blockquote>');
			a=a.replace(/\[cite\](.*?)\[\/cite\]/gi,'<cite>$1</cite>');
			a=a.replace(/\[u\](.*?)\[\/u\]/gi,'<u>$1</u>');
			a=a.replace(/\[i\](.*?)\[\/i\]/gi,'<em>$1</em>');
			a=a.replace(/\[em\](.*?)\[\/em\]/gi,'<em>$1</em>');
			a=a.replace(/\[p\](.*?)\[\/p\]/gi,'<p>$1</p>');
			a=a.replace(/\[s\](.*?)\[\/s\]/gi,'<span style="a-decoration:line-through">$1</span>');
			a=a.replace(/\[h1\](.*?)\[\/h1\]/gi,'<h1>$1</h1>');
			a=a.replace(/\[h2\](.*?)\[\/h2\]/gi,'<h2>$1</h2>');
			a=a.replace(/\[h3\](.*?)\[\/h3\]/gi,'<h3>$1</h3>');
			a=a.replace(/\[h4\](.*?)\[\/h4\]/gi,'<h4>$1</h4>');
			a=a.replace(/\[h5\](.*?)\[\/h5\]/gi,'<h5>$1</h5>');
			a=a.replace(/\[h6\](.*?)\[\/h6\]/gi,'<h6>$1</h6>');
			a=a.replace(/\[sup\](.*?)\[\/sup\]/gi,'<sup>$1</sup>');
			a=a.replace(/\[sub\](.*?)\[\/sub\]/gi,'<sub>$1</sub>');
			a=a.replace(/\[img\](.*?)\[\/img\]/gi,'<img src="$1" class="img-responsive" alt="$1">');
			a=a.replace(/\[img\=(.*?)\](.*?)\[\/img\]/gi,'<img src="$1" title="$2" alt="$2" class="img-responsive">');
			a=a.replace(/\[email\=([_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3}))\](.*?)\[\/email\]/gi,'<a href="mailto:$1">$2</a>');
			a=a.replace(/\[mail\=([_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3}))\](.*?)\[\/mail\]/gi,'<span>$1</span>');
			a=a.replace(/\[email\]([_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3}))\[\/email\]/gi,'<a href="mailto:$1">$1</a>');
			a=a.replace(/\[mail\]([_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3}))\[\/mail\]/gi,'<a href="mailto:$1">$1</a>');
			a=a.replace(/\[url\=(.*?)\](.*?)\[\/url\]/gi,'<a target="_blank" href="$1">$2</a>');
			a=a.replace(/\[url\](.*?)\[\/url\]/gi,'<a target="_blank" href="$1">$1</a>');
			a=a.replace(/\[link\=(.*?)\](.*?)\[\/link\]/gi,'<a target="_blank" href="$1">$2</a>');
			a=a.replace(/\[color\=(.*?)\](.*?)\[\/color\]/gi,'<font style="color:$1;">$2</font>');
			a=a.replace(/\[size\=(.*?)\](.*?)\[\/size\]/gi,'<font style="font-size:$1;">$2</font>');
			
			a=a.replace('http://mailto:', 'mailto:');
			return a;
		},
	}
	
	/* REPLACE */
	$TEXT=fix.brackets($TEXT);
	$TEXT=fix.cleanTrash($TEXT);
	$TEXT=fix.bb2html($TEXT);
	/* RETURN */
	$ELEMENT.html($.trim($TEXT));
};	
}(jQuery));
