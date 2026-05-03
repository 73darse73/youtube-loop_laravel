<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class GenerateOgpImage extends Command
{
    protected $signature = 'ogp:generate';
    protected $description = 'Generate OGP image for Loop Video';

    public function handle(): void
    {
        $w = 1200;
        $h = 630;

        $img = imagecreatetruecolor($w, $h);

        // 背景グラデーション（#1e1b4b → #0f172a）
        for ($y = 0; $y < $h; $y++) {
            $ratio = $y / $h;
            $r = (int)(30 + (15 - 30) * $ratio);
            $g = (int)(27 + (23 - 27) * $ratio);
            $b = (int)(75 + (42 - 75) * $ratio);
            imageline($img, 0, $y, $w, $y, imagecolorallocate($img, $r, $g, $b));
        }

        // アイコン背景（赤→紫グラデーション・丸角）
        $iconSize = 180;
        $iconX    = 100;
        $iconY    = (int)(($h - $iconSize) / 2);
        $radius   = 32;

        for ($y = 0; $y < $iconSize; $y++) {
            $ratio = $y / $iconSize;
            $r = (int)(239 + (147 - 239) * $ratio);
            $g = (int)(68  + (51  - 68)  * $ratio);
            $b = (int)(68  + (234 - 68)  * $ratio);
            $color = imagecolorallocate($img, $r, $g, $b);

            // 丸角を考慮した描画幅を計算
            $xOffset = 0;
            if ($y < $radius) {
                $xOffset = (int)($radius - sqrt($radius ** 2 - ($radius - $y) ** 2));
            } elseif ($y > $iconSize - $radius) {
                $xOffset = (int)($radius - sqrt($radius ** 2 - ($y - ($iconSize - $radius)) ** 2));
            }
            imageline($img, $iconX + $xOffset, $iconY + $y, $iconX + $iconSize - $xOffset, $iconY + $y, $color);
        }

        // 再生ボタン（白い三角形）
        $white     = imagecolorallocate($img, 255, 255, 255);
        $grayLight = imagecolorallocate($img, 180, 180, 210);

        $cx = $iconX + (int)($iconSize / 2) + 8;
        $cy = $iconY + (int)($iconSize / 2);
        $tw = 52;
        $th = 60;

        imagefilledpolygon($img, [
            $cx - (int)($tw * 0.3), $cy - (int)($th / 2),
            $cx + (int)($tw * 0.7), $cy,
            $cx - (int)($tw * 0.3), $cy + (int)($th / 2),
        ], $white);

        // テキスト
        $textX = $iconX + $iconSize + 70;
        $fonts = [
            '/System/Library/Fonts/Helvetica.ttc',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
            '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
        ];
        $font = collect($fonts)->first(fn($f) => file_exists($f));

        if ($font) {
            imagettftext($img, 80, 0, $textX, (int)($h / 2 - 10), $white, $font, 'Loop Video');
            imagettftext($img, 32, 0, $textX, (int)($h / 2 + 55), $grayLight, $font, 'YouTube loop player');
        }

        $dir = public_path('images');
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        imagepng($img, $dir . '/ogp.png');
        imagedestroy($img);

        $this->info('Generated: public/images/ogp.png');
    }
}
