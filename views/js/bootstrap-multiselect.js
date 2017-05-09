/**
 * Bootstrap Multiselect (https://github.com/davidstutz/bootstrap-multiselect)
 *
 * Apache License, Version 2.0:
 * Copyright (c) 2012 - 2015 David Stutz
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a
 * copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * BSD 3-Clause License:
 * Copyright (c) 2012 - 2015 David Stutz
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    - Redistributions of source code must retain the above copyright notice,
 *      this list of conditions and the following disclaimer.
 *    - Redistributions in binary form must reproduce the above copyright notice,
 *      this list of conditions and the following disclaimer in the documentation
 *      and/or other materials provided with the distribution.
 *    - Neither the name of David Stutz nor the names of its contributors may be
 *      used to endorse or promote products derived from this software without
 *      specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
!function($){"use strict";if(typeof ko!=='undefined'&&ko.bindingHandlers&&!ko.bindingHandlers.multiselect){ko.bindingHandlers.multiselect={after:['options','value','selectedOptions','enable','disable'],init:function(element,valueAccessor,allBindings,viewModel,bindingContext){var $element=$(element);var config=ko.toJS(valueAccessor());$element.multiselect(config);if(allBindings.has('options')){var options=allBindings.get('options');if(ko.isObservable(options)){ko.computed({read:function(){options();setTimeout(function(){var ms=$element.data('multiselect');if(ms)
ms.updateOriginalOptions();$element.multiselect('rebuild')},1)},disposeWhenNodeIsRemoved:element})}}
if(allBindings.has('value')){var value=allBindings.get('value');if(ko.isObservable(value)){ko.computed({read:function(){value();setTimeout(function(){$element.multiselect('refresh')},1)},disposeWhenNodeIsRemoved:element}).extend({rateLimit:100,notifyWhenChangesStop:!0})}}
if(allBindings.has('selectedOptions')){var selectedOptions=allBindings.get('selectedOptions');if(ko.isObservable(selectedOptions)){ko.computed({read:function(){selectedOptions();setTimeout(function(){$element.multiselect('refresh')},1)},disposeWhenNodeIsRemoved:element}).extend({rateLimit:100,notifyWhenChangesStop:!0})}}
var setEnabled=function(enable){setTimeout(function(){if(enable)
$element.multiselect('enable');else $element.multiselect('disable')})};if(allBindings.has('enable')){var enable=allBindings.get('enable');if(ko.isObservable(enable)){ko.computed({read:function(){setEnabled(enable())},disposeWhenNodeIsRemoved:element}).extend({rateLimit:100,notifyWhenChangesStop:!0})}else{setEnabled(enable)}}
if(allBindings.has('disable')){var disable=allBindings.get('disable');if(ko.isObservable(disable)){ko.computed({read:function(){setEnabled(!disable())},disposeWhenNodeIsRemoved:element}).extend({rateLimit:100,notifyWhenChangesStop:!0})}else{setEnabled(!disable)}}
ko.utils.domNodeDisposal.addDisposeCallback(element,function(){$element.multiselect('destroy')})},update:function(element,valueAccessor,allBindings,viewModel,bindingContext){var $element=$(element);var config=ko.toJS(valueAccessor());$element.multiselect('setOptions',config);$element.multiselect('rebuild')}}}
function forEach(array,callback){for(var index=0;index<array.length;++index){callback(array[index],index)}}
function Multiselect(select,options){this.$select=$(select);this.options=this.mergeOptions($.extend({},options,this.$select.data()));if(this.$select.attr("data-placeholder")){this.options.nonSelectedText=this.$select.data("placeholder")}
this.originalOptions=this.$select.clone()[0].options;this.query='';this.searchTimeout=null;this.lastToggledInput=null;this.options.multiple=this.$select.attr('multiple')==="multiple";this.options.onChange=$.proxy(this.options.onChange,this);this.options.onSelectAll=$.proxy(this.options.onSelectAll,this);this.options.onDeselectAll=$.proxy(this.options.onDeselectAll,this);this.options.onDropdownShow=$.proxy(this.options.onDropdownShow,this);this.options.onDropdownHide=$.proxy(this.options.onDropdownHide,this);this.options.onDropdownShown=$.proxy(this.options.onDropdownShown,this);this.options.onDropdownHidden=$.proxy(this.options.onDropdownHidden,this);this.options.onInitialized=$.proxy(this.options.onInitialized,this);this.options.onFiltering=$.proxy(this.options.onFiltering,this);this.buildContainer();this.buildButton();this.buildDropdown();this.buildSelectAll();this.buildDropdownOptions();this.buildFilter();this.updateButtonText();this.updateSelectAll(!0);if(this.options.enableClickableOptGroups&&this.options.multiple){this.updateOptGroups()}
this.options.wasDisabled=this.$select.prop('disabled');if(this.options.disableIfEmpty&&$('option',this.$select).length<=0){this.disable()}
this.$select.wrap('<span class="multiselect-native-select" />').after(this.$container);this.options.onInitialized(this.$select,this.$container)}
Multiselect.prototype={defaults:{buttonText:function(options,select){if(this.disabledText.length>0&&(select.prop('disabled')||(options.length==0&&this.disableIfEmpty))){return this.disabledText}
else if(options.length===0){return this.nonSelectedText}
else if(this.allSelectedText&&options.length===$('option',$(select)).length&&$('option',$(select)).length!==1&&this.multiple){if(this.selectAllNumber){return this.allSelectedText+' ('+options.length+')'}
else{return this.allSelectedText}}
else if(options.length>this.numberDisplayed){return options.length+' '+this.nSelectedText}
else{var selected='';var delimiter=this.delimiterText;options.each(function(){var label=($(this).attr('label')!==undefined)?$(this).attr('label'):$(this).text();selected+=label+delimiter});return selected.substr(0,selected.length-this.delimiterText.length)}},buttonTitle:function(options,select){if(options.length===0){return this.nonSelectedText}
else{var selected='';var delimiter=this.delimiterText;options.each(function(){var label=($(this).attr('label')!==undefined)?$(this).attr('label'):$(this).text();selected+=label+delimiter});return selected.substr(0,selected.length-this.delimiterText.length)}},checkboxName:function(option){return!1},optionLabel:function(element){return $(element).attr('label')||$(element).text()},optionClass:function(element){return $(element).attr('class')||''},onChange:function(option,checked){},onDropdownShow:function(event){},onDropdownHide:function(event){},onDropdownShown:function(event){},onDropdownHidden:function(event){},onSelectAll:function(){},onDeselectAll:function(){},onInitialized:function($select,$container){},onFiltering:function($filter){},enableHTML:!1,buttonClass:'btn btn-default',inheritClass:!1,buttonWidth:'auto',buttonContainer:'<div class="btn-group" />',dropRight:!1,dropUp:!1,selectedClass:'active',maxHeight:!1,includeSelectAllOption:!1,includeSelectAllIfMoreThan:0,selectAllText:' Tous',selectAllValue:'multiselect-all',selectAllName:!1,selectAllNumber:!0,selectAllJustVisible:!0,enableFiltering:!1,enableCaseInsensitiveFiltering:!1,enableFullValueFiltering:!1,enableClickableOptGroups:!1,enableCollapsibleOptGroups:!1,filterPlaceholder:'Search',filterBehavior:'text',includeFilterClearBtn:!0,preventInputChangeEvent:!1,nonSelectedText:'Aucun',nSelectedText:'selected',allSelectedText:'Tous',numberDisplayed:3,disableIfEmpty:!1,disabledText:'',delimiterText:', ',templates:{button:'<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> <b class="caret"></b></button>',ul:'<ul class="multiselect-container dropdown-menu"></ul>',filter:'<li class="multiselect-item multiselect-filter"><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',filterClearBtn:'<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span>',li:'<li><a tabindex="0"><label></label></a></li>',divider:'<li class="multiselect-item divider"></li>',liGroup:'<li class="multiselect-item multiselect-group"><label></label></li>'}},constructor:Multiselect,buildContainer:function(){this.$container=$(this.options.buttonContainer);this.$container.on('show.bs.dropdown',this.options.onDropdownShow);this.$container.on('hide.bs.dropdown',this.options.onDropdownHide);this.$container.on('shown.bs.dropdown',this.options.onDropdownShown);this.$container.on('hidden.bs.dropdown',this.options.onDropdownHidden)},buildButton:function(){this.$button=$(this.options.templates.button).addClass(this.options.buttonClass);if(this.$select.attr('class')&&this.options.inheritClass){this.$button.addClass(this.$select.attr('class'))}
if(this.$select.prop('disabled')){this.disable()}
else{this.enable()}
if(this.options.buttonWidth&&this.options.buttonWidth!=='auto'){this.$button.css({'width':'100%','overflow':'hidden','text-overflow':'ellipsis'});this.$container.css({'width':this.options.buttonWidth})}
var tabindex=this.$select.attr('tabindex');if(tabindex){this.$button.attr('tabindex',tabindex)}
this.$container.prepend(this.$button)},buildDropdown:function(){this.$ul=$(this.options.templates.ul);if(this.options.dropRight){this.$ul.addClass('pull-right')}
if(this.options.maxHeight){this.$ul.css({'max-height':this.options.maxHeight+'px','overflow-y':'auto','overflow-x':'hidden'})}
if(this.options.dropUp){var height=Math.min(this.options.maxHeight,$('option[data-role!="divider"]',this.$select).length*26+$('option[data-role="divider"]',this.$select).length*19+(this.options.includeSelectAllOption?26:0)+(this.options.enableFiltering||this.options.enableCaseInsensitiveFiltering?44:0));var moveCalc=height+34;this.$ul.css({'max-height':height+'px','overflow-y':'auto','overflow-x':'hidden','margin-top':"-"+moveCalc+'px'})}
this.$container.append(this.$ul)},buildDropdownOptions:function(){this.$select.children().each($.proxy(function(index,element){var $element=$(element);var tag=$element.prop('tagName').toLowerCase();if($element.prop('value')===this.options.selectAllValue){return}
if(tag==='optgroup'){this.createOptgroup(element)}
else if(tag==='option'){if($element.data('role')==='divider'){this.createDivider()}
else{this.createOptionValue(element)}}},this));$('li:not(.multiselect-group) input',this.$ul).on('change',$.proxy(function(event){var $target=$(event.target);var checked=$target.prop('checked')||!1;var isSelectAllOption=$target.val()===this.options.selectAllValue;if(this.options.selectedClass){if(checked){$target.closest('li').addClass(this.options.selectedClass)}
else{$target.closest('li').removeClass(this.options.selectedClass)}}
var value=$target.val();var $option=this.getOptionByValue(value);var $optionsNotThis=$('option',this.$select).not($option);var $checkboxesNotThis=$('input',this.$container).not($target);if(isSelectAllOption){if(checked){this.selectAll(this.options.selectAllJustVisible,!0)}
else{this.deselectAll(this.options.selectAllJustVisible,!0)}}
else{if(checked){$option.prop('selected',!0);if(this.options.multiple){$option.prop('selected',!0)}
else{if(this.options.selectedClass){$($checkboxesNotThis).closest('li').removeClass(this.options.selectedClass)}
$($checkboxesNotThis).prop('checked',!1);$optionsNotThis.prop('selected',!1);this.$button.click()}
if(this.options.selectedClass==="active"){$optionsNotThis.closest("a").css("outline","")}}
else{$option.prop('selected',!1)}
this.options.onChange($option,checked);this.updateSelectAll();if(this.options.enableClickableOptGroups&&this.options.multiple){this.updateOptGroups()}}
this.$select.change();this.updateButtonText();if(this.options.preventInputChangeEvent){return!1}},this));$('li a',this.$ul).on('mousedown',function(e){if(e.shiftKey){return!1}});$('li a',this.$ul).on('touchstart click',$.proxy(function(event){event.stopPropagation();var $target=$(event.target);if(event.shiftKey&&this.options.multiple){if($target.is("label")){event.preventDefault();$target=$target.find("input");$target.prop("checked",!$target.prop("checked"))}
var checked=$target.prop('checked')||!1;if(this.lastToggledInput!==null&&this.lastToggledInput!==$target){var from=$target.closest("li").index();var to=this.lastToggledInput.closest("li").index();if(from>to){var tmp=to;to=from;from=tmp}
++to;var range=this.$ul.find("li").slice(from,to).find("input");range.prop('checked',checked);if(this.options.selectedClass){range.closest('li').toggleClass(this.options.selectedClass,checked)}
for(var i=0,j=range.length;i<j;i++){var $checkbox=$(range[i]);var $option=this.getOptionByValue($checkbox.val());$option.prop('selected',checked)}}
$target.trigger("change")}
if($target.is("input")&&!$target.closest("li").is(".multiselect-item")){this.lastToggledInput=$target}
$target.blur()},this));this.$container.off('keydown.multiselect').on('keydown.multiselect',$.proxy(function(event){if($('input[type="text"]',this.$container).is(':focus')){return}
if(event.keyCode===9&&this.$container.hasClass('open')){this.$button.click()}
else{var $items=$(this.$container).find("li:not(.divider):not(.disabled) a").filter(":visible");if(!$items.length){return}
var index=$items.index($items.filter(':focus'));if(event.keyCode===38&&index>0){index--}
else if(event.keyCode===40&&index<$items.length-1){index++}
else if(!~index){index=0}
var $current=$items.eq(index);$current.focus();if(event.keyCode===32||event.keyCode===13){var $checkbox=$current.find('input');$checkbox.prop("checked",!$checkbox.prop("checked"));$checkbox.change()}
event.stopPropagation();event.preventDefault()}},this));if(this.options.enableClickableOptGroups&&this.options.multiple){$("li.multiselect-group input",this.$ul).on("change",$.proxy(function(event){event.stopPropagation();var $target=$(event.target);var checked=$target.prop('checked')||!1;var $li=$(event.target).closest('li');var $group=$li.nextUntil("li.multiselect-group").not('.multiselect-filter-hidden').not('.disabled');var $inputs=$group.find("input");var values=[];var $options=[];if(this.options.selectedClass){if(checked){$li.addClass(this.options.selectedClass)}
else{$li.removeClass(this.options.selectedClass)}}
$.each($inputs,$.proxy(function(index,input){var value=$(input).val();var $option=this.getOptionByValue(value);if(checked){$(input).prop('checked',!0);$(input).closest('li').addClass(this.options.selectedClass);$option.prop('selected',!0)}
else{$(input).prop('checked',!1);$(input).closest('li').removeClass(this.options.selectedClass);$option.prop('selected',!1)}
$options.push(this.getOptionByValue(value))},this))
this.options.onChange($options,checked);this.updateButtonText();this.updateSelectAll()},this))}
if(this.options.enableCollapsibleOptGroups&&this.options.multiple){$("li.multiselect-group .caret-container",this.$ul).on("click",$.proxy(function(event){var $li=$(event.target).closest('li');var $inputs=$li.nextUntil("li.multiselect-group").not('.multiselect-filter-hidden');var visible=!0;$inputs.each(function(){visible=visible&&$(this).is(':visible')});if(visible){$inputs.hide().addClass('multiselect-collapsible-hidden')}
else{$inputs.show().removeClass('multiselect-collapsible-hidden')}},this));$("li.multiselect-all",this.$ul).css('background','#f3f3f3').css('border-bottom','1px solid #eaeaea');$("li.multiselect-all > a > label.checkbox",this.$ul).css('padding','3px 20px 3px 35px');$("li.multiselect-group > a > input",this.$ul).css('margin','4px 0px 5px -20px')}},createOptionValue:function(element){var $element=$(element);if($element.is(':selected')){$element.prop('selected',!0)}
var label=this.options.optionLabel(element);var classes=this.options.optionClass(element);var value=$element.val();var inputType=this.options.multiple?"checkbox":"radio";var $li=$(this.options.templates.li);var $label=$('label',$li);$label.addClass(inputType);$li.addClass(classes);if(this.options.enableHTML){$label.html(" "+label)}
else{$label.text(" "+label)}
var $checkbox=$('<input/>').attr('type',inputType);var name=this.options.checkboxName($element);if(name){$checkbox.attr('name',name)}
$label.prepend($checkbox);var selected=$element.prop('selected')||!1;$checkbox.val(value);if(value===this.options.selectAllValue){$li.addClass("multiselect-item multiselect-all");$checkbox.parent().parent().addClass('multiselect-all')}
$label.attr('title',$element.attr('title'));this.$ul.append($li);if($element.is(':disabled')){$checkbox.attr('disabled','disabled').prop('disabled',!0).closest('a').attr("tabindex","-1").closest('li').addClass('disabled')}
$checkbox.prop('checked',selected);if(selected&&this.options.selectedClass){$checkbox.closest('li').addClass(this.options.selectedClass)}},createDivider:function(element){var $divider=$(this.options.templates.divider);this.$ul.append($divider)},createOptgroup:function(group){var label=$(group).attr("label");var value=$(group).attr("value");var $li=$('<li class="multiselect-item multiselect-group"><a href="javascript:void(0);"><label><b></b></label></a></li>');var classes=this.options.optionClass(group);$li.addClass(classes);if(this.options.enableHTML){$('label b',$li).html(" "+label)}
else{$('label b',$li).text(" "+label)}
if(this.options.enableCollapsibleOptGroups&&this.options.multiple){$('a',$li).append('<span class="caret-container"><b class="caret"></b></span>')}
if(this.options.enableClickableOptGroups&&this.options.multiple){$('a label',$li).prepend('<input type="checkbox" value="'+value+'"/>')}
if($(group).is(':disabled')){$li.addClass('disabled')}
this.$ul.append($li);$("option",group).each($.proxy(function($,group){this.createOptionValue(group)},this))},buildSelectAll:function(){if(typeof this.options.selectAllValue==='number'){this.options.selectAllValue=this.options.selectAllValue.toString()}
var alreadyHasSelectAll=this.hasSelectAll();if(!alreadyHasSelectAll&&this.options.includeSelectAllOption&&this.options.multiple&&$('option',this.$select).length>this.options.includeSelectAllIfMoreThan){if(this.options.includeSelectAllDivider){this.$ul.prepend($(this.options.templates.divider))}
var $li=$(this.options.templates.li);$('label',$li).addClass("checkbox");if(this.options.enableHTML){$('label',$li).html(" "+this.options.selectAllText)}
else{$('label',$li).text(" "+this.options.selectAllText)}
if(this.options.selectAllName){$('label',$li).prepend('<input type="checkbox" name="'+this.options.selectAllName+'" />')}
else{$('label',$li).prepend('<input type="checkbox" />')}
var $checkbox=$('input',$li);$checkbox.val(this.options.selectAllValue);$li.addClass("multiselect-item multiselect-all");$checkbox.parent().parent().addClass('multiselect-all');this.$ul.prepend($li);$checkbox.prop('checked',!1)}},buildFilter:function(){if(this.options.enableFiltering||this.options.enableCaseInsensitiveFiltering){var enableFilterLength=Math.max(this.options.enableFiltering,this.options.enableCaseInsensitiveFiltering);if(this.$select.find('option').length>=enableFilterLength){this.$filter=$(this.options.templates.filter);$('input',this.$filter).attr('placeholder',this.options.filterPlaceholder);if(this.options.includeFilterClearBtn){var clearBtn=$(this.options.templates.filterClearBtn);clearBtn.on('click',$.proxy(function(event){clearTimeout(this.searchTimeout);this.$filter.find('.multiselect-search').val('');$('li',this.$ul).show().removeClass('multiselect-filter-hidden');this.updateSelectAll();if(this.options.enableClickableOptGroups&&this.options.multiple){this.updateOptGroups()}},this));this.$filter.find('.input-group').append(clearBtn)}
this.$ul.prepend(this.$filter);this.$filter.val(this.query).on('click',function(event){event.stopPropagation()}).on('input keydown',$.proxy(function(event){if(event.which===13){event.preventDefault()}
clearTimeout(this.searchTimeout);this.searchTimeout=this.asyncFunction($.proxy(function(){if(this.query!==event.target.value){this.query=event.target.value;var currentGroup,currentGroupVisible;$.each($('li',this.$ul),$.proxy(function(index,element){var value=$('input',element).length>0?$('input',element).val():"";var text=$('label',element).text();var filterCandidate='';if((this.options.filterBehavior==='text')){filterCandidate=text}
else if((this.options.filterBehavior==='value')){filterCandidate=value}
else if(this.options.filterBehavior==='both'){filterCandidate=text+'\n'+value}
if(value!==this.options.selectAllValue&&text){var showElement=!1;if(this.options.enableCaseInsensitiveFiltering){filterCandidate=filterCandidate.toLowerCase();this.query=this.query.toLowerCase()}
if(this.options.enableFullValueFiltering&&this.options.filterBehavior!=='both'){var valueToMatch=filterCandidate.trim().substring(0,this.query.length);if(this.query.indexOf(valueToMatch)>-1){showElement=!0}}
else if(filterCandidate.indexOf(this.query)>-1){showElement=!0}
$(element).toggle(showElement).toggleClass('multiselect-filter-hidden',!showElement);if($(element).hasClass('multiselect-group')){currentGroup=element;currentGroupVisible=showElement}
else{if(showElement){$(currentGroup).show().removeClass('multiselect-filter-hidden')}
if(!showElement&&currentGroupVisible){$(element).show().removeClass('multiselect-filter-hidden')}}}},this))}
this.updateSelectAll();if(this.options.enableClickableOptGroups&&this.options.multiple){this.updateOptGroups()}
this.options.onFiltering(event.target)},this),300,this)},this))}}},destroy:function(){this.$container.remove();this.$select.show();this.$select.prop('disabled',this.options.wasDisabled);this.$select.data('multiselect',null)},refresh:function(){var inputs=$.map($('li input',this.$ul),$);$('option',this.$select).each($.proxy(function(index,element){var $elem=$(element);var value=$elem.val();var $input;for(var i=inputs.length;0<i--;){if(value!==($input=inputs[i]).val())
continue;if($elem.is(':selected')){$input.prop('checked',!0);if(this.options.selectedClass){$input.closest('li').addClass(this.options.selectedClass)}}
else{$input.prop('checked',!1);if(this.options.selectedClass){$input.closest('li').removeClass(this.options.selectedClass)}}
if($elem.is(":disabled")){$input.attr('disabled','disabled').prop('disabled',!0).closest('li').addClass('disabled')}
else{$input.prop('disabled',!1).closest('li').removeClass('disabled')}
break}},this));this.updateButtonText();this.updateSelectAll();if(this.options.enableClickableOptGroups&&this.options.multiple){this.updateOptGroups()}},select:function(selectValues,triggerOnChange){if(!$.isArray(selectValues)){selectValues=[selectValues]}
for(var i=0;i<selectValues.length;i++){var value=selectValues[i];if(value===null||value===undefined){continue}
var $option=this.getOptionByValue(value);var $checkbox=this.getInputByValue(value);if($option===undefined||$checkbox===undefined){continue}
if(!this.options.multiple){this.deselectAll(!1)}
if(this.options.selectedClass){$checkbox.closest('li').addClass(this.options.selectedClass)}
$checkbox.prop('checked',!0);$option.prop('selected',!0);if(triggerOnChange){this.options.onChange($option,!0)}}
this.updateButtonText();this.updateSelectAll();if(this.options.enableClickableOptGroups&&this.options.multiple){this.updateOptGroups()}},clearSelection:function(){this.deselectAll(!1);this.updateButtonText();this.updateSelectAll();if(this.options.enableClickableOptGroups&&this.options.multiple){this.updateOptGroups()}},deselect:function(deselectValues,triggerOnChange){if(!$.isArray(deselectValues)){deselectValues=[deselectValues]}
for(var i=0;i<deselectValues.length;i++){var value=deselectValues[i];if(value===null||value===undefined){continue}
var $option=this.getOptionByValue(value);var $checkbox=this.getInputByValue(value);if($option===undefined||$checkbox===undefined){continue}
if(this.options.selectedClass){$checkbox.closest('li').removeClass(this.options.selectedClass)}
$checkbox.prop('checked',!1);$option.prop('selected',!1);if(triggerOnChange){this.options.onChange($option,!1)}}
this.updateButtonText();this.updateSelectAll();if(this.options.enableClickableOptGroups&&this.options.multiple){this.updateOptGroups()}},selectAll:function(justVisible,triggerOnSelectAll){var justVisible=typeof justVisible==='undefined'?!0:justVisible;var allLis=$("li:not(.divider):not(.disabled):not(.multiselect-group)",this.$ul);var visibleLis=$("li:not(.divider):not(.disabled):not(.multiselect-group):not(.multiselect-filter-hidden):not(.multiselect-collapisble-hidden)",this.$ul).filter(':visible');if(justVisible){$('input:enabled',visibleLis).prop('checked',!0);visibleLis.addClass(this.options.selectedClass);$('input:enabled',visibleLis).each($.proxy(function(index,element){var value=$(element).val();var option=this.getOptionByValue(value);$(option).prop('selected',!0)},this))}
else{$('input:enabled',allLis).prop('checked',!0);allLis.addClass(this.options.selectedClass);$('input:enabled',allLis).each($.proxy(function(index,element){var value=$(element).val();var option=this.getOptionByValue(value);$(option).prop('selected',!0)},this))}
$('li input[value="'+this.options.selectAllValue+'"]',this.$ul).prop('checked',!0);if(this.options.enableClickableOptGroups&&this.options.multiple){this.updateOptGroups()}
if(triggerOnSelectAll){this.options.onSelectAll()}},deselectAll:function(justVisible,triggerOnDeselectAll){var justVisible=typeof justVisible==='undefined'?!0:justVisible;var allLis=$("li:not(.divider):not(.disabled):not(.multiselect-group)",this.$ul);var visibleLis=$("li:not(.divider):not(.disabled):not(.multiselect-group):not(.multiselect-filter-hidden):not(.multiselect-collapisble-hidden)",this.$ul).filter(':visible');if(justVisible){$('input[type="checkbox"]:enabled',visibleLis).prop('checked',!1);visibleLis.removeClass(this.options.selectedClass);$('input[type="checkbox"]:enabled',visibleLis).each($.proxy(function(index,element){var value=$(element).val();var option=this.getOptionByValue(value);$(option).prop('selected',!1)},this))}
else{$('input[type="checkbox"]:enabled',allLis).prop('checked',!1);allLis.removeClass(this.options.selectedClass);$('input[type="checkbox"]:enabled',allLis).each($.proxy(function(index,element){var value=$(element).val();var option=this.getOptionByValue(value);$(option).prop('selected',!1)},this))}
$('li input[value="'+this.options.selectAllValue+'"]',this.$ul).prop('checked',!1);if(this.options.enableClickableOptGroups&&this.options.multiple){this.updateOptGroups()}
if(triggerOnDeselectAll){this.options.onDeselectAll()}},rebuild:function(){this.$ul.html('');this.options.multiple=this.$select.attr('multiple')==="multiple";this.buildSelectAll();this.buildDropdownOptions();this.buildFilter();this.updateButtonText();this.updateSelectAll(!0);if(this.options.enableClickableOptGroups&&this.options.multiple){this.updateOptGroups()}
if(this.options.disableIfEmpty&&$('option',this.$select).length<=0){this.disable()}
else{this.enable()}
if(this.options.dropRight){this.$ul.addClass('pull-right')}},dataprovider:function(dataprovider){var groupCounter=0;var $select=this.$select.empty();$.each(dataprovider,function(index,option){var $tag;if($.isArray(option.children)){groupCounter++;$tag=$('<optgroup/>').attr({label:option.label||'Group '+groupCounter,disabled:!!option.disabled});forEach(option.children,function(subOption){var attributes={value:subOption.value,label:subOption.label||subOption.value,title:subOption.title,selected:!!subOption.selected,disabled:!!subOption.disabled};for(var key in subOption.attributes){attributes['data-'+key]=subOption.attributes[key]}
$tag.append($('<option/>').attr(attributes))})}
else{var attributes={'value':option.value,'label':option.label||option.value,'title':option.title,'class':option.class,'selected':!!option.selected,'disabled':!!option.disabled};for(var key in option.attributes){attributes['data-'+key]=option.attributes[key]}
$tag=$('<option/>').attr(attributes);$tag.text(option.label||option.value)}
$select.append($tag)});this.rebuild()},enable:function(){this.$select.prop('disabled',!1);this.$button.prop('disabled',!1).removeClass('disabled')},disable:function(){this.$select.prop('disabled',!0);this.$button.prop('disabled',!0).addClass('disabled')},setOptions:function(options){this.options=this.mergeOptions(options)},mergeOptions:function(options){return $.extend(!0,{},this.defaults,this.options,options)},hasSelectAll:function(){return $('li.multiselect-all',this.$ul).length>0},updateOptGroups:function(){var $groups=$('li.multiselect-group',this.$ul)
var selectedClass=this.options.selectedClass;$groups.each(function(){var $options=$(this).nextUntil('li.multiselect-group').not('.multiselect-filter-hidden').not('.disabled');var checked=!0;$options.each(function(){var $input=$('input',this);if(!$input.prop('checked')){checked=!1}});if(selectedClass){if(checked){$(this).addClass(selectedClass)}
else{$(this).removeClass(selectedClass)}}
$('input',this).prop('checked',checked)})},updateSelectAll:function(notTriggerOnSelectAll){if(this.hasSelectAll()){var allBoxes=$("li:not(.multiselect-item):not(.multiselect-filter-hidden):not(.multiselect-group):not(.disabled) input:enabled",this.$ul);var allBoxesLength=allBoxes.length;var checkedBoxesLength=allBoxes.filter(":checked").length;var selectAllLi=$("li.multiselect-all",this.$ul);var selectAllInput=selectAllLi.find("input");if(checkedBoxesLength>0&&checkedBoxesLength===allBoxesLength){selectAllInput.prop("checked",!0);selectAllLi.addClass(this.options.selectedClass)}
else{selectAllInput.prop("checked",!1);selectAllLi.removeClass(this.options.selectedClass)}}},updateButtonText:function(){var options=this.getSelected();if(this.options.enableHTML){$('.multiselect .multiselect-selected-text',this.$container).html(this.options.buttonText(options,this.$select))}
else{$('.multiselect .multiselect-selected-text',this.$container).text(this.options.buttonText(options,this.$select))}
$('.multiselect',this.$container).attr('title',this.options.buttonTitle(options,this.$select))},getSelected:function(){return $('option',this.$select).filter(":selected")},getOptionByValue:function(value){var options=$('option',this.$select);var valueToCompare=value.toString();for(var i=0;i<options.length;i=i+1){var option=options[i];if(option.value===valueToCompare){return $(option)}}},getInputByValue:function(value){var checkboxes=$('li input:not(.multiselect-search)',this.$ul);var valueToCompare=value.toString();for(var i=0;i<checkboxes.length;i=i+1){var checkbox=checkboxes[i];if(checkbox.value===valueToCompare){return $(checkbox)}}},updateOriginalOptions:function(){this.originalOptions=this.$select.clone()[0].options},asyncFunction:function(callback,timeout,self){var args=Array.prototype.slice.call(arguments,3);return setTimeout(function(){callback.apply(self||window,args)},timeout)},setAllSelectedText:function(allSelectedText){this.options.allSelectedText=allSelectedText;this.updateButtonText()}};$.fn.multiselect=function(option,parameter,extraOptions){return this.each(function(){var data=$(this).data('multiselect');var options=typeof option==='object'&&option;if(!data){data=new Multiselect(this,options);$(this).data('multiselect',data)}
if(typeof option==='string'){data[option](parameter,extraOptions);if(option==='destroy'){$(this).data('multiselect',!1)}}})};$.fn.multiselect.Constructor=Multiselect;$(function(){$("select[data-role=multiselect]").multiselect()})}(window.jQuery)