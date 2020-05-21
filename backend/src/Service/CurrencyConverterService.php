<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class CurrencyConverterService
{
    private $httpClient;

    public function __construct(HttpClientInterface $httpClient)
    {
        $this->httpClient = $httpClient;
    }

    public function currencyConverter($amount, $fromTo): float
    {

        $response = $this->httpClient->request(
            'GET',
            $_ENV['CURRENCY_API_URL'] . '?q=' . $fromTo . '&compact=ultra&apiKey=' . $_ENV['CURRENCY_API_KEY']
        );

        $data = $response->getContent();

        $result = json_decode($data);

        if (null === $result) {
            throw new \RuntimeException('Request does not contain valid JSON.');
        }
        if (empty($result->{$fromTo})) {
            throw new \RuntimeException('JSON is empty.');
        }

        return $amount * $result->{$fromTo};
    }
}
