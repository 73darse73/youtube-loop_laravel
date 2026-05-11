<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class ReportNotifyController extends Controller
{
    public function notify(Request $request)
    {
        if ($request->query('token') !== config('services.report.token')) {
            abort(401, 'Unauthorized');
        }

        $content = $request->input('content');
        $date    = now()->timezone('Asia/Tokyo')->format('Y-m-d');

        if (empty($content)) {
            abort(422, 'content is required');
        }

        $errors = [];

        try {
            $this->postToNotion($date, $content);
        } catch (\Exception $e) {
            $errors[] = 'Notion: ' . $e->getMessage();
        }

        try {
            $this->sendEmail($date, $content);
        } catch (\Exception $e) {
            $errors[] = 'Email: ' . $e->getMessage();
        }

        if (!empty($errors)) {
            return response()->json(['status' => 'partial', 'errors' => $errors], 207);
        }

        return response()->json(['status' => 'ok']);
    }

    private function postToNotion(string $date, string $content): void
    {
        $token  = config('services.notion.token');
        $pageId = config('services.notion.page_id');

        $paragraphs = array_map(fn($line) => [
            'object' => 'block',
            'type'   => 'paragraph',
            'paragraph' => [
                'rich_text' => [[
                    'type' => 'text',
                    'text' => ['content' => $line ?: ' '],
                ]],
            ],
        ], explode("\n", $content));

        $response = Http::withToken($token)
            ->withHeaders(['Notion-Version' => '2022-06-28'])
            ->post('https://api.notion.com/v1/pages', [
                'parent'     => ['page_id' => $pageId],
                'properties' => [
                    'title' => [
                        'title' => [[
                            'text' => ['content' => "📊 日次レポート {$date}"],
                        ]],
                    ],
                ],
                'children' => $paragraphs,
            ]);

        if (!$response->successful()) {
            throw new \Exception($response->body());
        }
    }

    private function sendEmail(string $date, string $content): void
    {
        Mail::html(
            nl2br(e($content)),
            fn($message) => $message
                ->to('73darse73@gmail.com')
                ->subject("📊 Loop Video 日次レポート {$date}")
        );
    }
}
