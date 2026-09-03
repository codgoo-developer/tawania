<?php

if (!function_exists('get_locale_text')) {
    function get_locale_text($arText, $enText = null) {
        $locale = app()->getLocale();
        return ($locale === 'en' && $enText) ? $enText : $arText;
    }
}
