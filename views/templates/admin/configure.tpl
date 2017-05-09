 {*
 *
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
 *}
 <div class="panel mlr20 mb0">
   <div class="row moduleconfig-header">
      <div class="col-xs-5 text-right"><img class="margin-auto" height="75" src="{$module_dir|escape:'html':'UTF-8'}views/img/logo.png"></div>
      <div class="col-xs-7 text-left">
         <h2 class="blue-dark mt12">{l s='Jena - Smart Targeting' mod='jena'}</h2>
         <h4 class="blue-dark">{l s='Ciblez vos clients pour une diffusion intelligente' mod='jena'}</h4>
      </div>
   </div>
</div>
<div class="panel mlr20 mt10">
   <div class="row">
      <div class="col-xs-12">
         <div class="col-sm-1 col-md-2 col-sm-2 col-xs-2 bhoechie-tab-menu" style="margin-top: 63px;">
            <div class="list-group">
               <a class="list-group-item text-center active" href="#"><img class="margin-auto" height="30" src="{$module_dir|escape:'html':'UTF-8'}views/img/find_user.svg"><br>
                  <span class="xs-hide">Rechercher</span></a>
                  <a class="list-group-item text-center" href="#"><img class="margin-auto" height="30" src="{$module_dir|escape:'html':'UTF-8'}views/img/fav.svg"><br>
                     <span class="xs-hide">Favoris</span></a>
                  </div>
               </div>
               <div class="col-sm-10 col-md-10 col-sm-10 col-xs-10 bhoechie-tab">
                  <div class="bhoechie-tab-content active">
                     <center>
                        <h2 class="blue-dark mt0">Rechercher des clients</h2>
                        <hr>
                     </center>
                     <div class="row form-jena">
                        <form action="index.php?controller=AdminModules&amp;configure=jena&amp;tab_module=search_filter&amp;module_name=jena&amp;token={$token|escape:'html':'UTF-8'}" class="defaultForm form-horizontal" enctype="multipart/form-data" id="module_form" method="post" name="module_form" novalidate="">
                           <div class="panel-group" id="accordion">
                              <div class="panel panel-default">
                                 <div class="panel-heading panel-heading-menu" data-parent="#accordion" data-toggle="collapse"  href="#collapse1">
                                    <h4 class="panel-title"><a data-parent="#accordion" data-toggle="collapse" href="#collapse1" id="panel-1">Profil</a></h4>
                                 </div>
                                 <div class="panel-collapse collapse in" id="collapse1">
                                    <div class="panel-body">
                                       <div class="form-wrapper">
                                          <div class="row">
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Newsletter</label>
                                                <div class="col-sm-9">
                                                   <div class="button-wrap">
                                                      <input class="hidden radio-label yes-button" id="O_NEWSLETTER_OUI" name="O_NEWSLETTER" type="radio" value="1"> <label class="button-label" for="O_NEWSLETTER_OUI"><span>INSCRIT</span></label> <input class="hidden radio-label no-button" id="O_NEWSLETTER_NON" name="O_NEWSLETTER" type="radio" value="0"> <label class="button-label" for="O_NEWSLETTER_NON"><span>REFUSÉ</span></label>
                                                   </div>
                                                   <p class="help-block">Sélectionnez les utilisateurs inscrits à la newsletter.</p>
                                                </div>
                                             </div>
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Opt-in</label>
                                                <div class="col-sm-9">
                                                   <div class="button-wrap">
                                                      <input class="hidden radio-label yes-button" id="O_OPTIN_OUI" name="O_OPTIN" type="radio" value="1"> <label class="button-label" for="O_OPTIN_OUI"><span>ACTIVÉ</span></label> <input class="hidden radio-label no-button" id="O_OPTIN_NON" name="O_OPTIN" type="radio" value="0"> <label class="button-label" for="O_OPTIN_NON"><span>DESACTIVÉ</span></label>
                                                   </div>
                                                   <p class="help-block">Sélectionnez les utilisateurs ayant accepté de recevoir des offres promotionnelles.</p>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="row">
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Groupe client</label>
                                                <div class="col-sm-9">
                                                   <div class="button-wrap">
                                                      <input class="hidden radio-label yes-button" id="O_GROUPE_OUI" name="O_GROUPE" type="radio" value="1"> <label class="button-label" for="O_GROUPE_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_GROUPE_NON" name="O_GROUPE" type="radio" value="2"> <label class="button-label" for="O_GROUPE_NON"><span>EXCLURE</span></label>
                                                   </div>
                                                   <p class="help-block">Sélectionnez les utilisateurs appartenant à un groupe de clients.</p>
                                                </div>
                                             </div>
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Sélectionnez un/des groupe(s)</label>
                                                <div class="col-sm-9">
                                                   <select class="multiple-select" id="O_GROUPE_S" multiple="multiple" name="O_GROUPE_S[]">
                                                      {foreach from=$group key=k item=v}
                                                      <option value="{$v.id_group|escape:'html':'UTF-8'}">{$v.name|escape:'html':'UTF-8'}</option>
                                                      {/foreach}
                                                   </select>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="row">
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Langue</label>
                                                <div class="col-sm-9">
                                                   <div class="button-wrap">
                                                      <input class="hidden radio-label yes-button" id="O_LANGUE_OUI" name="O_LANGUE" type="radio" value="1"> <label class="button-label" for="O_LANGUE_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_LANGUE_NON" name="O_LANGUE" type="radio" value="2"> <label class="button-label" for="O_LANGUE_NON"><span>EXCLURE</span></label>
                                                   </div>
                                                   <p class="help-block">Sélectionnez les utilisateurs par langue.</p>
                                                </div>
                                             </div>
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Sélectionnez une/des langue(s)</label>
                                                <div class="col-sm-9">
                                                   <select class="multiple-select" id="O_LANGUE_S" multiple="multiple" name="O_LANGUE_S[]">
                                                      {foreach from=$langue key=k item=v}
                                                      <option value="{$v.id_lang|escape:'html':'UTF-8'}">
                                                         {$v.name|escape:'html':'UTF-8'}
                                                      </option>
                                                      {/foreach}
                                                   </select>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="row">
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Devise</label>
                                                <div class="col-sm-9">
                                                   <div class="button-wrap">
                                                      <input class="hidden radio-label yes-button" id="O_DEVISE_OUI" name="O_DEVISE" type="radio" value="1"> <label class="button-label" for="O_DEVISE_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_DEVISE_NON" name="O_DEVISE" type="radio" value="2"> <label class="button-label" for="O_DEVISE_NON"><span>EXCLURE</span></label>
                                                   </div>
                                                   <p class="help-block">Sélectionnez les utilisateurs par devise.</p>
                                                </div>
                                             </div>
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Sélectionnez une/des devise(s)</label>
                                                <div class="col-sm-9">
                                                   <select class="multiple-select" id="O_DEVISE_S" multiple="multiple" name="O_DEVISE_S[]">
                                                      {foreach from=$devise key=k item=v}
                                                      <option value="{$v.id_currency|escape:'html':'UTF-8'}">
                                                         {$v.name|escape:'html':'UTF-8'}
                                                      </option>
                                                      {/foreach}
                                                   </select>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="row">
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Pays de livraison</label>
                                                <div class="col-sm-9">
                                                   <div class="button-wrap">
                                                      <input class="hidden radio-label yes-button" id="O_PAYS_OUI" name="O_PAYS" type="radio" value="1"> <label class="button-label" for="O_PAYS_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_PAYS_NON" name="O_PAYS" type="radio" value="2"> <label class="button-label" for="O_PAYS_NON"><span>EXCLURE</span></label>
                                                   </div>
                                                   <p class="help-block">Sélectionnez les utilisateurs par pays.</p>
                                                </div>
                                             </div>
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Sélectionnez un/des pays</label>
                                                <div class="col-sm-9">
                                                   <select class="multiple-select" id="O_PAYS_S" multiple="multiple" name="O_PAYS_S[]">
                                                     {foreach from=$pays key=k item=v}
                                                     <option value="{$v.id_country|escape:'html':'UTF-8'}">
                                                      {$v.name|escape:'html':'UTF-8'}
                                                   </option>
                                                   {/foreach}
                                                </select>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="row">
                                          <div class="form-group col-sm-6">
                                             <label class="block-label">Âge</label>
                                             <div class="col-sm-12">
                                                <div class="button-wrap">
                                                   <input class="hidden radio-label yes-button" id="O_AGE_OUI" name="O_AGE" type="radio" value="1"> <label class="button-label" for="O_AGE_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_AGE_NON" name="O_AGE" type="radio" value="2"> <label class="button-label" for="O_AGE_NON"><span>EXCLURE</span></label>
                                                </div>
                                                <p class="help-block">Sélectionnez les utilisateurs par âge.</p>
                                             </div>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label class="block-label mb10">Sélectionnez la tranche d'âge</label> <input class="span2 slidejs" data-slider-max="100" data-slider-min="0" data-slider-step="1" data-slider-value="[25,50]" name="O_AGE_S" type="text" value="">
                                          </div>
                                       </div>
                                       <div class="row">
                                          <div class="form-group col-sm-6">
                                             <label class="block-label">Sexe</label>
                                             <div class="col-sm-9">
                                                <div class="button-wrap">
                                                   <input class="hidden radio-label yes-button" id="O_SEXE_OUI" name="O_SEXE" type="radio" value="1"> <label class="button-label" for="O_SEXE_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_SEXE_NON" name="O_SEXE" type="radio" value="2"> <label class="button-label" for="O_SEXE_NON"><span>EXCLURE</span></label>
                                                </div>
                                                <p class="help-block">Sélectionnez les utilisateurs par sexe.</p>
                                             </div>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label class="block-label">Sélectionnez un/des sexe(s)</label>
                                             <div class="col-sm-9">
                                                <select class="multiple-select" id="O_SEXE_S" multiple="multiple" name="O_SEXE_S[]">
                                                 {foreach from=$sexe key=k item=v}
                                                 <option value="{$v.id_gender|escape:'html':'UTF-8'}">
                                                   {$v.name|escape:'html':'UTF-8'}
                                                </option>
                                                {/foreach}
                                             </select>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="panel panel-default">
                           <div class="panel-heading panel-heading-menu" data-parent="#accordion" data-toggle="collapse" href="#collapse2">
                              <h4 class="panel-title"><a data-parent="#accordion" data-toggle="collapse" href="#collapse2">Comportement</a></h4>
                           </div>
                           <div class="panel-collapse collapse" id="collapse2">
                              <div class="panel-body">
                                 <div class="panel-group" id="sub-accordion">
                                    <div class="panel panel-default">
                                       <div class="panel-heading panel-heading-menu" data-parent="#sub-accordion" data-toggle="collapse" href="#collapse3">
                                          <h4 class="panel-title"><a data-parent="#sub-accordion" data-toggle="collapse" href="#collapse3">Activité</a></h4>
                                       </div>
                                       <div class="panel-collapse collapse in" id="collapse3">
                                          <div class="panel-body">
                                             <div class="row">
                                                <div class="form-group col-sm-6">
                                                   <label class="block-label">N'ayant pas passé de commande</label>
                                                   <div class="col-sm-12">
                                                      <div class="button-wrap">
                                                         <input class="hidden radio-label yes-button" id="O_COMMANDE_OUI" name="O_COMMANDE" type="radio" value="1"> <label class="button-label" for="O_COMMANDE_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_COMMANDE_NON" name="O_COMMANDE" type="radio" value="2"> <label class="button-label" for="O_COMMANDE_NON"><span>EXCLURE</span></label>
                                                      </div>
                                                      <p class="help-block">Affiner en fonction des commandes passée(s)</p>
                                                   </div>
                                                </div>
                                                <div class="col-sm-6">
                                                   <div class="form-group col-sm-12">
                                                      <label class="block-label">Entre le (début) :</label> <input class="calendar" id="O_COMMANDE_DATE_MIN" name="O_COMMANDE_DATE_MIN" type="text">
                                                   </div>
                                                   <div class="form-group col-sm-12">
                                                      <label class="block-label">Et le (fin):</label> <input class="calendar" id="O_COMMANDE_DATE_MAX" name="O_COMMANDE_DATE_MAX" type="text">
                                                   </div>
                                                </div>
                                             </div>
                                             <div class="row" style="margin-top:20px">
                                                <div class="form-group col-sm-6">
                                                   <label class="block-label">Nombre de commande</label>
                                                   <div class="col-sm-9">
                                                      <div class="button-wrap">
                                                         <input class="hidden radio-label yes-button" id="O_COMMANDE_NOMBRE_OUI" name="O_COMMANDE_NOMBRE" type="radio" value="1"> <label class="button-label" for="O_COMMANDE_NOMBRE_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_COMMANDE_NOMBRE_NON" name="O_COMMANDE_NOMBRE" type="radio" value="2"> <label class="button-label" for="O_COMMANDE_NOMBRE_NON"><span>EXCLURE</span></label>
                                                      </div>
                                                      <p class="help-block">Affiner en fonction des commandes passée(s)</p>
                                                   </div>
                                                </div>
                                                <div class="form-group col-md-6">
                                                   <label class="block-label mb10">Nombre de commandes passées</label> <input class="span2 slidejs" data-slider-max="100" data-slider-min="0" data-slider-step="1" data-slider-value="[0,10]" name="O_COMMANDE_NOMBRE_S" id="O_COMMANDE_NOMBRE_S" type="text" value="">
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="panel panel-default">
                                       <div class="panel-heading panel-heading-menu" data-parent="#sub-accordion" data-toggle="collapse" href="#collapse4">
                                          <h4 class="panel-title"><a data-parent="#sub-accordion" data-toggle="collapse" href="#collapse4">Achats spécifiques & Montants</a></h4>
                                       </div>
                                       <div class="panel-collapse collapse" id="collapse4">
                                          <div class="panel-body">
                                             <div class="row">
                                                <div class="form-group col-sm-6">
                                                   <label class="block-label">Achat - Catégorie</label>
                                                   <div class="col-sm-9">
                                                      <div class="button-wrap">
                                                         <input class="hidden radio-label yes-button" id="O_ACHAT_CATEGORIE_OUI" name="O_ACHAT_CATEGORIE" type="radio" value="1"> <label class="button-label" for="O_ACHAT_CATEGORIE_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_ACHAT_CATEGORIE_NON" name="O_ACHAT_CATEGORIE" type="radio" value="2"> <label class="button-label" for="O_ACHAT_CATEGORIE_NON"><span>EXCLURE</span></label>
                                                      </div>
                                                      <p class="help-block">Affiner en fonction des achats dans une/des catégorie(s)</p>
                                                   </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                   <label class="block-label">Sélectionnez une/des catégorie(s)</label>
                                                   <div class="col-sm-9">
                                                      <select class="multiple-select" id="O_ACHAT_CATEGORIE_S" multiple="multiple" name="O_ACHAT_CATEGORIE_S[]">
                                                       {foreach from=$cate key=k item=v}
                                                       <option value="{$v.id_category|escape:'html':'UTF-8'}">{$v.name|escape:'html':'UTF-8'}</option>
                                                       {/foreach}
                                                    </select>
                                                 </div>
                                              </div>
                                           </div>
                                           <div class="row">
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Achat - Marque</label>
                                                <div class="col-sm-12">
                                                   <div class="button-wrap">
                                                      <input class="hidden radio-label yes-button" id="O_ACHAT_MARQUE_OUI" name="O_ACHAT_MARQUE" type="radio" value="1"> <label class="button-label" for="O_ACHAT_MARQUE_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_ACHAT_MARQUE_NON" name="O_ACHAT_MARQUE" type="radio" value="2"> <label class="button-label" for="O_ACHAT_MARQUE_NON"><span>EXCLURE</span></label>
                                                   </div>
                                                   <p class="help-block">Affiner en fonction des achats pour une/des marque(s)</p>
                                                </div>
                                             </div>
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Sélectionnez une/des marque(s)</label>
                                                <div class="col-sm-9">
                                                   <select class="multiple-select" id="O_ACHAT_MARQUE_S" multiple="multiple" name="O_ACHAT_MARQUE_S[]">
                                                      {foreach from=$marque key=k item=v}
                                                      <option value="{$v.id_manufacturer|escape:'html':'UTF-8'}">{$v.name|escape:'html':'UTF-8'}</option>
                                                      {/foreach}
                                                   </select>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="row">
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Achat - Produit</label>
                                                <div class="col-sm-12">
                                                   <div class="button-wrap">
                                                      <input class="hidden radio-label yes-button" id="O_ACHAT_PRODUIT_OUI" name="O_ACHAT_PRODUIT" type="radio" value="1"> <label class="button-label" for="O_ACHAT_PRODUIT_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_ACHAT_PRODUIT_NON" name="O_ACHAT_PRODUIT" type="radio" value="2"> <label class="button-label" for="O_ACHAT_PRODUIT_NON"><span>EXCLURE</span></label>
                                                   </div>
                                                   <p class="help-block">Affiner en fonction des achats d'un/de plusieurs produit(s)</p>
                                                </div>
                                             </div>
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Sélectionnez un/des produit(s)</label>
                                                <div class="col-sm-9">
                                                   <select class="multiple-select" id="O_ACHAT_PRODUIT_S" multiple="multiple" name="O_ACHAT_PRODUIT_S[]">
                                                      {foreach from=$product_ordered key=k item=v}
                                                      <option value="{$v.id_product|escape:'html':'UTF-8'}">
                                                         {$v.name|escape:'html':'UTF-8'}
                                                      </option>
                                                      {/foreach}
                                                   </select>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="row">
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Achat - Montant</label>
                                                <div class="col-sm-12">
                                                   <div class="button-wrap">
                                                      <input class="hidden radio-label yes-button" id="O_ACHAT_MONTANT_OUI" name="O_ACHAT_MONTANT" type="radio" value="1"> <label class="button-label" for="O_ACHAT_MONTANT_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_ACHAT_MONTANT_NON" name="O_ACHAT_MONTANT" type="radio" value="2"> <label class="button-label" for="O_ACHAT_MONTANT_NON"><span>EXCLURE</span></label>
                                                   </div>
                                                   <p class="help-block">Affiner en fonction du montant de la commande</p>
                                                </div>
                                             </div>
                                             <div class="form-group col-sm-6">
                                                <label class="block-label mb10">Montant des commandes passées (€)</label> <input class="span2 slidejs" data-slider-max="1000" data-slider-min="0" data-slider-step="1" data-slider-value="[0,0]" name="O_ACHAT_MONTANT_S" type="text" value="">
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="panel panel-default">
                                    <div class="panel-heading panel-heading-menu" data-parent="#sub-accordion" data-toggle="collapse" href="#collapse5">
                                       <h4 class="panel-title"><a data-parent="#sub-accordion" data-toggle="collapse" href="#collapse5">Abandon de panier</a></h4>
                                    </div>
                                    <div class="panel-collapse collapse" id="collapse5">
                                       <div class="panel-body">
                                          <div class="row">
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Abandon - Catégorie</label>
                                                <div class="col-sm-9">
                                                   <div class="button-wrap">
                                                      <input class="hidden radio-label yes-button" id="O_ABANDON_CATEGORIE_OUI" name="O_ABANDON_CATEGORIE" type="radio" value="1"> <label class="button-label" for="O_ABANDON_CATEGORIE_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_ABANDON_CATEGORIE_NON" name="O_ABANDON_CATEGORIE" type="radio" value="2"> <label class="button-label" for="O_ABANDON_CATEGORIE_NON"><span>EXCLURE</span></label>
                                                   </div>
                                                   <p class="help-block">Sélectionnez les abandons de panier par catégorie(s).</p>
                                                </div>
                                             </div>
                                             <div class="form-group col-sm-6">
                                                <label class="block-label">Sélectionnez une/des catégorie(s)</label>
                                                <div class="col-sm-9">
                                                   <select class="multiple-select" id="O_ABANDON_CATEGORIE_S" multiple="multiple" name="O_ABANDON_CATEGORIE_S[]">
                                                     {foreach from=$cate key=k item=v}
                                                     <option value="{$v.id_category|escape:'html':'UTF-8'}">
                                                      {$v.name|escape:'html':'UTF-8'}
                                                   </option>
                                                   {/foreach}
                                                </select>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="row">
                                          <div class="form-group col-sm-6">
                                             <label class="block-label">Abandon - Marque</label>
                                             <div class="col-sm-9">
                                                <div class="button-wrap">
                                                   <input class="hidden radio-label yes-button" id="O_ABANDON_MARQUE_OUI" name="O_ABANDON_MARQUE" type="radio" value="1"> <label class="button-label" for="O_ABANDON_MARQUE_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_ABANDON_MARQUE_NON" name="O_ABANDON_MARQUE" type="radio" value="2"> <label class="button-label" for="O_ABANDON_MARQUE_NON"><span>EXCLURE</span></label>
                                                </div>
                                                <p class="help-block">Sélectionnez les abandons de panier par marque(s).</p>
                                             </div>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label class="block-label">Sélectionnez une/des marque(s)</label>
                                             <div class="col-sm-9">
                                                <select class="multiple-select" id="O_ABANDON_MARQUE_S" multiple="multiple" name="O_ABANDON_MARQUE_S[]">
                                                  {foreach from=$marque key=k item=v}
                                                  <option value="{$v.id_manufacturer|escape:'html':'UTF-8'}">
                                                   {$v.name|escape:'html':'UTF-8'}
                                                </option>
                                                {/foreach}
                                             </select>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="row">
                                       <div class="form-group col-sm-6">
                                          <label class="block-label">Abandon - Produit</label>
                                          <div class="col-sm-9">
                                             <div class="button-wrap">
                                                <input class="hidden radio-label yes-button" id="O_ABANDON_PRODUIT_OUI" name="O_ABANDON_PRODUIT" type="radio" value="1"> <label class="button-label" for="O_ABANDON_PRODUIT_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_ABANDON_PRODUIT_NON" name="O_ABANDON_PRODUIT" type="radio" value="2"> <label class="button-label" for="O_ABANDON_PRODUIT_NON"><span>EXCLURE</span></label>
                                             </div>
                                             <p class="help-block">Sélectionnez les abandons de panier par produit(s).</p>
                                          </div>
                                       </div>
                                       <div class="form-group col-sm-6">
                                          <label class="block-label">Sélectionnez un/des produit(s)</label>
                                          <div class="col-sm-9">
                                             <select class="multiple-select" id="O_ABANDON_PRODUIT_S" multiple="multiple" name="O_ABANDON_PRODUIT_S[]">
                                                {foreach from=$product_abandon key=k item=v}
                                                <option value="{$v.id_product|escape:'html':'UTF-8'}">
                                                   {$v.name|escape:'html':'UTF-8'}
                                                </option>
                                                {/foreach}
                                             </select>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="row">
                                       <div class="form-group col-sm-6">
                                          <label class="block-label">Abandon - Montant</label>
                                          <div class="col-sm-12">
                                             <div class="button-wrap">
                                                <input class="hidden radio-label yes-button" id="O_ABANDON_MONTANT_OUI" name="O_ABANDON_MONTANT" type="radio" value="1"> <label class="button-label" for="O_ABANDON_MONTANT_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_ABANDON_MONTANT_NON" name="O_ABANDON_MONTANT" type="radio" value="2"> <label class="button-label" for="O_ABANDON_MONTANT_NON"><span>EXCLURE</span></label>
                                             </div>
                                             <p class="help-block">Affiner en fonction du montant du panier</p>
                                          </div>
                                       </div>
                                       <div class="form-group col-sm-6">
                                          <label class="block-label mb10">Montant des commandes abandonnées (€)</label> <input class="span2 slidejs" data-slider-max="1000" data-slider-min="0" data-slider-step="1" data-slider-value="[0,100]" name="O_ABANDON_MONTANT_S" type="text" value="">
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="panel panel-default">
                              <div class="panel-heading panel-heading-menu" data-parent="#sub-accordion" data-toggle="collapse" href="#collapse6">
                                 <h4 class="panel-title"><a data-parent="#sub-accordion" data-toggle="collapse" href="#collapse6">Habitudes</a></h4>
                              </div>
                              <div class="panel-collapse collapse" id="collapse6">
                                 <div class="row mt10">
                                    <div class="form-group col-sm-6">
                                       <label class="block-label">Moyen de paiement utilisé</label>
                                       <div class="col-sm-9">
                                          <div class="button-wrap">
                                             <input class="hidden radio-label yes-button" id="O_MOYEN_PAIEMENT_OUI" name="O_MOYEN_PAIEMENT" type="radio" value="1"> <label class="button-label" for="O_MOYEN_PAIEMENT_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_MOYEN_PAIEMENT_NON" name="O_MOYEN_PAIEMENT" type="radio" value="2"> <label class="button-label" for="O_MOYEN_PAIEMENT_NON"><span>EXCLURE</span></label>
                                          </div>
                                          <p class="help-block">Affinez par moyen de paiement utilisé.</p>
                                       </div>
                                    </div>
                                    <div class="form-group col-sm-6">
                                       <label class="block-label">Sélectionnez un/des moyen(s) de paiement</label>
                                       <div class="col-sm-9">
                                          <select class="multiple-select" id="O_MOYEN_PAIEMENT_S" multiple="multiple" name="O_MOYEN_PAIEMENT_S[]">
                                           {foreach from=$payment key=k item=v}
                                           <option value="{$v.name|escape:'html':'UTF-8'}">{$v.name|escape:'html':'UTF-8'}</option>
                                           {/foreach}
                                        </select>
                                     </div>
                                  </div>
                               </div>
                               <div class="row">
                                 <div class="form-group col-sm-6">
                                    <label class="block-label">Moyen de livraison utilisé</label>
                                    <div class="col-sm-9">
                                       <div class="button-wrap">
                                          <input class="hidden radio-label yes-button" id="O_MOYEN_LIVRAISON_OUI" name="O_MOYEN_LIVRAISON" type="radio" value="1"> <label class="button-label" for="O_MOYEN_LIVRAISON_OUI"><span>INCLURE</span></label> <input class="hidden radio-label no-button" id="O_MOYEN_LIVRAISON_NON" name="O_MOYEN_LIVRAISON" type="radio" value="2"> <label class="button-label" for="O_MOYEN_LIVRAISON_NON"><span>EXCLURE</span></label>
                                       </div>
                                       <p class="help-block">Affinez par moyen de livraison utilisé.</p>
                                    </div>
                                 </div>
                                 <div class="form-group col-sm-6">
                                    <label class="block-label">Sélectionnez un/des moyen(s) de livraison</label>
                                    <div class="col-sm-9">
                                       <select class="multiple-select" id="O_MOYEN_LIVRAISON_S" multiple="multiple" name="O_MOYEN_LIVRAISON_S[]">
                                        {foreach from=$carrier key=k item=v}
                                        <option value="{$v.id_carrier|escape:'html':'UTF-8'}">{$v.name|escape:'html':'UTF-8'}</option>
                                        {/foreach}
                                     </select>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <button class="btn btn-primary pull-right mr5" style="text-transform: none!important;" form="module_form" name="showResults" type="submit"><i class="icon-eye"></i> Afficher les résultats</button>
       </div>
       <div id="resultModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Enregistrer la recherche</h4>
           </div>
           <div class="modal-body">
              <p>Comment voulez-vous nommer cette recherche ?</p>
              <input type="text" id="O_REQUEST_NAME" name="O_REQUEST_NAME">
              <input class="hidden" name="O_REQUEST" id="O_REQUEST" value="{$request|escape:'html':'UTF-8'}">
           </div>
           <div class="modal-footer">
              <button class="btn btn-success pull-right mr5" form="module_form" name="submit_save" type="submit">Valider</button>
              <button type="button" class="btn btn-default mr5" data-dismiss="modal">Fermer</button>
           </div>
        </div>
     </div>
  </div>
