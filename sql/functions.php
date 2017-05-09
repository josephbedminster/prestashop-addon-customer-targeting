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

class AdminJenaFunctionsController extends ModuleAdminController
{
    public function __construct()
    {
    }
    public function exportToCSV($result, $path)
    {
        $delete = glob($path."/*.csv");
        foreach ($delete as $value) {
            unlink($value);
        }
        $str_to_write = "";
        $name = "/" . time() . ".csv";
        $file = fopen($path.$name, 'w');
        fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));
        foreach ($result[0] as $key => $value) {
            $str_to_write .= $key . "; ";
        }
        fwrite($file, Tools::substr($str_to_write, 0, -2) . "\n");
        foreach ($result as $key => $value) {
            fputcsv($file, $value, ";");
        }
        fclose($file);
        return ($name);
    }
    public function addToFavorites($name, $query)
    {
        $sql = "INSERT INTO  `prestashop`.`saved_sql_query` (`name` ,`query`)VALUES ('$name',  '$query');";
        return Db::getInstance()->executeS($sql);
    }
    public function getUsers()
    {
        $sql = 'SELECT * FROM '._DB_PREFIX_.'customer';
        return Db::getInstance()->executeS($sql);
    }
    public function getSavedRequest()
    {
        $sql = 'SELECT `id`,
                    `name` AS name,
                    `query` AS query
                FROM `prestashop`.`saved_sql_query`
                WHERE 1';
        return Db::getInstance()->executeS($sql);
    }
    public function getPayment()
    {
        $sql = 'SELECT
        MC.id_module,
        M.name AS `name`
        FROM '._DB_PREFIX_.'module_currency AS MC
        LEFT JOIN '._DB_PREFIX_.'module AS M ON (M.id_module = MC.id_module)
        WHERE 1
        ORDER BY Name ASC';
        return Db::getInstance()->executeS($sql);
    }
    public function getCarrier()
    {
        $sql = 'SELECT
        C.id_carrier,
        C.name AS `name`
        FROM '._DB_PREFIX_.'carrier AS C
        WHERE 1
        AND C.deleted = 0
        ORDER BY Name ASC';
        return Db::getInstance()->executeS($sql);
    }
    public function getAllGroup()
    {
        $sql = 'SELECT 
        GL.id_group,
        GL.name
        FROM `'._DB_PREFIX_.'group` AS G
        LEFT JOIN `'._DB_PREFIX_.'group_lang` AS GL
        ON (GL.`id_group` = G.`id_group` AND GL.`id_lang` = 1) 
        WHERE 1 
        ORDER BY GL.`name` ASC';
        return Db::getInstance()->executeS($sql);
    }
    public function getAllLangue()
    {
        $sql = 'SELECT
        L.id_lang,
        L.name
        FROM `'._DB_PREFIX_.'lang` AS L
        WHERE 1 
        ORDER BY Name ASC';
        return Db::getInstance()->executeS($sql);
    }
    public function getAllDevise()
    {
        $sql = 'SELECT 
        C.id_currency,
        C.name
        FROM `'._DB_PREFIX_.'currency` AS C
        INNER JOIN `'._DB_PREFIX_.'currency_shop` AS currency_shop 
        ON (currency_shop.id_currency = C.id_currency AND currency_shop.id_shop = 1) 
        WHERE 1 
        AND C.`deleted` = 0 
        GROUP BY C.id_currency
        ORDER BY C.`id_currency` ASC';
        return Db::getInstance()->executeS($sql);
    }
    public function getAllPays()
    {
        $sql = 'SELECT DISTINCT
        C.`id_country`,
        CL.`name` AS `name`

        FROM `'._DB_PREFIX_.'country` AS C
        LEFT JOIN `'._DB_PREFIX_.'country_lang` AS CL
        ON (CL.`id_country` = C.`id_country`)
        WHERE 1
        AND C.`active` = 1
        ORDER BY CL.`name` ASC';
        return Db::getInstance()->executeS($sql);
    }
    public function getAllSexe()
    {
        $sql = 'SELECT
        CIV.name AS `name`,
        G.id_gender
        FROM `'._DB_PREFIX_.'gender` AS G
        LEFT JOIN '._DB_PREFIX_.'gender_lang AS CIV ON (G.id_gender = CIV.id_gender AND CIV.id_lang = 1)
        WHERE 1';
        return Db::getInstance()->executeS($sql);
    }
    public function getAllCategory()
    {
        $sql = 'SELECT DISTINCT
        C.id_category,
        C.name as `name`
        FROM `'._DB_PREFIX_.'category_lang` AS C
        WHERE 1';
        return Db::getInstance()->executeS($sql);
    }
    public function getAllManufacturer()
    {
        $sql = 'SELECT
        M.id_manufacturer,
        M.name as `name`
        FROM `'._DB_PREFIX_.'manufacturer` AS M
        WHERE 1';
        return Db::getInstance()->executeS($sql);
    }
    public function getAllProductsCartDump($categories, $manufacturer, $incCat, $incManu)
    {
        $catOperator = array("condition" => "=", "andOr" => "OR");
        $manuOperator = array("condition" => "=", "andOr" => "OR");
        $condition = "";
        $sql = 'SELECT DISTINCT
        PL.id_product,
        PL.name as `name`

        FROM `'._DB_PREFIX_.'product_lang` AS PL
        LEFT JOIN `'._DB_PREFIX_.'product` AS P ON (P.id_product = PL.id_product)
        LEFT JOIN `'._DB_PREFIX_.'category_product` AS CP ON (CP.id_product = PL.id_product)
        LEFT JOIN `'._DB_PREFIX_.'cart` AS C ON (C.delivery_option = "")
        LEFT JOIN `'._DB_PREFIX_.'orders` AS O ON (O.id_cart = C.id_cart)
        LEFT JOIN `'._DB_PREFIX_.'cart_product` AS CARTP ON (CARTP.id_cart = C.id_cart)

        WHERE 1
        AND O.id_cart IS NULL
        AND PL.id_product = CARTP.id_product';
        if (is_array($categories) && is_array($manufacturer)) {
            if ($incCat == "false") {
                $catOperator["condition"] = "!=";
                $catOperator["andOr"] = "AND";
            }
            if ($incManu == "false") {
                $manuOperator["condition"] = "!=";
                $manuOperator["andOr"] = "AND";
            }
            if (!empty($categories)) {
                $i = 0;
                $condition = $condition . " AND (";
                for ($i = 0; $i < count($categories); $i++) {
                    $condition = $condition . "CP.id_category " . $catOperator["condition"] . " ";
                    $condition = $condition . $categories[$i] . " ";
                    if ($i < count($categories) - 1) {
                        $condition = $condition . $catOperator["andOr"] . " ";
                    }
                }
                $condition = $condition . ")";
            }
            if (!empty($manufacturer)) {
                $i = 0;
                $condition = $condition . " AND (";
                for ($i = 0; $i < count($manufacturer); $i++) {
                    $condition = $condition . "P.id_manufacturer " . $manuOperator["condition"] . " ";
                    $condition = $condition . $manufacturer[$i] . " ";
                    if ($i < count($manufacturer) - 1) {
                        $condition = $condition . $manuOperator["andOr"] . " ";
                    }
                }
                $condition = $condition . ")";
            }
            $sql = $sql . $condition . "\n";
        }
        return (Db::getInstance()->executeS($sql));
    }
    public function getAllProductsOrdered($categories, $manufacturer, $incCat, $incManu)
    {
        $catOperator = array("condition" => "=", "andOr" => "OR");
        $manuOperator = array("condition" => "=", "andOr" => "OR");
        $condition = "";
        $sql = 'SELECT DISTINCT
        PL.id_product,
        PL.name as `name`

        FROM `'._DB_PREFIX_.'product_lang` AS PL
        LEFT JOIN `'._DB_PREFIX_.'product` AS P ON (P.id_product = PL.id_product)
        LEFT JOIN `'._DB_PREFIX_.'category_product` AS CP ON (CP.id_product = PL.id_product)

        WHERE 1';
        if (is_array($categories) && is_array($manufacturer)) {
            if ($incCat == "false") {
                $catOperator["condition"] = "!=";
                $catOperator["andOr"] = "AND";
            }
            if ($incManu == "false") {
                $manuOperator["condition"] = "!=";
                $manuOperator["andOr"] = "AND";
            }
            if (!empty($categories)) {
                $i = 0;
                $condition = $condition . " AND (";
                for ($i = 0; $i < count($categories); $i++) {
                    $condition = $condition . "CP.id_category " . $catOperator["condition"] . " ";
                    $condition = $condition . $categories[$i] . " ";
                    if ($i < count($categories) - 1) {
                        $condition = $condition . $catOperator["andOr"] . " ";
                    }
                }
                $condition = $condition . ")";
            }
            if (!empty($manufacturer)) {
                $i = 0;
                $condition = $condition . " AND (";
                for ($i = 0; $i < count($manufacturer); $i++) {
                    $condition = $condition . "P.id_manufacturer " . $manuOperator["condition"] . " ";
                    $condition = $condition . $manufacturer[$i] . " ";
                    if ($i < count($manufacturer) - 1) {
                        $condition = $condition . $manuOperator["andOr"] . " ";
                    }
                }
                $condition = $condition . ")";
            }
            $sql = $sql . $condition;
        }
        return Db::getInstance()->executeS($sql);
    }
    public function getMainRequest($data)
    {
        if ($data['end'] != null || $data['mid'] != null) {
            $sql = 'SELECT DISTINCT
            C.`id_customer` AS ID,
            C.`firstname` AS `Prénom`,
            C.`lastname` AS `Nom`,
            CIV.name AS `Civ.`,
            C.`email` AS `Email`,
            A.phone AS `Tél Fixe`,
            A.phone_mobile AS `Tél Mobile`,
            A.address1 AS `Adresse 1`,
            A.address2 AS `Adresse 2`,
            A.postcode AS `CP`,
            A.city AS `Ville`,
            COUNTRY.iso_code AS `Pays`,
            L.name AS `Langue`,
            CU.name AS `Devise`
            '.$data['mid'].'
            FROM `'._DB_PREFIX_.'customer` AS C 
            LEFT JOIN `'._DB_PREFIX_.'gender_lang` AS CIV ON (C.id_gender = CIV.id_gender AND CIV.id_lang = 1)
            LEFT JOIN `'._DB_PREFIX_.'address` AS A ON (C.id_customer = A.id_customer)
            LEFT JOIN `'._DB_PREFIX_.'country` AS COUNTRY ON (COUNTRY.id_country = A.id_country)
            LEFT JOIN `'._DB_PREFIX_.'lang` AS L ON (L.id_lang = C.id_lang)
            LEFT JOIN `'._DB_PREFIX_.'cart` AS CART ON (CART.id_customer = C.id_customer)
            LEFT JOIN `'._DB_PREFIX_.'currency` AS CU ON (CU.id_currency = CART.id_currency)
            LEFT JOIN `'._DB_PREFIX_.'customer_group` AS CG ON (CG.id_customer = C.id_customer)
            LEFT JOIN `'._DB_PREFIX_.'cart_product` AS CP ON (CP.id_cart = CART.id_cart)
            LEFT JOIN `'._DB_PREFIX_.'category_product` AS CAT ON (CAT.id_product = CP.id_product)
            LEFT JOIN `'._DB_PREFIX_.'product` AS P ON (P.id_product = CP.id_product)
            LEFT JOIN `'._DB_PREFIX_.'orders` AS O ON (O.id_cart = CART.id_cart)
            WHERE 1 AND C.`deleted` = 0'.$data['end'];

            $data['result'] = Db::getInstance()->executeS($sql);
            $data['request'] = $sql;
            return ($data);
        }
    }
    public function showRelaunch($sql)
    {
        return Db::getInstance()->executeS($sql);
    }
}
