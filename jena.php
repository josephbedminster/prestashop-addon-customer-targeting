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

if (!defined('_PS_VERSION_')) {
    exit;
}
include("sql/functions.php");

class Jena extends Module
{
    protected $config_form = false;

    public function __construct()
    {
        $this->name = 'jena';
        $this->tab = 'search_filter';
        $this->version = '1.0.0';
        $this->author = 'JenaCorp';
        $this->need_instance = 0;
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Jena - Smart Targeting');
        $this->description = $this->l('Ciblez vos clients pour une diffusion intelligente');
        $this->confirmUninstall = $this->l('Êtes-vous sûr de vouloir désinstaller le paquet ?');
    }

    public function install()
    {
        Configuration::updateValue('Jena_LIVE_MODE', false);

        include(dirname(__FILE__).'/sql/install.php');

        return parent::install() &&
        $this->registerHook('header') &&
        $this->registerHook('backOfficeHeader');
    }

    public function uninstall()
    {
        Configuration::deleteByName('Jena_LIVE_MODE');

        include(dirname(__FILE__).'/sql/uninstall.php');

        return parent::uninstall();
    }

    public function sortArray($resultat)
    {
        $temp_cat = "";
        $temp_cat_achat = "";
        $temp_pro = "";
        $temp_pro_achat = "";
        $temp_mar = "";
        $temp_mar_achat = "";
        $id = "0";
        $final_array_user = array();
        $final_array = array();
        foreach ($resultat as $nb_user => $user) {
            if ($resultat[$nb_user+1]['ID'] != $resultat[$nb_user]['ID']) {
                if ($temp_cat != "") {
                    $temp_cat = Tools::substr($temp_cat, 0, -1);
                    $user['category'] = $temp_cat;
                }
                if ($temp_cat_achat != "") {
                    $temp_cat_achat = Tools::substr($temp_cat_achat, 0, -1);
                    $user['Category Achat'] = $temp_cat_achat;
                }
                if ($temp_mar != "") {
                    $temp_mar = Tools::substr($temp_mar, 0, -1);
                    $user['Marque Abandon'] = $temp_mar;
                }
                if ($temp_mar_achat != "") {
                    $temp_mar_achat = Tools::substr($temp_mar_achat, 0, -1);
                    $user['Marque Achat'] = $temp_mar_achat;
                }
                if ($temp_pro != "") {
                    $temp_pro = Tools::substr($temp_pro, 0, -1);
                    $user['Produit Abandon'] = $temp_pro;
                }
                if ($temp_pro_achat != "") {
                    $temp_pro_achat = Tools::substr($temp_pro_achat, 0, -1);
                    $user['Produit Achat'] = $temp_pro_achat;
                }
                foreach ($user as $type => $value) {
                    $final_array_user[$type] = $value;
                }
                $final_array[$id] = $final_array_user;
                $temp_cat = "";
                $temp_cat_achat = "";
                $temp_pro = "";
                $temp_pro_achat = "";
                $temp_mar = "";
                $temp_mar_achat = "";
                $id++;
            } else {
                if ($resultat[$nb_user+1]['category'] != $resultat[$nb_user]['category']) {
                    $temp_cat .= $resultat[$nb_user]['category']."/";
                }
                if ($resultat[$nb_user+1]['Marque Abandon'] != $resultat[$nb_user]['Marque Abandon']) {
                    $temp_mar .= $resultat[$nb_user]['Marque Abandon']."/";
                }
                if ($resultat[$nb_user+1]['Produit Abandon'] != $resultat[$nb_user]['Produit Abandon']) {
                    $temp_pro .= $resultat[$nb_user]['Produit Abandon']."/";
                }
                if ($resultat[$nb_user+1]['Category Achat'] != $resultat[$nb_user]['Category Achat']) {
                    $temp_cat_achat .= $resultat[$nb_user]['Category Achat']."/";
                }
                if ($resultat[$nb_user+1]['Marque Achat'] != $resultat[$nb_user]['Marque Achat']) {
                    $temp_mar_achat .= $resultat[$nb_user]['Marque Achat']."/";
                }
                if ($resultat[$nb_user+1]['Produit Achat'] != $resultat[$nb_user]['Produit Achat']) {
                    $temp_pro_achat .= $resultat[$nb_user]['Produit Achat']."/";
                }
            }
        }
        return ($final_array);
    }