</div>
</div>
<div class="bhoechie-tab-content">
   <center>
      <h2 class="blue-dark mt0">Recherches enregistrées</h2>
      <hr>
   </center>
   <div class="row">
      <div class="header-tableau">
         <div class="col-xs-6">
            Nom
         </div>
         <div class="col-xs-6">
            Exécuter
         </div>
      </div>
      {if $saved_request|@count == 0}
      <div class="no-result">Aucun résultat</div>
      {/if}
      {foreach from=$saved_request key=k item=v}
      <div class="row tableau-row">
        <form action="index.php?controller=AdminModules&amp;configure=jena&amp;tab_module=search_filter&amp;module_name=jena&amp;token={$token|escape:'html':'UTF-8'}" class="defaultForm form-horizontal" enctype="multipart/form-data" method="post" novalidate="">
         <input class="hidden" name="O_RELAUNCH" value="{$v.query|escape:'html':'UTF-8'}">
         <div class="col-xs-6 tableau-td mt5">{$v.name|escape:'html':'UTF-8'}</div>
         <div class="col-xs-6 tableau-td">
            <button class="btn btn-default" name="submit_relaunch" type="submit"><i class="fa fa-cloud"></i> Exécuter</button>
         </div>
      </form>
   </div>
   {/foreach}
