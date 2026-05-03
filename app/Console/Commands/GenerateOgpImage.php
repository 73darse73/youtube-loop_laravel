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

        $white     = imagecolorallocate($img, 255, 255, 255);
        $grayLight = imagecolorallocate($img, 180, 180, 210);

        // YouTube風アイコン（白い丸角矩形 + 中の三角をグラデーション色で抜く）
        // ファビコンSVGと同じ比率: 24ユニット空間で矩形はy:3.545〜20.455 (高さ約16.91/24)
        $ytW = (int)($iconSize * 0.83);
        $ytH = (int)($ytW * (16.91 / 24.0));
        $ytX = $iconX + (int)(($iconSize - $ytW) / 2);
        $ytY = $iconY + (int)(($iconSize - $ytH) / 2);
        $ytR = (int)($ytW * (3.016 / 24.0));

        for ($y = 0; $y < $ytH; $y++) {
            $xOffset = 0;
            if ($y < $ytR) {
                $xOffset = (int)($ytR - sqrt($ytR ** 2 - ($ytR - $y) ** 2));
            } elseif ($y > $ytH - $ytR) {
                $xOffset = (int)($ytR - sqrt($ytR ** 2 - ($y - ($ytH - $ytR)) ** 2));
            }
            imageline($img, $ytX + $xOffset, $ytY + $y, $ytX + $ytW - $xOffset, $ytY + $y, $white);
        }

        // 三角形をグラデーション中央色で描画（切り抜き効果）
        // ファビコンSVGのパス座標を ytW×ytH 空間に正規化
        // M9.545 15.568 V8.432 L15.818 12 → 正規化: P1(0.398,0.711) P2(0.398,0.289) P3(0.659,0.500)
        $triColor = imagecolorallocate($img, 193, 60, 151);
        imagefilledpolygon($img, [
            $ytX + (int)(0.398 * $ytW), $ytY + (int)(0.711 * $ytH),
            $ytX + (int)(0.398 * $ytW), $ytY + (int)(0.289 * $ytH),
            $ytX + (int)(0.659 * $ytW), $ytY + (int)(0.500 * $ytH),
        ], $triColor);

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
