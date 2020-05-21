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
            'https://free.currconv.com/api/v7/convert?q=' . $fromTo . '&compact=ultra&apiKey=da56a4cf4fee1b00ce79'
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