</div>
</div>
</form>
</div>
</div>
</div>
</div>
{if $result[0] != NULL}
<script>
   $(document).ready(function() {
      $('#table_result').DataTable({ aDataSort: false, scrollX: true});
   });
</script>
<div class="panel m20" id="panel-resultats">
   <h2 class="margin-auto">Résultats de la recherche</h2>
   <hr>
   <div class="row" id="search-results">
      <table class="display table-responsive" id="table_result">
         <thead>
            <tr>
               {foreach from=$result[0] key=a item=w}
               <th>{$a|escape:'html':'UTF-8'}<i class="icon-caret-down"></i></th>
               {/foreach}
            </tr>
         </thead>
         <tbody>
            {foreach from=$result key=k item=v}
            <tr>
               {foreach from=$v key=k item=i}
               <td>{$i|escape:'html':'UTF-8'}</td>
               {/foreach}
            </tr>
            {/foreach}
         </tbody>
      </table>
   </div>
   <div class="row mt20">
    <a  class="btn btn-warning pull-right mr5" data-toggle="modal" data-target="#resultModal"><i class="icon-heart"></i> Enregistrer la recherche</a>
    <a href="{$module_dir|escape:'html':'UTF-8'}{$csv_path|escape:'html':'UTF-8'}" class="btn btn-success pull-right mr5" download target="_blank"><i class="icon-save"></i> Exporter en CSV</a>
 </div>
