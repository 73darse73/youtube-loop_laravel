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

        // アイコン背景（赤→紫グラデーション）
        $iconSize = 160;
        $iconX    = 120;
        $iconY    = (int)(($h - $iconSize) / 2);

        for ($y = 0; $y < $iconSize; $y++) {
            $ratio = $y / $iconSize;
            $r = (int)(239 + (147 - 239) * $ratio);
            $g = (int)(68  + (51  - 68)  * $ratio);
            $b = (int)(68  + (234 - 68)  * $ratio);
            imageline($img, $iconX, $iconY + $y, $iconX + $iconSize, $iconY + $y, imagecolorallocate($img, $r, $g, $b));
        }

        $white     = imagecolorallocate($img, 255, 255, 255);
        $grayLight = imagecolorallocate($img, 180, 180, 210);
        $textX     = $iconX + $iconSize + 60;

        // フォント（macOS → Linux → fallback の順で試す）
        $fonts = [
            '/System/Library/Fonts/Helvetica.ttc',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
            '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
        ];
        $font = collect($fonts)->first(fn($f) => file_exists($f));

        if ($font) {
            imagettftext($img, 72, 0, $textX, (int)($h / 2 - 20), $white, $font, 'Loop Video');
            imagettftext($img, 28, 0, $textX, (int)($h / 2 + 50), $grayLight, $font, 'YouTube loop player');
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
