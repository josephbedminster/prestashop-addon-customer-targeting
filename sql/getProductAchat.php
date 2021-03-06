<?php
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
*/

require_once(dirname(__FILE__).'../../../../config/config.inc.php');
require_once(dirname(__FILE__).'../../../../init.php');
require_once("functions.php");

$functions = new AdminJenaFunctionsController;
$data = $functions->getAllProductsOrdered(
    Tools::getValue('achat_categorie'),
    Tools::getValue('achat_marque'),
    Tools::getValue('bool_categorie'),
    Tools::getValue('bool_marque')
);

echo Tools::jsonEncode($data);