</div>
{/if}
</div>
<script src="{$module_dir|escape:'html':'UTF-8'}views/js/back.js" type="text/javascript">
</script>
<link href="{$module_dir|escape:'html':'UTF-8'}views/css/back.css" rel="stylesheet" type="text/css">
<script src="{$module_dir|escape:'html':'UTF-8'}views/js/bootstrap-multiselect.js" type="text/javascript">
</script>
<link href="{$module_dir|escape:'html':'UTF-8'}views/css/bootstrap-multiselect.css" rel="stylesheet" type="text/css">
<script src="{$module_dir|escape:'html':'UTF-8'}views/js/bootstrap-slider.js" type="text/javascript">
</script>
<link href="{$module_dir|escape:'html':'UTF-8'}views/css/bootstrap-slider.css" rel="stylesheet" type="text/css">
<script src="{$module_dir|escape:'html':'UTF-8'}views/js/bootstrap-datatables.js" type="text/javascript">
</script>
<link href="{$module_dir|escape:'html':'UTF-8'}views/css/bootstrap-datatables.css" rel="stylesheet" type="text/css">
<script src="{$module_dir|escape:'html':'UTF-8'}views/js/calendar.min.js" type="text/javascript">
</script>
<link href="{$module_dir|escape:'html':'UTF-8'}views/css/calendar.min.css" rel="stylesheet" type="text/css">