    public function getContent()
    {
        $data = new AdminJenaFunctionsController;
        if ((Tools::isSubmit('showResults'))) {
            $sentence = $this->showResults();
        } elseif ((Tools::isSubmit('submit_save'))) {
            $sentence = $this->showResults();
            $data->addToFavorites(
                Tools::getValue('O_REQUEST_NAME'),
                Tools::getValue('O_REQUEST')
            );
        }
        
        $my_search = $data->getMainRequest($sentence);
        $resultat = $my_search['result'];
        $request = $my_search['request'];
        if ((Tools::isSubmit('submit_relaunch'))) {
            $resultat = $data->showRelaunch(Tools::getValue('O_RELAUNCH'));
        }
        $resultat = $this->sortArray($resultat);
        $this->context->smarty->assign(array(
            'module_dir' => $this->_path,
            'token' => Tools::getAdminTokenLite('AdminModules'),
            'group' => $data->getAllGroup(),
            'langue' => $data->getAllLangue(),
            'devise' => $data->getAllDevise(),
            'pays' => $data->getAllPays(),
            'sexe' => $data->getAllSexe(),
            'cate' => $data->getAllCategory(),
            'marque' => $data->getAllManufacturer(),
            'carrier' => $data->getCarrier(),
            'payment' => $data->getPayment(),
            'product_ordered' => $data->getAllProductsOrdered(array(), array(), true, true),
            'product_abandon' => $data->getAllProductsCartDump(array(), array(), true, true),
            'csv_path' => $data->exportToCSV($resultat, dirname(__FILE__)),
            'saved_request' => $data->getSavedRequest(),
            'result' => $resultat,
            'request' => $request
            ));
        $this->hookBackOfficeHeader();
        $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');
        return $output;
    }

