<?php

namespace App\Services;

use Google\Analytics\Data\V1beta\Client\BetaAnalyticsDataClient;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\Metric;
use Google\Analytics\Data\V1beta\RunReportRequest;
use Google\Auth\Credentials\UserRefreshCredentials;

class Ga4Service
{
    private BetaAnalyticsDataClient $client;
    private string $propertyId;

    public function __construct()
    {
        $credentials = new UserRefreshCredentials(
            'https://www.googleapis.com/auth/analytics.readonly',
            [
                'client_id'     => config('services.ga4.client_id'),
                'client_secret' => config('services.ga4.client_secret'),
                'refresh_token' => config('services.ga4.refresh_token'),
            ]
        );

        $this->client = new BetaAnalyticsDataClient(['credentials' => $credentials]);
        $this->propertyId = 'properties/' . config('services.ga4.property_id');
    }

    public function getOverview(): array
    {
        $request = (new RunReportRequest())
            ->setProperty($this->propertyId)
            ->setDateRanges([new DateRange(['start_date' => '30daysAgo', 'end_date' => 'today'])])
            ->setMetrics([
                new Metric(['name' => 'screenPageViews']),
                new Metric(['name' => 'sessions']),
                new Metric(['name' => 'activeUsers']),
                new Metric(['name' => 'bounceRate']),
                new Metric(['name' => 'averageSessionDuration']),
            ]);

        $response = $this->client->runReport($request);
        $row = $response->getRows()[0] ?? null;
        if (!$row) return [];

        $values = array_map(fn($v) => $v->getValue(), iterator_to_array($row->getMetricValues()));

        return [
            'pageViews'          => (int) $values[0],
            'sessions'           => (int) $values[1],
            'activeUsers'        => (int) $values[2],
            'bounceRate'         => round((float) $values[3] * 100, 1),
            'avgSessionDuration' => round((float) $values[4]),
        ];
    }

    public function getDailyPageViews(): array
    {
        $request = (new RunReportRequest())
            ->setProperty($this->propertyId)
            ->setDateRanges([new DateRange(['start_date' => '29daysAgo', 'end_date' => 'today'])])
            ->setDimensions([new Dimension(['name' => 'date'])])
            ->setMetrics([new Metric(['name' => 'screenPageViews'])]);

        $response = $this->client->runReport($request);

        $data = [];
        foreach ($response->getRows() as $row) {
            $date = $row->getDimensionValues()[0]->getValue();
            $formatted = substr($date, 0, 4) . '-' . substr($date, 4, 2) . '-' . substr($date, 6, 2);
            $data[$formatted] = (int) $row->getMetricValues()[0]->getValue();
        }

        return collect(range(29, 0))->map(function ($daysAgo) use ($data) {
            $date = now()->subDays($daysAgo)->toDateString();
            return ['date' => $date, 'count' => $data[$date] ?? 0];
        })->values()->toArray();
    }

    public function getChannels(): array
    {
        $request = (new RunReportRequest())
            ->setProperty($this->propertyId)
            ->setDateRanges([new DateRange(['start_date' => '30daysAgo', 'end_date' => 'today'])])
            ->setDimensions([new Dimension(['name' => 'sessionDefaultChannelGroup'])])
            ->setMetrics([new Metric(['name' => 'sessions'])]);

        $response = $this->client->runReport($request);

        return collect($response->getRows())->map(fn($row) => [
            'channel'  => $row->getDimensionValues()[0]->getValue(),
            'sessions' => (int) $row->getMetricValues()[0]->getValue(),
        ])->sortByDesc('sessions')->values()->toArray();
    }

    public function getTopPages(): array
    {
        $request = (new RunReportRequest())
            ->setProperty($this->propertyId)
            ->setDateRanges([new DateRange(['start_date' => '30daysAgo', 'end_date' => 'today'])])
            ->setDimensions([new Dimension(['name' => 'pagePath'])])
            ->setMetrics([new Metric(['name' => 'screenPageViews'])])
            ->setLimit(10);

        $response = $this->client->runReport($request);

        return collect($response->getRows())->map(fn($row) => [
            'path'  => $row->getDimensionValues()[0]->getValue(),
            'views' => (int) $row->getMetricValues()[0]->getValue(),
        ])->sortByDesc('views')->values()->toArray();
    }

    public function getDevices(): array
    {
        $request = (new RunReportRequest())
            ->setProperty($this->propertyId)
            ->setDateRanges([new DateRange(['start_date' => '30daysAgo', 'end_date' => 'today'])])
            ->setDimensions([new Dimension(['name' => 'deviceCategory'])])
            ->setMetrics([new Metric(['name' => 'sessions'])]);

        $response = $this->client->runReport($request);

        return collect($response->getRows())->map(fn($row) => [
            'device'   => $row->getDimensionValues()[0]->getValue(),
            'sessions' => (int) $row->getMetricValues()[0]->getValue(),
        ])->sortByDesc('sessions')->values()->toArray();
    }

    public function getCountries(): array
    {
        $request = (new RunReportRequest())
            ->setProperty($this->propertyId)
            ->setDateRanges([new DateRange(['start_date' => '30daysAgo', 'end_date' => 'today'])])
            ->setDimensions([new Dimension(['name' => 'country'])])
            ->setMetrics([new Metric(['name' => 'sessions'])])
            ->setLimit(10);

        $response = $this->client->runReport($request);

        return collect($response->getRows())->map(fn($row) => [
            'country'  => $row->getDimensionValues()[0]->getValue(),
            'sessions' => (int) $row->getMetricValues()[0]->getValue(),
        ])->sortByDesc('sessions')->values()->toArray();
    }
}
