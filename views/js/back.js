/**
* 2017 - JenaCorp
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    JenaCorp (bedmin_j, rollan_t, derouc_c, bequet_t) <joseph@bedminster.fr>
*  @copyright 2017 - JenaCorp
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*
*/
$(document).ready(function() {
	$("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
		e.preventDefault();
		$(this).siblings('a.active').removeClass("active");
		$(this).addClass("active");
		var index = $(this).index();
		$("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
		$("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
	});
	$(document).ready(function() {
		$( ".multiple-select" ).each(function() {
			$(this).multiselect({
				includeSelectAllOption: true,
				selectAllValue: 'select-all-value'
			});
		});
	});
	function launchLoading() {
		$("#resultat-analyse").addClass("hidden");
		$("#loader").removeClass("hidden");
		$("#loader").fadeIn( "fast", function() {});
		var counter = 0;
		var c = 0;
		var i = setInterval(function(){
			counter++;
			c++;
			if(counter == 101) {
				clearInterval(i);
				$("#loader").fadeOut( "fast", function() {
					$("#loader").addClass("hidden");
					$("#resultat-analyse").fadeIn( "fast", function() {
						$("#resultat-analyse").removeClass("hidden");
					});
				});
			}
		}, 10);
	}

	$( "#analyse-btn" ).click(function() {
		launchLoading();
	});

	$( ".slidejs" ).each(function() {
		var slider = new Slider(this, {});
	});

	$('input.calendar').pignoseCalendar({
		format: 'YYYY-MM-DD',
		theme: 'blue',
		lang: 'fr'
	});
});

$(document).ready(function() {
	// AJAX Produit Abandon
	$( "#O_ABANDON_CATEGORIE_OUI, #O_ABANDON_CATEGORIE_NON, #O_ABANDON_MARQUE_OUI, #O_ABANDON_MARQUE_NON, #O_ABANDON_CATEGORIE_S, #O_ABANDON_MARQUE_S" ).change(function() {
		var abandon_categorie = $("#O_ABANDON_CATEGORIE_S").val();
		var abandon_marque = $("#O_ABANDON_MARQUE_S").val();
		if ($("#O_ABANDON_CATEGORIE_OUI").is(':checked') || $("#O_ABANDON_CATEGORIE_NON").is(':checked')) {
			if ($("#O_ABANDON_CATEGORIE_OUI").is(':checked'))
				var bool_categorie = true;
			else
				var bool_categorie = false;
		} else { return; }

		if ($("#O_ABANDON_MARQUE_OUI").is(':checked') || $("#O_ABANDON_MARQUE_NON").is(':checked')) {
			if ($("#O_ABANDON_MARQUE_OUI").is(':checked'))
				var bool_marque = true;
			else
				var bool_marque = false;
		} else { return; }

		jQuery.ajax({
			url: "../modules/jena/sql/getProductAbandon.php",
			type: "POST",
			data: ({
				abandon_categorie: abandon_categorie,
				abandon_marque: abandon_marque,
				bool_categorie: bool_categorie,
				bool_marque: bool_marque
			}),
			success: function(response)
			{
				var response = JSON.parse(response);
				$('option', $('#O_ABANDON_PRODUIT_S')).remove();
				$("#O_ABANDON_PRODUIT_S").multiselect('rebuild');
				console.log(response.length);
				if (response.length == 0)
				{
					$("#O_ABANDON_PRODUIT_S").append("<option disabled>Aucun résultat</option>");
				}
				else
				{
					for (i = 0; i < response.length; i++)
					{
						var option = "<option value='"+response[i].id_product+"'>"+response[i].name+"</option>";
						$("#O_ABANDON_PRODUIT_S").append(option);
					}
				}
				$("#O_ABANDON_PRODUIT_S").multiselect('rebuild');
			},
			error: function(response)
			{
				console.log(response);
			}
		});
	});
});
$(document).ready(function() {
	// AJAX Produit Achat
	$( "#O_ACHAT_CATEGORIE_OUI, #O_ACHAT_CATEGORIE_NON, #O_ACHAT_MARQUE_OUI, #O_ACHAT_MARQUE_NON, #O_ACHAT_CATEGORIE_S, #O_ACHAT_MARQUE_S" ).change(function() {
		var achat_categorie = $("#O_ACHAT_CATEGORIE_S").val();
		var achat_marque = $("#O_ACHAT_MARQUE_S").val();
		if ($("#O_ACHAT_CATEGORIE_OUI").is(':checked') || $("#O_ACHAT_CATEGORIE_NON").is(':checked')) {
			if ($("#O_ACHAT_CATEGORIE_OUI").is(':checked'))
				var bool_categorie = true;
			else
				var bool_categorie = false;
		} else { return; }

		if ($("#O_ACHAT_MARQUE_OUI").is(':checked') || $("#O_ACHAT_MARQUE_NON").is(':checked')) {
			if ($("#O_ACHAT_MARQUE_OUI").is(':checked'))
				var bool_marque = true;
			else
				var bool_marque = false;
		} else { return; }

		jQuery.ajax({
			url: "../modules/jena/sql/getProductAchat.php",
			type: "POST",
			data: ({
				achat_categorie: achat_categorie,
				achat_marque: achat_marque,
				bool_categorie: bool_categorie,
				bool_marque: bool_marque
			}),
			success: function(response)
			{
				var response = JSON.parse(response);
				$('option', $('#O_ACHAT_PRODUIT_S')).remove();
				$("#O_ACHAT_PRODUIT_S").multiselect('rebuild');
				console.log(response.length);
				if (response.length == 0)
				{
					$("#O_ACHAT_PRODUIT_S").append("<option disabled>Aucun résultat</option>");
				}
				else
				{
					for (i = 0; i < response.length; i++)
					{
						var option = "<option value='"+response[i].id_product+"'>"+response[i].name+"</option>";
						$("#O_ACHAT_PRODUIT_S").append(option);
					}
				}
				$("#O_ACHAT_PRODUIT_S").multiselect('rebuild');
			},
			error: function(response)
			{
				console.log(response);
			}
		});
	});
});