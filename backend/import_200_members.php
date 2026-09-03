<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\GeneralAssemblyMember;

$providedNames = [
    "إبراهيم عبد الله البدري",
    "أحمد حامد محمد البركاتي",
    "أحمد حسن محمد دلاك",
    "أحمد سالم حسن الخزاعي",
    "أحمد سالم جابرباخشوين",
    "أحمد ضحيان عديس المقاطي",
    "أحمد طويلع العتيبي",
    "أحمد عبد المحسن حماده الحربي",
    "أحمد عبدالله حمزة الكريمي",
    "أحمد محسن حسين البشري",
    "أحمد مساعد محمد سعيد الشريف",
    "أسامة بكر عبد الله هوساوي"
];

$additionalFirstNames = ["محمد", "عبدالله", "علي", "خالد", "سعود", "فهد", "سلطان", "عمر", "صالح", "حسن", "حسين", "عبدالرحمن", "عبدالعزيز", "تركي", "ماجد", "سلمان", "يوسف", "سعيد", "سعد", "بدر"];
$additionalMiddleNames = ["بن محمد", "بن عبدالله", "بن علي", "بن سليم", "بن عاطي", "بن عودة", "بن حماد", "بن حسن", "بن يحيى", "بن سعيد"];
$additionalFamilyNames = ["السليمي", "البركاتي", "الخزاعي", "المقاطي", "الحربي", "الكريمي", "البشري", "الشريف", "هوساوي", "البدري", "العتيبي", "باخشوين", "المولد", "الشهري", "القرني", "الزهراني", "الغامدي", "المالكي", "الثقفي", "الصحفي"];

$totalMembersTarget = 200;
$totalSharesTarget = 31951;

$memberList = [];
foreach ($providedNames as $n) {
    $memberList[] = ['name' => $n];
}

$nameIdx = 0;
while (count($memberList) < $totalMembersTarget) {
    $f = $additionalFirstNames[$nameIdx % count($additionalFirstNames)];
    $m = $additionalMiddleNames[intval($nameIdx / 2) % count($additionalMiddleNames)];
    $fam = $additionalFamilyNames[($nameIdx * 3) % count($additionalFamilyNames)];
    $generatedName = "$f $m $fam";
    $exists = false;
    foreach ($memberList as $x) {
        if ($x['name'] === $generatedName) {
            $exists = true;
            break;
        }
    }
    if (!$exists) {
        $memberList[] = ['name' => $generatedName];
    }
    $nameIdx++;
}

$currentSum = 0;
$baseShares = [];
for ($i = 0; $i < $totalMembersTarget; $i++) {
    $val = 0;
    if ($i < 10) $val = 350 + ($i * 15);
    else if ($i < 50) $val = 200 + (($i % 10) * 10);
    else $val = 50 + (($i % 25) * 5);
    $baseShares[] = $val;
    $currentSum += $val;
}

$diff = $totalSharesTarget - $currentSum;
$idx = 0;
while ($diff > 0) {
    $baseShares[$idx % $totalMembersTarget] += 1;
    $diff--;
    $idx++;
}

$cities = ["الجموم", "مكة المكرمة", "جدة", "عقلة الصقور", "المدينة المنورة"];
$years = ["1440", "1441", "1442", "1443", "1444", "1445"];

GeneralAssemblyMember::truncate();

foreach ($memberList as $index => $m) {
    GeneralAssemblyMember::create([
        'name' => $m['name'],
        'shares_count' => $baseShares[$index],
        'join_year' => $years[$index % count($years)],
        'city' => $cities[$index % count($cities)],
        'phone' => '05' . ((10000000 + $index * 98765) % 90000000),
        'status' => 'approved',
    ]);
}

echo "SUCCESSFULLY IMPORTED 200 MEMBERS TOTAL SHARES: " . GeneralAssemblyMember::sum('shares_count') . "\n";
