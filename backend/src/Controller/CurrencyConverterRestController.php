<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\CurrencyConverterService;

/**
 * Currency Converter Rest Controller
 * @package App\Controller
 * 
 * @Route(path="/api")
 */
class CurrencyConverterRestController
{
    private $currencyConverterService;

    public function __construct(CurrencyConverterService $currencyConverterService)
    {
        $this->currencyConverterService = $currencyConverterService;
    }

    /**
     *@Route("/currency-converter", name="currency_converter", methods={"GET"})
     */
    public function getCurrencyConverter(Request $request): JsonResponse
    {
        $amount = $request->query->get('amount');
        $fromTo = $request->query->get('from_to');

        if ($amount == '' ||  $fromTo == '') {
            return new JsonResponse([
                'status' => 'false',
                'message' => 'Please provide the amount and from_to',
                'amount' => ''
            ], Response::HTTP_CREATED);
        }

        $amount = $this->currencyConverterService->currencyConverter($amount, $fromTo);
        return new JsonResponse([
            'status' => 'true',
            'message' => 'Converted successfully.',
            'amount' => $amount
        ], Response::HTTP_CREATED);
    }
}