    public function showResults()
    {
        $sentence = array();
        $sentence['end'] = "";
        $sentence['mid'] = "";
        if (Tools::getValue('O_NEWSLETTER') != null) {
            $sentence['end'] .= " AND C.`newsletter` = ".Tools::getValue('O_NEWSLETTER');
            $sentence['mid'] .= ",C.`newsletter` AS Newsletter ";
        }
        if (Tools::getValue('O_OPTIN') != null) {
            $sentence['end'] .= " AND C.`optin` = ".Tools::getValue('O_OPTIN');
            $sentence['mid'] .= ",C.`optin` AS Optin ";
        }
        if ((Tools::getValue('O_GROUPE') != null) && (Tools::getValue('O_GROUPE_S') != null)) {
            if (Tools::getValue('O_GROUPE') == 1) {
                $operator = "=";
                $first_op = "OR";
            } else {
                $operator = "!=";
                $first_op = "AND";
            }
            foreach (Tools::getValue('O_GROUPE_S') as $key => $value) {
                if ($key == 0) {
                    $sentence['end'] .= " AND ( CG.`id_group` ".$operator." ".(int)$value;
                } else {
                    $sentence['end'] .= " ".$first_op." CG.`id_group` ".$operator." ".(int)$value;
                }
            }
            $sentence['end'] .= ")";
            $sentence['mid'] .= ",(
            SELECT DISTINCT name FROM `"._DB_PREFIX_."group_lang` 
            WHERE CG.id_group = `"._DB_PREFIX_."group_lang`.`id_group`
            ) AS groupe_name ";
        }
        if ((Tools::getValue('O_LANGUE') != null) && (Tools::getValue('O_LANGUE_S') != null)) {
            if (Tools::getValue('O_LANGUE') == 1) {
                $operator = "=";
                $first_op = "OR";
            } else {
                $operator = "!=";
                $first_op = "AND";
            }
            foreach (Tools::getValue('O_LANGUE_S') as $key => $value) {
                if ($key == 0) {
                    $sentence['end'] .= " AND ( C.`id_lang` ".$operator." ".(int)$value;
                } else {
                    $sentence['end'] .= " ".$first_op." C.`id_lang` ".$operator." ".(int)$value;
                }
            }
            $sentence['end'] .= ")";
        }
        if ((Tools::getValue('O_DEVISE') != null) && (Tools::getValue('O_DEVISE_S') != null)) {
            if (Tools::getValue('O_DEVISE') == 1) {
                $operator = "=";
                $first_op = "OR";
            } else {
                $operator = "!=";
                $first_op = "AND";
            }
            foreach (Tools::getValue('O_DEVISE_S') as $key => $value) {
                if ($key == 0) {
                    $sentence['end'] .= " AND ( CART.`id_currency` ".$operator." ".(int)$value;
                } else {
                    $sentence['end'] .= " ".$first_op." CART.`id_currency` ".$operator." ".(int)$value;
                }
            }
            $sentence['end'] .= ")";
        }
        if ((Tools::getValue('O_PAYS') != null) && (Tools::getValue('O_PAYS_S') != null)) {
            if (Tools::getValue('O_PAYS') == 1) {
                $operator = "=";
                $first_op = "OR";
            } else {
                $operator = "!=";
                $first_op = "AND";
            }
            foreach (Tools::getValue('O_PAYS_S') as $key => $value) {
                if ($key == 0) {
                    $sentence['end'] .= " AND ( COUNTRY.`id_country` ".$operator." ".(int)$value;
                } else {
                    $sentence['end'] .= " ".$first_op." COUNTRY.`id_country` ".$operator." ".(int)$value;
                }
            }
            $sentence['end'] .= ")";
        }
        if ((Tools::getValue('O_AGE') != null) && (Tools::getValue('O_AGE_S') != null)) {
            if (Tools::getValue('O_AGE') == 1) {
                $operator = "BETWEEN";
            } else {
                $operator = "NOT BETWEEN";
            }
            $explo = explode(",", Tools::getValue('O_AGE_S'));
            $sentence['end'] .= " AND (round((datediff(CURDATE(),C.birthday) ) / 365)) ".
            $operator." ".$explo[0]." AND ".$explo[1];
            $sentence['mid'] .= ",round((datediff(CURDATE(),C.birthday) ) / 365) AS age";
        }
        if ((Tools::getValue('O_SEXE') != null) && (Tools::getValue('O_SEXE_S') != null)) {
            if (Tools::getValue('O_SEXE') == 1) {
                $operator = "=";
                $first_op = "OR";
            } else {
                $operator = "!=";
                $first_op = "AND";
            }
            foreach (Tools::getValue('O_SEXE_S') as $key => $value) {
                if ($key == 0) {
                    $sentence['end'] .= " AND ( C.`id_gender` ".$operator." ".(int)$value;
                } else {
                    $sentence['end'] .= " ".$first_op." C.`id_gender` ".$operator." ".(int)$value;
                }
            }
            $sentence['end'] .= ")";
        }
        if ((Tools::getValue('O_ABANDON_CATEGORIE') != null) && (Tools::getValue('O_ABANDON_CATEGORIE_S') != null)) {
            if (Tools::getValue('O_ABANDON_CATEGORIE') == 1) {
                $operator = "=";
                $first_op = "OR";
            } else {
                $operator = "!=";
                $first_op = "AND";
            }
            $sentence['end'] .= " AND O.id_cart IS NULL ";
            foreach (Tools::getValue('O_ABANDON_CATEGORIE_S') as $key => $value) {
                if ($key == 0) {
                    $sentence['end'] .= " AND ( CAT.`id_category` ".$operator." ".(int)$value;
                } else {
                    $sentence['end'] .= " ".$first_op." CAT.`id_category` ".$operator." ".(int)$value;
                }
            }
            $sentence['end'] .= ")";
            $sentence['mid'] .= ", (
            SELECT DISTINCT name 
            FROM `"._DB_PREFIX_."category_lang` AS CL 
            WHERE CL.`id_category` = CAT.`id_category`) AS category";
        }
        if ((Tools::getValue('O_ABANDON_MARQUE') != null) && (Tools::getValue('O_ABANDON_MARQUE_S') != null)) {
            if (Tools::getValue('O_ABANDON_MARQUE') == 1) {
                $operator = "=";
                $first_op = "OR";
            } else {
                $operator = "!=";
                $first_op = "AND";
            }
            $sentence['end'] .= " AND O.id_cart IS NULL ";
            foreach (Tools::getValue('O_ABANDON_MARQUE_S') as $key => $value) {
                if ($key == 0) {
                    $sentence['end'] .= " AND ( P.`id_manufacturer` ".$operator." ".(int)$value;
                } else {
                    $sentence['end'] .= " ".$first_op." P.`id_manufacturer` ".$operator." ".(int)$value;
                }
            }
            $sentence['end'] .= ")";
            $sentence['mid'] .= ", (
            SELECT DISTINCT name 
            FROM `"._DB_PREFIX_."manufacturer` AS MANU 
            WHERE P.`id_manufacturer` = MANU.`id_manufacturer`) AS `Marque Abandon`";
        }
        if ((Tools::getValue('O_ABANDON_PRODUIT') != null) && (Tools::getValue('O_ABANDON_PRODUIT_S') != null)) {
            if (Tools::getValue('O_ABANDON_PRODUIT') == 1) {
                $operator = "=";
                $first_op = "OR";
            } else {
                $operator = "!=";
                $first_op = "AND";
            }
            $sentence['end'] .= " AND O.id_cart IS NULL ";
            foreach (Tools::getValue('O_ABANDON_PRODUIT_S') as $key => $value) {
                if ($key == 0) {
                    $sentence['end'] .= " AND ( P.`id_product` ".$operator." ".(int)$value;
                } else {
                    $sentence['end'] .= " ".$first_op." P.`id_product` ".$operator." ".(int)$value;
                }
            }
            $sentence['end'] .= ")";
            $sentence['mid'] .= ", (
            SELECT DISTINCT name 
            FROM `"._DB_PREFIX_."product_lang` AS PL 
            WHERE PL.`id_product` = P.`id_product`) AS `Produit Abandon`";
        }
        if ((Tools::getValue('O_ABANDON_MONTANT') != null) && (Tools::getValue('O_ABANDON_MONTANT_S') != null)) {
            if (Tools::getValue('O_ABANDON_MONTANT') == 1) {
                $operator = "BETWEEN";
            } else {
                $operator = "NOT BETWEEN";
            }
            $explo = explode(",", Tools::getValue('O_ABANDON_MONTANT_S'));
            $sentence['end'] .= " AND (
            SELECT SUM( P.`price` ) 
            FROM  `"._DB_PREFIX_."product` AS P,
            `"._DB_PREFIX_."cart` AS CART 
            LEFT JOIN `"._DB_PREFIX_."cart_product` AS CP ON ( CP.id_cart = CART.id_cart )
            LEFT JOIN  `"._DB_PREFIX_."orders` AS O ON ( O.id_cart = CART.id_cart )
            WHERE 1 AND P.`id_product` = CP.`id_product`
            AND CART.id_customer = C.id_customer
            AND O.id_cart IS NULL) ".$operator." ".$explo[0]." AND ".$explo[1].")";
            $sentence['mid'] .= ",(
            SELECT SUM( P.`price` ) 
            FROM  `"._DB_PREFIX_."product` AS P,
            `"._DB_PREFIX_."cart` AS CART 
            LEFT JOIN `"._DB_PREFIX_."cart_product` AS CP ON ( CP.id_cart = CART.id_cart )
            LEFT JOIN  `"._DB_PREFIX_."orders` AS O ON ( O.id_cart = CART.id_cart )
            WHERE 1 AND P.`id_product` = CP.`id_product`
            AND CART.id_customer = C.id_customer
            AND O.id_cart IS NULL) AS `Prix total abandon panier`";
        }
        if ((Tools::getValue('O_ACHAT_CATEGORIE') != null) && (Tools::getValue('O_ACHAT_CATEGORIE_S') != null)) {
            if (Tools::getValue('O_ACHAT_CATEGORIE') == 1) {
                $operator = "=";
                $first_op = "OR";
            } else {
                $operator = "!=";
                $first_op = "AND";
            }
            $sentence['end'] .= " AND CART.id_cart = O.id_cart ";
            foreach (Tools::getValue('O_ACHAT_CATEGORIE_S') as $key => $value) {
                if ($key == 0) {
                    $sentence['end'] .= " AND ( CAT.`id_category` ".$operator." ".(int)$value;
                } else {
                    $sentence['end'] .= " ".$first_op." CAT.`id_category` ".$operator." ".(int)$value;
                }
            }
            $sentence['end'] .= ")";
            $sentence['mid'] .= ", (
            SELECT DISTINCT name 
            FROM `"._DB_PREFIX_."category_lang` AS CL 
            WHERE CL.`id_category` = CAT.`id_category`) AS `Category Achat`";
        }
        if ((Tools::getValue('O_ACHAT_MARQUE') != null) && (Tools::getValue('O_ACHAT_MARQUE_S') != null)) {
            if (Tools::getValue('O_ACHAT_MARQUE') == 1) {
                $operator = "=";
                $first_op = "OR";
            } else {
                $operator = "!=";
                $first_op = "AND";
            }
            $sentence['end'] .= " AND CART.id_cart = O.id_cart ";
            foreach (Tools::getValue('O_ACHAT_MARQUE_S') as $key => $value) {
                if ($key == 0) {
                    $sentence['end'] .= " AND ( P.`id_manufacturer` ".$operator." ".(int)$value;
                } else {
                    $sentence['end'] .= " ".$first_op." P.`id_manufacturer` ".$operator." ".(int)$value;
                }
            }
            $sentence['end'] .= ")";
            $sentence['mid'] .= ", (
            SELECT DISTINCT name 
            FROM `"._DB_PREFIX_."manufacturer` AS MANU 
            WHERE P.`id_manufacturer` = MANU.`id_manufacturer`) AS `Marque Achat`";
        }
        if ((Tools::getValue('O_ACHAT_PRODUIT') != null) && (Tools::getValue('O_ACHAT_PRODUIT_S') != null)) {
            if (Tools::getValue('O_ACHAT_PRODUIT') == 1) {
                $operator = "=";
                $first_op = "OR";
            } else {
                $operator = "!=";
                $first_op = "AND";
            }
            $sentence['end'] .= " AND CART.id_cart = O.id_cart ";
            foreach (Tools::getValue('O_ACHAT_PRODUIT_S') as $key => $value) {
                if ($key == 0) {
                    $sentence['end'] .= " AND ( P.`id_product` ".$operator." ".(int)$value;
                } else {
                    $sentence['end'] .= " ".$first_op." P.`id_product` ".$operator." ".(int)$value;
                }
            }
            $sentence['end'] .= ")";
            $sentence['mid'] .= ", (
            SELECT DISTINCT name 
            FROM `"._DB_PREFIX_."product_lang` AS PL 
            WHERE PL.`id_product` = CAT.`id_product`) AS `Produit Achat`";
        }
        if ((Tools::getValue('O_ACHAT_MONTANT') != null) && (Tools::getValue('O_ACHAT_MONTANT_S') != null)) {
            if (Tools::getValue('O_ACHAT_MONTANT') == 1) {
                $operator = "BETWEEN";
            } else {
                $operator = "NOT BETWEEN";
            }
            $explo = explode(",", Tools::getValue('O_ACHAT_MONTANT_S'));
            $sentence['end'] .= " AND (( 
            SELECT SUM( O.`total_paid` ) 
            FROM `"._DB_PREFIX_."orders` AS O 
            WHERE 
            1 
            AND O.`id_customer` = C.`id_customer` 
            ) ".$operator." ".$explo[0]." AND ".$explo[1].")";
            $sentence['mid'] .= ",
            ( 
            SELECT SUM( O.`total_paid` ) 
            FROM `"._DB_PREFIX_."orders` AS O 
            WHERE 
            1 
            AND O.`id_customer` = C.`id_customer` 
            ) AS `Prix total achat`";
        }
        if ((Tools::getValue('O_MOYEN_PAIEMENT') != null) && (Tools::getValue('O_MOYEN_PAIEMENT_S') != null)) {
            if (Tools::getValue('O_MOYEN_PAIEMENT') == 1) {
                $operator = "=";
                $first_op = "OR";
            } else {
                $operator = "!=";
                $first_op = "AND";
            }
            foreach (Tools::getValue('O_MOYEN_PAIEMENT_S') as $key => $value) {
                if ($key == 0) {
                    $sentence['end'] .= " AND ( O.`module` ".$operator." '".$value."'";
                } else {
                    $sentence['end'] .= " ".$first_op." O.`module` ".$operator." '".$value."'";
                }
            }
            $sentence['end'] .= ")";
            $sentence['mid'] .= ", O.`module` AS `Moyen paiement`";
        }
        if ((Tools::getValue('O_MOYEN_LIVRAISON') != null) && (Tools::getValue('O_MOYEN_LIVRAISON_S') != null)) {
            if (Tools::getValue('O_MOYEN_LIVRAISON') == 1) {
                $operator = "=";
                $first_op = "OR";
            } else {
                $operator = "!=";
                $first_op = "AND";
            }
            foreach (Tools::getValue('O_MOYEN_LIVRAISON_S') as $key => $value) {
                if ($key == 0) {
                    $sentence['end'] .= " AND ( O.`id_carrier` ".$operator." ".(int)$value;
                } else {
                    $sentence['end'] .= " ".$first_op." O.`id_carrier` ".$operator." ".(int)$value;
                }
            }
            $sentence['end'] .= ")";
            $sentence['mid'] .= ",(
            SELECT DISTINCT name 
            FROM `"._DB_PREFIX_."carrier` AS CAR
            WHERE CAR.`id_carrier` = O.`id_carrier`) AS `Moyen livraison`";
        }
        if ((Tools::getValue('O_COMMANDE_NOMBRE') != null) && (Tools::getValue('O_COMMANDE_NOMBRE_S') != null)) {
            if (Tools::getValue('O_COMMANDE_NOMBRE') == 1) {
                $operator = "BETWEEN";
            } else {
                $operator = "NOT BETWEEN";
            }
            $explo = explode(",", Tools::getValue('O_COMMANDE_NOMBRE_S'));
            $sentence['end'] .= " AND ((
            SELECT COUNT(*)
            FROM `"._DB_PREFIX_."orders` AS ORD
            WHERE 1 AND ORD.`id_customer` = C.`id_customer` 
            ) ".$operator." ".$explo[0]." AND ".$explo[1].")";
            $sentence['mid'] .= ", (
            SELECT COUNT(*)
            FROM `"._DB_PREFIX_."orders` AS ORD
            WHERE 1 AND ORD.`id_customer` = C.`id_customer`
            ) AS `Nombre total commande`";
        }
        if ((Tools::getValue('O_COMMANDE') != null) && (Tools::getValue('O_COMMANDE_DATE_MIN') != null)
            && (Tools::getValue('O_COMMANDE_DATE_MAX') != null)) {
            if (Tools::getValue('O_COMMANDE') == 1) {
                $operator = "NOT BETWEEN";
            } else {
                $operator = "BETWEEN";
            }
            $sentence['end'] .= " AND ( O.`date_add` ".$operator." '".Tools::getValue('O_COMMANDE_DATE_MIN').
            "' AND '".Tools::getValue('O_COMMANDE_DATE_MAX')."')";
            $sentence['mid'] .= ",
            O.`date_add` AS `Date commande`";
        }
        return $sentence;
    }

    public function hookBackOfficeHeader()
    {
        if (Tools::getValue('module_name') == $this->name) {
        }
    }
}
