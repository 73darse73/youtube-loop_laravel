<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Google\Auth\OAuth2;

class Ga4Auth extends Command
{
    protected $signature = 'ga4:auth';
    protected $description = 'GA4 OAuth2認証を行いリフレッシュトークンを取得する';

    public function handle(): void
    {
        $clientSecretPath = storage_path('app/ga4-oauth-client.json');

        if (!file_exists($clientSecretPath)) {
            $this->error('storage/app/ga4-oauth-client.json が見つかりません');
            return;
        }

        $credentials = json_decode(file_get_contents($clientSecretPath), true)['installed'];

        $oauth2 = new OAuth2([
            'clientId'           => $credentials['client_id'],
            'clientSecret'       => $credentials['client_secret'],
            'authorizationUri'   => 'https://accounts.google.com/o/oauth2/auth',
            'tokenCredentialUri' => 'https://oauth2.googleapis.com/token',
            'redirectUri'        => 'urn:ietf:wg:oauth:2.0:oob',
            'scope'              => 'https://www.googleapis.com/auth/analytics.readonly',
        ]);

        $authUrl = $oauth2->buildFullAuthorizationUri(['access_type' => 'offline', 'prompt' => 'consent']);

        $this->info('以下のURLをブラウザで開いてください：');
        $this->line((string) $authUrl);
        $this->newLine();

        $code = $this->ask('認証後に表示されたコードを貼り付けてください');

        $oauth2->setCode($code);
        $token = $oauth2->fetchAuthToken();

        if (empty($token['refresh_token'])) {
            $this->error('リフレッシュトークンの取得に失敗しました');
            return;
        }

        $this->info('✅ リフレッシュトークンを取得しました！');
        $this->newLine();
        $this->info('.env に以下を追加してください：');
        $this->line('GA4_REFRESH_TOKEN=' . $token['refresh_token']);
        $this->line('GA4_CLIENT_ID=' . $credentials['client_id']);
        $this->line('GA4_CLIENT_SECRET=' . $credentials['client_secret']);
    }
}
